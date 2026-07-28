import ky from "ky";
import type {
  MarketConfig,
  SimulationReport,
  StrategyAllocation,
  VaultStatus,
} from "@novaremix/shared";

const http = ky.create({ prefixUrl: location.origin });

export interface HealthResponse {
  ok: boolean;
  protocol: string;
  version: string;
  stage: string;
  deployment: string;
  uptime: number;
}

export interface VaultStatusResponse extends VaultStatus {
  dataSource: string;
  note: string;
}

export interface MarketsResponse {
  model: string;
  markets: MarketConfig[];
  router: { strategies: StrategyAllocation[] };
}

export interface ReviewResponse {
  stage: string;
  version: string;
  auditSprint: string;
  launchTarget: string;
  deploymentPolicy: string;
  contracts: { path: string; role: string }[];
  readingOrder: { file: string; reason: string }[];
  commands: string[];
}

export interface RoadmapResponse {
  activePhase: string;
  contractVersion: string;
  auditSprint: string;
  launchTarget: string;
  milestones: string[];
}

export interface DepositPlayResponse {
  amountUsd: number;
  routes: { asset: string; marketId: string; weightPct: number; amountUsd: number }[];
  steps: string[];
}

export interface BorrowPlayResponse {
  marketId: string;
  asset: string;
  healthFactor: string;
  status: "healthy" | "warning" | "liquidatable";
  plainEnglish: string;
  steps: string[];
}

export const api = {
  health: () => http.get("health").json<HealthResponse>(),
  vaultStatus: () => http.get("v1/vault/status").json<VaultStatusResponse>(),
  markets: () => http.get("v1/markets").json<MarketsResponse>(),
  review: () => http.get("v1/review").json<ReviewResponse>(),
  roadmap: () => http.get("v1/roadmap").json<RoadmapResponse>(),
  contracts: () => http.get("v1/contracts").json<{ contracts: { path: string; role: string }[] }>(),
  simulationLatest: () => http.get("v1/simulation/latest").json<SimulationReport>(),
  runSimulation: (body: { scenario?: string; ethDrawdownPct?: number; durationDays?: number }) =>
    http.post("v1/simulation/run", { json: body }).json<SimulationReport>(),
  playDeposit: (amountUsd: number) =>
    http.post("v1/play/deposit", { json: { amountUsd } }).json<DepositPlayResponse>(),
  playBorrow: (body: { marketId: string; collateralUsd: number; debtUsd: number }) =>
    http.post("v1/play/borrow", { json: body }).json<BorrowPlayResponse>(),
};
