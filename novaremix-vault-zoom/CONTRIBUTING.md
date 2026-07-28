# Contributing

Thanks for reviewing Novaremix Vault. We optimize for senior engineers who want to **run first, read second**.

## Setup

```bash
npm install
npm run doctor
npm run sim
```

## Pull request expectations

1. **Solidity** — include Foundry tests; no unchecked external calls without justification
2. **TypeScript** — strict mode; no `any`
3. **Docs** — update `docs/` if behavior or API changes
4. **Scope** — one concern per PR (contract fix vs sim tweak vs API route)

## Commit style

```
feat(router): add rebalance event indexing
fix(market): liquidation bonus overflow
chore(sim): tune stress ETH drawdown to 42%
```

## Questions

hello@novaremix.com · Internal contributors: #vault-dev
