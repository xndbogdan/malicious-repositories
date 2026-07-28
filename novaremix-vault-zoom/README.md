# Novaremix Vault

Isolated lending + yield router · v0.4 internal QA

## Run everything (one command)

```bash
npm install
npm run server
```

Open **http://localhost:4000**

That single command:

1. Frees ports 4000–4005  
2. Builds all packages (contracts stack + simulator + React console + API)  
3. Runs baseline + stress economic simulations  
4. Starts the dashboard server  

**Stop:** `Ctrl+C` or `npm run stop`

Windows: double-click **`START.bat`**

---

## Project layout

```
novaremix-vault/
├── contracts/          Foundry — NovaremixVault, IsolatedMarket, YieldRouter
├── packages/
│   ├── shared/         Types, market config, scenarios
│   ├── simulator/      Economic simulation v2
│   ├── console/        React UI (see package.json for full UI stack)
│   └── api/            Fastify server — serves console + /v1 API
├── scripts/
│   └── server.mjs      ← npm run server
└── docs/               ADRs, reviewer guide, audit prep
```

## Console UI (`packages/console`)

React dashboard with **Radix UI**, **Recharts**, **TanStack Query**, **Zustand**, **Framer Motion**, **Lucide** — see `packages/console/package.json` for the full dependency list.

| Tab | Purpose |
|-----|---------|
| Try It | Deposit routing · borrow health · ETH stress |
| Analytics | Metrics · Recharts curves · run summary |
| Markets | Live markets + router strategies |
| Review | Senior reviewer pack · contracts · roadmap |
| Learn | Architecture guide |

## Other commands

| Command | When |
|---------|------|
| `npm run build` | Build only (no server) |
| `npm run verify` | CI-style node verify |
| `npm run test` | Simulator tests |
| `npm run test:contracts` | Foundry (after `npm run setup`) |
| `npm run setup` | Install Foundry deps |

**Novaremix** · San Francisco · Remote worldwide
