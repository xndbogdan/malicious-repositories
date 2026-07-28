# Audit Readiness — August 2026 Sprint

## Scope

| Component | Priority | Notes |
|-----------|----------|-------|
| `ZendaroxVault` | P0 | Share mint/burn, pause path |
| `IsolatedMarket` | P0 | Borrow health, liquidation |
| `YieldRouter` | P0 | Weight invariants, reentrancy |
| `ChainlinkAdapter` | P1 | Staleness, negative price |
| `PauseGuardian` | P1 | Access control |

## Invariants (Foundry)

```bash
npm run test:contracts
```

- `totalBorrow <= totalSupply` (always)
- `utilization <= 100%`
- Fuzz: deposit/withdraw roundtrip on vault

## Remediation policy

100% critical/high remediation before sign-off — matches Zendarox studio policy on client audits.

## Pre-audit artifacts

- [ ] Slither report
- [ ] Fuzz run logs (4096+ runs CI profile)
- [ ] Economic stress output (`npm run sim:stress`)
- [ ] Deployment diff vs v0.3
