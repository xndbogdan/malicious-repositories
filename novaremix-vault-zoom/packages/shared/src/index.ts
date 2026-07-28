/** novaremix Vault — shared domain types (v0.4 internal QA) */

export const PROTOCOL = {
  name: "novaremix Vault",
  version: "0.4.0-internal",
  stage: "internal-qa" as const,
  auditSprint: "2026-08",
  launchTarget: "2026-Q4",
  chains: ["ethereum", "arbitrum"] as const,
};

export type ChainId = (typeof PROTOCOL.chains)[number];

export interface MarketConfig {
  id: string;
  asset: string;
  collateralFactor: number;
  liquidationThreshold: number;
  liquidationBonus: number;
  reserveFactor: number;
  maxUtilization: number;
}

export interface StrategyAllocation {
  id: string;
  name: string;
  weightBps: number;
  baseApyBps: number;
  riskTier: "low" | "medium" | "high";
}

export interface SimulationScenario {
  id: string;
  label: string;
  durationDays: number;
  ethDrawdownPct: number;
  depositGrowthPct: number;
  borrowDemandMultiplier: number;
}

export interface SimulationSnapshot {
  day: number;
  tvlUsd: number;
  utilization: number;
  supplyApyBps: number;
  borrowApyBps: number;
  liquidations: number;
  badDebtUsd: number;
  routerYieldBps: number;
}

export interface SimulationReport {
  model: "v2";
  scenario: SimulationScenario;
  markets: MarketConfig[];
  strategies: StrategyAllocation[];
  snapshots: SimulationSnapshot[];
  summary: {
    avgUtilization: number;
    peakBadDebtUsd: number;
    totalLiquidations: number;
    netApyBps: number;
    solvencyRatio: number;
    passedStress: boolean;
  };
  generatedAt: string;
}

export interface VaultStatus {
  version: string;
  stage: string;
  chain: ChainId;
  markets: number;
  tvlUsd: number;
  utilization: number;
  supplyApyBps: number;
  borrowApyBps: number;
  paused: boolean;
  routerStrategies: number;
  lastSimulation: string | null;
}

export const MARKETS_V2: MarketConfig[] = [
  {
    id: "eth-core",
    asset: "WETH",
    collateralFactor: 0.82,
    liquidationThreshold: 0.86,
    liquidationBonus: 0.05,
    reserveFactor: 0.12,
    maxUtilization: 0.92,
  },
  {
    id: "usdc-stable",
    asset: "USDC",
    collateralFactor: 0.9,
    liquidationThreshold: 0.93,
    liquidationBonus: 0.04,
    reserveFactor: 0.1,
    maxUtilization: 0.88,
  },
  {
    id: "wbtc-satellite",
    asset: "WBTC",
    collateralFactor: 0.75,
    liquidationThreshold: 0.8,
    liquidationBonus: 0.07,
    reserveFactor: 0.15,
    maxUtilization: 0.85,
  },
];

export const STRATEGIES_V2: StrategyAllocation[] = [
  { id: "aave-core", name: "Aave v3 Core", weightBps: 3500, baseApyBps: 420, riskTier: "low" },
  { id: "curve-stables", name: "Curve stables", weightBps: 2500, baseApyBps: 510, riskTier: "low" },
  { id: "uniswap-eth", name: "Uniswap v3 ETH/USDC", weightBps: 2000, baseApyBps: 680, riskTier: "medium" },
  { id: "arb-yield", name: "Arbitrum native yield", weightBps: 1500, baseApyBps: 740, riskTier: "medium" },
  { id: "reserve", name: "Idle reserve", weightBps: 500, baseApyBps: 0, riskTier: "low" },
];

export const ROUTER_POOLS = [
  { id: "eth-core", asset: "WETH", weightBps: 6000 },
  { id: "usdc-stable", asset: "USDC", weightBps: 4000 },
];

export const SCENARIOS: Record<string, SimulationScenario> = {
  baseline: {
    id: "baseline",
    label: "Baseline Q3 2026",
    durationDays: 90,
    ethDrawdownPct: 18,
    depositGrowthPct: 12,
    borrowDemandMultiplier: 1.0,
  },
  stress: {
    id: "stress",
    label: "ETH -40% stress",
    durationDays: 30,
    ethDrawdownPct: 40,
    depositGrowthPct: -8,
    borrowDemandMultiplier: 1.35,
  },
};
