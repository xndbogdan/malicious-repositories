import * as Slider from "@radix-ui/react-slider";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/client";
import { fmtPct, fmtUsd } from "../../lib/format";
import { useVaultStore } from "../../store/vaultStore";
import clsx from "clsx";

export function StressPanel() {
  const [ethDrop, setEthDrop] = useState(40);
  const setMetrics = useVaultStore((s) => s.setMetrics);

  const stress = useMutation({
    mutationFn: (pct: number) => api.runSimulation({ scenario: "stress", ethDrawdownPct: pct, durationDays: 30 }),
    onSuccess: async (sim) => {
      const status = await api.vaultStatus();
      setMetrics(status, sim);
    },
  });

  const baseline = useMutation({
    mutationFn: () => api.runSimulation({ scenario: "baseline" }),
    onSuccess: async (sim) => {
      const status = await api.vaultStatus();
      setMetrics(status, sim);
    },
  });

  const sim = stress.data ?? baseline.data;
  const s = sim?.summary;

  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>Custom stress test</h2>
          <p>ETH drawdown → economic simulation v2</p>
        </div>
      </div>

      <label className="field">ETH price drop</label>
      <Slider.Root className="slider-root" min={10} max={60} step={5} value={[ethDrop]} onValueChange={([v]) => setEthDrop(v)}>
        <Slider.Track className="slider-track">
          <Slider.Range className="slider-range slider-range--stress" />
        </Slider.Track>
        <Slider.Thumb className="slider-thumb" />
      </Slider.Root>
      <div className="val-display">−{ethDrop}%</div>

      <div className="btn-row">
        <button className="btn btn-primary" type="button" disabled={stress.isPending} onClick={() => stress.mutate(ethDrop)}>
          {stress.isPending ? <Loader2 className="spin" size={16} /> : null}
          Run Stress
        </button>
        <button className="btn btn-ghost" type="button" disabled={baseline.isPending} onClick={() => baseline.mutate()}>
          Reset Baseline
        </button>
      </div>

      <div className={clsx("result", s ? (s.passedStress ? "ok" : "bad") : "ok")}>
        {s ? (
          <>
            <strong>{sim?.scenario.label}</strong>
            <br />
            Solvency {fmtPct(s.solvencyRatio)} · Bad debt {fmtUsd(s.peakBadDebtUsd)} · Liq. {s.totalLiquidations} ·{" "}
            {s.passedStress ? "PASS ✓" : "FAIL ✗"}
          </>
        ) : (
          "Run stress or reset baseline — Analytics tab updates."
        )}
      </div>
    </div>
  );
}
