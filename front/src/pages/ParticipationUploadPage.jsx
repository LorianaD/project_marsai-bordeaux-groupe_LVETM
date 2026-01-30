import { useEffect, useState } from "react";
import DirectorForm from "../components/Form/Participation/ui/DirectorForm";
import VideoUploadForm from "../components/Form/Participation/ui/VideoUploadForm";

export default function ParticipationUploadPage() {
  const [step, setStep] = useState(1);

  // Si un profil existe déjà, on peut démarrer direct à l’étape 2
  useEffect(() => {
    const saved = localStorage.getItem("directorProfile");
    if (saved) setStep(2);
  }, []);

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="mb-10 text-center text-3xl font-semibold dark:text-white">
          FORMULAIRE DE PARTICIPATION
        </h1>

        {/* barre étape simple */}
        <div className="mb-8 flex items-center justify-center gap-3 text-sm">
          <span className={step === 1 ? "font-semibold" : "text-neutral-400"}>
            1. Réalisateur
          </span>
          <span className="text-neutral-300">→</span>
          <span className={step === 2 ? "font-semibold" : "text-neutral-400"}>
            2. Upload vidéo
          </span>
        </div>

        {step === 1 ? (
          <DirectorForm onNext={() => setStep(2)} />
        ) : (
          <div className="rounded-2xl bg-black p-6 md:p-10">
            {/* Bouton retour optionnel */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-neutral-300 hover:text-white"
              >
                ← Retour profil réalisateur
              </button>
            </div>

            <VideoUploadForm />
          </div>
        )}
      </div>
    </div>
  );
}
