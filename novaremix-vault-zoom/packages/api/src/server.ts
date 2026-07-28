import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import net from "node:net";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PROTOCOL, MARKETS_V2, STRATEGIES_V2 } from "@novaremix/shared";
import { runSimulation } from "@novaremix/simulator";
import type { SimulationReport, VaultStatus } from "@novaremix/shared";
import { simulateDeposit, checkBorrowHealth } from "./playground.js";

const apiRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const consoleDist = join(apiRoot, "..", "console", "dist");

let latestReport: SimulationReport | null = null;

const CONTRACT_MAP = [
  { path: "contracts/src/core/novaremixVault.sol", role: "ERC-4626 entry vault · share accounting" },
  { path: "contracts/src/core/IsolatedMarket.sol", role: "Per-asset lending · isolation boundary" },
  { path: "contracts/src/core/YieldRouter.sol", role: "Weighted strategy allocation" },
  { path: "contracts/src/governance/PauseGuardian.sol", role: "Circuit breaker ownership" },
  { path: "contracts/src/oracle/ChainlinkAdapter.sol", role: "Oracle staleness guard" },
  { path: "contracts/test/invariants/MarketInvariants.t.sol", role: "Audit-prep invariant harness" },
];

const READING_ORDER = [
  { file: "docs/adr/001-isolated-markets.md", reason: "Why isolation vs pooled risk" },
  { file: "contracts/src/core/YieldRouter.sol", reason: "Allocation logic senior devs care about" },
  { file: "packages/simulator/src/engine/simulator.ts", reason: "Economic v2 assumptions" },
  { file: "docs/audit-readiness.md", reason: "August sprint scope" },
  { file: "docs/reviewer-guide.md", reason: "Full review path without deploy" },
];

function vaultStatus(): VaultStatus {
  const snap = latestReport?.snapshots.at(-1);
  return {
    version: PROTOCOL.version,
    stage: PROTOCOL.stage,
    chain: "ethereum",
    markets: MARKETS_V2.length,
    tvlUsd: snap?.tvlUsd ?? 18_400_000,
    utilization: snap?.utilization ?? 0.68,
    supplyApyBps: snap?.supplyApyBps ?? 540,
    borrowApyBps: snap?.borrowApyBps ?? 720,
    paused: false,
    routerStrategies: STRATEGIES_V2.length,
    lastSimulation: latestReport?.generatedAt ?? null,
  };
}

export async function buildServer() {
  const app = Fastify({ logger: true });
  await app.register(cors, { origin: process.env.API_CORS_ORIGIN ?? true });

  app.get("/health", async () => ({
    ok: true,
    protocol: PROTOCOL.name,
    version: PROTOCOL.version,
    stage: PROTOCOL.stage,
    deployment: "none — internal QA; review via code + simulation",
    uptime: process.uptime(),
  }));

  app.get("/v1/vault/status", async () => ({
    ...vaultStatus(),
    dataSource: "economic-simulation-v2",
    note: "Not on-chain TVL — pre-audit internal QA",
  }));

  app.get("/v1/markets", async () => ({
    model: "v2",
    markets: MARKETS_V2,
    router: { strategies: STRATEGIES_V2 },
  }));

  app.get("/v1/contracts", async () => ({ contracts: CONTRACT_MAP }));

  app.get("/v1/review", async () => ({
    stage: PROTOCOL.stage,
    version: PROTOCOL.version,
    auditSprint: PROTOCOL.auditSprint,
    launchTarget: PROTOCOL.launchTarget,
    deploymentPolicy: "No testnet/mainnet in v0.4 — audit-first",
    contracts: CONTRACT_MAP,
    readingOrder: READING_ORDER,
    commands: ["npm run server", "npm run test:contracts"],
  }));

  app.get("/v1/roadmap", async () => ({
    activePhase: "May – Jul 2026 · novaremix Vault",
    contractVersion: PROTOCOL.version,
    auditSprint: PROTOCOL.auditSprint,
    launchTarget: PROTOCOL.launchTarget,
    milestones: [
      "Isolated lending markets + yield router",
      "Production contracts in internal QA",
      "Economic simulation v2 live",
      "August audit sprint booked",
    ],
  }));

  app.get("/v1/simulation/latest", async () => {
    if (!latestReport) latestReport = runSimulation({ scenarioId: "baseline" });
    return latestReport;
  });

  app.post<{ Body: { scenario?: string; ethDrawdownPct?: number; durationDays?: number } }>(
    "/v1/simulation/run",
    async (req) => {
      const scenarioId = req.body?.scenario === "stress" ? "stress" : "baseline";
      latestReport = runSimulation({
        scenarioId,
        ethDrawdownPct: req.body?.ethDrawdownPct,
        durationDays: req.body?.durationDays,
        seed: scenarioId === "stress" ? 7 : 42,
      });
      return latestReport;
    }
  );

  app.post<{ Body: { amountUsd?: number } }>("/v1/play/deposit", async (req) => {
    const amount = Number(req.body?.amountUsd ?? 100_000);
    return simulateDeposit(amount);
  });

  app.post<{ Body: { marketId?: string; collateralUsd?: number; debtUsd?: number } }>(
    "/v1/play/borrow",
    async (req) => {
      return checkBorrowHealth(
        req.body?.marketId ?? "eth-core",
        Number(req.body?.collateralUsd ?? 0),
        Number(req.body?.debtUsd ?? 0)
      );
    }
  );

  app.get("/console", async (_req, reply) => reply.redirect("/"));

  await app.register(fastifyStatic, {
    root: consoleDist,
    prefix: "/",
  });

  app.setNotFoundHandler((req, reply) => {
    if (req.url.startsWith("/v1/") || req.url === "/health") {
      return reply.code(404).send({ error: "not found" });
    }
    return reply.sendFile("index.html");
  });

  return app;
}

function findOpenPort(start: number, attempts = 20): Promise<number> {
  return new Promise((resolve, reject) => {
    const probe = (port: number, left: number) => {
      if (left <= 0) {
        reject(new Error(`Ports ${start}–${start + attempts - 1} in use. Run: npm run stop`));
        return;
      }
      const s = net.createServer();
      s.once("error", () => {
        s.close();
        probe(port + 1, left - 1);
      });
      s.listen(port, "0.0.0.0", () => {
        s.close(() => resolve(port));
      });
    };
    probe(start, attempts);
  });
}

async function main() {
  latestReport = runSimulation({ scenarioId: "baseline" });
  const app = await buildServer();
  const port = await findOpenPort(Number(process.env.PORT ?? 4000));
  await app.listen({ port, host: "0.0.0.0" });
  console.log("\n  ╔══════════════════════════════════════════╗");
  console.log("  ║  novaremix Vault — Protocol Dashboard     ║");
  console.log("  ╚══════════════════════════════════════════╝");
  console.log(`\n  →  http://localhost:${port}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
