// src/pages/Admin/Overview.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminHero from "../../components/admin/AdminHero.jsx";
import AdminLayoutSidebar from "../../components/admin/AdminLayoutSidebar.jsx";
import AdminSidebarModal from "../../components/admin/AdminSidebarModal.jsx";
import DashboardUser from "../../components/admin/DashboardUser.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const TOP_FILMS_ENDPOINT = "/api/videos/admin/leaderboard";

// ✅ helper pour /public (marche même si ton app est servie dans un sous-dossier)
const publicUrl = (p) => `${import.meta.env.BASE_URL}${p}`;

// ✅ fallback sûr (existe dans public/)
const ICON_FALLBACK = publicUrl("vite.svg");

// -----------------------
// Helpers
// -----------------------
function pickNumber(obj, keys, fallback = 0) {
  for (const k of keys) {
    const v = obj?.[k];
    if (v === 0) return 0;
    if (v != null && v !== "" && !Number.isNaN(Number(v))) return Number(v);
  }
  return fallback;
}

function pickTitle(v) {
  return v?.title || v?.title_en || v?.name || v?.video_title || "Sans titre";
}

function pickCountry(v) {
  return v?.country || v?.director_country || v?.pays || v?.country_name || "";
}

function pickCoverUrl(v) {
  const cover = v?.cover || v?.thumbnail || v?.poster || v?.cover_path;
  if (!cover) return "";
  if (String(cover).startsWith("http")) return String(cover);

  // si cover est déjà un path /uploads/...
  if (String(cover).startsWith("/uploads/")) return `${API_BASE}${cover}`;

  // sinon on suppose juste un filename
  return `${API_BASE}/uploads/covers/${cover}`;
}

function formatK(n) {
  const num = Number(n);
  if (Number.isNaN(num)) return "0";
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}

// -----------------------
// UI components
// -----------------------
function MetricCard({
  iconSrc,
  iconBgClass,
  pill,
  pillClass = "",
  value,
  label,
  subLabel,
  progress,
  progressClass = "bg-[#2F6BFF]",
  cta,
}) {
  return (
    <div
      className="
        rounded-[22px] border border-black/10 bg-white p-5
        shadow-[0_18px_60px_rgba(0,0,0,0.06)]
        dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl
        dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={[
              "grid h-10 w-10 place-items-center rounded-2xl ring-1",
              iconBgClass ||
                "bg-black/[0.03] ring-black/10 dark:bg-white/5 dark:ring-white/10",
            ].join(" ")}
          >
            {/* ✅ Ne plus masquer : fallback si l’icône ne charge pas */}
            <img
              src={iconSrc}
              alt=""
              className="h-6 w-6 object-contain"
              onError={(e) => {
                // évite boucle infinie si fallback échoue
                e.currentTarget.onerror = null;
                e.currentTarget.src = ICON_FALLBACK;
              }}
            />
          </div>

          {pill ? (
            <span
              className={[
                "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest",
                pillClass,
              ].join(" ")}
            >
              {pill}
            </span>
          ) : null}
        </div>

        {cta ? <div>{cta}</div> : null}
      </div>

      <div className="mt-5 text-[22px] font-extrabold tracking-tight text-black/90 dark:text-white/90">
        {value}
      </div>

      <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-black/45 dark:text-white/45">
        {label}
      </div>

      {subLabel ? (
        <div className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">
          {subLabel}
        </div>
      ) : null}

      {typeof progress === "number" ? (
        <div className="mt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
            <div
              className={`h-full rounded-full ${progressClass}`}
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TopFilmRow({ rank, title, likes, votes, coverUrl }) {
  return (
    <div className="flex items-center justify-between gap-4 py-5">
      <div className="flex items-center gap-4">
        <div className="w-10 text-sm font-semibold text-black/45 dark:text-white/45">
          #{rank}
        </div>

        <div className="h-11 w-11 overflow-hidden rounded-xl bg-black/10 dark:bg-white/10">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = publicUrl("cover-fallback.jpg");
              }}
            />
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
            {title}
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-black/45 dark:text-white/45">
            <span>👍 {likes}</span>
            <span>🗳️ {votes}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="
          grid h-10 w-10 place-items-center rounded-full border border-black/15 bg-white
          hover:bg-black/[0.03]
          dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10
        "
        aria-label="Play"
      >
        ▶
      </button>
    </div>
  );
}

// -----------------------
// Page
// -----------------------
export default function Overview() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function loadAll() {
    try {
      setLoading(true);
      setErr("");

      const res = await fetch(`${API_BASE}${TOP_FILMS_ENDPOINT}`, {
        headers: { Accept: "application/json" },
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur chargement data");

      const arr = Array.isArray(data?.videos)
        ? data.videos
        : Array.isArray(data)
          ? data
          : [];

      setList(arr);
    } catch (e) {
      setErr(e?.message || "Erreur");
      setList([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  const kpi = useMemo(() => {
    const arr = Array.isArray(list) ? list : [];

    const filmsEvaluated = arr.filter(
      (v) => v?.score != null && v?.score !== "",
    ).length;

    const completion =
      filmsEvaluated === 0 ? 0 : Math.min(100, (filmsEvaluated / 600) * 100);

    const countriesSet = new Set(
      arr
        .map((v) => pickCountry(v))
        .filter(Boolean)
        .map((c) => String(c).trim().toLowerCase()),
    );

    return {
      films: filmsEvaluated,
      completion: Number(completion.toFixed(1)),
      quota: "0/0",
      quotaState: "EN ATTENTE",
      countries: countriesSet.size,
      zone: countriesSet.size ? "TOP ZONE : EUROPE" : "TOP ZONE : —",
      occupancy: 0,
    };
  }, [list]);

  const topFilms = useMemo(() => {
    const arr = Array.isArray(list) ? list : [];
    return arr.slice(0, 3).map((v, idx) => {
      const likes = pickNumber(
        v,
        ["likes", "likes_count", "like_count", "upvotes"],
        0,
      );
      const votesNum = pickNumber(
        v,
        ["votes", "votes_count", "vote_count", "jury_votes"],
        0,
      );

      return {
        id: v.video_id || v.id || v.videoId || `${idx}-${Math.random()}`,
        title: pickTitle(v),
        likes: formatK(likes),
        votes: votesNum ? String(votesNum) : "—",
        coverUrl: pickCoverUrl(v),
      };
    });
  }, [list]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">

      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex gap-7">

          <div className="min-w-0 flex-1">

            <div className="mt-10">
              <div className="text-[44px] font-extrabold tracking-tight md:text-[56px]">
                VUE D'ENSEMBLE
              </div>
              <div className="mt-2 max-w-2xl text-black/55 dark:text-white/55">
                Analyse détaillée de la progression du festival et des
                indicateurs de performance.
              </div>
            </div>




          {/* gestion des roles users */}
            <section
              className="mt-6 overflow-hidden rounded-[22px] border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)]
                  dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl
                  dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
              <DashboardUser />
            </section>

            {/* KPI row */}
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                iconSrc={publicUrl("public/icons/admin/sparkles.svg")}
                iconBgClass="bg-[#EAF1FF] ring-black/10 dark:bg-white/5 dark:ring-white/10"
                pill="OBJECTIF : 600"
                pillClass="bg-[#EAF1FF] text-[#2F6BFF] dark:bg-white/5 dark:text-white/80"
                value={kpi.films}
                label="FILMS ÉVALUÉS PAR LE JURY"
                subLabel={`${kpi.completion}% COMPLÈTE`}
                progress={kpi.completion}
                progressClass="bg-[#2F6BFF]"
              />

              <MetricCard
                iconSrc={publicUrl("public/icons/admin/star.svg")}
                iconBgClass="bg-[#FFE9F4] ring-black/10 dark:bg-white/5 dark:ring-white/10"
                pill="QUOTA : 100/JURE"
                pillClass="bg-[#FFE9F4] text-[#F6339A] dark:bg-white/5 dark:text-white/80"
                value={kpi.quota}
                label="JURÉS AYANT FINALISÉ LEUR LOT"
                subLabel={kpi.quotaState}
                progress={0}
                progressClass="bg-[#F6339A]"
              />

              <MetricCard
                iconSrc={publicUrl("public/icons/admin/globe.svg")}
                iconBgClass="bg-[#EAF1FF] ring-black/10 dark:bg-white/5 dark:ring-white/10"
                value={kpi.countries}
                label="PAYS REPRÉSENTÉS"
                subLabel={kpi.zone}
              />

              <MetricCard
                iconSrc={publicUrl("public/icons/admin/ticket.svg")}
                iconBgClass="bg-[#E9FFF2] ring-black/10 dark:bg-white/5 dark:ring-white/10"
                value={`${kpi.occupancy}%`}
                label="TAUX D’OCCUPATION WORKSHOPS"
                cta={
                  <Link
                    to="/admin/events"
                    className="rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-semibold text-black/70 hover:bg-black/[0.03]
                               dark:border-white/15 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                  >
                    VOIR LES EVENEMENTS
                  </Link>
                }
              />
            </div>

            {/* Top films */}
            <div
              className="
                mt-6 overflow-hidden rounded-[22px] border border-black/10 bg-white
                shadow-[0_18px_60px_rgba(0,0,0,0.06)]
                dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl
                dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]
              "
            >
              <div className="px-6 pt-6">
                <div className="text-[16px] font-extrabold">
                  Top Films (Communauté)
                </div>
              </div>

              <div className="mt-2 divide-y divide-black/10 px-6 dark:divide-white/10">
                {loading && (
                  <div className="py-8 text-sm text-black/55 dark:text-white/55">
                    Chargement…
                  </div>
                )}

                {!loading && err && (
                  <div className="py-8 text-sm text-red-600 dark:text-red-300">
                    {err}
                  </div>
                )}

                {!loading && !err && topFilms.length === 0 && (
                  <div className="py-8 text-sm text-black/55 dark:text-white/55">
                    Aucun film trouvé.
                  </div>
                )}

                {!loading &&
                  !err &&
                  topFilms.map((f, idx) => (
                    <TopFilmRow
                      key={f.id}
                      rank={idx + 1}
                      title={f.title}
                      likes={f.likes}
                      votes={f.votes}
                      coverUrl={f.coverUrl}
                    />
                  ))}
              </div>

              <div className="px-6 pb-6 pt-4">
                <Link
                  to="/admin/leaderboard"
                  className="block w-full rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 text-center text-sm font-semibold text-black/70 hover:bg-black/[0.05]
             dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                >
                  Voir tout le classement →
                </Link>
              </div>
            </div>
            <div className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
