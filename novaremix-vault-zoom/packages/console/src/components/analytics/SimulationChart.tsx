import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useVaultStore } from "../../store/vaultStore";
import { fmtUsd } from "../../lib/format";

export function SimulationChart() {
  const sim = useVaultStore((s) => s.simulation);

  if (!sim?.snapshots.length) {
    return (
      <div className="panel">
        <p className="dim">Run a simulation in Try It to see charts.</p>
      </div>
    );
  }

  const data = sim.snapshots.map((s) => ({
    day: s.day,
    tvl: s.tvlUsd,
    util: +(s.utilization * 100).toFixed(1),
    badDebt: s.badDebtUsd,
  }));

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Simulation curves</h2>
        <span className="chart-label">{sim.scenario.label}</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={data}>
          <CartesianGrid stroke="rgba(148,163,184,0.12)" />
          <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} label={{ value: "Day", fill: "#64748b", fontSize: 11 }} />
          <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => fmtUsd(v)} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: "#0f172a", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 8 }}
            labelStyle={{ color: "#f1f5f9" }}
          />
          <Legend />
          <Area yAxisId="left" type="monotone" dataKey="tvl" name="TVL" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" />
          <Line yAxisId="right" type="monotone" dataKey="util" name="Util %" stroke="#818cf8" dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="badDebt" name="Bad debt" stroke="#f87171" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
