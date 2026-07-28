# ADR 002: Yield router as allocation layer

**Status:** Accepted · v0.4 internal QA  
**Date:** June 2026

## Context

Vault deposits must flow into multiple yield sources (Aave, Curve, native Arbitrum strategies, reserve) with explicit weights — not hard-coded in the vault.

## Decision

`YieldRouter` sits between `novaremixVault` and `IsolatedMarket` instances:

- Admin registers `(marketId, market, weightBps)`
- `routeDeposit` slices deposits by weight
- `weightedApyBps()` exposes blended rate for monitoring/sim alignment

Vault stays ERC-4626-style entry; router owns allocation logic.

## Consequences

**Pros**

- Upgrade routing without migrating user shares
- Weights tunable pre-mainnet from sim outputs
- Clear reentrancy / access-control boundary for audit

**Cons**

- Extra hop vs direct market deposit
- Requires one-time `setRouter` wiring at deploy (factory planned post-audit)

## Alignment with simulation v2

Router weights in `@novaremix/shared` (`STRATEGIES_V2`) mirror on-chain intent — sim and contracts share the same economic story.

## Verification

- `contracts/test/novaremixVault.t.sol` — router weight totals
- Console `/v1/markets` — live config JSON
