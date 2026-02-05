import { useEffect, useRef, useState } from "react";
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

  // ✅ ref vers le <form> du VideoUploadForm
  const videoFormRef = useRef(null);

  // ✅ AJOUT : état pour activer/désactiver le bouton ENVOYER
  // On doit empêcher l’envoi si ownershipCertified n’est pas coché
  const [ownershipCertified, setOwnershipCertified] = useState(false);

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
      // JSON cassé → on ignore
    }
  }, []);

  // ✅ AJOUT : on lit ownershipCertified depuis localStorage
  // Et on le met à jour en direct quand TeamCompositionForm coche/décoche
  useEffect(() => {
    function syncOwnershipCertified() {
      try {
        const ownership = JSON.parse(localStorage.getItem("ownership") || "{}");
        setOwnershipCertified(!!ownership?.ownershipCertified);
      } catch {
        setOwnershipCertified(false);
      }
    }

    // ✅ Lecture initiale
    syncOwnershipCertified();

    // ✅ ASTUCE : comme "storage" ne se déclenche pas toujours dans le même onglet,
    // on écoute aussi un petit "poll" léger seulement quand on est en step 3
    // (c’est super fiable et ça coûte presque rien)
    let intervalId = null;

    if (step === 3) {
      intervalId = setInterval(syncOwnershipCertified, 250);
    }

    // ✅ On garde aussi storage (utile si changement dans un autre onglet)
    window.addEventListener("storage", syncOwnershipCertified);

    return () => {
      window.removeEventListener("storage", syncOwnershipCertified);
      if (intervalId) clearInterval(intervalId);
    };
  }, [step]);

  // ✅ submit final déclenché depuis l’étape 3
  function submitVideoFromStep3() {
    // ✅ AJOUT : sécurité UX → si pas certifié, on ne fait rien
    if (!ownershipCertified) return;

    if (videoFormRef.current?.requestSubmit) {
      videoFormRef.current.requestSubmit();
      return;
    }
    if (videoFormRef.current?.submit) {
      videoFormRef.current.submit();
    }
  }

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

        {/* ✅ IMPORTANT : on garde VideoUploadForm monté en step 2 ET step 3
            pour ne PAS perdre les fichiers sélectionnés */}
        {(step === 2 || step === 3) && (
          <div className={step === 3 ? "hidden" : ""}>
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

              {/* ✅ VideoUploadForm reste le même composant -> les fichiers restent */}
              <VideoUploadForm formRef={videoFormRef} />

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
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <TeamCompositionForm onPrev={() => setStep(2)} />

            <div className="flex justify-center">
              <button
                type="button"
                onClick={submitVideoFromStep3}
                disabled={!ownershipCertified}
                className={[
                  "rounded-xl px-12 py-3 font-semibold text-white transition",
                  ownershipCertified
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "cursor-not-allowed bg-purple-300 opacity-60",
                ].join(" ")}
                title={
                  ownershipCertified
                    ? "Envoyer la participation"
                    : "Veuillez certifier la propriété pour envoyer"
                }
              >
                ENVOYER
              </button>
            </div>

            {/* ✅ AJOUT : petit message d’aide (optionnel mais utile) */}
            {!ownershipCertified ? (
              <div className="text-center text-sm text-neutral-500 dark:text-neutral-300">
                Coche “Je certifie être l’auteur…” pour activer le bouton ENVOYER.
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
