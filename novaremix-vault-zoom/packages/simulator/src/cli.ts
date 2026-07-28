#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { formatReport, runSimulation } from "./engine/simulator.js";

const args = process.argv.slice(2);
const stress = args.includes("--stress");
const scenarioId = stress ? "stress" : "baseline";

const report = runSimulation({ scenarioId, seed: stress ? 7 : 42 });
console.log(formatReport(report));

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, `sim-${scenarioId}-${Date.now()}.json`);
writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(`  Report saved → ${outPath}\n`);
