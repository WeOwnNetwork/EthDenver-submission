#!/usr/bin/env node
import { spawn } from "node:child_process";

const mode = process.argv[2] === "start" ? "start" : "dev";

const services = {
  anvil: {
    command: ["--filter", "anvil", mode],
    healthUrl: "http://127.0.0.1:3004/health",
  },
  gateway: {
    command: mode === "start"
      ? ["--filter", "gateway", "start", "--", "--port", "3002"]
      : ["--filter", "gateway", "dev"],
    healthUrl: "http://127.0.0.1:3002/health",
  },
  web: {
    command: mode === "start"
      ? ["--filter", "web", "start", "--", "--port", "3000"]
      : ["--filter", "web", "dev"],
    healthUrl: "http://127.0.0.1:3000",
  },
};

const children = [];
let shuttingDown = false;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForHealth(url, label, timeoutMs = 120000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok) {
        console.log(`[wireup] ${label} is healthy at ${url}`);
        return;
      }
    } catch {
      // retry
    }
    await sleep(1000);
  }
  throw new Error(`${label} health check timed out (${url})`);
}

function startService(name, args) {
  console.log(`[wireup] starting ${name}: pnpm ${args.join(" ")}`);
  const child = spawn("pnpm", args, {
    stdio: "inherit",
    env: process.env,
  });

  child.on("exit", (code) => {
    if (shuttingDown) return;
    console.error(`[wireup] ${name} exited with code ${code ?? 1}`);
    shutdown(code ?? 1);
  });

  children.push(child);
  return child;
}

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log("[wireup] shutting down services...");
  for (const child of children) {
    if (!child.killed) {
      try {
        child.kill("SIGTERM");
      } catch {
        // ignore
      }
    }
  }

  setTimeout(() => process.exit(code), 300);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

async function main() {
  startService("anvil", services.anvil.command);
  await waitForHealth(services.anvil.healthUrl, "anvil");

  startService("gateway", services.gateway.command);
  await waitForHealth(services.gateway.healthUrl, "gateway");

  startService("web", services.web.command);
  await waitForHealth(services.web.healthUrl, "web");

  console.log(`[wireup] stack ready (${mode})`);
}

main().catch((err) => {
  console.error(`[wireup] startup failed: ${err instanceof Error ? err.message : String(err)}`);
  shutdown(1);
});
