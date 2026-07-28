import * as Slider from "@radix-ui/react-slider";
import { ROUTER_POOLS } from "@novaremix/shared";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/client";
import { fmtUsd } from "../../lib/format";
import { useVaultStore } from "../../store/vaultStore";

export function DepositPanel() {
  const [amount, setAmount] = useState(250_000);
  const setMetrics = useVaultStore((s) => s.setMetrics);
  const [glow, setGlow] = useState<string | null>(null);

  const deposit = useMutation({
    mutationFn: () => api.playDeposit(amount),
    onMutate: () => {
      ["vault", "router", "markets"].forEach((id, i) =>
        setTimeout(() => setGlow(id), i * 400)
      );
      setTimeout(() => setGlow(null), 1400);
    },
    onSuccess: async () => {
      const [status, sim] = await Promise.all([api.vaultStatus(), api.simulationLatest()]);
      setMetrics(status, sim);
    },
  });

  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>Simulate a deposit</h2>
          <p>
            <code>novaremixVault.deposit()</code> → <code>YieldRouter.routeDeposit()</code>
          </p>
        </div>
      </div>

      <label className="field">Deposit amount (USD)</label>
      <Slider.Root
        className="slider-root"
        min={10_000}
        max={5_000_000}
        step={10_000}
        value={[amount]}
        onValueChange={([v]) => setAmount(v)}
      >
        <Slider.Track className="slider-track">
          <Slider.Range className="slider-range" />
        </Slider.Track>
        <Slider.Thumb className="slider-thumb" />
      </Slider.Root>
      <div className="val-display">{fmtUsd(amount)}</div>

      <div className="flow">
        {[
          { id: "vault", title: "Vault", sub: "mint shares" },
          { id: "router", title: "Router", sub: "split %" },
          { id: "markets", title: "Markets", sub: ROUTER_POOLS.map((p) => p.asset).join(" · ") },
        ].map((n, i, arr) => (
          <div key={n.id} className="flow-item">
            <motion.div
              className={`node ${glow === n.id ? "glow" : ""}`}
              animate={glow === n.id ? { scale: 1.04 } : { scale: 1 }}
            >
              <strong>{n.title}</strong>
              <span>{n.sub}</span>
            </motion.div>
            {i < arr.length - 1 && <ArrowRight className="arrow" size={18} />}
          </div>
        ))}
      </div>

      {deposit.data && (
        <div className="splits">
          {deposit.data.routes.map((r) => (
            <div key={r.marketId} className="split-row">
              <span>{r.asset}</span>
              <div className="split-track">
                <div className="split-fill" style={{ width: `${r.weightPct}%` }} />
              </div>
              <em>{fmtUsd(r.amountUsd)}</em>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-primary" type="button" disabled={deposit.isPending} onClick={() => deposit.mutate()}>
        {deposit.isPending ? <Loader2 className="spin" size={16} /> : null}
        Simulate Deposit
      </button>

      <div className="log">
        {(deposit.data?.steps ?? ["Adjust slider and click Simulate Deposit."]).map((s, i, arr) => (
          <p key={i} className={i === arr.length - 1 && deposit.data ? "new" : ""}>
            {s}
          </p>
        ))}
      </div>
    </div>
  );
}
