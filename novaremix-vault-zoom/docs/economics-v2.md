# Economic Simulation v2

The simulator models **isolated lending + yield router** dynamics aligned with Zendarox Vault market parameters.

## Scenarios

| ID | Description | Use case |
|----|-------------|----------|
| `baseline` | 90-day Q3 2026 growth | Default dashboard metrics |
| `stress` | ETH −40% / 30-day shock | Pre-audit stress gate |

## Parameters (v2)

Markets: WETH (82% CF), USDC (90% CF), WBTC (75% CF)

Router weights: Aave 35% · Curve 25% · Uniswap 20% · Arbitrum 15% · Reserve 5%

## Stress gate

Simulation **passes** when:

- Peak bad debt / TVL < 2.5%
- Solvency ratio > 97%

Run:

```bash
npm run sim
npm run sim:stress
```

Output JSON saved to `packages/simulator/output/`.
