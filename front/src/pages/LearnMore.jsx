// src/pages/LearnMore.jsx
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

function InfoCard({ title, children, icon }) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white/70 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start gap-8 p-8">

        {/* ICON */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-black/5 bg-black/[0.03] dark:border-white/10 dark:bg-white/5">
          <img
            src={icon}
            alt=""
            className="h-20 w-20 object-contain"
          />
        </div>

        {/* CONTENT */}
        <div className="min-w-0">
          <h3 className="text-2xl font-extrabold tracking-tight text-black dark:text-white">
            {title}
          </h3>

          <div className="mt-4 text-base leading-7 text-black/70 dark:text-white/70">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}


function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-bold tracking-wide text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
      {children}
    </span>
  );
}

function LearnMore() {
  // i18n namespace optionnel : si "learnMore" n'existe pas, ça ne casse pas la page
  const { i18n } = useTranslation("learnMore");
  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

  // Textes fallback (tu pourras les mettre dans i18n plus tard)
  const copy = {
    fr: {
      title: "Règles de participation",
      subtitle:
        "MarsAI — festival de courts-métrages IA de 60 secondes. Voici les règles et dates clés.",
      topicLabel: "Thème",
      topicValue: "Futurs souhaitables",
      step1Title: "Step 1 : Tourne ton film",
      step1Bullets: [
        "Durée maximale : 1 minute, générique inclus.",
        "Musique obligatoirement libre de droits.",
        "Ne pas incruster de sous-titres dans la vidéo (subtitles séparés si besoin).",
      ],
      uploadTitle: "Dépôt du film",
      uploadBullets: [
        "Complète le formulaire d’inscription (sans création de compte).",
        "Ajoute ton film (nom de fichier sans caractères spéciaux).",
        "Dépose avant : mardi 12 octobre 2026 à 23:59 GMT.",
      ],
      step3Title: "Step 3 : Sélection officielle & festival",
      step3Bullets: [
        "Annonce de la sélection officielle : mardi 2 novembre 2026.",
        "50 films retenus dans la sélection.",
        "Le festival sera en ligne du 2 au 30 novembre 2026.",
        "À toi de faire du bruit pour gagner le prix du public !",
      ],
      ceremonyTitle: "Cérémonie de remise des prix",
      ceremonyBullets: ["À Paris — mardi 7 décembre 2026."],
      tipsTitle: "Conseils (rapides)",
      tipsBullets: [
        "Soigne l’idée : 1 concept fort > 10 idées.",
        "Lisibilité : une action claire, peu de personnages.",
        "Montage : rythme, impact, fin mémorable.",
      ],
      ctaTitle: "Prêt·e à participer ?",
      ctaDesc: "Retourne sur la page Participation pour déposer ton film.",
      ctaBtn: "Aller à Participation",
      aiPill: "IA",
    },
    en: {
      title: "Participation rules",
      subtitle:
        "MarsAI — a 60-second AI short film festival. Rules and key dates below.",
      topicLabel: "Topic",
      topicValue: "Desirable futures",
      step1Title: "Step 1: Shoot your film",
      step1Bullets: [
        "Max duration: 1 minute, credits included.",
        "All music must be royalty-free.",
        "Do not embed subtitles into the video (provide them separately if needed).",
      ],
      uploadTitle: "Upload your film",
      uploadBullets: [
        "Complete the registration form (no account required).",
        "Add your film (filename without special characters).",
        "Upload before: Tuesday Oct 12, 2026 at 23:59 GMT.",
      ],
      step3Title: "Step 3: Official selection & festival",
      step3Bullets: [
        "Official selection announcement: Tuesday Nov 2, 2026.",
        "50 films in the selection.",
        "Festival online from Nov 2 to Nov 30, 2026.",
        "Make some noise to win the audience award!",
      ],
      ceremonyTitle: "Award ceremony",
      ceremonyBullets: ["In Paris — Tuesday Dec 7, 2026."],
      tipsTitle: "Quick tips",
      tipsBullets: [
        "One strong idea beats ten weak ones.",
        "Keep it readable: one clear action, few characters.",
        "Edit for rhythm, impact, and a memorable ending.",
      ],
      ctaTitle: "Ready to participate?",
      ctaDesc: "Go back to Participation to upload your film.",
      ctaBtn: "Go to Participation",
      aiPill: "AI",
    },
  };

  const c = copy[locale];

  // Icônes depuis /public/icons/learnMore/*
  // (crée le dossier public/icons/learnMore)
  const icons = {
    step1: "/icons/learnMore/step1-film.png",
    upload: "/icons/learnMore/upload.png",
    step3: "/icons/learnMore/selection.png",
    ceremony: "/icons/learnMore/ceremony.png",
    tips: "/icons/learnMore/tips.png",
  };

  return (
    <main className="relative min-h-screen bg-white text-black dark:bg-[#07040F] dark:text-white">
      {/* glow uniquement en dark */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute -top-24 left-1/2 h-72 w-[800px] -translate-x-1/2 rounded-full bg-[#AD46FF]/20 blur-3xl" />
        <div className="absolute top-40 left-10 h-72 w-72 rounded-full bg-[#51A2FF]/15 blur-3xl" />
        <div className="absolute top-56 right-10 h-72 w-72 rounded-full bg-[#FF2B7F]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 py-10 md:px-10 md:py-14">
        {/* Header interne */}
        <div className="flex flex-col gap-4">
        

          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            <span className="text-black dark:text-white">{c.title}</span>
            <span className="ml-2 bg-gradient-to-r from-[#51A2FF] via-[#AD46FF] to-[#FF2B7F] bg-clip-text text-transparent">
              MarsAI
            </span>
          </h1>

          <p className="max-w-3xl text-base leading-7 text-black/70 dark:text-white/70 md:text-lg">
            {c.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2">
          <InfoCard title={c.step1Title} icon={icons.step1}>
            <ul className="list-disc space-y-2 pl-5">
              {c.step1Bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title={c.uploadTitle} icon={icons.upload}>
            <ul className="list-disc space-y-2 pl-5">
              {c.uploadBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title={c.step3Title} icon={icons.step3}>
            <ul className="list-disc space-y-2 pl-5">
              {c.step3Bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </InfoCard>

          <div className="flex flex-col gap-5">
            <InfoCard title={c.ceremonyTitle} icon={icons.ceremony}>
              <ul className="list-disc space-y-2 pl-5">
                {c.ceremonyBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard title={c.tipsTitle} icon={icons.tips}>
              <ul className="list-disc space-y-2 pl-5">
                {c.tipsBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </InfoCard>
          </div>
        </div>

        {/* CTA bas (utilise Link au lieu de <a> pour éviter reload) */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl border border-black/5 bg-black/[0.02] p-6 dark:border-white/10 dark:bg-white/5 md:mt-12 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold tracking-wide text-black/70 dark:text-white/70">
              {c.ctaTitle}
            </p>
            <p className="mt-1 text-sm text-black/70 dark:text-white/70">
              {c.ctaDesc}
            </p>
          </div>

          <Link
            to="/participation"
            className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-extrabold tracking-wide text-white shadow-sm hover:opacity-90 dark:bg-white dark:text-black"
          >
            {c.ctaBtn}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default LearnMore;
