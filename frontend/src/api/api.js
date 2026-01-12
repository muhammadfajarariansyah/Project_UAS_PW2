const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/* =======================KELAS======================= */

export async function fetchKelas() {
  const res = await fetch(`${API_BASE}/api/kelas`);
  if (!res.ok) throw new Error("Gagal memuat data kelas");
  return res.json();
}

export async function getKelas(id) {
  const res = await fetch(`${API_BASE}/api/kelas/${id}`);
  if (!res.ok) throw new Error("Gagal memuat detail kelas");
  return res.json();
}

export async function createKelas(payload) {
  const res = await fetch(`${API_BASE}/api/kelas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Gagal menambah kelas");
  return data;
}

export async function updateKelas(id, payload) {
  const res = await fetch(`${API_BASE}/api/kelas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Gagal update kelas");
  return data;
}

export async function deleteKelas(id) {
  const res = await fetch(`${API_BASE}/api/kelas/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Gagal menghapus kelas");
  return true;
}

/* =======================PARTICIPANTS======================= */

export async function fetchParticipants() {
  const res = await fetch(`${API_BASE}/api/participants`);
  if (!res.ok) throw new Error("Gagal memuat data peserta");
  return res.json();
}

export async function getParticipant(id) {
  const res = await fetch(`${API_BASE}/api/participants/${id}`);
  if (!res.ok) throw new Error("Gagal memuat detail peserta");
  return res.json();
}

export async function createParticipant(payload) {
  const res = await fetch(`${API_BASE}/api/participants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Gagal menambah peserta");
  return data;
}

export async function updateParticipant(id, payload) {
  const res = await fetch(`${API_BASE}/api/participants/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Gagal update peserta");
  return data;
}

export async function deleteParticipant(id) {
  const res = await fetch(`${API_BASE}/api/participants/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Gagal menghapus peserta");
  return true;
}
