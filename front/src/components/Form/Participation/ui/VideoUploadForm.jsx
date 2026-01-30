import { useEffect, useMemo, useState } from "react";
import { Field, TextInput, TextArea } from "./Field";


export default function VideoUploadForm() {
  const [files, setFiles] = useState({
    video: null,
    cover: null,
    stills: [],
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

  // Préremplir avec le profil blanc
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
      }));
    } catch (err) {
      console.warn("directorProfile invalide dans localStorage:", err);
    }
  }, []);

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function updateFile(e) {
    const { name, files: inputFiles } = e.target;
    if (!inputFiles) return;

    if (name === "stills") {
      setFiles((f) => ({ ...f, stills: Array.from(inputFiles).slice(0, 3) }));
    } else if (name === "subtitles") {
      setFiles((f) => ({ ...f, subtitles: Array.from(inputFiles) }));
    } else {
      setFiles((f) => ({ ...f, [name]: inputFiles[0] }));
    }
  }

  const canSubmit = useMemo(() => {
    const durationNum = Number(form.duration);

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
      files.video &&
      files.cover &&
      files.stills.length > 0 &&
      files.subtitles.length > 0
    );
  }, [form, files]);

  async function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      const fd = new FormData();

      // Champs texte
      Object.entries(form).forEach(([k, v]) => {
        if (v !== "" && v !== null && v !== undefined) fd.append(k, v);
      });

      // Fichiers (multer)
      fd.append("video", files.video);
      fd.append("cover", files.cover);
      files.stills.forEach((f) => fd.append("stills", f));
      files.subtitles.forEach((f) => fd.append("subtitles", f));

      const res = await fetch("/api/videos", {
        method: "POST",
        body: fd,
      });

      // Attention: si le serveur renvoie un HTML d’erreur, res.json() peut throw
      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        const msg =
          data?.details ||
          data?.error ||
          `Erreur upload (HTTP ${res.status})`;
        throw new Error(msg);
      }

      alert(`Upload OK ✅ (videoId: ${data.videoId})`);
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.message || "Erreur upload");
    }
  }

  return (
    <form onSubmit={submit} className="w-full text-white">
      <div className="space-y-12">
        <h2 className="text-center text-2xl font-semibold">MA VIDÉO</h2>

        {/* Identité */}
        <section className="space-y-6">
          <h3 className="text-purple-400 font-semibold">
            01. IDENTITÉ DU FILM
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Titre du court métrage" required>
              <TextInput
                name="title"
                value={form.title}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Traduction anglaise" required>
              <TextInput
                name="title_en"
                value={form.title_en}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Langue" required>
              <TextInput
                name="language"
                value={form.language}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Pays" required>
              <TextInput
                name="country"
                value={form.country}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Durée (en secondes)" required>
              <TextInput
                name="duration"
                value={form.duration}
                onChange={update}
                placeholder="120"
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Lien YouTube (optionnel)">
              <TextInput
                name="youtube_video_id"
                value={form.youtube_video_id}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Synopsis (original)" required>
              <TextArea
                name="synopsis"
                value={form.synopsis}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Synopsis (anglais)" required>
              <TextArea
                name="synopsis_en"
                value={form.synopsis_en}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>
          </div>
        </section>

        {/* Déclaration IA */}
        <section className="space-y-6">
          <h3 className="text-purple-400 font-semibold">
            02. DÉCLARATION USAGE IA
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Résumé technique" required>
              <TextArea
                name="tech_resume"
                value={form.tech_resume}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Méthodologie créative" required>
              <TextArea
                name="creative_resume"
                value={form.creative_resume}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>
          </div>

          <Field label="Outils IA utilisés" required>
            <TextInput
              name="ai_tech"
              value={form.ai_tech}
              onChange={update}
              className="bg-neutral-800 text-white placeholder:text-neutral-500"
            />
          </Field>
        </section>

        {/* Réalisateur */}
        <section className="space-y-6">
          <h3 className="text-purple-400 font-semibold">
            03. INFORMATIONS RÉALISATEUR
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Email" required>
              <TextInput
                name="email"
                value={form.email}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Civilité (Mr/Mrs)" required>
              <TextInput
                name="director_gender"
                value={form.director_gender}
                onChange={update}
                placeholder="Mr ou Mrs"
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Prénom" required>
              <TextInput
                name="director_name"
                value={form.director_name}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Nom" required>
              <TextInput
                name="director_lastname"
                value={form.director_lastname}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Date de naissance" required>
              <TextInput
                name="birthday"
                type="date"
                value={form.birthday}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Pays réalisateur" required>
              <TextInput
                name="director_country"
                value={form.director_country}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Adresse" required>
              <TextInput
                name="address"
                value={form.address}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Découverte" required>
              <TextInput
                name="discovery_source"
                value={form.discovery_source}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Mobile (optionnel)">
              <TextInput
                name="mobile_number"
                value={form.mobile_number}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>

            <Field label="Fixe (optionnel)">
              <TextInput
                name="home_number"
                value={form.home_number}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>
          </div>
        </section>

        {/* Fichiers */}
        <section className="space-y-6">
          <h3 className="text-purple-400 font-semibold">04. FICHIERS</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Vidéo" required>
              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={updateFile}
                className="w-full rounded-xl bg-neutral-800 p-3 text-sm"
              />
            </Field>

            <Field label="Cover" required>
              <input
                type="file"
                name="cover"
                accept="image/*"
                onChange={updateFile}
                className="w-full rounded-xl bg-neutral-800 p-3 text-sm"
              />
            </Field>

            <Field label="Stills (max 3)" required>
              <input
                type="file"
                name="stills"
                accept="image/*"
                multiple
                onChange={updateFile}
                className="w-full rounded-xl bg-neutral-800 p-3 text-sm"
              />
            </Field>

            <Field label="Sous-titres (.srt)" required>
              <input
                type="file"
                name="subtitles"
                accept=".srt"
                multiple
                onChange={updateFile}
                className="w-full rounded-xl bg-neutral-800 p-3 text-sm"
              />
            </Field>
          </div>
        </section>

        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-xl bg-purple-600 px-12 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            ENVOYER
          </button>
        </div>
      </div>
    </form>
  );
}
