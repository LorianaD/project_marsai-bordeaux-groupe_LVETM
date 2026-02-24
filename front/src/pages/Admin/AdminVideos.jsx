import { useEffect, useMemo, useState } from "react";
import StatusPill from "../../components/admin/StatusPill";
import FeaturedToggle from "../../components/admin/FeaturedToggle";

import {
  getAdminVideos,
  patchAdminVideoFeatured,
  patchAdminVideoStatus,
} from "../../services/Videos/adminVideosApi";
import BtnLogout from "../../components/Buttons/BtnLogout";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        {/* Title */}
        <div className="flex justify-between items-center">
          <div className="mt-8">
            <h2 className="text-[44px] font-extrabold tracking-tight md:text-[46px]">
              FILMS SOUMIS
            </h2>
            <p className="mt-1 text-black/50 dark:text-white/50">
              Gérez l&apos;intégralité des soumissions et gérez les mises en
              avant.
            </p>
          </div>
          <BtnLogout/>
        </div>

        {/* Card */}
        <div
          className="mt-8 overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]
                     dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
        >
          {/* ✅ Scroll horizontal sur TOUT (top bar + table) */}
          <div className="overflow-x-auto">
            <div className="min-w-[1100px]">
              {/* Top bar */}
              <div className="flex items-center justify-between gap-4 px-6 py-5">
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

                {/* Right controls */}
                <div className="flex items-center gap-4">
                  {/* Search */}
                  <div className="relative w-[520px]">
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

                  {/* Filter */}
                  <div className="shrink-0 rounded-full border border-black/10 bg-black/0 px-3 py-2 dark:border-white/10 dark:bg-white/5">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-transparent text-sm text-black/70 outline-none dark:text-white/80"
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

              {/* Table */}
              <div className="border-t border-black/10 dark:border-white/10">
                <table className="w-full table-fixed">
                  <colgroup>
                    <col style={{ width: "31.11%" }} />
                    <col style={{ width: "17.78%" }} />
                    <col style={{ width: "10.00%" }} />
                    <col style={{ width: "15.56%" }} />
                    <col style={{ width: "10.00%" }} />
                    <col style={{ width: "15.56%" }} />
                  </colgroup>

                  <thead>
                    <tr className="text-xs font-semibold tracking-wider text-black/55 dark:text-white/55">
                      <th className="pl-6 pr-4 py-3 text-left">FILM</th>
                      <th className="pr-4 py-3 text-left">RÉALISATEUR</th>
                      <th className="pr-4 py-3 text-left">DURÉE</th>
                      <th className="pr-4 py-3 text-left">STATUT</th>
                      <th className="pr-4 py-3 text-left">FEATURED</th>
                      <th className="pr-6 py-3 text-right">DATE</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading && (
                      <tr className="border-t border-black/10 dark:border-white/10">
                        <td
                          colSpan={6}
                          className="px-6 py-6 text-sm text-black/60 dark:text-white/60"
                        >
                          Chargement…
                        </td>
                      </tr>
                    )}

                    {!loading && error && (
                      <tr className="border-t border-black/10 dark:border-white/10">
                        <td
                          colSpan={6}
                          className="px-6 py-6 text-sm text-red-600 dark:text-red-300"
                        >
                          {error}
                        </td>
                      </tr>
                    )}

                    {!loading && !error && filtered.length === 0 && (
                      <tr className="border-t border-black/10 dark:border-white/10">
                        <td
                          colSpan={6}
                          className="px-6 py-8 text-sm text-black/50 dark:text-white/50"
                        >
                          Aucun film trouvé.
                        </td>
                      </tr>
                    )}

                    {!loading &&
                      !error &&
                      filtered.map((v) => (
                        <tr
                          key={v.id}
                          className="border-t border-black/10 dark:border-white/10"
                        >
                          {/* FILM */}
                          <td className="pl-6 pr-4 py-4 align-middle">
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
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              </div>

                              <div className="min-w-0">
                                <div className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
                                  {v.title || "Sans titre"}
                                </div>
                                <div className="mt-0.5 text-xs text-black/45 dark:text-white/45">
                                  {(v.language || "—") +
                                    " • " +
                                    (v.country || "—")}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* REAL */}
                          <td className="pr-4 py-4 align-middle text-sm text-black/75 dark:text-white/75">
                            {[v.director_name, v.director_lastname]
                              .filter(Boolean)
                              .join(" ") || "—"}
                          </td>

                          {/* DUREE */}
                          <td className="pr-4 py-4 align-middle text-sm text-black/60 dark:text-white/60 whitespace-nowrap">
                            {formatDuration(v.duration)}
                          </td>

                          {/* STATUT */}
                          <td className="pr-4 py-4 align-middle">
                            <div className="flex flex-wrap items-center gap-3">
                              <div className="shrink-0">
                                <StatusPill status={v.upload_status} />
                              </div>

                              <select
                                value={v.upload_status || "Pending"}
                                disabled={busyId === v.id}
                                onChange={(e) =>
                                  onChangeStatus(v.id, e.target.value)
                                }
                                className="min-w-[140px] shrink-0 rounded-full border border-black/10 bg-black/5 px-3 py-2 text-xs text-black/80 outline-none disabled:opacity-50
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
                          </td>

                          {/* FEATURED */}
                          <td className="pr-4 py-4 align-middle">
                            <FeaturedToggle
                              value={Number(v.featured) === 1}
                              disabled={busyId === v.id}
                              onChange={(next) => onToggleFeatured(v.id, next)}
                            />
                          </td>

                          {/* DATE */}
                          <td className="pr-6 py-4 align-middle text-right text-sm text-black/55 dark:text-white/55 whitespace-nowrap">
                            {formatDate(v.created_at)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* bottom fade */}
          <div className="pointer-events-none h-14 bg-gradient-to-t from-black/5 to-transparent dark:from-black/55" />
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
