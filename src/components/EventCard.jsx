import React from "react";
import { formatTimestamp, severityColorClasses } from "../utils/formatters.js";

function EventCard({ event, onClick }) {
  const { id, title, timestamp, severity, ip, user } = event;

  return (
    <button
      type="button"
      onClick={() => onClick?.(event)}
      className="w-full text-left rounded-2xl border border-slate-800/80 bg-background-muted/80 hover:border-accent/60 hover:bg-slate-900/80 transition shadow-soft px-4 py-3 flex flex-col gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide " +
              severityColorClasses(severity)
            }
          >
            {severity || "Unknown"}
          </span>
          <p className="text-sm font-medium text-slate-100 line-clamp-1">{title || id}</p>
        </div>
        <p className="text-[11px] text-slate-400 whitespace-nowrap">
          {formatTimestamp(timestamp)}
        </p>
      </div>
      {(ip || user) && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
          {ip && (
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400/70" />
              <span className="uppercase tracking-wide text-slate-500">IP</span>
              <span className="text-slate-200">{ip}</span>
            </span>
          )}
          {user && (
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
              <span className="uppercase tracking-wide text-slate-500">User</span>
              <span className="text-slate-200">{user}</span>
            </span>
          )}
        </div>
      )}
    </button>
  );
}

export default EventCard;

