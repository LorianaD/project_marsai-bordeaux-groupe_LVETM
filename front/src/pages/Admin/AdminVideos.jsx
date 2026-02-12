import { useEffect, useMemo, useState } from "react";
import StatusPill from "../../components/admin/StatusPill";
import FeaturedToggle from "../../components/admin/FeaturedToggle";
import AdminHero from "../../components/admin/AdminHero.jsx";
import AdminLayoutSidebar from "../../components/admin/AdminLayoutSidebar.jsx";
import AdminSidebarModal from "../../components/admin/AdminSidebarModal.jsx";

import {
  getAdminVideos,
  patchAdminVideoFeatured,
  patchAdminVideoStatus,
} from "../../services/Videos/adminVideosApi";

const STATUS_OPTIONS = [
  "All",
  "Pending",
  "Published",
  "Rejected",
  "Uploading",
  "Processing",
  "Failed",
];

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function refresh() {
    try {
      setLoading(true);
      setError("");
      const data = await getAdminVideos();
      setVideos(Array.isArray(data?.videos) ? data.videos : []);
    } catch (e) {
      setError(e?.message || "Erreur chargement");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return videos
      .filter((v) => {
        if (statusFilter === "All") return true;
        return String(v.upload_status) === statusFilter;
      })
      .filter((v) => {
        if (!s) return true;
        const hay = [
          v.title,
          v.title_en,
          v.director_name,
          v.director_lastname,
          v.country,
          v.language,
          v.email,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(s);
      });
  }, [videos, q, statusFilter]);

  async function onChangeStatus(id, upload_status) {
    const prev = videos;
    setBusyId(id);
    setVideos((arr) =>
      arr.map((v) => (v.id === id ? { ...v, upload_status } : v)),
    );

    try {
      await patchAdminVideoStatus(id, upload_status);
    } catch (e) {
      setVideos(prev);
      alert(e?.message || "Impossible de changer le statut");
    } finally {
      setBusyId(null);
    }
  }

  async function onToggleFeatured(id, next) {
    const prev = videos;
    setBusyId(id);
    setVideos((arr) =>
      arr.map((v) => (v.id === id ? { ...v, featured: next ? 1 : 0 } : v)),
    );

    try {
      await patchAdminVideoFeatured(id, next);
    } catch (e) {
      setVideos(prev);
      alert(e?.message || "Impossible de modifier la mise en avant");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <AdminSidebarModal
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="gestion-films"
      />

      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <AdminLayoutSidebar active="gestion-films" />

          {/* CONTENT */}
          <div className="min-w-0 flex-1">
            {/* Mobile top actions */}
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm text-black/80 ring-1 ring-black/10 hover:bg-black/10
                           dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/10"
              >
                ☰ Menu
              </button>

              <button
                onClick={refresh}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm text-black/80 ring-1 ring-black/10 hover:bg-black/10
                           dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/10"
              >
                Rafraîchir
              </button>
            </div>

            {/* HERO */}
            <div className="min-w-0">
              <AdminHero name="Ocean" />
            </div>

            {/* Title */}
            <div className="mt-10">
              <div className="text-[44px] font-extrabold tracking-tight md:text-[46px]">
                FILMS SOUMIS
              </div>
              <div className="mt-1 text-black/50 dark:text-white/50">
                Gérez l&apos;intégralité des soumissions et gérez les mises en
                avant.
              </div>
            </div>

            {/* ✅ Table Card (FIX DARK) */}
            <div
              className="mt-8 overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]
                         dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
            >
              {/* Top bar */}
              <div className="flex flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#2F6BFF]/15 ring-1 ring-[#2F6BFF]/25">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 7h16M4 12h10M4 17h16"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>

                  <div className="text-sm font-semibold">Gestion films</div>

                  <button
                    onClick={refresh}
                    className="ml-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs text-black/70 hover:bg-black/10
                               dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/8"
                  >
                    Rafraîchir
                  </button>
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  {/* Search */}
                  <div className="relative w-full md:w-[520px]">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Rechercher (titre, réal, pays, langue, email)…"
                      className="w-full rounded-full border border-black/10 bg-transparent px-5 py-3 text-sm text-black placeholder:text-black/40 outline-none
                                 focus:border-black/20
                                 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35 dark:focus:border-white/20"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/45 dark:text-white/45">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 21l-4.3-4.3m1.3-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Status filter */}
                  <div className="w-full rounded-full border border-black/10 bg-black/0 px-3 py-2 md:w-auto dark:border-white/10 dark:bg-white/5">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full bg-transparent text-sm text-black/70 outline-none md:w-auto dark:text-white/80"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-white text-black dark:bg-black dark:text-white"
                        >
                          {s === "All" ? "Tous" : s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Table header */}
              <div
                className="grid grid-cols-[1.4fr_0.8fr_0.45fr_0.7fr_0.45fr_0.6fr] gap-4 border-t border-black/10 px-6 py-3 text-xs font-semibold tracking-wider text-black/55
                              dark:border-white/10 dark:text-white/55"
              >
                <div>FILM</div>
                <div>RÉALISATEUR</div>
                <div>DURÉE</div>
                <div>STATUT</div>
                <div>FEATURED</div>
                <div className="text-right">DATE</div>
              </div>

              {/* Body */}
              <div className="divide-y divide-black/10 dark:divide-white/10">
                {loading && (
                  <div className="px-6 py-6 text-sm text-black/60 dark:text-white/60">
                    Chargement…
                  </div>
                )}

                {!loading && error && (
                  <div className="px-6 py-6 text-sm text-red-600 dark:text-red-300">
                    {error}
                  </div>
                )}

                {!loading && !error && filtered.length === 0 && (
                  <div className="px-6 py-8 text-sm text-black/50 dark:text-white/50">
                    Aucun film trouvé.
                  </div>
                )}

                {!loading &&
                  !error &&
                  filtered.map((v) => (
                    <div
                      key={v.id}
                      className="grid grid-cols-[1.4fr_0.8fr_0.45fr_0.7fr_0.45fr_0.6fr] gap-4 px-6 py-4"
                    >
                      {/* FILM */}
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/10">
                          <img
                            src={
                              v.cover
                                ? `${import.meta.env.VITE_API_URL || ""}/uploads/covers/${v.cover}`
                                : ""
                            }
                            alt={v.title || ""}
                            className="h-full w-full object-cover"
                            onError={(e) =>
                              (e.currentTarget.style.display = "none")
                            }
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
                            {v.title || "Sans titre"}
                          </div>
                          <div className="mt-0.5 text-xs text-black/45 dark:text-white/45">
                            {(v.language || "—") + " • " + (v.country || "—")}
                          </div>
                        </div>
                      </div>

                      {/* REAL */}
                      <div className="self-center text-sm text-black/75 dark:text-white/75">
                        {[v.director_name, v.director_lastname]
                          .filter(Boolean)
                          .join(" ") || "—"}
                      </div>

                      {/* DUREE */}
                      <div className="self-center text-sm text-black/60 dark:text-white/60">
                        {formatDuration(v.duration)}
                      </div>

                      {/* STATUT */}
                      <div className="self-center">
                        <div className="flex items-center gap-3">
                          <StatusPill status={v.upload_status} />

                          <select
                            value={v.upload_status || "Pending"}
                            disabled={busyId === v.id}
                            onChange={(e) =>
                              onChangeStatus(v.id, e.target.value)
                            }
                            className="rounded-full border border-black/10 bg-black/5 px-3 py-2 text-xs text-black/80 outline-none disabled:opacity-50
                                       dark:border-white/10 dark:bg-white/5 dark:text-white/80"
                            title="Changer le statut"
                          >
                            {[
                              "Pending",
                              "Published",
                              "Rejected",
                              "Uploading",
                              "Processing",
                              "Failed",
                            ].map((s) => (
                              <option
                                key={s}
                                value={s}
                                className="bg-white text-black dark:bg-black dark:text-white"
                              >
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* FEATURED */}
                      <div className="self-center">
                        <FeaturedToggle
                          value={Number(v.featured) === 1}
                          disabled={busyId === v.id}
                          onChange={(next) => onToggleFeatured(v.id, next)}
                        />
                      </div>

                      {/* DATE */}
                      <div className="self-center text-right text-sm text-black/55 dark:text-white/55">
                        {formatDate(v.created_at)}
                      </div>
                    </div>
                  ))}
              </div>

              {/* ✅ bottom fade (FIX DARK) */}
              <div className="pointer-events-none h-14 bg-gradient-to-t from-black/5 to-transparent dark:from-black/55" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDuration(seconds) {
  const s = Number(seconds);
  if (!Number.isFinite(s) || s <= 0) return "—";
  const minutes = Math.round(s / 60);
  return `${minutes} min`;
}

function formatDate(value) {
  if (!value) return "—";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return String(value);
  return dt.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}
