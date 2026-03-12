import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Field, TextInput, Select } from "./Field";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function TeamCompositionForm({ onPrev }) {
  const { t } = useTranslation("participation");
  const help = "mt-2 text-xs italic text-neutral-500 dark:text-neutral-300";

  // Collaborateur en cours
  const [current, setCurrent] = useState({
    gender: "Mr",
    full_name: "",
    profession: "",
    email: "",
  });

  // Contributeurs
  const [contributors, setContributors] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("contributors") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  // Validations
  const [ownership, setOwnership] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ownership") || "{}");
    } catch {
      return {};
    }
  });

  // Modal conditions
  const [termsOpen, setTermsOpen] = useState(false);

  function updateCurrent(e) {
    const { name, value } = e.target;
    setCurrent((c) => ({ ...c, [name]: value }));
  }

  function addContributor() {
    const ok =
      current.full_name.trim() &&
      current.profession.trim() &&
      current.email.trim();
    if (!ok) return;

    const next = [...contributors, current];
    setContributors(next);
    localStorage.setItem("contributors", JSON.stringify(next));

    setCurrent({ gender: "Mr", full_name: "", profession: "", email: "" });
  }

  function removeContributor(i) {
    const next = contributors.filter((_, idx) => idx !== i);
    setContributors(next);
    localStorage.setItem("contributors", JSON.stringify(next));
  }

  function toggleOwnership(key) {
    setOwnership((prev) => {
      const next = { ...prev, [key]: !prev?.[key] };
      localStorage.setItem("ownership", JSON.stringify(next));
      return next;
    });
  }

  function setCaptchaOk(token) {
    setOwnership((prev) => {
      const next = {
        ...prev,
        recaptchaToken: token || "",
        notRobot: !!token,
      };
      localStorage.setItem("ownership", JSON.stringify(next));
      return next;
    });
  }

  const canFinish = useMemo(() => {
    return (
      !!ownership?.ownershipCertified &&
      !!ownership?.promoConsent &&
      !!ownership?.termsAccepted &&
      !!ownership?.ageConfirmed &&
      !!ownership?.recaptchaToken
    );
  }, [ownership]);

  return (
    <div className="w-full">
      {/* MODALE CONDITIONS */}
      {termsOpen ? (
        <div className="fixed inset-0 z-[99999]">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setTermsOpen(false)}
            aria-label={t("countryPicker.closeAria")}
          />
          <div className="absolute left-1/2 top-1/2 w-[min(92vw,860px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/10">
            <div className="flex items-center justify-between gap-3 border-b border-neutral-200 px-6 py-4">
              <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-neutral-900">
                {t("team.final.modalTitle")}
              </div>
              <button
                type="button"
                onClick={() => setTermsOpen(false)}
                className="rounded-xl bg-neutral-900 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
              >
                {t("team.final.close")}
              </button>
            </div>

            {/* NOTE: le contenu long des conditions est laissé tel quel pour l’instant.
               Si tu veux, je te le mets aussi en i18n (FR/EN) mais c’est un gros bloc. */}
            <div className="max-h-[70vh] overflow-auto p-6 text-sm leading-7 text-neutral-700">
              <h3 className="text-base font-extrabold text-neutral-900">
                1) Objet
              </h3>
              <p className="mt-2">
                MarsAI est un festival amateur international de courts métrages
                réalisés avec l’aide d’outils d’intelligence artificielle. Les
                œuvres soumises ne doivent pas dépasser 60 secondes.
              </p>

              <h3 className="mt-6 text-base font-extrabold text-neutral-900">
                2) Éligibilité
              </h3>
              <p className="mt-2">
                La participation est ouverte aux réalisateurs du monde entier.
                Vous confirmez avoir au moins 18 ans au moment de la soumission,
                ou disposer d’une autorisation parentale/légale si applicable.
              </p>

              <h3 className="mt-6 text-base font-extrabold text-neutral-900">
                3) Droits & propriété
              </h3>
              <p className="mt-2">
                Vous garantissez être titulaire des droits nécessaires sur la
                vidéo, la musique, les voix, les images et tout élément
                apparaissant dans l’œuvre. Vous êtes responsable de toute
                réclamation de tiers.
              </p>

              <h3 className="mt-6 text-base font-extrabold text-neutral-900">
                4) Contenu autorisé
              </h3>
              <p className="mt-2">
                Sont interdits : contenus illégaux, haineux, diffamatoires,
                harcèlement, pornographie explicite, incitation à la violence,
                atteinte aux droits d’auteur, ou toute exploitation non
                consentie de l’image d’autrui.
              </p>

              <h3 className="mt-6 text-base font-extrabold text-neutral-900">
                5) Utilisation par le festival
              </h3>
              <p className="mt-2">
                En soumettant votre œuvre, vous autorisez MarsAI à diffuser
                l’œuvre dans le cadre du festival (en ligne / projections), et à
                utiliser des extraits, images fixes, titre, synopsis et crédits
                à des fins de communication et promotion (site, réseaux sociaux,
                presse), sans rémunération supplémentaire.
              </p>

              <h3 className="mt-6 text-base font-extrabold text-neutral-900">
                6) Données personnelles
              </h3>
              <p className="mt-2">
                Les informations collectées servent uniquement à la gestion des
                candidatures, à la communication liée au festival et au contact
                des participants. Vous pouvez demander la suppression de vos
                données selon la politique de confidentialité.
              </p>

              <h3 className="mt-6 text-base font-extrabold text-neutral-900">
                7) Modération / refus
              </h3>
              <p className="mt-2">
                MarsAI se réserve le droit de refuser une soumission ne
                respectant pas ces règles, ou de retirer un contenu en cas de
                signalement sérieux.
              </p>

              <h3 className="mt-6 text-base font-extrabold text-neutral-900">
                8) Acceptation
              </h3>
              <p className="mt-2">
                En cochant la case « J’accepte les conditions d’utilisation »,
                vous reconnaissez les avoir lues et acceptées.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* card */}
      <div className="rounded-2xl bg-white p-8 text-neutral-900 dark:bg-black dark:text-white">
        <h2 className="text-center text-2xl font-semibold text-purple-500">
          {t("team.title")}
        </h2>

        <div className="mt-8 rounded-2xl bg-neutral-100 p-6 dark:bg-neutral-900">
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={addContributor}
              className="rounded-full bg-neutral-700 px-6 py-2 text-sm font-semibold text-white"
            >
              {t("team.addCollaborator")}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <Field label={t("team.fields.civility.label")} required>
              <Select
                name="gender"
                value={current.gender}
                onChange={updateCurrent}
                className="bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white"
              >
                <option value="Mr">{t("team.fields.civility.mr")}</option>
                <option value="Mrs">{t("team.fields.civility.mrs")}</option>
              </Select>
              <div className={help}>{t("team.fields.civility.help")}</div>
            </Field>

            <Field label={t("team.fields.fullName.label")} required>
              <TextInput
                name="full_name"
                value={current.full_name}
                onChange={updateCurrent}
                placeholder={t("team.fields.fullName.placeholder")}
                className="bg-white text-neutral-900 placeholder:text-neutral-400 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
              />
              <div className={help}>{t("team.fields.fullName.help")}</div>
            </Field>

            <Field label={t("team.fields.profession.label")} required>
              <TextInput
                name="profession"
                value={current.profession}
                onChange={updateCurrent}
                placeholder={t("team.fields.profession.placeholder")}
                className="bg-white text-neutral-900 placeholder:text-neutral-400 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
              />
              <div className={help}>{t("team.fields.profession.help")}</div>
            </Field>

            <Field label={t("team.fields.email.label")} required>
              <TextInput
                name="email"
                value={current.email}
                onChange={updateCurrent}
                placeholder={t("team.fields.email.placeholder")}
                className="bg-white text-neutral-900 placeholder:text-neutral-400 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
              />
              <div className={help}>{t("team.fields.email.help")}</div>
            </Field>
          </div>

          {contributors.length ? (
            <div className="mt-6 space-y-3">
              {contributors.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl bg-white p-3 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-white"
                >
                  <div>
                    <span className="font-semibold">{c.full_name}</span> —{" "}
                    {c.profession} — {c.email}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeContributor(i)}
                    className="text-red-500 hover:underline"
                  >
                    {t("team.remove")}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 text-sm text-neutral-500 dark:text-neutral-300">
              {t("team.empty")}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-2xl bg-neutral-300 p-6 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
          <div className="mb-3 font-semibold">
            {t("team.certificate.title")}
          </div>
          <p className="text-xs leading-relaxed">
            {t("team.certificate.text")}
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={!!ownership?.ownershipCertified}
                onChange={() => toggleOwnership("ownershipCertified")}
              />
              {t("team.certificate.checks.ownershipCertified")}
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={!!ownership?.promoConsent}
                onChange={() => toggleOwnership("promoConsent")}
              />
              {t("team.certificate.checks.promoConsent")}
            </label>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-black">
          <div className="mb-4 text-sm font-extrabold uppercase tracking-[0.12em] text-neutral-900 dark:text-white">
            {t("team.final.title")}
          </div>

          <div className="space-y-3 text-sm text-neutral-800 dark:text-neutral-200">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={!!ownership?.termsAccepted}
                onChange={() => toggleOwnership("termsAccepted")}
              />
              <span>
                {t("team.final.terms")}{" "}
                <button
                  type="button"
                  onClick={() => setTermsOpen(true)}
                  className="font-semibold text-purple-600 underline"
                >
                  {t("team.final.termsLink")}
                </button>{" "}
                du festival.
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={!!ownership?.ageConfirmed}
                onChange={() => toggleOwnership("ageConfirmed")}
              />
              <span>{t("team.final.age")}</span>
            </label>
          </div>

          <div className="mt-6">
            <ReCAPTCHA
              sitekey={SITE_KEY}
              onChange={(token) => setCaptchaOk(token || "")}
              onExpired={() => setCaptchaOk("")}
            />
            <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-300">
              {t("team.final.captchaHelp")}
            </div>
          </div>

          {!canFinish ? (
            <div className="mt-5 text-sm text-red-600 dark:text-red-300">
              {t("team.final.missing")}
            </div>
          ) : (
            <div className="mt-5 text-sm font-semibold text-green-600">
              {t("team.final.ok")}
            </div>
          )}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onPrev}
            className="rounded-xl border border-purple-400 px-10 py-3 font-semibold text-purple-500"
          >
            {t("page.prev")}
          </button>
        </div>
      </div>
    </div>
  );
}
