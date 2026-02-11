import React, { useState } from "react";
import { uploadLogs } from "../services/api.js";

function UploadBox({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Choose a log export file first.");
      return;
    }
    setIsUploading(true);
    setError("");
    try {
      await uploadLogs(file);
      setFile(null);
      if (onUploadSuccess) {
        await onUploadSuccess();
      }
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-background-muted/80 shadow-soft px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg md:text-xl font-semibold tracking-tight">
          LogSense · Windows Event Insights
        </h1>
        <p className="text-sm text-slate-400 max-w-xl">
          Upload exported Windows Event Viewer logs. LogSense will surface human-readable security
          events ready for a live demo.
        </p>
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <label className="relative inline-flex items-center justify-center rounded-xl border border-dashed border-slate-700 bg-background-subtle/80 px-3 py-2 text-xs md:text-sm text-slate-300 cursor-pointer hover:border-accent/70 hover:bg-slate-900/60 transition">
          <span className="truncate max-w-[180px]">
            {file ? file.name : "Choose .evtx or exported log file"}
          </span>
          <input
            type="file"
            accept=".evtx,.xml,.txt,.log,.json"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-accent px-4 py-2 text-xs md:text-sm font-medium text-slate-950 shadow-sm hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {isUploading ? "Uploading…" : "Upload & Parse"}
        </button>
      </div>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

export default UploadBox;

