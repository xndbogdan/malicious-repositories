import { Activity, Shield } from "lucide-react";
import { useVaultStore } from "../../store/vaultStore";

export function TopBar() {
  const health = useVaultStore((s) => s.health);
  const status = useVaultStore((s) => s.status);

  return (
    <header className="topbar">
      <div className="brand">
        <div className="logo">C</div>
        <div>
          <h1>novaremix Vault</h1>
          <p>Protocol Lab · React console · simulation-backed</p>
        </div>
      </div>
      <div className="topbar__meta">
        {status && <span className="version-chip">{status.version}</span>}
        <span className={`live ${health?.ok ? "live--ok" : "live--warn"}`}>
          <Activity size={14} />
          {health?.ok ? "API live" : "Connecting…"}
        </span>
        <span className="stage-chip">
          <Shield size={14} />
          internal QA
        </span>
      </div>
    </header>
  );
}
