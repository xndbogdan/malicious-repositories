import { MARKETS_V2, ROUTER_POOLS } from "@novaremix/shared";

const fmt = (n: number) =>
  "$" + n.toLocaleString(undefined, { maximumFractionDigits: 0 });

export interface DepositSimulation {
  depositUsd: number;
  sharesMinted: number;
  routes: Array<{
    id: string;
    asset: string;
    weightBps: number;
    weightPct: number;
    amountUsd: number;
  }>;
  steps: string[];
}

export function simulateDeposit(amountUsd: number): DepositSimulation {
  const amount = Math.max(0, Math.round(amountUsd));
  const totalW = ROUTER_POOLS.reduce((a, p) => a + p.weightBps, 0);
  const routes = ROUTER_POOLS.map((p) => {
    const slice = Math.round((amount * p.weightBps) / totalW);
    return {
      id: p.id,
      asset: p.asset,
      weightBps: p.weightBps,
      weightPct: p.weightBps / 100,
      amountUsd: slice,
    };
  });

  const steps = [
    `You deposit ${fmt(amount)} into novaremix Vault.`,
    `Vault mints ${fmt(amount)} zdrVault shares (1:1 at first deposit).`,
    `YieldRouter.routeDeposit() splits capital by weight:`,
    ...routes.map(
      (r) => `  → ${fmt(r.amountUsd)} (${r.weightPct}%) into ${r.asset} IsolatedMarket`
    ),
    `Each market is isolated — ${routes.map((r) => r.asset).join(" problems don't hit ")} separately.`,
  ];

  return { depositUsd: amount, sharesMinted: amount, routes, steps };
}

export interface BorrowHealthResult {
  marketId: string;
  asset: string;
  collateralUsd: number;
  debtUsd: number;
  maxBorrowUsd: number;
  liquidationAtUsd: number;
  canBorrow: boolean;
  liquidatable: boolean;
  healthFactor: number;
  status: "healthy" | "borrow-limit" | "liquidatable";
  plainEnglish: string;
  steps: string[];
}

export function checkBorrowHealth(
  marketId: string,
  collateralUsd: number,
  debtUsd: number
): BorrowHealthResult {
  const market = MARKETS_V2.find((m) => m.id === marketId) ?? MARKETS_V2[0];
  const col = Math.max(0, collateralUsd);
  const debt = Math.max(0, debtUsd);
  const maxBorrow = col * market.collateralFactor;
  const liqLine = col * market.liquidationThreshold;
  const canBorrow = debt <= maxBorrow || debt === 0;
  const liquidatable = debt > liqLine && debt > 0;
  const healthFactor = debt > 0 ? liqLine / debt : 999;

  let status: BorrowHealthResult["status"] = "healthy";
  if (liquidatable) status = "liquidatable";
  else if (!canBorrow) status = "borrow-limit";

  const steps = [
    `Market: ${market.asset} (${market.id}) — isolated pool`,
    `Your collateral: ${fmt(col)} · Debt: ${fmt(debt)}`,
    `Max borrow at ${(market.collateralFactor * 100).toFixed(0)}% collateral factor: ${fmt(maxBorrow)}`,
    `Liquidation line at ${(market.liquidationThreshold * 100).toFixed(0)}% threshold: ${fmt(liqLine)}`,
    liquidatable
      ? "⚠ Position is underwater — eligible for liquidation."
      : canBorrow
        ? "✓ Position is healthy — within borrow limits."
        : "✗ Debt exceeds collateral factor — cannot borrow more.",
  ];

  const plainEnglish = steps[steps.length - 1];

  return {
    marketId: market.id,
    asset: market.asset,
    collateralUsd: col,
    debtUsd: debt,
    maxBorrowUsd: Math.round(maxBorrow),
    liquidationAtUsd: Math.round(liqLine),
    canBorrow,
    liquidatable,
    healthFactor: Math.round(healthFactor * 100) / 100,
    status,
    plainEnglish,
    steps,
  };
}
