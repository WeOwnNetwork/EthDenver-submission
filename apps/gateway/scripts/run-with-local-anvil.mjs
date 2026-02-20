import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { accessSync, constants, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gatewayDir = resolve(__dirname, "..");
const workspaceRoot = resolve(gatewayDir, "../..");
const adiDir = resolve(workspaceRoot, "packages/adi");

const host = process.env.ANVIL_HOST || "127.0.0.1";
const port = Number(process.env.ANVIL_PORT || "8545");
const chainId = Number(process.env.ANVIL_CHAIN_ID || "99999");
const localRpc = `http://${host}:${port}`;

const dataDir = resolve(gatewayDir, ".data");
const pidPath = resolve(dataDir, "anvil.pid");
const statePath = resolve(dataDir, "anvil-state.json");
const localContractsPath = resolve(dataDir, "adi-local-contracts.json");

const DEPLOYER_PRIVATE_KEY =
  process.env.ADI_PRIVATE_KEY ||
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const NAME_TO_ENV_KEY = {
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

const requiredEnvKeys = Object.values(NAME_TO_ENV_KEY);

async function rpc(method, params = [], url = localRpc) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  if (!res.ok) throw new Error(`RPC error ${res.status}`);
  const payload = await res.json();
  if (payload.error) throw new Error(payload.error.message || "RPC returned error");
  return payload.result;
}

async function rpcHealthy(url = localRpc) {
  try {
    await rpc("eth_chainId", [], url);
    return true;
  } catch {
    return false;
  }
}

function processAlive(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath) {
  if (!existsSync(filePath)) return undefined;
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function writeJson(filePath, value) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function startAnvilIfNeeded() {
  await mkdir(dataDir, { recursive: true });

  const existingPidRaw = existsSync(pidPath) ? await readFile(pidPath, "utf8") : "";
  const existingPid = Number(existingPidRaw.trim());

  if (processAlive(existingPid) && (await rpcHealthy())) {
    return;
  }

  const forkUrl = process.env.ADI_FORK_URL || process.env.ADI_RPC_URL;

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

  if (forkUrl && !forkUrl.includes("127.0.0.1") && !forkUrl.includes("localhost")) {
    args.push("--fork-url", forkUrl);
  }

  const child = spawn("anvil", args, {
    cwd: gatewayDir,
    detached: true,
    stdio: "ignore",
  });

  child.unref();
  await writeFile(pidPath, `${child.pid}\n`, "utf8");

  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (await rpcHealthy()) return;
    await new Promise((resolveSleep) => setTimeout(resolveSleep, 500));
  }

  throw new Error("Anvil did not become healthy within 30s.");
}

async function hasCode(address) {
  if (!address) return false;
  const code = await rpc("eth_getCode", [address, "latest"]);
  return typeof code === "string" && code !== "0x";
}

function broadcastPath() {
  return resolve(adiDir, `broadcast/Deploy.s.sol/${chainId}/run-latest.json`);
}

async function extractAddressesFromBroadcast() {
  const path = broadcastPath();
  const run = await readJson(path);
  if (!run || !Array.isArray(run.transactions)) {
    throw new Error(`Missing broadcast file at ${path}`);
  }

  const envMap = { ADI_RPC_URL: localRpc, ADI_PRIVATE_KEY: DEPLOYER_PRIVATE_KEY };

  for (const tx of run.transactions) {
    const key = NAME_TO_ENV_KEY[tx.contractName];
    if (!key) continue;
    if (tx.contractAddress) envMap[key] = tx.contractAddress;
  }

  return envMap;
}

async function contractsNeedDeploy(existing) {
  for (const key of requiredEnvKeys) {
    const addr = existing?.[key];
    if (!addr) return true;
    const deployed = await hasCode(addr);
    if (!deployed) return true;
  }
  return false;
}

function runCommand(command, args, cwd, env = {}) {
  return new Promise((resolveDone, rejectDone) => {
    const child = spawn(command, args, {
      cwd,
      env: { ...process.env, ...env },
      stdio: "inherit",
    });

    child.on("error", rejectDone);
    child.on("close", (code) => {
      if (code === 0) resolveDone();
      else rejectDone(new Error(`${command} ${args.join(" ")} exited with ${code}`));
    });
  });
}

async function ensureContracts() {
  const existing = await readJson(localContractsPath);

  if (!(await contractsNeedDeploy(existing))) {
    return existing;
  }

  console.log("[gateway] Deploying ADI contracts to local Anvil fork...");
  await runCommand("pnpm", ["run", "deploy:fork"], adiDir, {
    ADI_PRIVATE_KEY: DEPLOYER_PRIVATE_KEY,
  });

  const deployed = await extractAddressesFromBroadcast();
  await writeJson(localContractsPath, deployed);
  return deployed;
}

function assertBinary(cmd) {
  try {
    accessSync(resolve("/usr/bin/env"), constants.X_OK);
    spawn("/usr/bin/env", [cmd], { stdio: "ignore" }).on("error", () => {});
  } catch {
    // no-op best effort
  }
}

async function bootstrap() {
  assertBinary("anvil");
  assertBinary("pnpm");

  await startAnvilIfNeeded();
  const deployed = await ensureContracts();

  return {
    ...deployed,
    ADI_RPC_URL: localRpc,
    ADI_PRIVATE_KEY: DEPLOYER_PRIVATE_KEY,
  };
}

async function main() {
  const mode = process.argv[2] || "dev";
  const passthroughArgs = process.argv.slice(3);

  const disabled = process.env.GATEWAY_USE_LOCAL_ANVIL === "0";
  let injectedEnv = {};

  if (!disabled) {
    try {
      injectedEnv = await bootstrap();
      console.log(`[gateway] Using local Anvil at ${localRpc}`);
    } catch (err) {
      console.warn("[gateway] Local Anvil bootstrap failed, continuing without it.");
      console.warn(err instanceof Error ? err.message : String(err));
    }
  }

  const nextArgs = [mode];
  if (mode === "dev" && !passthroughArgs.length) {
    nextArgs.push("--port", "3002");
  }
  nextArgs.push(...passthroughArgs);

  const child = spawn("next", nextArgs, {
    cwd: gatewayDir,
    env: { ...process.env, ...injectedEnv },
    stdio: "inherit",
  });

  child.on("close", (code) => process.exit(code ?? 1));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
