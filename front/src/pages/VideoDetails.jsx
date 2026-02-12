import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// URL de base de l'API (env) + fallback local
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
// Image de cover de secours si la vidéo n’en a pas
const PLACEHOLDER_COVER = "/cover-fallback.jpg";

/**conteneur pill qui accueille les icones pour Réaliszteur et Origine*/
function PillIcon({ children }) {
  return (
    <span className="grid !h-14 !w-14 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10">
      {children}
    </span>
  );
}

/**petit composant pour afficher une image proprement*/
function IconImg({ src, alt = "", className = "", scale = 1 }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain ${className}`}
      style={{ transform: `scale(${scale})` }}
      draggable="false"
      loading="lazy"
    />
  );
}

/**Overlay “Play” par-dessus la vidéo (pure déco)
 * pointer-events-none => ne bloque pas les clics sur la vidéo*/
function PlayOverlay() {
  return (
    <span className="pointer-events-none absolute inset-0 grid place-items-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/75 shadow-sm backdrop-blur dark:bg-black/40 dark:text-white">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M9 7l10 5-10 5V7z" fill="currentColor" />
        </svg>
      </span>
    </span>
  );
}

// (l’icône) du bouton “Copier” est fait en SVG.(dessin en formes mathematiques)
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

/**Ce composant sert à afficher un bouton de réseau social (Instagram, X, etc.)*/
function SocialItem({ label, icon, href }) {
  if (!href) return null;

  return (
    <div className="flex w-[74px] flex-col items-center gap-2">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="grid !h-14 !w-14 place-items-center rounded-2xl bg-neutral-900 shadow-sm ring-1 ring-black/5 cursor-pointer dark:ring-white/10"
      >
        <IconImg src={icon} alt={label} className="!h-10 !w-10" scale={2.35} />
      </a>

      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-white/50">
        {label}
      </div>
    </div>
  );
}

export default function VideoDetails() {
  // On utilise les traductions du fichier appelé “detailvideo”grâce à i18n
  const { t } = useTranslation("detailvideo");
  // helper : va chercher dans le sous-objet labels.*
  const tl = (key) => t(key, { keyPrefix: "labels" });

  // Les icônes et libellés peuvent venir des fichiers i18n (JSON)
  const icons = t("icons", { returnObjects: true }) || {};
  const social = t("social", { returnObjects: true }) || {};

  // Récupère l'id depuis l'URL (ex: /gallery/:id)
  const { id } = useParams();

  // Etat principal : vidéo + états UI (loading/erreur/copié)
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  /**
   * Fetch de la vidéo au montage et quand id change
   * alive => évite setState si le composant est démonté
   */
  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const res = await fetch(`${API_BASE}/api/videos/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Erreur chargement vidéo");
        if (alive) setVideo(data.video);
      } catch (e) {
        if (alive) setErr(e?.message || "Erreur");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => (alive = false);
  }, [id]);

  /**
   * Langue “vue” pour choisir title/synopsis FR vs EN
   * useMemo => recalcul uniquement si video change
   */
  const viewLang = useMemo(
    () => (video?.language || "fr").toLowerCase(),
    [video],
  );

  // Titre (FR/EN)
  const title = useMemo(() => {
    if (!video) return "";
    return viewLang === "en"
      ? video.title_en || video.title
      : video.title || video.title_en;
  }, [video, viewLang]);

  // Synopsis (FR/EN)
  const synopsis = useMemo(() => {
    if (!video) return "";
    return viewLang === "en"
      ? video.synopsis_en || video.synopsis || ""
      : video.synopsis || video.synopsis_en || "";
  }, [video, viewLang]);

  // Nom du réalisateur concaténé
  const director = useMemo(() => {
    if (!video) return "";
    return `${video.director_name || ""} ${video.director_lastname || ""}`.trim();
  }, [video]);

  // Pays (origine)
  const country = video?.director_country || video?.country || "—";

  // Cover : si cover existe => URL API, sinon placeholder local
  const coverUrl =
    video?.cover && String(video.cover).trim()
      ? `${API_BASE}/uploads/covers/${video.cover}`
      : PLACEHOLDER_COVER;

  // URL de streaming utilisée par le <video>
  const streamUrl = `${API_BASE}/api/videos/${id}/stream`;
  // “Lien direct” => ici c’est le streamUrl (affiché + copiable)
  const directLink = streamUrl;

  // Tags AI, une string devient un tabldeau grâce à split par , ; |
  const aiTags = useMemo(() => {
    const raw = (video?.ai_tech || "").trim();
    if (!raw) return [];
    return raw
      .split(/[,;|]/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [video]);

  // Copie le lien dans le presse-papier + feedback “copié”
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(directLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  // Etat chargement
  if (loading) {
    return (
      <div className="py-16 text-center text-neutral-500 dark:text-white/60 dark:bg-neutral-950">
        Chargement…
      </div>
    );
  }

  // Etat erreur
  if (err)
    return (
      <div className="py-16 text-center text-red-600 dark:text-red-400 dark:bg-neutral-950">
        {err}
      </div>
    );

  // Sécurité : si pas de vidéo, rien à afficher
  if (!video) return null;

  return (
    // Wrapper global : fond clair + fond dark (important pour éviter le blanc)
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-8">
        {/* Bouton retour galerie */}
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
            {t("backToGallery")}
          </Link>
        </div>

        {/* Player vidéo */}
        <div className="overflow-hidden rounded-3xl bg-black shadow-sm ring-1 ring-black/5 dark:ring-white/10">
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

        {/* Titre du film */}
        <h1 className="mt-10 text-3xl font-extrabold uppercase tracking-tight text-[#2563EB]">
          {title}
        </h1>

        {/* “Pills” : Réalisateur + Origine */}
        <div className="mt-6 flex flex-wrap items-start gap-10">
          {/* Réalisateur */}
          <div className="flex items-start gap-4">
            <PillIcon>
              <IconImg
                src={icons.user}
                alt={tl("director")}
                className="!h-9 !w-9"
                scale={2.35}
              />
            </PillIcon>

            <div className="flex flex-col gap-1 leading-none">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-white/50">
                {tl("director")}
              </div>
              <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                {director || "—"}
              </div>
            </div>
          </div>

          {/* Origine */}
          <div className="flex items-start gap-4">
            <PillIcon>
              <IconImg
                src={icons.globe}
                alt={tl("origin")}
                className="!h-9 !w-9"
                scale={2.35}
              />
            </PillIcon>

            <div className="flex flex-col gap-1 leading-none">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-white/50">
                {tl("origin")}
              </div>

              <div className="flex items-center gap-2">
                <IconImg
                  src={icons.globe}
                  alt=""
                  className="block !h-6 !w-6"
                  scale={1}
                />
                <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {country}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux + lien direct */}
        <div className="mt-10 flex flex-wrap items-end gap-8">
          {/* Liste des réseaux */}
          <div className="flex flex-wrap gap-5">
            <SocialItem
              label={social?.x?.label}
              icon={social?.x?.icon}
              href="https://x.com"
            />
            <SocialItem
              label={social?.linkedin?.label}
              icon={social?.linkedin?.icon}
              href="https://www.linkedin.com"
            />
            <SocialItem
              label={social?.instagram?.label}
              icon={social?.instagram?.icon}
              href="https://www.instagram.com"
            />
            <SocialItem
              label={social?.youtube?.label}
              icon={social?.youtube?.icon}
              href="https://www.youtube.com"
            />
            <SocialItem
              label={social?.facebook?.label}
              icon={social?.facebook?.icon}
              href="https://www.facebook.com"
            />
          </div>

          {/* Lien direct + copie */}
          <div className="flex flex-1 flex-col gap-2 sm:ml-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-white/50">
              {tl("directLink")}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <code className="break-all rounded-xl bg-neutral-50 px-3 py-2 text-[11px] font-semibold text-neutral-800 ring-1 ring-neutral-200 dark:bg-white/10 dark:text-white/85 dark:ring-white/10">
                {directLink}
              </code>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2 text-[11px] font-semibold text-white shadow-sm dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-white/10"
              >
                <CopyIcon />
                {copied ? tl("copied") : tl("copy")}
              </button>
            </div>
          </div>
        </div>

        {/* Bloc Synopsis + Tech AI */}
        <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3 text-[#EF4444]">
            <IconImg
              src={icons.book}
              alt={tl("synopsis")}
              className="!h-9 !w-9"
              scale={2.2}
            />
            <h2 className="text-xs font-extrabold uppercase tracking-[0.22em]">
              {tl("synopsis")}
            </h2>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-700 dark:text-white/70">
            {synopsis || "—"}
          </p>

          <div className="mt-8 flex items-center gap-3 text-[#3B82F6]">
            <IconImg
              src={icons.chip}
              alt={tl("techStackAi")}
              className="!h-9 !w-9"
              scale={2.2}
            />
            <h3 className="text-xs font-extrabold uppercase tracking-[0.22em]">
              {tl("techStackAi")}
            </h3>
          </div>

          {/* Liste des tags AI (ou — si vide) */}
          <div className="mt-4 flex flex-wrap gap-2">
            {aiTags.length ? (
              aiTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-900 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-white/10"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-neutral-500 dark:text-white/60">
                —
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
