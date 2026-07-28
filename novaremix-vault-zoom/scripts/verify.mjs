#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function run(label, cmd, args) {
  console.log(`\n▶ ${label}`);
  const r = spawnSync(cmd, args, { cwd: root, stdio: "inherit", shell: true });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log("\n  novaremix Vault — verify\n");
run("build", "npm", ["run", "build"]);
run("node tests", "npm", ["run", "test"]);
console.log("\n✓ Node stack verified\n");
console.log("  Optional: npm run setup && npm run test:contracts (requires Foundry)\n");
