const CARDS = [
  { title: "Vault", body: "Deposit USDC/ETH → zdrVault shares. Entry point for LPs.", code: "contracts/src/core/novaremixVault.sol" },
  { title: "Router", body: "Weighted split into isolated markets. Admin-configured caps.", code: "contracts/src/core/YieldRouter.sol" },
  { title: "Isolation", body: "WETH stress does not auto-drain USDC pool.", code: "docs/adr/001-isolated-markets.md" },
  { title: "Markets vs strategies", body: "Deposit playground → WETH/USDC pools. Sim also models external yield — see Markets tab.", code: "packages/shared/src/index.ts" },
  { title: "Simulation", body: "30–90 day stress before audit. Numbers here are simulated, not on-chain TVL.", code: "packages/simulator/src/engine/simulator.ts" },
  { title: "One command", body: "npm install && npm run server — builds contracts stack, runs sim, serves dashboard.", code: "scripts/server.mjs" },
  { title: "UI stack", body: "React · Radix · Recharts · TanStack Query · Zustand · Framer Motion · Lucide", code: "packages/console/package.json" },
  { title: "Review path", body: "Try It → break something → Review tab → npm run test:contracts after npm run setup", code: "docs/reviewer-guide.md" },
];

export function LearnView() {
  return (
    <div className="learn-grid">
      {CARDS.map((c) => (
        <div key={c.title} className="learn-card">
          <h3>{c.title}</h3>
          <p>{c.body}</p>
          <code>{c.code}</code>
        </div>
      ))}
    </div>
  );
}
