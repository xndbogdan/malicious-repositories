import { format } from "date-fns";
import { useVaultStore } from "../../store/vaultStore";
import { fmtApy, fmtPct, fmtUsd } from "../../lib/format";
import clsx from "clsx";

export function SimulationSummary() {
  const sim = useVaultStore((s) => s.simulation);
  if (!sim) return null;

  const s = sim.summary;
  const stats = [
    ["Avg utilization", fmtPct(s.avgUtilization)],
    ["Peak bad debt", fmtUsd(s.peakBadDebtUsd)],
    ["Liquidations", String(s.totalLiquidations)],
    ["Net APY", fmtApy(s.netApyBps)],
    ["Solvency", fmtPct(s.solvencyRatio)],
    ["Stress gate", s.passedStress ? "PASS" : "FAIL"],
  ] as const;

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Run summary</h2>
        <p>{sim.scenario.label}</p>
      </div>
      <div className="summary-grid">
        {stats.map(([label, val]) => (
          <div key={label} className="summary-stat">
            <span>{label}</span>
            <strong className={clsx(label === "Stress gate" && (s.passedStress ? "pass" : "fail"))}>{val}</strong>
          </div>
        ))}
      </div>
      <p className="dim">Generated {format(new Date(sim.generatedAt), "PPpp")}</p>
    </div>
  );
}
