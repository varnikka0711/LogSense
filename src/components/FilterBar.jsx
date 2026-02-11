import React, { useState, useEffect } from "react";

const severityOptions = [
  { label: "Any severity", value: "" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" }
];

const typeOptions = [
  { label: "Any type", value: "" },
  { label: "Logon / Logoff", value: "logon" },
  { label: "Policy / Audit", value: "policy" },
  { label: "Process / Execution", value: "process" },
  { label: "Other", value: "other" }
];

function FilterBar({ initialFilters, onApply, onClear, isLoading }) {
  const [severity, setSeverity] = useState("");
  const [type, setType] = useState("");
  const [ip, setIp] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!initialFilters) return;
    setSeverity(initialFilters.severity || "");
    setType(initialFilters.type || "");
    setIp(initialFilters.ip || "");
    setUser(initialFilters.user || "");
  }, [initialFilters]);

  const handleApply = () => {
    onApply?.({
      severity,
      type,
      ip: ip.trim(),
      user: user.trim()
    });
  };

  const handleClear = () => {
    setSeverity("");
    setType("");
    setIp("");
    setUser("");
    onClear?.();
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-background-muted/70 shadow-soft p-4 space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400 mb-1">
          Filters
        </p>
        <p className="text-xs text-slate-500">
          Narrow down detections by severity, type, IP, or user to tell a focused story during your
          demo.
        </p>
      </div>
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-300">Severity</label>
          <select
            className="w-full rounded-xl border border-slate-800 bg-background-subtle/90 px-3 py-2 text-xs text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            {severityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-300">Event type</label>
          <select
            className="w-full rounded-xl border border-slate-800 bg-background-subtle/90 px-3 py-2 text-xs text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-300">IP address</label>
          <input
            type="text"
            placeholder="e.g. 10.0.0.5"
            className="w-full rounded-xl border border-slate-800 bg-background-subtle/90 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-300">User</label>
          <input
            type="text"
            placeholder="e.g. administrator"
            className="w-full rounded-xl border border-slate-800 bg-background-subtle/90 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={handleApply}
          disabled={isLoading}
          className="flex-1 inline-flex items-center justify-center rounded-xl bg-accent px-3 py-2 text-xs font-medium text-slate-950 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          Apply filters
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default FilterBar;

