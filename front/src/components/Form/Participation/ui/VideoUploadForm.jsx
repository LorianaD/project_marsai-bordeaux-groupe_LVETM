import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, TextInput, TextArea, Select } from "./Field";
import TagInput from "./TagInput";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function ModalShell({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[99999]">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Fermer"
      />
      <div className="absolute left-1/2 top-1/2 w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/10">
        <div className="flex items-center justify-between gap-3 border-b border-neutral-200 px-6 py-4">
          <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-neutral-900">
            {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
          >
            Fermer
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function VideoUploadForm({ formRef }) {
  const navigate = useNavigate();
  const DRAFT_KEY = "videoUploadDraft";

  // ✅ ref interne vers le vrai <form>
  const internalFormRef = useRef(null);

  const [files, setFiles] = useState({
    video: null,
    cover: null,
    stills: [null, null, null],
    subtitles: [],
  });

  const [form, setForm] = useState({
    youtube_video_id: "",
    title: "",
    title_en: "",
    synopsis: "",
    synopsis_en: "",
    language: "",
    country: "",
    duration: "",
    tech_resume: "",
    ai_tech: "",
    creative_resume: "",
    email: "",
    director_name: "",
    director_lastname: "",
    director_gender: "Mr",
    birthday: "",
    mobile_number: "",
    home_number: "",
    address: "",
    director_country: "",
    discovery_source: "",
  });

  const [tags, setTags] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("video_tags") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesErr, setCountriesErr] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successInfo, setSuccessInfo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // anti double ouverture / double clic
  const submitRequestedRef = useRef(false);

  useEffect(() => {
    let alive = true;

    async function loadCountries() {
      try {
        setCountriesLoading(true);
        setCountriesErr("");

        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name",
        );
        const data = await res.json();

        const list = Array.isArray(data)
          ? data
              .map((c) => c?.name?.common)
              .filter(Boolean)
              .sort((a, b) => a.localeCompare(b, "fr"))
          : [];

        if (alive) setCountries(list);
      } catch {
        if (alive) setCountriesErr("Impossible de charger la liste des pays.");
      } finally {
        if (alive) setCountriesLoading(false);
      }
    }

    loadCountries();
    return () => {
      alive = false;
    };
  }, []);

  // restore draft
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (!savedDraft) return;

    try {
      const d = JSON.parse(savedDraft);
      if (d?.form) setForm((f) => ({ ...f, ...d.form }));
      if (Array.isArray(d?.tags)) setTags(d.tags);
    } catch {}
  }, []);

  // autosave draft
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ form, tags }));
  }, [form, tags]);

  // pré-remplissage depuis directorProfile
  useEffect(() => {
    const saved = localStorage.getItem("directorProfile");
    if (!saved) return;

    try {
      const p = JSON.parse(saved);

      setForm((f) => ({
        ...f,
        email: p.email || f.email,
        director_name: p.firstName || f.director_name,
        director_lastname: p.lastName || f.director_lastname,
        director_gender: p.gender || f.director_gender,
        birthday: p.birthday || f.birthday,
        address: p.address || f.address,
        director_country: p.director_country || f.director_country,
        discovery_source: p.discovery_source || f.discovery_source,
        mobile_number: p.mobile_number || f.mobile_number,
        home_number: p.home_number || f.home_number,
      }));
    } catch {}
  }, []);

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function updateFile(e) {
    const { name, files: inputFiles } = e.target;
    if (!inputFiles) return;

    if (name === "subtitles") {
      setFiles((f) => ({ ...f, subtitles: Array.from(inputFiles) }));
    } else {
      setFiles((f) => ({ ...f, [name]: inputFiles[0] }));
    }
  }

  function updateStill(index, file) {
    setFiles((f) => {
      const next = [...f.stills];
      next[index] = file || null;
      return { ...f, stills: next };
    });
  }

  function getFreshOwnership() {
    try {
      return JSON.parse(localStorage.getItem("ownership") || "{}");
    } catch {
      return {};
    }
  }

  // ✅ IMPORTANT: calcule canSubmit avec ownership fresh à chaque render
  function computeCanSubmit(ownershipObj) {
    const durationNum = Number(form.duration);

    const termsOk = !!ownershipObj?.termsAccepted;
    const ageOk = !!ownershipObj?.ageConfirmed;
    const robotOk = !!ownershipObj?.recaptchaToken;

    return (
      form.title.trim() &&
      form.title_en.trim() &&
      form.synopsis.trim() &&
      form.synopsis_en.trim() &&
      form.language.trim() &&
      form.country.trim() &&
      Number.isFinite(durationNum) &&
      durationNum > 0 &&
      form.tech_resume.trim() &&
      form.ai_tech.trim() &&
      form.creative_resume.trim() &&
      form.email.trim() &&
      form.director_name.trim() &&
      form.director_lastname.trim() &&
      (form.director_gender === "Mr" || form.director_gender === "Mrs") &&
      form.birthday.trim() &&
      form.address.trim() &&
      form.director_country.trim() &&
      form.discovery_source.trim() &&
      form.mobile_number.trim() &&
      files.video &&
      files.cover &&
      files.stills[0] &&
      files.subtitles.length > 0 &&
      termsOk &&
      ageOk &&
      robotOk
    );
  }

  const canSubmit = computeCanSubmit(getFreshOwnership());

  // ✅ expose API au parent (step 3)
  useEffect(() => {
    if (!formRef) return;

    formRef.current = {
      openConfirm: () => {
        if (uploading) return;
        if (submitRequestedRef.current) return;

        const okNow = computeCanSubmit(getFreshOwnership());
        if (!okNow) {
          setErrorMsg(
            "Il manque des champs ou des validations (cases + captcha).",
          );
          return;
        }

        submitRequestedRef.current = true;
        setConfirmOpen(true);
      },
      requestSubmit: () => internalFormRef.current?.requestSubmit?.(),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formRef, uploading, form, files]);

  const inputClass =
    "bg-[#E9E9EA] text-neutral-900 placeholder:text-neutral-500 " +
    "focus:bg-[#E9E9EA] focus:text-neutral-900 " +
    "dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400 " +
    "dark:focus:bg-neutral-800 dark:focus:text-white";

  const help = "mt-2 text-xs italic text-neutral-500 dark:text-neutral-300";

  async function doUpload() {
    if (uploading) return;

    const ownershipFresh = getFreshOwnership();
    const canSubmitNow = computeCanSubmit(ownershipFresh);

    if (!canSubmitNow) {
      setErrorMsg("Il manque des champs ou des validations (cases + captcha).");
      submitRequestedRef.current = false;
      return;
    }

    setErrorMsg("");
    setUploading(true);

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        if (v !== "" && v !== null && v !== undefined) fd.append(k, v);
      });

      const safeTags = Array.isArray(tags) ? tags : [];
      localStorage.setItem("video_tags", JSON.stringify(safeTags));
      fd.append("tags", JSON.stringify(safeTags));

      let contributors = [];
      try {
        const saved = JSON.parse(localStorage.getItem("contributors") || "[]");
        contributors = Array.isArray(saved) ? saved : [];
      } catch {}

      fd.append("contributors", JSON.stringify(contributors));
      fd.append(
        "ownership_certified",
        ownershipFresh?.ownershipCertified ? "1" : "0",
      );
      fd.append("promo_consent", ownershipFresh?.promoConsent ? "1" : "0");
      fd.append("terms_accepted", ownershipFresh?.termsAccepted ? "1" : "0");
      fd.append("age_confirmed", ownershipFresh?.ageConfirmed ? "1" : "0");

      const recaptchaToken = ownershipFresh?.recaptchaToken || "";
      if (!recaptchaToken) throw new Error("Captcha manquant");
      fd.append("recaptcha_token", recaptchaToken);

      fd.append("video", files.video);
      fd.append("cover", files.cover);

      files.stills.forEach((f) => {
        if (f) fd.append("stills", f);
      });

      files.subtitles.forEach((f) => fd.append("subtitles", f));

      // ✅ IMPORTANT: pas de header custom => pas de CORS bloquant
      const res = await fetch(`${API_URL}/api/videos`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.details || data?.error || `Erreur upload (${res.status})`,
        );
      }

      setSuccessInfo(`Upload OK (videoId: ${data?.videoId || "—"})`);
      setSuccessOpen(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.message || "Erreur upload");
      submitRequestedRef.current = false;
    } finally {
      setUploading(false);
    }
  }

  function submit(e) {
    e.preventDefault();
    if (uploading) return;

    if (submitRequestedRef.current) return;

    const okNow = computeCanSubmit(getFreshOwnership());
    if (!okNow) {
      setErrorMsg("Il manque des champs ou des validations (cases + captcha).");
      return;
    }

    submitRequestedRef.current = true;
    setConfirmOpen(true);
  }

  return (
    <>
      <ModalShell
        open={confirmOpen}
        title="Confirmez-vous l’envoi ?"
        onClose={() => {
          if (uploading) return;
          setConfirmOpen(false);
          submitRequestedRef.current = false;
        }}
      >
        <div className="space-y-4 text-sm text-neutral-800">
          <p>Confirmez-vous l’envoi de votre vidéo ?</p>
          <p className="text-xs text-neutral-500">
            Une fois l’upload lancé, ne fermez pas la page jusqu’à la fin.
          </p>

          {errorMsg ? (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
              {errorMsg}
            </div>
          ) : null}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                if (uploading) return;
                setConfirmOpen(false);
                submitRequestedRef.current = false;
              }}
              className="rounded-xl border border-neutral-300 px-5 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
              disabled={uploading}
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={async () => {
                setConfirmOpen(false);
                await doUpload();
              }}
              className="rounded-xl bg-[#7C3AED] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? "Envoi..." : "Oui, envoyer"}
            </button>
          </div>
        </div>
      </ModalShell>

      <ModalShell
        open={successOpen}
        title="Upload terminé"
        onClose={() => {
          setSuccessOpen(false);
          navigate("/", { replace: true });
        }}
      >
        <div className="space-y-4 text-sm text-neutral-800">
          <div className="rounded-xl bg-green-50 p-3 text-green-700 ring-1 ring-green-100">
            ✅ {successInfo || "Upload OK"}
          </div>
          <p className="text-xs text-neutral-500">
            Cliquez sur OK pour revenir à l’accueil.
          </p>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => {
                setSuccessOpen(false);
                navigate("/", { replace: true });
              }}
              className="rounded-xl bg-neutral-900 px-5 py-2 text-sm font-semibold text-white"
            >
              OK
            </button>
          </div>
        </div>
      </ModalShell>

      <form ref={internalFormRef} onSubmit={submit} className="w-full">
        <div className="space-y-12 text-neutral-900 dark:text-white">
          <h2 className="text-center text-2xl font-semibold">MA VIDÉO</h2>

          <section className="space-y-6">
            <h3 className="font-semibold text-purple-500">
              01. IDENTITÉ DU FILM
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label="Titre du court métrage" required>
                <TextInput
                  name="title"
                  value={form.title}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>Titre original (langue du film).</div>
              </Field>

              <Field label="Traduction anglaise" required>
                <TextInput
                  name="title_en"
                  value={form.title_en}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>Titre en anglais (obligatoire).</div>
              </Field>

              <Field label="Langue" required>
                <Select
                  name="language"
                  value={form.language}
                  onChange={update}
                  className={inputClass}
                >
                  <option value="">Choisir une langue</option>
                  <option value="fr">Français</option>
                  <option value="en">Anglais</option>
                  <option value="es">Espagnol</option>
                  <option value="it">Italien</option>
                  <option value="de">Allemand</option>
                  <option value="pt">Portugais</option>
                  <option value="ar">Arabe</option>
                  <option value="nl">Néerlandais</option>
                  <option value="ru">Russe</option>
                  <option value="zh">Chinois</option>
                  <option value="ja">Japonais</option>
                  <option value="ko">Coréen</option>
                </Select>
                <div className={help}>
                  Langue principale des dialogues / narration.
                </div>
              </Field>

              <Field label="Pays" required>
                <Select
                  name="country"
                  value={form.country}
                  onChange={update}
                  disabled={countriesLoading || !!countriesErr}
                  className={inputClass}
                >
                  <option value="">
                    {countriesLoading
                      ? "Chargement des pays…"
                      : countriesErr
                        ? "Erreur de chargement"
                        : "Choisir un pays"}
                  </option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>

                {countriesErr ? (
                  <div className="mt-2 text-xs text-red-500 dark:text-red-200">
                    {countriesErr}
                  </div>
                ) : null}

                <div className={help}>
                  Pays de production (ou pays principal du projet).
                </div>
              </Field>

              <Field label="Durée (en secondes)" required>
                <TextInput
                  name="duration"
                  value={form.duration}
                  onChange={update}
                  placeholder="60"
                  className={inputClass}
                />
                <div className={help}>Ex : 60 (en secondes).</div>
              </Field>

              <Field label="Lien YouTube (optionnel)">
                <TextInput
                  name="youtube_video_id"
                  value={form.youtube_video_id}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>Optionnel (lien YouTube).</div>
              </Field>
            </div>

            <Field label="Tags (optionnel)">
              <TagInput value={tags} onChange={setTags} />
              <div className={help}>
                Ex : Sci-fi, AI, Drama… (aide à la recherche).
              </div>
            </Field>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label="Synopsis (original)" required>
                <TextArea
                  name="synopsis"
                  value={form.synopsis}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>
                  Résumé clair, 2–6 phrases idéalement.
                </div>
              </Field>

              <Field label="Synopsis (anglais)" required>
                <TextArea
                  name="synopsis_en"
                  value={form.synopsis_en}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>Version anglaise obligatoire.</div>
              </Field>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="font-semibold text-purple-500">
              02. DÉCLARATION USAGE IA
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label="Résumé technique" required>
                <TextArea
                  name="tech_resume"
                  value={form.tech_resume}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>
                  Comment l’IA a été utilisée techniquement.
                </div>
              </Field>

              <Field label="Méthodologie créative" required>
                <TextArea
                  name="creative_resume"
                  value={form.creative_resume}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>
                  Ton processus créatif (étapes, workflow, intention).
                </div>
              </Field>
            </div>

            <Field label="Outils IA utilisés" required>
              <TextInput
                name="ai_tech"
                value={form.ai_tech}
                onChange={update}
                className={inputClass}
              />
              <div className={help}>Liste des outils IA (virgules).</div>
            </Field>
          </section>

          <section className="space-y-6">
            <h3 className="font-semibold text-purple-500">04. FICHIERS</h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label="Vidéo" required>
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={updateFile}
                  disabled={uploading}
                  className={[
                    "w-full rounded-2xl p-4 text-sm outline-none transition",
                    "bg-[#E9E9EA] text-neutral-700",
                    "dark:bg-neutral-800 dark:text-white",
                    uploading ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                />
                <div className={help}>Fichier vidéo final (mp4 conseillé).</div>
              </Field>

              <Field label="Cover" required>
                <input
                  type="file"
                  name="cover"
                  accept="image/*"
                  onChange={updateFile}
                  disabled={uploading}
                  className={[
                    "w-full rounded-2xl p-4 text-sm outline-none transition",
                    "bg-[#E9E9EA] text-neutral-700",
                    "dark:bg-neutral-800 dark:text-white",
                    uploading ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                />
                <div className={help}>Vignette principale (jpg/png).</div>
              </Field>

              <Field label="Still 1" required>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateStill(0, e.target.files?.[0])}
                  disabled={uploading}
                  className={[
                    "w-full rounded-2xl p-4 text-sm outline-none transition",
                    "bg-[#E9E9EA] text-neutral-700",
                    "dark:bg-neutral-800 dark:text-white",
                    uploading ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                />
                <div className={help}>Image fixe obligatoire.</div>
              </Field>

              <Field label="Still 2 (optionnel)">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateStill(1, e.target.files?.[0])}
                  disabled={uploading}
                  className={[
                    "w-full rounded-2xl p-4 text-sm outline-none transition",
                    "bg-[#E9E9EA] text-neutral-700",
                    "dark:bg-neutral-800 dark:text-white",
                    uploading ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                />
                <div className={help}>Optionnel.</div>
              </Field>

              <Field label="Still 3 (optionnel)">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateStill(2, e.target.files?.[0])}
                  disabled={uploading}
                  className={[
                    "w-full rounded-2xl p-4 text-sm outline-none transition",
                    "bg-[#E9E9EA] text-neutral-700",
                    "dark:bg-neutral-800 dark:text-white",
                    uploading ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                />
                <div className={help}>Optionnel.</div>
              </Field>

              <Field label="Sous-titres (.srt)" required>
                <input
                  type="file"
                  name="subtitles"
                  accept=".srt"
                  multiple
                  onChange={updateFile}
                  disabled={uploading}
                  className={[
                    "w-full rounded-2xl p-4 text-sm outline-none transition",
                    "bg-[#E9E9EA] text-neutral-700",
                    "dark:bg-neutral-800 dark:text-white",
                    uploading ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                />
                <div className={help}>Ajoute au moins un .srt.</div>
              </Field>
            </div>
          </section>

          <div className="flex justify-center pt-2">
            <button type="submit" className="hidden" disabled={uploading}>
              ENVOYER
            </button>
          </div>

          {errorMsg ? (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
              {errorMsg}
            </div>
          ) : null}
        </div>
      </form>
    </>
  );
}
