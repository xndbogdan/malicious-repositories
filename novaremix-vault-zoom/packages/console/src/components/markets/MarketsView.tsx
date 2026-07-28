import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import { fmtPct, fmtBpsWeight } from "../../lib/format";
import clsx from "clsx";

export function MarketsView() {
  const { data, isLoading, error } = useQuery({ queryKey: ["markets"], queryFn: api.markets });

  if (isLoading) return <p className="dim">Loading markets…</p>;
  if (error) return <div className="result bad">{String(error)}</div>;
  if (!data) return null;

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <h2>Isolated markets</h2>
          <p>Live from <code>/v1/markets</code> — borrow checker + simulator config</p>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Market</th>
              <th>Coll. factor</th>
              <th>Liq. threshold</th>
              <th>Liq. bonus</th>
              <th>Max util</th>
            </tr>
          </thead>
          <tbody>
            {data.markets.map((m) => (
              <tr key={m.id}>
                <td>
                  <strong>{m.asset}</strong>
                  <span className="dim">{m.id}</span>
                </td>
                <td>{fmtPct(m.collateralFactor)}</td>
                <td>{fmtPct(m.liquidationThreshold)}</td>
                <td>{fmtPct(m.liquidationBonus)}</td>
                <td>{fmtPct(m.maxUtilization)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Yield router strategies</h2>
          <p>External yield in economic sim — separate from deposit playground pools (WETH/USDC)</p>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Weight</th>
              <th>Base APY</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {data.router.strategies.map((s) => (
              <tr key={s.id}>
                <td>
                  <strong>{s.name}</strong>
                  <span className="dim">{s.id}</span>
                </td>
                <td>{fmtBpsWeight(s.weightBps)}</td>
                <td>{fmtApyFromBps(s.baseApyBps)}</td>
                <td>
                  <span className={clsx("risk", `risk--${s.riskTier}`)}>{s.riskTier}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function fmtApyFromBps(bps: number) {
  return (bps / 100).toFixed(2) + "%";
}
