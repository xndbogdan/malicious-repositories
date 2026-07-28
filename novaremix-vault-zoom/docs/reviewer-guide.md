# Reviewer guide — no deployment required

Senior protocol engineers evaluate **pre-mainnet** repos differently from users. You do **not** need testnet or mainnet addresses for this stage (`0.4.0-internal` · internal QA).

## What to run (5 minutes)

```bash
npm install
npm run server
```

Open **http://localhost:4000** — React protocol lab (simulation, markets, reviewer pack).

Or headless:

```bash
npm run sim
npm run sim:stress
npm run test
npm run test:contracts   # requires Foundry
```

## What we optimize for at this stage

| Signal | Where |
|--------|--------|
| Architecture clarity | `docs/architecture.md`, `docs/adr/` |
| Economic rigor | `packages/simulator/`, stress gate in sim output |
| Contract isolation model | `contracts/src/core/IsolatedMarket.sol` |
| Routing logic | `contracts/src/core/YieldRouter.sol` |
| Audit surface | `docs/audit-readiness.md`, `contracts/test/invariants/` |
| Honest lifecycle | README — audit August 2026, launch Q4 2026 |

## Deliberately not included yet

- No testnet/mainnet deployment (post-audit deliverable)
- No frontend consumer app (protocol repo, not marketing site)
- No vanity metrics — TVL in console comes from **simulation**, labeled as such

## Suggested reading order

1. `docs/adr/001-isolated-markets.md` — why isolation vs pooled risk
2. `contracts/src/core/YieldRouter.sol` — allocation model
3. `contracts/test/invariants/MarketInvariants.t.sol` — audit-prep invariants
4. `packages/simulator/src/engine/simulator.ts` — economic v2 assumptions
5. `docs/audit-readiness.md` — August sprint scope

## Questions this repo should answer

- How does contagion risk stay bounded? → per-market isolation
- How are strategy weights enforced? → `YieldRouter` + admin registration
- What happens under ETH stress? → `npm run sim:stress`
- What's left before mainnet? → external audit, deployment playbook (Q4 target)

If those check out in ~30 minutes of reading, the repo did its job — **without a chain explorer link**.
