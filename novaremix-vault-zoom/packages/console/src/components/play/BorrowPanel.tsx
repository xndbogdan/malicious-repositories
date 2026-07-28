import * as Select from "@radix-ui/react-select";
import { MARKETS_V2 } from "@novaremix/shared";
import { ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/client";
import clsx from "clsx";

export function BorrowPanel() {
  const [marketId, setMarketId] = useState(MARKETS_V2[0].id);
  const [collateral, setCollateral] = useState(100_000);
  const [debt, setDebt] = useState(75_000);

  const borrow = useMutation({
    mutationFn: () => api.playBorrow({ marketId, collateralUsd: collateral, debtUsd: debt }),
  });

  const d = borrow.data;
  const statusClass = d?.status === "healthy" ? "ok" : d?.status === "liquidatable" ? "bad" : "warn";

  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>Check borrow health</h2>
          <p>Isolated market rules — same math as <code>IsolatedMarket.sol</code></p>
        </div>
      </div>

      <label className="field">Market</label>
      <Select.Root value={marketId} onValueChange={setMarketId}>
        <Select.Trigger className="select-trigger">
          <Select.Value />
          <Select.Icon>
            <ChevronDown size={16} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="select-content">
            {MARKETS_V2.map((m) => (
              <Select.Item key={m.id} value={m.id} className="select-item">
                <Select.ItemText>
                  {m.asset} · {m.id}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <label className="field">Collateral (USD)</label>
      <input type="number" value={collateral} onChange={(e) => setCollateral(Number(e.target.value))} />

      <label className="field">Current debt (USD)</label>
      <input type="number" value={debt} onChange={(e) => setDebt(Number(e.target.value))} />

      <button className="btn btn-primary" type="button" disabled={borrow.isPending} onClick={() => borrow.mutate()}>
        {borrow.isPending ? <Loader2 className="spin" size={16} /> : null}
        Check Position
      </button>

      {d && (
        <div className={clsx("result", statusClass)}>
          <strong>{d.asset}</strong> · Health {d.healthFactor}
          <br />
          {d.plainEnglish}
          <br />
          <br />
          {d.steps.join(" · ")}
        </div>
      )}
    </div>
  );
}
