import React from "react";
import { formatTimestamp, severityColorClasses } from "../utils/formatters.js";

function EventModal({ event, onClose }) {
  if (!event) return null;

  const { title, timestamp, severity, ip, user, description, why_it_matters, remediation, raw } =
    event;

  const rawLines = Array.isArray(raw) ? raw : typeof raw === "string" ? raw.split("\n") : [];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-800 bg-background-muted/95 shadow-soft max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-start justify-between border-b border-slate-800 px-5 py-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide " +
                  severityColorClasses(severity)
                }
              >
                {severity || "Unknown"}
              </span>
              <p className="text-[11px] text-slate-400">{formatTimestamp(timestamp)}</p>
            </div>
            <h2 className="text-base md:text-lg font-semibold text-slate-50">
              {title || "Event details"}
            </h2>
            {(ip || user) && (
              <div className="flex flex-wrap gap-3 text-[11px] text-slate-400">
                {ip && (
                  <span>
                    <span className="uppercase text-slate-500 mr-1">IP</span>
                    <span className="text-slate-200">{ip}</span>
                  </span>
                )}
                {user && (
                  <span>
                    <span className="uppercase text-slate-500 mr-1">User</span>
                    <span className="text-slate-200">{user}</span>
                  </span>
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800/80 hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition"
          >
            <span className="sr-only">Close</span>
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto logsense-scroll px-5 py-4 space-y-4 text-sm">
          {description && (
            <section className="space-y-1.5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Description
              </h3>
              <p className="text-sm leading-relaxed text-slate-200">{description}</p>
            </section>
          )}

          {why_it_matters && (
            <section className="space-y-1.5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Why it matters
              </h3>
              <p className="text-sm leading-relaxed text-slate-200">{why_it_matters}</p>
            </section>
          )}

          {remediation && (
            <section className="space-y-1.5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Suggested remediation
              </h3>
              <p className="text-sm leading-relaxed text-slate-200">{remediation}</p>
            </section>
          )}

          {rawLines.length > 0 && (
            <section className="space-y-1.5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Raw log lines
              </h3>
              <div className="rounded-2xl border border-slate-800 bg-black/40 p-3 text-[11px] font-mono text-slate-300 overflow-x-auto">
                {rawLines.map((line, idx) => (
                  <div key={idx} className="whitespace-pre">
                    {line}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="border-t border-slate-800 px-5 py-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-100 hover:bg-slate-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventModal;

