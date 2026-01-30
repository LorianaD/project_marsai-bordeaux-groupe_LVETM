import { useEffect, useMemo, useState } from "react";
import { Field, TextInput, TextArea } from "./Field";

export default function VideoUploadForm() {
  //  Ici je stocke tous les fichiers que l’utilisateur va envoyer
  // - video = le fichier vidéo principal
  // - cover = l’image de couverture
  // - stills = plusieurs images (max 3)
  // - subtitles = plusieurs fichiers .srt
  const [files, setFiles] = useState({
    video: null,
    cover: null,
    stills: [],
    subtitles: [],
  });

  //  Ici je stocke tous les champs texte du formulaire
  // Tout ce que l’utilisateur tape dans les inputs, ça finit ici
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

  //  Au chargement du composant :
  // je regarde si j’ai déjà un "profil réalisateur" stocké dans le navigateur
  // (c’est pratique : ça évite de retaper email / prénom / nom)
  useEffect(() => {
    const saved = localStorage.getItem("directorProfile");
    if (!saved) return;

    try {
      //  On récupère l’objet stocké (c’est une string JSON)
      const p = JSON.parse(saved);

      //  On pré-remplit quelques champs du formulaire
      // On garde ce qui existe déjà, et on remplace seulement si on a une valeur
      setForm((f) => ({
        ...f,
        email: p.email || f.email,
        director_name: p.firstName || f.director_name,
        director_lastname: p.lastName || f.director_lastname,
        director_gender: p.gender || f.director_gender,
      }));
    } catch (err) {
      // 👉 Si le JSON est cassé / invalide, on ne bloque pas l’appli
      console.warn("directorProfile invalide dans localStorage:", err);
    }
  }, []);

  //  Fonction “update” :
  // Quand l’utilisateur tape dans un champ texte,
  // on récupère le name + value, et on met à jour form
  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  //  Fonction “updateFile” :
  // Quand l’utilisateur choisit un fichier, on le met dans "files"
  function updateFile(e) {
    const { name, files: inputFiles } = e.target;
    if (!inputFiles) return;

    //  Cas spécial : stills = plusieurs fichiers MAIS on limite à 3
    if (name === "stills") {
      setFiles((f) => ({ ...f, stills: Array.from(inputFiles).slice(0, 3) }));

      //  Cas spécial : subtitles = plusieurs fichiers (pas de limite ici)
    } else if (name === "subtitles") {
      setFiles((f) => ({ ...f, subtitles: Array.from(inputFiles) }));

      //  Cas classique : video / cover = 1 seul fichier
    } else {
      setFiles((f) => ({ ...f, [name]: inputFiles[0] }));
    }
  }

  //  “canSubmit” = est-ce qu’on a le droit d’envoyer ?
  // useMemo = on recalcule seulement quand form ou files change
  // Ici c’est une grosse checklist :
  // si un champ obligatoire manque -> canSubmit = false
  const canSubmit = useMemo(() => {
    //  duration vient d’un input, donc c’est une string
    // on la transforme en nombre pour vérifier que c’est valide
    const durationNum = Number(form.duration);

    return (
      // ----- champs film obligatoires -----
      form.title.trim() &&
      form.title_en.trim() &&
      form.synopsis.trim() &&
      form.synopsis_en.trim() &&
      form.language.trim() &&
      form.country.trim() &&
      Number.isFinite(durationNum) &&
      durationNum > 0 &&

      // ----- déclaration IA obligatoires -----
      form.tech_resume.trim() &&
      form.ai_tech.trim() &&
      form.creative_resume.trim() &&

      // ----- infos réal obligatoires -----
      form.email.trim() &&
      form.director_name.trim() &&
      form.director_lastname.trim() &&
      (form.director_gender === "Mr" || form.director_gender === "Mrs") &&
      form.birthday.trim() &&
      form.address.trim() &&
      form.director_country.trim() &&
      form.discovery_source.trim() &&

      // ----- fichiers obligatoires -----
      files.video &&
      files.cover &&
      files.stills.length > 0 &&
      files.subtitles.length > 0
    );
  }, [form, files]);

  //  Quand on envoie le formulaire
  async function submit(e) {
    e.preventDefault(); //  Empêche la page de se recharger
    if (!canSubmit) return; //  Si c’est pas valide, on n’envoie pas

    try {
      //  FormData = format spécial pour envoyer du texte + des fichiers
      const fd = new FormData();

      //  1) On ajoute tous les champs texte dans la FormData
      Object.entries(form).forEach(([k, v]) => {
        //  On évite d’envoyer des valeurs vides
        if (v !== "" && v !== null && v !== undefined) fd.append(k, v);
      });

      //  2) On ajoute les fichiers (côté serveur, souvent géré par multer)
      fd.append("video", files.video);
      fd.append("cover", files.cover);

      //  stills et subtitles peuvent avoir plusieurs fichiers :
      // on les append plusieurs fois avec le même nom
      files.stills.forEach((f) => fd.append("stills", f));
      files.subtitles.forEach((f) => fd.append("subtitles", f));

      //  3) On envoie au backend
      // Ici tu appelles /api/videos en POST avec la FormData
      const res = await fetch("/api/videos", {
        method: "POST",
        body: fd,
      });

      // ⚠️ Petite précaution :
      // Parfois le serveur renvoie une page HTML d’erreur au lieu de JSON,
      // donc res.json() peut planter
      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      //  Si la réponse n’est pas OK, on construit un message d’erreur propre
      if (!res.ok) {
        const msg =
          data?.details ||
          data?.error ||
          `Erreur upload (HTTP ${res.status})`;
        throw new Error(msg);
      }

      //  Si tout va bien : message de succès
      alert(`Upload OK ✅ (videoId: ${data.videoId})`);
    } catch (err) {
      //  Si ça plante : on log + on alerte l’utilisateur
      console.error("Upload error:", err);
      alert(err.message || "Erreur upload");
    }
  }

  return (
    //  Le formulaire complet
    // onSubmit appelle submit()
    <form onSubmit={submit} className="w-full text-white">
      <div className="space-y-12">
        <h2 className="text-center text-2xl font-semibold">MA VIDÉO</h2>

        {/* ===================== 01. Identité du film ===================== */}
        <section className="space-y-6">
          <h3 className="text-purple-400 font-semibold">
            01. IDENTITÉ DU FILM
          </h3>

          {/* Inputs “ligne 1” */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Titre du court métrage" required>
              <TextInput
                name="title"                //  correspond à form.title
                value={form.title}
                onChange={update}           //  met à jour form automatiquement
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

            {/* Optionnel */}
            <Field label="Lien YouTube (optionnel)">
              <TextInput
                name="youtube_video_id"
                value={form.youtube_video_id}
                onChange={update}
                className="bg-neutral-800 text-white placeholder:text-neutral-500"
              />
            </Field>
          </div>

          {/* Synopsys */}
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

        {/* ===================== 02. Déclaration IA ===================== */}
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

        {/* ===================== 03. Infos réalisateur ===================== */}
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

            {/* Optionnels */}
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

        {/* ===================== 04. Fichiers ===================== */}
        <section className="space-y-6">
          <h3 className="text-purple-400 font-semibold">04. FICHIERS</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Vidéo" required>
              <input
                type="file"
                name="video"              // 👉 va remplir files.video
                accept="video/*"
                onChange={updateFile}     // 👉 met à jour le state files
                className="w-full rounded-xl bg-neutral-800 p-3 text-sm"
              />
            </Field>

            <Field label="Cover" required>
              <input
                type="file"
                name="cover"              // 👉 va remplir files.cover
                accept="image/*"
                onChange={updateFile}
                className="w-full rounded-xl bg-neutral-800 p-3 text-sm"
              />
            </Field>

            <Field label="Stills (max 3)" required>
              <input
                type="file"
                name="stills"             // 👉 va remplir files.stills (tableau)
                accept="image/*"
                multiple                  // 👉 autorise plusieurs fichiers
                onChange={updateFile}
                className="w-full rounded-xl bg-neutral-800 p-3 text-sm"
              />
            </Field>

            <Field label="Sous-titres (.srt)" required>
              <input
                type="file"
                name="subtitles"          // 👉 va remplir files.subtitles (tableau)
                accept=".srt"
                multiple
                onChange={updateFile}
                className="w-full rounded-xl bg-neutral-800 p-3 text-sm"
              />
            </Field>
          </div>
        </section>

        {/*  Bouton envoyer
            - disabled si canSubmit = false
            - donc impossible d’envoyer si manque un champ/fichier */}
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
