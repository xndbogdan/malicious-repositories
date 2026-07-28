#!/usr/bin/env node
/** Environment & toolchain checks for novaremix Vault contributors */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function check(label, ok, detail = "") {
  const mark = ok ? "✓" : "✗";
  console.log(`  ${mark} ${label}${detail ? ` — ${detail}` : ""}`);
  return ok;
}

export function runDoctor() {
  console.log("\n  novaremix Vault — doctor\n");
  const nodeOk = check("Node.js >= 20", Number(process.version.slice(1).split(".")[0]) >= 20, process.version);

  let forgeOk = false;
  try {
    const v = execSync("forge --version", { encoding: "utf8" }).trim().split("\n")[0];
    forgeOk = check("Foundry (forge)", true, v);
  } catch {
    check("Foundry (forge)", false, "optional — npm run sim works without it");
  }

  check(".env", existsSync(join(root, ".env")), "copy from .env.example if missing");
  check("contracts/", existsSync(join(root, "contracts", "foundry.toml")));
  check("packages/simulator", existsSync(join(root, "packages", "simulator", "src")));
  check("packages/api", existsSync(join(root, "packages", "api", "src")));

  console.log("\n  Quick start:");
  console.log("    npm install");
  console.log("    npm run sim          # economic simulation v2");
  console.log("    npm run dev          # API on :4000");
  if (!forgeOk) console.log("    npm run setup        # install Foundry deps when ready\n");
  else console.log("    npm run test:contracts\n");

  return nodeOk;
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}` ||
    process.argv[1]?.endsWith("doctor.mjs")) {
  runDoctor();
}
