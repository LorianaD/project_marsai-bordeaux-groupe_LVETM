import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const PLACEHOLDER_COVER = "/cover-fallback.jpg";

function useActiveIndex(containerRef, itemCount) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll("[data-snap-item]"));
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (!visible) return;
        const idx = Number(visible.target.getAttribute("data-index") || 0);
        setActive(idx);
      },
      { root, threshold: [0.55, 0.7, 0.85] },
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [containerRef, itemCount]);

  return [active, setActive];
}

function FeedSlide({ video, index, activeIndex }) {
  const videoRef = useRef(null);

  const coverUrl =
    video?.cover && String(video.cover).trim()
      ? `${API_BASE}/uploads/covers/${video.cover}`
      : PLACEHOLDER_COVER;

  const streamUrl = `${API_BASE}/api/videos/${video.id}/stream`;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const isActive = index === activeIndex;

    if (isActive) {
      el.muted = true; // autoplay plus fiable
      const p = el.play();
      if (p?.catch) p.catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [index, activeIndex]);

  const title = video.title || video.title_en || "Sans titre";
  const director =
    `${video.director_name || ""} ${video.director_lastname || ""}`.trim();

  return (
    <section
      data-snap-item
      data-index={index}
      className="relative h-screen w-full snap-start bg-black"
    >
      <video
        ref={videoRef}
        src={streamUrl}
        poster={coverUrl}
        className="absolute inset-0 h-full w-full object-contain"
        playsInline
        controls
        preload="metadata"
      />

      {/* overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
          <div className="max-w-[70%]">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              MarsAI • Court métrage
            </div>
            <h2 className="mt-2 line-clamp-2 text-xl font-extrabold uppercase tracking-tight text-white">
              {title}
            </h2>
            <div className="mt-2 text-sm text-white/75">{director}</div>
          </div>

          <Link
            to={`/gallery/${video.id}`}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-white/15 backdrop-blur hover:bg-white/15"
          >
            Détails
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function VideoFeed() {
  const { id } = useParams();
  const navigate = useNavigate();
  const startId = String(id || "");

  // ✅ MOBILE ONLY : si desktop (>= 640px) => redirige vers VideoDetails
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)"); // Tailwind sm

    const apply = () => {
      if (mq.matches) {
        navigate(`/gallery/${id}`, { replace: true });
      }
    };

    apply();

    // écoute resize
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, [id, navigate]);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useActiveIndex(
    containerRef,
    items.length,
  );

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");

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

  const startIndex = useMemo(() => {
    const idx = items.findIndex((v) => String(v.id) === startId);
    return idx >= 0 ? idx : 0;
  }, [items, startId]);

  // scroll direct vers la vidéo cliquée
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    if (!items.length) return;

    const el = root.querySelector(`[data-index="${startIndex}"]`);
    if (el) el.scrollIntoView({ behavior: "auto", block: "start" });

    setActiveIndex(startIndex);
  }, [items.length, startIndex, setActiveIndex]);

  // clavier ↑ ↓ + ESC pour fermer
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    function scrollToIndex(next) {
      const clamped = Math.max(0, Math.min(items.length - 1, next));
      const el = root.querySelector(`[data-index="${clamped}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function onKeyDown(e) {
      if (e.key === "Escape") {
        navigate("/gallery");
      }
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToIndex(activeIndex + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(activeIndex - 1);
      }
    }

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, items.length, navigate]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] grid place-items-center bg-neutral-950 text-white">
        <div className="text-white/70">Chargement…</div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="fixed inset-0 z-[9999] grid place-items-center bg-neutral-950 text-white">
        <div className="text-red-400">{err}</div>
      </div>
    );
  }

  return (
    // ✅ Overlay full-screen (ne dépend plus du layout)
    <div className="fixed inset-0 z-[9999] bg-neutral-950 text-white">
      {/* Top bar */}
      <div className="absolute left-0 right-0 top-0 z-20 px-4 pt-4">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate("/gallery")}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] ring-1 ring-white/15 backdrop-blur hover:bg-white/15"
          >
            ← Retour galerie
          </button>

          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
            {activeIndex + 1} / {items.length}
          </div>
        </div>
      </div>

      {/* Snap container */}
      <div
        ref={containerRef}
        className="
          h-full w-full overflow-y-scroll overscroll-y-contain
          snap-y snap-mandatory scroll-smooth
          [scrollbar-width:none] [-ms-overflow-style:none]
        "
      >
        <style>{`div::-webkit-scrollbar{display:none;}`}</style>

        {items.map((v, i) => (
          <FeedSlide key={v.id} video={v} index={i} activeIndex={activeIndex} />
        ))}
      </div>
    </div>
  );
}
