import type {
  MarketConfig,
  SimulationReport,
  SimulationScenario,
  SimulationSnapshot,
  StrategyAllocation,
} from "@novaremix/shared";
import { MARKETS_V2, SCENARIOS, STRATEGIES_V2 } from "@novaremix/shared";

const BASE_TVL = 18_400_000;

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function utilizationCurve(u: number, maxU: number): number {
  const x = clamp(u / maxU, 0.05, 1);
  return 0.02 + Math.pow(x, 2.2) * 0.14;
}

function routerYield(strategies: StrategyAllocation[], stress: number): number {
  const weighted = strategies.reduce((acc, s) => {
    const stressPenalty = s.riskTier === "high" ? stress * 0.35 : stress * 0.15;
    return acc + (s.weightBps / 10_000) * Math.max(0, s.baseApyBps - stressPenalty * 100);
  }, 0);
  return Math.round(weighted);
}

export interface RunOptions {
  scenarioId?: keyof typeof SCENARIOS;
  seed?: number;
  ethDrawdownPct?: number;
  durationDays?: number;
  depositGrowthPct?: number;
}

export function runSimulation(options: RunOptions = {}): SimulationReport {
  const base = SCENARIOS[options.scenarioId ?? "baseline"] ?? SCENARIOS.baseline;
  const scenario: SimulationScenario = {
    ...base,
    id: options.ethDrawdownPct != null ? "custom" : base.id,
    label: options.ethDrawdownPct != null ? `Custom ETH −${options.ethDrawdownPct}%` : base.label,
    ethDrawdownPct: options.ethDrawdownPct ?? base.ethDrawdownPct,
    durationDays: options.durationDays ?? base.durationDays,
    depositGrowthPct: options.depositGrowthPct ?? base.depositGrowthPct,
  };
  const markets = MARKETS_V2;
  const strategies = STRATEGIES_V2;
  const rng = mulberry32(options.seed ?? 42);

  let tvl = BASE_TVL;
  let utilization = 0.68;
  let liquidations = 0;
  let badDebt = 0;
  const snapshots: SimulationSnapshot[] = [];

  for (let day = 1; day <= scenario.durationDays; day++) {
    const progress = day / scenario.durationDays;
    const ethShock = 1 - (scenario.ethDrawdownPct / 100) * progress;
    const depositDelta = 1 + (scenario.depositGrowthPct / 100) * (progress / 90);
    tvl = tvl * depositDelta * (0.998 + rng() * 0.006);

    const borrowPressure = scenario.borrowDemandMultiplier * (1.1 - ethShock * 0.25);
    utilization = clamp(utilization * (0.992 + rng() * 0.018) * borrowPressure, 0.35, 0.91);

    const primary = markets[0];
    const borrowApyBps = Math.round(utilizationCurve(utilization, primary.maxUtilization) * 10_000);
    const supplyApyBps = Math.round(borrowApyBps * utilization * (1 - primary.reserveFactor));
    const routerBps = routerYield(strategies, 1 - ethShock);

    const liqProb = clamp((utilization - 0.78) * 0.04 + (1 - ethShock) * 0.12, 0, 0.35);
    const dayLiq = rng() < liqProb ? Math.floor(1 + rng() * 4) : 0;
    liquidations += dayLiq;
    badDebt += dayLiq * (800 + rng() * 2400) * (1 - ethShock);

    snapshots.push({
      day,
      tvlUsd: Math.round(tvl),
      utilization: round4(utilization),
      supplyApyBps: supplyApyBps + Math.round(routerBps * 0.35),
      borrowApyBps,
      liquidations: dayLiq,
      badDebtUsd: Math.round(badDebt),
      routerYieldBps: routerBps,
    });
  }

  const avgUtil =
    snapshots.reduce((a, s) => a + s.utilization, 0) / snapshots.length;
  const peakBad = Math.max(...snapshots.map((s) => s.badDebtUsd));
  const netApy = snapshots.at(-1)!.supplyApyBps;
  const solvency = 1 - peakBad / tvl;

  return {
    model: "v2",
    scenario,
    markets,
    strategies,
    snapshots,
    summary: {
      avgUtilization: round4(avgUtil),
      peakBadDebtUsd: peakBad,
      totalLiquidations: liquidations,
      netApyBps: netApy,
      solvencyRatio: round4(solvency),
      passedStress: peakBad / tvl < 0.025 && solvency > 0.97,
    },
    generatedAt: new Date().toISOString(),
  };
}

function round4(n: number): number {
  return Math.round(n * 10_000) / 10_000;
}

function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function formatReport(report: SimulationReport): string {
  const s = report.summary;
  const lines = [
    "",
    "  novaremix Vault — Economic Simulation v2",
    "  ─────────────────────────────────────────",
    `  Scenario     ${report.scenario.label}`,
    `  Duration     ${report.scenario.durationDays} days`,
    `  Markets      ${report.markets.length} isolated · Router ${report.strategies.length} strategies`,
    "",
    "  Summary",
    `    Avg utilization   ${(s.avgUtilization * 100).toFixed(1)}%`,
    `    Net supply APY    ${(s.netApyBps / 100).toFixed(2)}%`,
    `    Liquidations      ${s.totalLiquidations}`,
    `    Peak bad debt     $${s.peakBadDebtUsd.toLocaleString()}`,
    `    Solvency ratio    ${(s.solvencyRatio * 100).toFixed(2)}%`,
    `    Stress gate       ${s.passedStress ? "PASS ✓" : "FAIL ✗"}`,
    "",
    `  Generated ${report.generatedAt}`,
    "",
  ];
  return lines.join("\n");
}
