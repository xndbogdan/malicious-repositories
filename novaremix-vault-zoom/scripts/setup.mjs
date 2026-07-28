#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contracts = join(root, "contracts");

console.log("\n  novaremix Vault — setup\n");

if (!existsSync(join(contracts, "lib", "forge-std"))) {
  console.log("  Installing forge-std...");
  execSync("forge install foundry-rs/forge-std --no-commit", { cwd: contracts, stdio: "inherit" });
}

if (!existsSync(join(contracts, "lib", "openzeppelin-contracts"))) {
  console.log("  Installing OpenZeppelin...");
  execSync("forge install OpenZeppelin/openzeppelin-contracts@v5.0.2 --no-commit", {
    cwd: contracts,
    stdio: "inherit",
  });
}

console.log("\n  Building contracts...");
execSync("forge build", { cwd: contracts, stdio: "inherit" });
console.log("\n  Setup complete. Run: npm run test:contracts\n");
