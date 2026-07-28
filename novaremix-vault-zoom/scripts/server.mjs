#!/usr/bin/env node
/**
 * novaremix Vault — one command to build, simulate, and serve everything.
 * Usage: npm run server
 */
import { spawn, spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

function banner() {
  console.log(`
  ╔══════════════════════════════════════════════════════════╗
  ║           novaremix VAULT — Protocol Lab v0.4             ║
  ╠══════════════════════════════════════════════════════════╣
  ║  Contracts · Simulator · API · Console UI                ║
  ║  Stage: internal QA · Audit Aug 2026                     ║
  ╚══════════════════════════════════════════════════════════╝
`);
}

function step(label) {
  console.log(`\n  ▸ ${label}\n`);
}

function runSync(args, opts = {}) {
  const r = spawnSync(npm, args, {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
    ...opts,
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function runNode(args) {
  return new Promise((resolve, reject) => {
    const p = spawn(process.execPath, args, { stdio: "inherit", cwd: root });
    p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`exit ${code}`))));
  });
}

banner();
step("Freeing ports 4000–4005");
spawnSync(process.execPath, [join(root, "scripts/stop.mjs")], { stdio: "inherit", cwd: root });

step("Building all packages (shared → simulator → console → api)");
runSync(["run", "build"]);

step("Running baseline economic simulation");
await runNode([join(root, "packages/simulator/dist/cli.js"), "run"]);

step("Running stress simulation");
await runNode([join(root, "packages/simulator/dist/cli.js"), "run", "--stress"]);

console.log(`
  ┌──────────────────────────────────────────────────────────┐
  │  Dashboard starting…                                     │
  │  →  http://localhost:4000                                │
  │                                                          │
  │  Tabs: Try It · Analytics · Markets · Review · Learn     │
  │  Stop: Ctrl+C  or  npm run stop                         │
  └──────────────────────────────────────────────────────────┘
`);

await runNode([join(root, "packages/api/dist/server.js")]);
