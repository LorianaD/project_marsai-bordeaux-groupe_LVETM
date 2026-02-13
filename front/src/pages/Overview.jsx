import { useEffect, useMemo, useState } from "react";

import AdminHero from "../components/admin/AdminHero.jsx";
import AdminLayoutSidebar from "../components/admin/AdminLayoutSidebar.jsx";
import AdminTopBar from "../components/admin/AdminTopBar.jsx";
import AdminSidebarModal from "../components/admin/AdminSidebarModal.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Overview() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [q, setQ] = useState(""); // recherche

  async function loadLeaderboard() {
    try {
      setLoading(true);
      setErr("");

      const res = await fetch(`${API_BASE}/api/videos/admin/leaderboard`, {
        headers: { Accept: "application/json" },
      });

      const data = await res.json().catch(() => null);
      if (!res.ok)
        throw new Error(data?.error || "Erreur chargement leaderboard");

      const list = Array.isArray(data?.videos)
        ? data.videos
        : Array.isArray(data)
          ? data
          : [];

      setItems(list);
    } catch (e) {
      setErr(e?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const top = useMemo(() => {
    const arr = Array.isArray(items) ? [...items] : [];
    return arr.sort((a, b) => Number(b.score ?? 0) - Number(a.score ?? 0));
  }, [items]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return top;

    return top.filter((v) => {
      const hay = [
        v.title,
        v.title_en,
        v.director_name,
        v.director_lastname,
        v.country,
        v.director_country,
        v.ai_tech,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(s);
    });
  }, [top, q]);

  const best = filtered[0] || top[0];

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <AdminSidebarModal
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="overview"
      />

      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <AdminLayoutSidebar active="overview" />

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm text-black/80 ring-1 ring-black/10 hover:bg-black/10
                           dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/10"
              >
                Menu
              </button>

              <button
                type="button"
                onClick={loadLeaderboard}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm text-black/80 ring-1 ring-black/10 hover:bg-black/10
                           dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/10"
              >
                Rafraîchir
              </button>
            </div>

            <AdminTopBar
              pageTitle="Overview"
              subtitle="Leaderboard officiel et classement des votes."
            />

            <div className="mt-5">
              <AdminHero name="Ocean" />
            </div>

            <div className="mt-8">
              <div className="text-[44px] font-extrabold tracking-tight md:text-[46px]">
                LEADERBOARD OFFICIEL
              </div>
              <div className="mt-1 text-black/50 dark:text-white/50">
                Classement des votes du jury pour la finale de Marseille.
              </div>
            </div>

            <div
              className="mt-8 overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]
                         dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-center justify-between gap-6 px-6 py-6">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F5F1FF] ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
                    <span className="text-[18px]">🏆</span>
                  </div>

                  <div>
                    <div className="text-[26px] font-extrabold leading-none">
                      {best?.score != null
                        ? Number(best.score).toFixed(1)
                        : "—"}
                      <span className="text-sm font-semibold text-black/50 dark:text-white/50">
                        /10
                      </span>
                    </div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-black/45 dark:text-white/45">
                      Meilleure note
                    </div>
                  </div>

                  <div className="ml-6 hidden md:block">
                    <div
                      className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs font-semibold text-black/70
                                    dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                    >
                      {best?.title || best?.title_en || "—"}
                    </div>
                    <div className="mt-1 text-xs text-black/45 dark:text-white/45">
                      {best
                        ? `Par ${(best.director_name || "") + " " + (best.director_lastname || "")}`.trim()
                        : ""}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={loadLeaderboard}
                  className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs text-black/70 hover:bg-black/10
                             dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10"
                >
                  Rafraîchir
                </button>
              </div>

              {/* Search */}
              <div className="px-6 pb-6">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Rechercher un film ou un réalisateur..."
                  className="w-full rounded-xl border border-black/10 bg-black/5 px-5 py-3 text-sm text-black/70 outline-none
                             dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                />
              </div>

              <div
                className="grid grid-cols-[0.4fr_1.4fr_0.7fr_0.6fr_0.7fr] gap-4 border-t border-black/10 px-6 py-3 text-xs font-semibold tracking-wider text-black/55
                           dark:border-white/10 dark:text-white/55"
              >
                <div>RANG</div>
                <div>FILM & AUTEUR</div>
                <div>PAYS</div>
                <div>MOYENNE</div>
                <div className="text-right">OUTILS IA</div>
              </div>

              <div className="divide-y divide-black/10 dark:divide-white/10">
                {loading && (
                  <div className="px-6 py-8 text-sm text-black/60 dark:text-white/60">
                    Chargement…
                  </div>
                )}

                {!loading && err && (
                  <div className="px-6 py-8 text-sm text-red-600 dark:text-red-300">
                    {err}
                  </div>
                )}

                {!loading && !err && filtered.length === 0 && (
                  <div className="px-6 py-10 text-sm text-black/50 dark:text-white/50">
                    Aucun résultat.
                  </div>
                )}

                {!loading &&
                  !err &&
                  filtered.map((v, idx) => {
                    const title = v.title || v.title_en || "Sans titre";
                    const author =
                      `${v.director_name || ""} ${v.director_lastname || ""}`.trim() ||
                      "—";
                    const country = v.country || v.director_country || "—";

                    const coverUrl = v.cover
                      ? `${API_BASE}/uploads/covers/${v.cover}`
                      : "";

                    return (
                      <div
                        key={v.video_id || v.id || idx}
                        className="grid grid-cols-[0.4fr_1.4fr_0.7fr_0.6fr_0.7fr] gap-4 px-6 py-5"
                      >
                        <div className="self-center text-sm text-black/55 dark:text-white/55">
                          {idx + 1}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="h-12 w-16 overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/10">
                            {coverUrl ? (
                              <img
                                src={coverUrl}
                                alt=""
                                className="h-full w-full object-cover"
                                onError={(e) =>
                                  (e.currentTarget.style.display = "none")
                                }
                              />
                            ) : null}
                          </div>

                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
                              {title}
                            </div>
                            <div className="mt-1 text-xs text-black/45 dark:text-white/45">
                              {author}
                            </div>
                          </div>
                        </div>

                        <div className="self-center text-sm text-black/70 dark:text-white/70">
                          {country}
                        </div>

                        <div className="self-center text-sm font-semibold text-black/80 dark:text-white/80">
                          {v.score != null ? Number(v.score).toFixed(1) : "—"}
                        </div>

                        <div className="self-center text-right">
                          <div className="inline-flex flex-col gap-2">
                            {String(v.ai_tech || "")
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean)
                              .slice(0, 2)
                              .map((tool) => (
                                <span
                                  key={tool}
                                  className="inline-flex justify-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-black/70
                                           dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                                >
                                  {tool}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="pointer-events-none h-14 bg-gradient-to-t from-black/5 to-transparent dark:from-black/55" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
