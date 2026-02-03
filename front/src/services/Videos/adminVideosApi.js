const API = import.meta.env.VITE_API_URL || ""; // ex: http://localhost:3000

export async function getAdminVideos() {
  const r = await fetch(`${API}/api/videos/admin`, {
    headers: { Accept: "application/json" },
  });
  if (!r.ok) throw new Error(`GET /api/videos/admin -> ${r.status}`);
  return r.json(); // { videos: [...] }
}

export async function patchAdminVideoStatus(id, upload_status) {
  const r = await fetch(`${API}/api/videos/admin/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ upload_status }),
  });
  if (!r.ok)
    throw new Error(`PATCH /api/videos/admin/${id}/status -> ${r.status}`);
  return r.json();
}

export async function patchAdminVideoFeatured(id, featured) {
  const r = await fetch(`${API}/api/videos/admin/${id}/featured`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ featured }),
  });
  if (!r.ok)
    throw new Error(`PATCH /api/videos/admin/${id}/featured -> ${r.status}`);
  return r.json();
}
