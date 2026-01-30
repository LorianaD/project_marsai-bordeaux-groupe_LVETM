import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const PLACEHOLDER_COVER = "/cover-fallback.jpg"; // mets l'image dans /public

function PillIcon({ children }) {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700">
      {children}
    </span>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 21a8 8 0 10-16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 12a4 4 0 100-8 4 4 0 000 8z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22a10 10 0 100-20 10 10 0 000 20z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M2 12h20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 19a2 2 0 002 2h13V7H6a2 2 0 00-2 2v10z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M6 3h13v18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ChipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 9h6v6H9V9z" stroke="currentColor" strokeWidth="2" />
      <path
        d="M7 2v3M12 2v3M17 2v3M7 19v3M12 19v3M17 19v3M2 7h3M2 12h3M2 17h3M19 7h3M19 12h3M19 17h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 9h10v10H9V9z" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayOverlay() {
  return (
    <span className="pointer-events-none absolute inset-0 grid place-items-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/75 shadow-sm backdrop-blur">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M9 7l10 5-10 5V7z" fill="currentColor" />
        </svg>
      </span>
    </span>
  );
}

function SocialItem({ label }) {
  return (
    <div className="flex w-[74px] flex-col items-center gap-2">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-neutral-900 text-white shadow-sm ring-1 ring-black/5">
        <span className="text-[11px] font-bold">{label[0]}</span>
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
        {label}
      </div>
    </div>
  );
}

export default function VideoDetails() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const res = await fetch(`${API_BASE}/api/videos/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Erreur chargement vidéo");
        if (alive) setVideo(data);
      } catch (e) {
        if (alive) setErr(e?.message || "Erreur");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => (alive = false);
  }, [id]);

  const viewLang = useMemo(
    () => (video?.language || "fr").toLowerCase(),
    [video],
  );

  const title = useMemo(() => {
    if (!video) return "";
    return viewLang === "en"
      ? video.title_en || video.title
      : video.title || video.title_en;
  }, [video, viewLang]);

  const synopsis = useMemo(() => {
    if (!video) return "";
    return viewLang === "en"
      ? video.synopsis_en || video.synopsis || ""
      : video.synopsis || video.synopsis_en || "";
  }, [video, viewLang]);

  const director = useMemo(() => {
    if (!video) return "";
    return `${video.director_name || ""} ${video.director_lastname || ""}`.trim();
  }, [video]);

  const country = video?.director_country || video?.country || "";
  const coverUrl =
    video?.cover && String(video.cover).trim()
      ? `${API_BASE}/uploads/covers/${video.cover}`
      : PLACEHOLDER_COVER;

  const streamUrl = `${API_BASE}/api/videos/${id}/stream`;
  const directLink = streamUrl;

  const aiTags = useMemo(() => {
    const raw = (video?.ai_tech || "").trim();
    if (!raw) return [];
    return raw
      .split(/[,;|]/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [video]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(directLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  if (loading)
    return (
      <div className="py-16 text-center text-neutral-500">Chargement…</div>
    );
  if (err) return <div className="py-16 text-center text-red-600">{err}</div>;
  if (!video) return null;

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-8">
        {/* Retour */}
        <div className="mb-6">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2B7FFF] to-[#9810FA] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Retour galerie
          </Link>
        </div>

        {/* Player */}
        <div className="overflow-hidden rounded-3xl bg-black shadow-sm ring-1 ring-black/5">
          <div className="relative">
            <video
              controls
              preload="metadata"
              poster={coverUrl}
              src={streamUrl}
              className="aspect-[16/9] w-full"
            />
            <PlayOverlay />
          </div>
        </div>

        {/* Titre */}
        <h1 className="mt-10 text-3xl font-extrabold uppercase tracking-tight text-[#2563EB]">
          {title}
        </h1>

        {/* Infos */}
        <div className="mt-6 flex flex-wrap items-center gap-10">
          <div className="flex items-center gap-4">
            <PillIcon>
              <UserIcon />
            </PillIcon>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Réalisateur
              </div>
              <div className="mt-1 text-sm font-semibold text-neutral-900">
                {director || "—"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <PillIcon>
              <GlobeIcon />
            </PillIcon>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Origine
              </div>
              <div className="mt-1 text-sm font-semibold text-neutral-900">
                {country || "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Social + lien */}
        <div className="mt-10 flex flex-wrap items-end gap-8">
          <div className="flex flex-wrap gap-5">
            <SocialItem label="X/Twitter" />
            <SocialItem label="LinkedIn" />
            <SocialItem label="Instagram" />
            <SocialItem label="YouTube" />
            <SocialItem label="Facebook" />
          </div>

          <div className="flex flex-1 flex-col gap-2 sm:ml-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Lien direct
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <code className="break-all rounded-xl bg-neutral-50 px-3 py-2 text-[11px] font-semibold text-neutral-800 ring-1 ring-neutral-200">
                {directLink}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2 text-[11px] font-semibold text-white shadow-sm"
              >
                <CopyIcon />
                {copied ? "Copié" : "Copier"}
              </button>
            </div>
          </div>
        </div>

        {/* Synopsis card */}
        <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
          <div className="flex items-center gap-3 text-[#EF4444]">
            <BookIcon />
            <h2 className="text-xs font-extrabold uppercase tracking-[0.22em]">
              Synopsis
            </h2>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-700">
            {synopsis || "—"}
          </p>

          <div className="mt-8 flex items-center gap-3 text-[#3B82F6]">
            <ChipIcon />
            <h3 className="text-xs font-extrabold uppercase tracking-[0.22em]">
              Tech stack & IA
            </h3>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {aiTags.length ? (
              aiTags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-neutral-900 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
                >
                  {t}
                </span>
              ))
            ) : (
              <span className="text-sm text-neutral-500">—</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
