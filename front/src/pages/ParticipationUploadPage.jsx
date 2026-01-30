import { useEffect, useState } from "react";
import DirectorForm from "../components/Form/Participation/ui/DirectorForm";
import VideoUploadForm from "../components/Form/Participation/ui/VideoUploadForm";

export default function ParticipationUploadPage() {
  //  Étape actuelle du formulaire
  // 1 = infos du réalisateur
  // 2 = upload de la vidéo
  const [step, setStep] = useState(1);

  //  Au chargement de la page :
  // on regarde si le profil réalisateur a déjà été rempli
  useEffect(() => {
    //  On récupère ce qui est stocké dans le navigateur
    const saved = localStorage.getItem("directorProfile");

    //  Si on trouve quelque chose :
    // ça veut dire que l’utilisateur a déjà rempli l’étape 1
    // donc on l’envoie directement à l’étape 2
    if (saved) setStep(2);
  }, []);

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* Titre de la page */}
        <h1 className="mb-10 text-center text-3xl font-semibold dark:text-white">
          FORMULAIRE DE PARTICIPATION
        </h1>

        {/*  Indicateur d’étapes (juste visuel)
            On met l’étape active en gras */}
        <div className="mb-8 flex items-center justify-center gap-3 text-sm">
          <span className={step === 1 ? "font-semibold" : "text-neutral-400"}>
            1. Réalisateur
          </span>
          <span className="text-neutral-300">→</span>
          <span className={step === 2 ? "font-semibold" : "text-neutral-400"}>
            2. Upload vidéo
          </span>
        </div>

        {/*  Ici on affiche UN SEUL formulaire à la fois
            selon l’étape courante */}
        {step === 1 ? (
          //  Étape 1 :
          // formulaire avec les infos du réalisateur
          // on passe une fonction "onNext" pour passer à l’étape 2
          <DirectorForm onNext={() => setStep(2)} />
        ) : (
          //  Étape 2 :
          // formulaire d’upload de la vidéo
          <div className="rounded-2xl bg-black p-6 md:p-10">
            {/* Bouton retour (facultatif) */}
            <div className="mb-6">
              <button
                type="button"
                //  Si on clique, on revient à l’étape 1
                onClick={() => setStep(1)}
                className="text-sm text-neutral-300 hover:text-white"
              >
                ← Retour profil réalisateur
              </button>
            </div>

            {/* Formulaire pour envoyer la vidéo */}
            <VideoUploadForm />
          </div>
        )}
      </div>
    </div>
  );
}
