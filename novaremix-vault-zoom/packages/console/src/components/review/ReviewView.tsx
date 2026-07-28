import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";

export function ReviewView() {
  const review = useQuery({ queryKey: ["review"], queryFn: api.review });
  const contracts = useQuery({ queryKey: ["contracts"], queryFn: api.contracts });
  const roadmap = useQuery({ queryKey: ["roadmap"], queryFn: api.roadmap });

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <h2>Senior reviewer pack</h2>
          <p>{review.data?.deploymentPolicy ?? "Loading…"}</p>
        </div>
        {review.data && (
          <>
            <div className="meta-grid">
              <div className="meta-chip"><span>Version</span><strong>{review.data.version}</strong></div>
              <div className="meta-chip"><span>Stage</span><strong>{review.data.stage}</strong></div>
              <div className="meta-chip"><span>Audit</span><strong>{review.data.auditSprint}</strong></div>
              <div className="meta-chip"><span>Launch</span><strong>{review.data.launchTarget}</strong></div>
            </div>
            <h3 className="subhead">Reading order</h3>
            <div className="reading-list">
              {review.data.readingOrder.map((r, i) => (
                <div key={r.file} className="reading-row">
                  <span className="reading-idx">{i + 1}</span>
                  <div>
                    <code>{r.file}</code>
                    <p>{r.reason}</p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="subhead">Commands</h3>
            <div className="cmd-list">
              {review.data.commands.map((c) => (
                <code key={c} className="cmd">{c}</code>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Contract map</h2>
          <p>Trace these paths first</p>
        </div>
        <div className="contract-list">
          {(contracts.data?.contracts ?? []).map((c) => (
            <div key={c.path} className="contract-row">
              <code>{c.path}</code>
              <p>{c.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>{roadmap.data?.activePhase ?? "Roadmap"}</h2>
          <p>
            {roadmap.data &&
              `Contract ${roadmap.data.contractVersion} · Audit ${roadmap.data.auditSprint} · Launch ${roadmap.data.launchTarget}`}
          </p>
        </div>
        <ul className="roadmap-list">
          {(roadmap.data?.milestones ?? []).map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
