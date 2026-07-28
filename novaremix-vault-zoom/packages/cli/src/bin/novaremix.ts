#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runSimulation, formatReport } from "@novaremix/simulator";
import { PROTOCOL } from "@novaremix/shared";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "..");
const [, , cmd, ...rest] = process.argv;

function help() {
  console.log(`
  novaremix — novaremix Vault developer CLI (v${PROTOCOL.version})

  Commands:
    doctor          Check Node, env, and optional Foundry toolchain
    sim [run]       Run economic simulation v2 (add --stress for stress test)
    status          Print protocol stage aligned with website roadmap
    dev             Print quick-start URLs after npm run dev

  Examples:
    npx novaremix sim run
    npx novaremix sim run --stress
    npx novaremix doctor
`);
}

function status() {
  console.log(`
  ${PROTOCOL.name} · ${PROTOCOL.version}
  Stage: ${PROTOCOL.stage}
  Audit sprint: ${PROTOCOL.auditSprint}
  Launch target: ${PROTOCOL.launchTarget}
  Chains: ${PROTOCOL.chains.join(", ")}

  Active roadmap (website-aligned):
    • Isolated lending + yield router in internal QA
    • Economic simulation v2 — run: novaremix sim run
    • August audit sprint booked · Q4 2026 launch target
`);
}

function simRun() {
  const stress = rest.includes("--stress");
  const report = runSimulation({ scenarioId: stress ? "stress" : "baseline", seed: stress ? 7 : 42 });
  console.log(formatReport(report));
}

function dev() {
  const port = process.env.PORT ?? 4000;
  console.log(`
  Dev stack ready:
    API        http://localhost:${port}/health
    Vault      http://localhost:${port}/v1/vault/status
    Markets    http://localhost:${port}/v1/markets
    Simulate   POST http://localhost:${port}/v1/simulation/run
    Website    http://localhost:3000  (meridian-labs)
`);
}

function doctor() {
  const script = join(root, "scripts", "doctor.mjs");
  spawnSync(process.execPath, [script], { stdio: "inherit", cwd: root });
}

switch (cmd) {
  case "sim":
    if (rest[0] === "run" || rest.length === 0) simRun();
    else help();
    break;
  case "doctor":
    doctor();
    break;
  case "status":
    status();
    break;
  case "dev":
    dev();
    break;
  default:
    help();
}
