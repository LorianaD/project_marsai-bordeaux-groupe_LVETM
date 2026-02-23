import { useEffect, useMemo, useState } from "react";
import { Field, TextInput, TextArea, Select } from "./Field";
import TagInput from "./TagInput";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function VideoUploadForm({ formRef }) {
  // Etat des fichiers uploadés
  const [files, setFiles] = useState({
    video: null,
    cover: null,
    stills: [null, null, null],
    subtitles: [],
  });

  // Etat des champs texte du formulaire
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

  // Tags sauvegardés localement
  const [tags, setTags] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("video_tags") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  // Chargement des pays pour les selects
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesErr, setCountriesErr] = useState("");

  // Récupère la liste des pays
  useEffect(() => {
    let alive = true;

    async function loadCountries() {
      try {
        setCountriesLoading(true);
        setCountriesErr("");

        const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
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

  // Pré-remplit le formulaire avec le profil réalisateur
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

  // Met à jour les fichiers envoyés
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

  // Vérifie que tout est rempli avant l'envoi + validations (conditions/âge/captcha)
  const canSubmit = useMemo(() => {
    const durationNum = Number(form.duration);

    // 🔒 validations depuis l'étape "ownership" (TeamCompositionForm)
    let ownership = {};
    try {
      ownership = JSON.parse(localStorage.getItem("ownership") || "{}");
    } catch {}

    const termsOk = !!ownership?.termsAccepted;
    const ageOk = !!ownership?.ageConfirmed;
    const robotOk = !!ownership?.notRobot;

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
  }, [form, files]);

  // Envoie les données au backend
  async function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        if (v !== "" && v !== null && v !== undefined) fd.append(k, v);
      });

      const safeTags = Array.isArray(tags) ? tags : [];
      localStorage.setItem("video_tags", JSON.stringify(safeTags));
      fd.append("tags", JSON.stringify(safeTags));

      

      let contributors = [];
      let ownership = {};

      try {
        const saved = JSON.parse(localStorage.getItem("contributors") || "[]");
        contributors = Array.isArray(saved) ? saved : [];
      } catch {}

      try {
        ownership = JSON.parse(localStorage.getItem("ownership") || "{}");
      } catch {}

      fd.append("contributors", JSON.stringify(contributors));
      fd.append("ownership_certified", ownership?.ownershipCertified ? "1" : "0");
      fd.append("promo_consent", ownership?.promoConsent ? "1" : "0");

      // ✅ nouvelles validations
      fd.append("terms_accepted", ownership?.termsAccepted ? "1" : "0");
      fd.append("age_confirmed", ownership?.ageConfirmed ? "1" : "0");
      fd.append("human_verified", ownership?.notRobot ? "1" : "0");

      fd.append("video", files.video);
      fd.append("cover", files.cover);

      files.stills.forEach((f) => {
        if (f) fd.append("stills", f);
      });

      files.subtitles.forEach((f) => fd.append("subtitles", f));

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

      alert(`Upload OK (videoId: ${data.videoId})`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Erreur upload");
    }
  }

  const inputClass =
    "bg-[#E9E9EA] text-neutral-800 placeholder:text-neutral-500 " +
    "dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400";

  return (
    <form ref={formRef} onSubmit={submit} className="w-full">
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
            </Field>

            <Field label="Traduction anglaise" required>
              <TextInput
                name="title_en"
                value={form.title_en}
                onChange={update}
                className={inputClass}
              />
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
            </Field>

            <Field label="Durée (en secondes)" required>
              <TextInput
                name="duration"
                value={form.duration}
                onChange={update}
                placeholder="60"
                className={inputClass}
              />
            </Field>

            <Field label="Lien YouTube (optionnel)">
              <TextInput
                name="youtube_video_id"
                value={form.youtube_video_id}
                onChange={update}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Tags (optionnel)">
            <TagInput value={tags} onChange={setTags} />
          </Field>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Synopsis (original)" required>
              <TextArea
                name="synopsis"
                value={form.synopsis}
                onChange={update}
                className={inputClass}
              />
            </Field>

            <Field label="Synopsis (anglais)" required>
              <TextArea
                name="synopsis_en"
                value={form.synopsis_en}
                onChange={update}
                className={inputClass}
              />
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
            </Field>

            <Field label="Méthodologie créative" required>
              <TextArea
                name="creative_resume"
                value={form.creative_resume}
                onChange={update}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Outils IA utilisés" required>
            <TextInput
              name="ai_tech"
              value={form.ai_tech}
              onChange={update}
              className={inputClass}
            />
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
                className={[
                  "w-full rounded-2xl p-4 text-sm outline-none transition",
                  "bg-[#E9E9EA] text-neutral-700",
                  "dark:bg-neutral-800 dark:text-white",
                ].join(" ")}
              />
            </Field>

            <Field label="Cover" required>
              <input
                type="file"
                name="cover"
                accept="image/*"
                onChange={updateFile}
                className={[
                  "w-full rounded-2xl p-4 text-sm outline-none transition",
                  "bg-[#E9E9EA] text-neutral-700",
                  "dark:bg-neutral-800 dark:text-white",
                ].join(" ")}
              />
            </Field>

            <Field label="Still 1" required>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => updateStill(0, e.target.files?.[0])}
                className={[
                  "w-full rounded-2xl p-4 text-sm outline-none transition",
                  "bg-[#E9E9EA] text-neutral-700",
                  "dark:bg-neutral-800 dark:text-white",
                ].join(" ")}
              />
            </Field>

            <Field label="Still 2 (optionnel)">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => updateStill(1, e.target.files?.[0])}
                className={[
                  "w-full rounded-2xl p-4 text-sm outline-none transition",
                  "bg-[#E9E9EA] text-neutral-700",
                  "dark:bg-neutral-800 dark:text-white",
                ].join(" ")}
              />
            </Field>

            <Field label="Still 3 (optionnel)">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => updateStill(2, e.target.files?.[0])}
                className={[
                  "w-full rounded-2xl p-4 text-sm outline-none transition",
                  "bg-[#E9E9EA] text-neutral-700",
                  "dark:bg-neutral-800 dark:text-white",
                ].join(" ")}
              />
            </Field>

            <Field label="Sous-titres (.srt)" required>
              <input
                type="file"
                name="subtitles"
                accept=".srt"
                multiple
                onChange={updateFile}
                className={[
                  "w-full rounded-2xl p-4 text-sm outline-none transition",
                  "bg-[#E9E9EA] text-neutral-700",
                  "dark:bg-neutral-800 dark:text-white",
                ].join(" ")}
              />
            </Field>
          </div>
        </section>

        <div className="flex justify-center pt-2">
          <button type="submit" className="hidden">
            ENVOYER
          </button>
        </div>
      </div>
    </form>
  );
}
