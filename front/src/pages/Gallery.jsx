import { useEffect, useMemo, useState } from "react";
import VideoCard from "../components/Videos/VideoCard.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const PAGE_SIZE = 6;

export default function Gallery() {
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

        // ✅ ton backend est sous /api
        const res = await fetch(`${API_BASE}/api/videos`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Erreur chargement vidéos");

        const list = Array.isArray(data) ? data : data?.videos || [];
        if (alive) setItems(list);
      } catch (e) {
        if (alive) setErr(e?.message || "Erreur");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

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
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
            <span className="block text-blue-600">LA GALERIE</span>
            <span className="block bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
              DES FILMS
            </span>
          </h1>
        </div>

        {/* Search */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-full max-w-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hinted search text"
              className="w-full rounded-full bg-[#EFEAF7] px-6 py-3 pr-12 text-sm text-neutral-800 outline-none placeholder:text-neutral-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600">
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
          <div className="py-16 text-center text-neutral-500">Chargement…</div>
        )}
        {!loading && err && (
          <div className="py-16 text-center text-red-600">{err}</div>
        )}

        {!loading && !err && (
          <>
            <div className="grid grid-cols-1 justify-items-center gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((v) => (
                <VideoCard key={v.id} video={v} apiBase={API_BASE} />
              ))}
            </div>
            <div className="mt-14 flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 disabled:opacity-40"
                  disabled={page === 1}
                >
                  ‹
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    const active = p === page;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        className={
                          active
                            ? "h-9 w-9 rounded-lg bg-[#6D28D9] text-sm font-semibold text-white"
                            : "h-9 w-9 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
                        }
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 disabled:opacity-40"
                  disabled={page === totalPages}
                >
                  ›
                </button>
              </div>

              <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                PAGE {page} SUR {totalPages} - {total} FILMS TROUVÉS
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
