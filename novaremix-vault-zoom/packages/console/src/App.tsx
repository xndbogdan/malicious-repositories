import { useEffect } from "react";
import { api } from "./api/client";
import { AppProviders } from "./providers/AppProviders";
import { TopBar } from "./components/layout/TopBar";
import { TabShell } from "./components/layout/TabShell";
import { DepositPanel } from "./components/play/DepositPanel";
import { BorrowPanel } from "./components/play/BorrowPanel";
import { StressPanel } from "./components/play/StressPanel";
import { MetricsGrid } from "./components/analytics/MetricsGrid";
import { SimulationChart } from "./components/analytics/SimulationChart";
import { SimulationSummary } from "./components/analytics/SimulationSummary";
import { MarketsView } from "./components/markets/MarketsView";
import { ReviewView } from "./components/review/ReviewView";
import { LearnView } from "./components/learn/LearnView";
import { useVaultStore } from "./store/vaultStore";

function Boot() {
  const setHealth = useVaultStore((s) => s.setHealth);
  const setMetrics = useVaultStore((s) => s.setMetrics);

  useEffect(() => {
    void (async () => {
      try {
        setHealth(await api.health());
        const [status, sim] = await Promise.all([api.vaultStatus(), api.simulationLatest()]);
        setMetrics(status, sim);
      } catch {
        /* server not up yet */
      }
    })();
  }, [setHealth, setMetrics]);

  return (
    <>
      <div className="ambient" />
      <div className="shell">
        <TopBar />
        <div className="hint">
          👋 One command runs everything: <code>npm run server</code> — Try deposits, stress tests, or open Review for senior onboarding.
        </div>
        <TabShell
          play={
            <>
              <DepositPanel />
              <div className="grid2">
                <BorrowPanel />
                <StressPanel />
              </div>
            </>
          }
          analytics={
            <>
              <MetricsGrid />
              <SimulationChart />
              <SimulationSummary />
            </>
          }
          markets={<MarketsView />}
          review={<ReviewView />}
          learn={<LearnView />}
        />
        <footer className="footer">novaremix · v0.4 · @novaremix/console</footer>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AppProviders>
      <Boot />
    </AppProviders>
  );
}
