const BASE_URL = "";

export async function uploadLogs(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/api/logs/upload`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    const message = await safeErrorMessage(res);
    throw new Error(message || "Failed to upload logs");
  }

  return res.json();
}

export async function getEvents() {
  const res = await fetch(`${BASE_URL}/api/events`);

  if (!res.ok) {
    const message = await safeErrorMessage(res);
    throw new Error(message || "Failed to fetch events");
  }

  return res.json();
}

export async function filterEvents(params) {
  const query = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const qs = query.toString();
  const url = qs ? `${BASE_URL}/api/events/filter?${qs}` : `${BASE_URL}/api/events/filter`;

  const res = await fetch(url);

  if (!res.ok) {
    const message = await safeErrorMessage(res);
    throw new Error(message || "Failed to filter events");
  }

  return res.json();
}

async function safeErrorMessage(res) {
  try {
    const data = await res.json();
    if (data && typeof data.detail === "string") {
      return data.detail;
    }
    if (data && typeof data.message === "string") {
      return data.message;
    }
  } catch {
    // ignore
  }
  return res.statusText;
}

