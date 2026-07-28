# ADR 001: Isolated lending markets

**Status:** Accepted · v0.4 internal QA  
**Date:** May 2026

## Context

Zendarox Vault combines lending with a yield router. Pooled cross-asset lending concentrates tail risk — one bad asset can impair the entire pool.

## Decision

Each asset gets its own `IsolatedMarket` contract:

- Independent `totalSupply` / `totalBorrow`
- Per-market collateral factor, liquidation threshold, reserve factor
- No cross-asset collateral netting

## Consequences

**Pros**

- Contagion bounded to a single market
- Cleaner audit units (market-level invariants)
- Aligns with institutional client requirements we see in RFPs

**Cons**

- Capital efficiency lower than shared pools
- Router must explicitly allocate across markets

## Alternatives considered

| Option | Rejected because |
|--------|------------------|
| Single pooled market | Audit + risk profile too coarse for v1 launch |
| Full Compound-style comptroller | Over-scope for Q4 2026 target; client builds cover this pattern |

## Verification (no deploy required)

- `contracts/test/invariants/MarketInvariants.t.sol`
- `npm run sim:stress` — bad debt / TVL gate
