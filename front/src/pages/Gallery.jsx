import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import VideoCard from "../components/Videos/VideoCard.jsx";
import SectionHero from "../components/Gallery/SectionHero.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const PAGE_SIZE = 20;

// Dates festival (heure locale)
const FESTIVAL_START = new Date(2026, 10, 2, 0, 0, 0); // 02 nov 2026
const FESTIVAL_END = new Date(2026, 10, 30, 23, 59, 59); // 30 nov 2026

function pad2(n) {
  return String(n).padStart(2, "0");
}

function diffParts(ms) {
  const total = Math.max(0, ms);
  const sec = Math.floor(total / 1000);

  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  return { days, hours, minutes, seconds };
}

function CountdownHero() {
  const { t, i18n } = useTranslation("gallery");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { phase, target, msLeft } = useMemo(() => {
    const n = now.getTime();
    const start = FESTIVAL_START.getTime();
    const end = FESTIVAL_END.getTime();

    if (n < start) {
      return { phase: "before", target: FESTIVAL_START, msLeft: start - n };
    }
    if (n >= start && n <= end) {
      return { phase: "during", target: FESTIVAL_END, msLeft: end - n };
    }
    return { phase: "after", target: FESTIVAL_END, msLeft: 0 };
  }, [now]);

  const parts = diffParts(msLeft);

  const label =
    phase === "before"
      ? t("hero.badge.before")
      : phase === "during"
        ? t("hero.badge.during")
        : t("hero.badge.after");

  const locale = i18n.language?.startsWith("fr") ? "fr-FR" : "en-US";

  const targetDateLabel = target.toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const endFullDate = FESTIVAL_END.toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="mb-10 overflow-hidden rounded-3xl border border-neutral-200/60 bg-white text-neutral-900 shadow-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white">
      <div className="relative">
        <div className="absolute inset-0 opacity-60 dark:opacity-70">
          <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-pink-500/25 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_60%)]" />
        </div>

        <div className="relative px-6 py-10 sm:px-10 sm:py-14">
          <div className="flex flex-col gap-5">
            {/* TITRE MarsAI */}
            <h2
              className="font-extrabold leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(44px, 6vw, 96px)" }}
            >
              <span className="text-neutral-900 dark:text-white">
                {t("hero.festivalName.mars")}
              </span>
              <span className="bg-linear-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                {t("hero.festivalName.ai")}
              </span>
            </h2>

            {/* Message */}
            <p className="max-w-3xl text-sm leading-relaxed text-neutral-700 dark:text-white/75 sm:text-base">
              {t("hero.message", {
                startDay: "02",
                endFullDate,
              })}
            </p>

            {/* Badge */}
            <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/70">
              <span className="inline-block h-2 w-2 rounded-full bg-pink-500" />
              {label}
            </div>

            {/* Countdown */}
            <div className="mt-5">
              {phase === "after" ? (
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-6 text-center text-sm font-semibold text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                  {t("hero.thanks")}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                  {[
                    { k: t("hero.countdown.days"), v: parts.days },
                    { k: t("hero.countdown.hours"), v: pad2(parts.hours) },
                    { k: t("hero.countdown.minutes"), v: pad2(parts.minutes) },
                    { k: t("hero.countdown.seconds"), v: pad2(parts.seconds) },
                  ].map((b) => (
                    <div
                      key={b.k}
                      className="rounded-2xl border border-neutral-200 bg-white/70 px-4 py-5 text-center backdrop-blur dark:border-white/10 dark:bg-white/5"
                    >
                      <div
                        className="font-extrabold leading-none tracking-tight"
                        style={{ fontSize: "clamp(34px, 4.2vw, 64px)" }}
                      >
                        {b.v}
                      </div>
                      <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-600 dark:text-white/60">
                        {b.k}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* date cible */}
              <div className="mt-4 text-xs text-neutral-500 dark:text-white/45">
                {phase !== "after" ? (
                  <>
                    {t("hero.targetDateLabel")}{" "}
                    <span className="font-semibold text-neutral-700 dark:text-white/70">
                      {targetDateLabel}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Gallery() {
  const { t } = useTranslation("gallery");

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const res = await fetch(`${API_BASE}/api/videos`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || t("states.errorGeneric"));

        const list = Array.isArray(data) ? data : data?.videos || [];
        if (alive) setItems(list);
      } catch (e) {
        if (alive) setErr(e?.message || t("states.errorGeneric"));
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [t]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((v) => {
      const title = String(v.title || v.title_en || "").toLowerCase();
      const director =
        `${v.director_name || ""} ${v.director_lastname || ""}`.toLowerCase();
      const country = String(
        v.country || v.director_country || "",
      ).toLowerCase();

      return title.includes(q) || director.includes(q) || country.includes(q);
    });
  }, [items, query]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <div className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white p-25 w-full">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <CountdownHero />

        <SectionHero/>

        {/* Search */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-full max-w-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="
                w-full rounded-full px-6 py-3 pr-12 text-sm outline-none
                bg-[#EFEAF7] text-neutral-800 placeholder:text-neutral-500
                dark:bg-white/10 dark:text-white/90 dark:placeholder:text-white/45
                dark:ring-1 dark:ring-white/10
                focus:ring-2 focus:ring-blue-500/30
              "
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-white/60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {loading && (
          <div className="py-16 text-center text-neutral-500 dark:text-white/60">
            {t("states.loading")}
          </div>
        )}

        {!loading && err && (
          <div className="py-16 text-center text-red-600 dark:text-red-400">
            {err}
          </div>
        )}

        {!loading && !err && (
          <>
            <div className="grid grid-cols-1 justify-items-center gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((v) => (
                <VideoCard key={v.id} video={v} apiBase={API_BASE} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-14 flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label={t("pagination.previous")}
                  className="
                    grid h-9 w-9 place-items-center rounded-lg border
                    border-neutral-200 text-neutral-500 hover:bg-neutral-50
                    disabled:opacity-40
                    dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5
                  "
                >
                  ‹
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    const activeP = p === page;

                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={
                          activeP
                            ? "h-9 w-9 rounded-lg bg-[#6D28D9] text-sm font-semibold text-white"
                            : "h-9 w-9 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-100 dark:text-white/70 dark:hover:bg-white/5"
                        }
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label={t("pagination.next")}
                  className="
                    grid h-9 w-9 place-items-center rounded-lg border
                    border-neutral-200 text-neutral-500 hover:bg-neutral-50
                    disabled:opacity-40
                    dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5
                  "
                >
                  ›
                </button>
              </div>

              <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-white/45">
                {t("pagination.summary", { page, totalPages, total })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
