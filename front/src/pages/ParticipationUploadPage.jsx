import { useEffect, useState } from "react";
import {
  DirectorForm,
  VideoUploadForm,
  TeamCompositionForm,
} from "../components/Form/Participation/ui";

export default function ParticipationUploadPage() {
  //  Étape actuelle du formulaire
  // 1 = infos du réalisateur
  // 2 = upload de la vidéo
  // 3 = équipe + certificat
  const [step, setStep] = useState(1);

  //  Au chargement de la page :
  // on regarde si le profil réalisateur a déjà été rempli (et COMPLET)
  useEffect(() => {
    const saved = localStorage.getItem("directorProfile");
    if (!saved) return;

    try {
      const p = JSON.parse(saved);

      const isComplete =
        p.email &&
        p.firstName &&
        p.lastName &&
        p.gender &&
        p.birthday &&
        p.address &&
        p.director_country &&
        p.discovery_source;

      if (isComplete) setStep(2);
    } catch {
      // JSON cassé → on ignore et on reste à l’étape 1
    }
  }, []);

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="mb-10 text-center text-3xl font-semibold dark:text-white">
          FORMULAIRE DE PARTICIPATION
        </h1>

        <div className="mb-8 flex items-center justify-center gap-3 text-sm">
          <span className={step === 1 ? "font-semibold" : "text-neutral-400"}>
            1. Réalisateur
          </span>
          <span className="text-neutral-300">→</span>
          <span className={step === 2 ? "font-semibold" : "text-neutral-400"}>
            2. Upload vidéo
          </span>
          <span className="text-neutral-300">→</span>
          <span className={step === 3 ? "font-semibold" : "text-neutral-400"}>
            3. Équipe & certificat
          </span>
        </div>

        {step === 1 && <DirectorForm onNext={() => setStep(2)} />}

        {step === 2 && (
          <div className="rounded-2xl bg-white p-6 md:p-10 text-neutral-900 dark:bg-black dark:text-white">
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              >
                ← Retour profil réalisateur
              </button>
            </div>

            <VideoUploadForm />

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="rounded-xl bg-purple-600 px-12 py-3 font-semibold text-white"
              >
                SUIVANT →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <TeamCompositionForm onPrev={() => setStep(2)} />
        )}
      </div>
    </div>
  );
}
