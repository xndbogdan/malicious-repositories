import assert from "node:assert/strict";
import test from "node:test";
import { runSimulation } from "../engine/simulator.js";
import { MARKETS_V2, PROTOCOL, STRATEGIES_V2 } from "@novaremix/shared";

test("PROTOCOL metadata is consistent", () => {
  assert.equal(PROTOCOL.version, "0.4.0-internal");
  assert.equal(PROTOCOL.stage, "internal-qa");
  assert.ok(PROTOCOL.chains.includes("ethereum"));
});

test("market configs have valid parameters", () => {
  for (const m of MARKETS_V2) {
    assert.ok(m.collateralFactor < m.liquidationThreshold);
    assert.ok(m.liquidationThreshold <= 1);
    assert.ok(m.maxUtilization <= 1);
  }
});

test("strategy weights sum to 10000 bps", () => {
  const total = STRATEGIES_V2.reduce((a, s) => a + s.weightBps, 0);
  assert.equal(total, 10_000);
});

test("baseline simulation passes stress gate", () => {
  const report = runSimulation({ scenarioId: "baseline", seed: 42 });
  assert.equal(report.model, "v2");
  assert.ok(report.summary.solvencyRatio > 0.97);
  assert.equal(report.summary.passedStress, true);
  assert.equal(report.snapshots.length, 90);
});

test("stress scenario produces higher liquidation pressure", () => {
  const baseline = runSimulation({ scenarioId: "baseline", seed: 42 });
  const stress = runSimulation({ scenarioId: "stress", seed: 7 });
  assert.ok(stress.summary.totalLiquidations >= baseline.summary.totalLiquidations);
});
