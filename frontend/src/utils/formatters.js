export function formatTimestamp(value) {
  if (!value) return "";
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  } catch {
    return String(value);
  }
}

export function severityColorClasses(severity) {
  const s = (severity || "").toLowerCase();
  if (s === "high" || s === "critical") {
    return "bg-red-500/10 text-red-300 border border-red-500/40";
  }
  if (s === "medium") {
    return "bg-amber-500/10 text-amber-300 border border-amber-500/40";
  }
  if (s === "low") {
    return "bg-sky-500/10 text-sky-300 border border-sky-500/40";
  }
  return "bg-slate-500/10 text-slate-200 border border-slate-500/30";
}

