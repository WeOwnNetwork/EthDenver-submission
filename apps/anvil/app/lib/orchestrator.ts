import { spawn } from "node:child_process";
import { accessSync, constants, existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export interface ContractEnvMap {
  ADI_RPC_URL: string;
  ADI_PRIVATE_KEY: string;
  CONTRACT_IDENTITY: string;
  CONTRACT_REPUTATION: string;
  CONTRACT_VALIDATION: string;
  CONTRACT_SHARED_KERNEL: string;
  CONTRACT_SEASON: string;
  CONTRACT_ISC: string;
  CONTRACT_BAD_AGENT: string;
  CONTRACT_VSA: string;
  CONTRACT_DOCUMENT: string;
  CONTRACT_CCC_ID: string;
  CONTRACT_CCC_TOKEN: string;
}

const NAME_TO_ENV_KEY: Record<string, keyof ContractEnvMap | undefined> = {
  AgentIdentityRegistry: "CONTRACT_IDENTITY",
  AgentReputationRegistry: "CONTRACT_REPUTATION",
  AgentValidationRegistry: "CONTRACT_VALIDATION",
  SharedKernelRegistry: "CONTRACT_SHARED_KERNEL",
  SeasonRegistry: "CONTRACT_SEASON",
  ISCRegistry: "CONTRACT_ISC",
  BadAgentRegistry: "CONTRACT_BAD_AGENT",
  VSARegistry: "CONTRACT_VSA",
  DocumentRegistry: "CONTRACT_DOCUMENT",
  CCCIdRegistry: "CONTRACT_CCC_ID",
  CCCGovernanceToken: "CONTRACT_CCC_TOKEN",
};

const REQUIRED_CONTRACT_KEYS = Object.values(NAME_TO_ENV_KEY).filter(Boolean) as Array<
  Exclude<keyof ContractEnvMap, "ADI_RPC_URL" | "ADI_PRIVATE_KEY">
>;

const appRoot = process.cwd();
const workspaceRoot = path.resolve(appRoot, "../..");
const adiRoot = path.resolve(workspaceRoot, "packages/adi");

const dataDir = path.resolve(appRoot, ".data");
const pidPath = path.resolve(dataDir, "anvil.pid");
const statePath = path.resolve(dataDir, "anvil-state.json");
const contractsPath = path.resolve(dataDir, "adi-local-contracts.json");

const deployerPrivateKey =
  process.env.ADI_PRIVATE_KEY ||
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const host = process.env.ANVIL_HOST || "127.0.0.1";
const port = Number(process.env.ANVIL_PORT || "8545");
const chainId = Number(process.env.ANVIL_CHAIN_ID || "99999");
const localRpc = `http://${host}:${port}`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const readJson = async <T>(filePath: string): Promise<T | undefined> => {
  if (!existsSync(filePath)) return undefined;
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
};

const writeJson = async (filePath: string, value: unknown): Promise<void> => {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const rpc = async (method: string, params: unknown[] = [], rpcUrl = localRpc): Promise<any> => {
  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  if (!res.ok) throw new Error(`RPC request failed: ${res.status}`);
  const payload = await res.json();
  if (payload.error) throw new Error(payload.error.message || "RPC error");
  return payload.result;
};

export const rpcHealthy = async (rpcUrl = localRpc): Promise<boolean> => {
  try {
    await rpc("eth_chainId", [], rpcUrl);
    return true;
  } catch {
    return false;
  }
};

const isProcessAlive = (pid: number): boolean => {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
};

const spawnLoggedCommand = (
  command: string,
  args: string[],
  cwd: string,
  extraEnv: Record<string, string> = {}
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: { ...process.env, ...extraEnv },
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });
  });
};

const commandStdout = (
  command: string,
  args: string[],
  cwd: string,
  extraEnv: Record<string, string> = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: { ...process.env, ...extraEnv },
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve(stdout.trim());
      else reject(new Error(`${command} ${args.join(" ")} failed: ${stderr}`));
    });
  });
};

export const ensureAnvil = async (): Promise<{ rpcUrl: string; chainId: number }> => {
  await mkdir(dataDir, { recursive: true });

  const pidRaw = existsSync(pidPath) ? await readFile(pidPath, "utf8") : "";
  const pid = Number(pidRaw.trim());

  if (isProcessAlive(pid) && (await rpcHealthy(localRpc))) {
    return { rpcUrl: localRpc, chainId };
  }

  const args = [
    "--host",
    host,
    "--port",
    String(port),
    "--chain-id",
    String(chainId),
    "--state",
    statePath,
    "--state-interval",
    "10",
  ];

  const forkUrl = process.env.ANVIL_FORK_URL || process.env.ADI_FORK_URL || process.env.ADI_RPC_URL;
  if (forkUrl && !forkUrl.includes("127.0.0.1") && !forkUrl.includes("localhost")) {
    args.push("--fork-url", forkUrl);
  }

  const child = spawn("anvil", args, {
    cwd: appRoot,
    detached: true,
    stdio: "ignore",
  });

  child.unref();
  await writeFile(pidPath, `${child.pid}\n`, "utf8");

  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (await rpcHealthy(localRpc)) {
      return { rpcUrl: localRpc, chainId };
    }
    await sleep(400);
  }

  throw new Error("Anvil failed to become healthy in 30s");
};

const ensureCodeAt = async (address: string): Promise<boolean> => {
  if (!address) return false;
  const code = await rpc("eth_getCode", [address, "latest"], localRpc);
  return Boolean(code && code !== "0x");
};

const contractsNeedDeploy = async (current?: Partial<ContractEnvMap>): Promise<boolean> => {
  if (!current) return true;
  for (const key of REQUIRED_CONTRACT_KEYS) {
    const address = current[key];
    if (!address) return true;
    if (!(await ensureCodeAt(address))) return true;
  }
  return false;
};

const broadcastFile = (): string =>
  path.resolve(adiRoot, `broadcast/Deploy.s.sol/${chainId}/run-latest.json`);

export const readBroadcastContracts = async (): Promise<ContractEnvMap> => {
  const run = await readJson<any>(broadcastFile());
  if (!run || !Array.isArray(run.transactions)) {
    throw new Error(`Broadcast output not found at ${broadcastFile()}`);
  }

  const out: Partial<ContractEnvMap> = {
    ADI_RPC_URL: localRpc,
    ADI_PRIVATE_KEY: deployerPrivateKey,
  };

  for (const tx of run.transactions) {
    const envKey = NAME_TO_ENV_KEY[tx.contractName];
    if (!envKey) continue;
    if (tx.contractAddress) {
      out[envKey] = tx.contractAddress;
    }
  }

  for (const key of REQUIRED_CONTRACT_KEYS) {
    if (!out[key]) throw new Error(`Missing ${key} in latest broadcast`);
  }

  return out as ContractEnvMap;
};

export const deployAdi = async (): Promise<ContractEnvMap> => {
  const gasPrice = await commandStdout("cast", ["gas-price", "--rpc-url", localRpc], adiRoot);

  await spawnLoggedCommand(
    "forge",
    [
      "script",
      "script/Deploy.s.sol:Deploy",
      "--fork-url",
      localRpc,
      "--broadcast",
      "--with-gas-price",
      gasPrice,
    ],
    adiRoot,
    { DEPLOYER_PRIVATE_KEY: deployerPrivateKey }
  );

  const deployed = await readBroadcastContracts();
  await writeJson(contractsPath, deployed);
  return deployed;
};

export const ensureAdi = async (): Promise<ContractEnvMap> => {
  const current = await readJson<ContractEnvMap>(contractsPath);
  if (await contractsNeedDeploy(current)) {
    return deployAdi();
  }
  return current as ContractEnvMap;
};

export const bootstrap = async (): Promise<{ rpcUrl: string; chainId: number; contracts: ContractEnvMap }> => {
  accessSync("/usr/bin/env", constants.X_OK);
  await ensureAnvil();
  const contracts = await ensureAdi();
  return { rpcUrl: localRpc, chainId, contracts };
};

export const stopAnvil = async (): Promise<{ stopped: boolean }> => {
  const pidRaw = existsSync(pidPath) ? await readFile(pidPath, "utf8") : "";
  const pid = Number(pidRaw.trim());
  if (!pid || !isProcessAlive(pid)) return { stopped: false };
  process.kill(pid, "SIGTERM");
  return { stopped: true };
};
