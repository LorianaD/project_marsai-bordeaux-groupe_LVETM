import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// URL de base de l'API (env) + fallback local
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
// Image de cover de secours si la vidéo n’en a pas
const PLACEHOLDER_COVER = "/cover-fallback.jpg";

/* =========================
   AUTH HELPERS (selectionneur)
========================= */
function normalizeToken(t) {
  if (!t) return "";
  return String(t)
    .trim()
    .replace(/^"(.+)"$/, "$1") // enlève guillemets si "token"
    .replace(/\s+/g, ""); // enlève espaces / \r\n
}

function getToken() {
  const candidates = [
    localStorage.getItem("token"),
    localStorage.getItem("jwt"),
    localStorage.getItem("accessToken"),
    localStorage.getItem("authToken"),

    sessionStorage.getItem("token"),
    sessionStorage.getItem("jwt"),
    sessionStorage.getItem("accessToken"),
    sessionStorage.getItem("authToken"),
  ];

  for (const c of candidates) {
    const tok = normalizeToken(c);
    if (tok) return tok;
  }

  // si stocké dans un objet JSON
  const userStr = localStorage.getItem("user") || localStorage.getItem("auth");
  if (userStr) {
    try {
      const u = JSON.parse(userStr);
      const tok = normalizeToken(
        u?.token ||
          u?.jwt ||
          u?.accessToken ||
          u?.data?.token ||
          u?.user?.token,
      );
      if (tok) return tok;
    } catch {}
  }

  return "";
}

function isSelectorFromToken() {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const rawRole =
      payload?.role || payload?.user?.role || payload?.status || payload?.type;

    const role = String(rawRole || "")
      .trim()
      .toLowerCase();

    return role === "selector" || role === "selectionneur";
  } catch {
    return false;
  }
}

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

  /* =========================
     REVIEW (selectionneur)
  ========================= */
  const [isSelector, setIsSelector] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [myRating, setMyRating] = useState(10);
  const [myComment, setMyComment] = useState("");
  const [savedMsg, setSavedMsg] = useState("");

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
   * Détecte selectionneur + charge review existante
   */
  useEffect(() => {
    const ok = isSelectorFromToken();
    setIsSelector(ok);

    if (!ok) return;

    let alive = true;

    async function loadMyReview() {
      try {
        setReviewLoading(true);
        setReviewError("");

        const token = getToken();
        const res = await fetch(`${API_BASE}/api/videos/${id}/review/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Erreur review");

        if (!alive) return;

        if (data?.review) {
          setMyRating(Number(data.review.rating || 10));
          setMyComment(data.review.comment || "");
        } else {
          setMyRating(10);
          setMyComment("");
        }
      } catch (e) {
        if (alive) setReviewError(e?.message || "Erreur review");
      } finally {
        if (alive) setReviewLoading(false);
      }
    }

    loadMyReview();
    return () => {
      alive = false;
    };
  }, [id]);

  async function saveReview() {
    try {
      setReviewLoading(true);
      setReviewError("");
      setSavedMsg("");

      const token = getToken();
      const res = await fetch(`${API_BASE}/api/videos/${id}/review`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: Number(myRating),
          comment: myComment,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur sauvegarde");

      setSavedMsg("✅ Enregistré !");
      setTimeout(() => setSavedMsg(""), 1200);
      setReviewOpen(false);
    } catch (e) {
      setReviewError(e?.message || "Erreur sauvegarde");
    } finally {
      setReviewLoading(false);
    }
  }

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

  // Tags AI
  const aiTags = useMemo(() => {
    const raw = (video?.ai_tech || "").trim();
    if (!raw) return [];
    return raw
      .split(/[,;|]/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [video]);

  // Copie
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
  if (err) {
    return (
      <div className="py-16 text-center text-red-600 dark:text-red-400 dark:bg-neutral-950">
        {err}
      </div>
    );
  }

  if (!video) return null;

  return (
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

              {/* ✅ BOUTON NOTER */}
              {/* ✅ BOUTON NOTER — style identique à Copier */}
              {isSelector && (
                <button
                  type="button"
                  onClick={() => setReviewOpen(true)}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:opacity-90 dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-white/10"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 17l-5.878 3.09 1.122-6.545L2.49 8.91l6.566-.955L12 2l2.944 5.955 6.566.955-4.755 4.635 1.122 6.545L12 17z"
                      fill="currentColor"
                    />
                  </svg>
                  Noter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Réseaux sociaux + lien direct */}
        <div className="mt-10 flex flex-wrap items-end gap-8">
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

      {/* MODAL REVIEW */}
      {reviewOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl dark:bg-neutral-900">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold uppercase tracking-tight">
                  NOTER CE FILM
                </h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-white/60">
                  Note de 1 à 10 + commentaire (optionnel)
                </p>
              </div>

              <button
                type="button"
                onClick={() => setReviewOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 dark:text-white/70 dark:hover:bg-white/10"
                disabled={reviewLoading}
              >
                ✕
              </button>
            </div>

            <div className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-white/50">
                NOTE (1–10)
              </label>

              <div className="mt-3 flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={myRating}
                  onChange={(e) => setMyRating(e.target.value)}
                  className="w-full"
                />
                <span className="w-10 text-center text-lg font-extrabold">
                  {myRating}
                </span>
              </div>

              <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-white/50">
                COMMENTAIRE
              </label>

              <textarea
                value={myComment}
                onChange={(e) => setMyComment(e.target.value)}
                rows={4}
                placeholder="Ton avis..."
                className="mt-3 w-full rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#9810FA]/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />

              {reviewError && (
                <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-300">
                  {reviewError}
                </div>
              )}

              {savedMsg && (
                <div className="mt-4 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-300">
                  {savedMsg}
                </div>
              )}

              {/* (optionnel) afficher une petite info quand /review/me échoue */}
              {!reviewLoading && reviewError && (
                <div className="mt-4 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                  Accès réservé aux sélectionneurs
                </div>
              )}

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReviewOpen(false)}
                  className="rounded-xl px-5 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 dark:text-white/70 dark:hover:bg-white/10"
                  disabled={reviewLoading}
                >
                  Annuler
                </button>

                <button
                  type="button"
                  onClick={saveReview}
                  className="rounded-xl bg-[#9810FA] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-50"
                  disabled={reviewLoading}
                >
                  {reviewLoading ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
