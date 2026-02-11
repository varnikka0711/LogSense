import React from "react";
import EventCard from "./EventCard.jsx";

function EventList({ events, isLoading, onSelect }) {
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-slate-800 bg-background-muted/60">
        <p className="text-sm text-slate-400">Loading events…</p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-background-muted/40">
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-slate-200">No events yet</p>
          <p className="text-xs text-slate-500 max-w-xs">
            Upload a Windows Event Viewer export to see suspicious logons, policy changes, and more
            appear here in real time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-2xl border border-slate-800 bg-background-muted/60 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
          Events · {events.length}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto logsense-scroll p-3 space-y-2.5">
        {events.map((evt) => (
          <EventCard key={evt.id || `${evt.timestamp}-${evt.title}`} event={evt} onClick={onSelect} />
        ))}
      </div>
    </div>
  );
}

export default EventList;

