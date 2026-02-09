import { useEffect, useRef, useState } from "react";
import {
  DirectorForm,
  VideoUploadForm,
  TeamCompositionForm,
} from "../components/Form/Participation/ui";

export default function ParticipationUploadPage() {
  // Step courant du parcours (1: réalisateur, 2: upload, 3: équipe + certificat)
  const [step, setStep] = useState(1);

  // Référence vers le form vidéo pour pouvoir déclencher l’envoi depuis le step 3
  const videoFormRef = useRef(null);

  // État du certificat (active/désactive le bouton ENVOYER)
  const [ownershipCertified, setOwnershipCertified] = useState(false);

  // Au montage: si le profil réalisateur est déjà complet en localStorage, on saute au step 2
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
      // Données invalides: on ignore
    }
  }, []);

  // Synchronise ownershipCertified depuis localStorage (et écoute les changements)
  useEffect(() => {
    function syncOwnershipCertified() {
      try {
        const ownership = JSON.parse(localStorage.getItem("ownership") || "{}");
        setOwnershipCertified(!!ownership?.ownershipCertified);
      } catch {
        setOwnershipCertified(false);
      }
    }

    // Sync immédiate à l’entrée dans la page / changement de step
    syncOwnershipCertified();

    // En step 3, on poll pour capter les changements même si le composant enfant n’émet rien
    let intervalId = null;
    if (step === 3) {
      intervalId = setInterval(syncOwnershipCertified, 250);
    }

    // Couvre les changements venant d’un autre onglet/fenêtre
    window.addEventListener("storage", syncOwnershipCertified);

    // Nettoyage: stop interval + remove listener
    return () => {
      window.removeEventListener("storage", syncOwnershipCertified);
      if (intervalId) clearInterval(intervalId);
    };
  }, [step]);

  // Déclenche l’envoi du formulaire vidéo depuis le step 3 (si certificat validé)
  function submitVideoFromStep3() {
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

        {/* Indicateur visuel du step courant */}
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

        {/* Un seul bloc: le contenu change selon step */}
        <div>
          {/* Step 1: formulaire réalisateur */}
          {step === 1 && <DirectorForm onNext={() => setStep(2)} />}

          {/* Step 2/3: le formulaire vidéo reste monté pour conserver les fichiers sélectionnés */}
          {(step === 2 || step === 3) && (
            <div className={step === 3 ? "hidden" : ""}>
              <div className="rounded-2xl bg-white p-6 md:p-10 text-neutral-900 dark:bg-black dark:text-white">
                <VideoUploadForm formRef={videoFormRef} />

                {/* Navigation step 2 */}
                <div className="mt-10 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-purple-400 px-10 py-3 font-semibold text-purple-500"
                  >
                    PRÉCÉDENT
                  </button>

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

          {/* Step 3: composition équipe + bouton d’envoi qui soumet le form vidéo */}
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

              {/* Message d’aide si le certificat n’est pas validé */}
              {!ownershipCertified ? (
                <div className="text-center text-sm text-neutral-500 dark:text-neutral-300">
                  Coche “Je certifie être l’auteur…” pour activer le bouton
                  ENVOYER.
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
