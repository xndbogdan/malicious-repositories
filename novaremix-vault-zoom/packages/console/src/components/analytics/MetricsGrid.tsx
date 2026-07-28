import { useVaultStore } from "../../store/vaultStore";
import { fmtApy, fmtPct, fmtUsd } from "../../lib/format";
import clsx from "clsx";

const METRICS = [
  { key: "tvl", label: "TVL", fmt: (v: number) => fmtUsd(v) },
  { key: "util", label: "Utilization", fmt: (v: number) => fmtPct(v) },
  { key: "supply", label: "Supply APY", fmt: (v: number) => fmtApy(v) },
  { key: "borrow", label: "Borrow APY", fmt: (v: number) => fmtApy(v) },
  { key: "markets", label: "Markets", fmt: (v: number) => String(v) },
] as const;

export function MetricsGrid() {
  const status = useVaultStore((s) => s.status);
  const sim = useVaultStore((s) => s.simulation);

  if (!status) return <p className="dim">Loading metrics…</p>;

  const values: Record<string, string> = {
    tvl: fmtUsd(status.tvlUsd),
    util: fmtPct(status.utilization),
    supply: fmtApy(status.supplyApyBps),
    borrow: fmtApy(status.borrowApyBps),
    markets: String(status.markets),
  };

  return (
    <section className="metrics">
      {METRICS.map((m) => (
        <div key={m.key} className="metric">
          <label>{m.label}</label>
          <div className="val">{values[m.key]}</div>
        </div>
      ))}
      <div className="metric">
        <label>Stress gate</label>
        <div className={clsx("val", sim?.summary.passedStress ? "pass" : "fail")}>
          {sim ? (sim.summary.passedStress ? "PASS" : "FAIL") : "—"}
        </div>
      </div>
    </section>
  );
}
