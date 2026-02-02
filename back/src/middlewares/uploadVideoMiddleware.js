// J’importe les hooks React dont j’ai besoin pour gérer l’état et les effets
import { useEffect, useMemo, useState } from "react";

// J’importe mes composants de champs (inputs stylés)
import { Field, TextInput, TextArea, Select } from "./Field";

// J’utilise l’URL du backend depuis le .env
const API_URL = import.meta.env.VITE_API_URL;

export default function VideoUploadForm() {

  // Ici je stocke tous les fichiers envoyés par l’utilisateur
  // video = le film
  // cover = l’image principale
  // stills = 3 images possibles (1 obligatoire, 2 optionnelles)
  // subtitles = fichiers .srt
  const [files, setFiles] = useState({
    video: null,
    cover: null,
    stills: [null, null, null],
    subtitles: [],
  });

  // Ici je stocke tous les champs texte du formulaire
  // Chaque input correspond à une clé ici
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

  // Ici je stocke la liste des pays récupérée depuis une API externe
  const [countries, setCountries] = useState([]);

  // Ces états servent juste à savoir si la liste charge ou si elle a échoué
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesErr, setCountriesErr] = useState("");

  // Au chargement du formulaire, je vais chercher la liste des pays
  useEffect(() => {
    let alive = true;

    async function loadCountries() {
      try {
        setCountriesLoading(true);

        // J’appelle l’API des pays
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data = await res.json();

        // Je transforme la réponse en simple tableau de noms
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

  // Ici je relis le profil réalisateur stocké à l’étape précédente
  // Ça évite à l’utilisateur de retaper ses infos
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
    } catch {
      // si le localStorage est cassé, on ignore
    }
  }, []);

  // Cette fonction met à jour les champs texte quand on tape dedans
  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Cette fonction gère les fichiers (video, cover, subtitles)
  function updateFile(e) {
    const { name, files: inputFiles } = e.target;
    if (!inputFiles) return;

    if (name === "subtitles") {
      setFiles((f) => ({ ...f, subtitles: Array.from(inputFiles) }));
    } else {
      setFiles((f) => ({ ...f, [name]: inputFiles[0] }));
    }
  }

  // Cette fonction gère un still à la fois (still 1, 2 ou 3)
  function updateStill(index, file) {
    setFiles((f) => {
      const next = [...f.stills];
      next[index] = file || null;
      return { ...f, stills: next };
    });
  }

  // Ici je vérifie si le formulaire est valide ou non
  // Si un champ obligatoire manque, le bouton ENVOYER est désactivé
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
      form.birthday.trim() &&
      form.address.trim() &&
      form.director_country.trim() &&
      form.discovery_source.trim() &&
      form.mobile_number.trim() &&      // mobile obligatoire
      files.video &&
      files.cover &&
      files.stills.some(Boolean) &&      // au moins 1 image still
      files.subtitles.length > 0
    );
  }, [form, files]);

  // Cette fonction s’exécute quand on clique sur ENVOYER
  async function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      // FormData permet d’envoyer texte + fichiers
      const fd = new FormData();

      // J’ajoute tous les champs texte
      Object.entries(form).forEach(([k, v]) => {
        if (v) fd.append(k, v);
      });

      // J’ajoute les fichiers
      fd.append("video", files.video);
      fd.append("cover", files.cover);

      // J’envoie seulement les stills présents
      files.stills.forEach((f) => {
        if (f) fd.append("stills", f);
      });

      files.subtitles.forEach((f) => fd.append("subtitles", f));

      // J’envoie le tout au backend
      const res = await fetch(`${API_URL}/api/videos`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Erreur upload");
      }

      alert(`Upload OK ✅ (videoId: ${data.videoId})`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Erreur upload");
    }
  }

  // JSX = affichage du formulaire
  return (
    <form onSubmit={submit} className="w-full text-white">
      {/* le reste est uniquement de l’affichage */}
    </form>
  );
}
