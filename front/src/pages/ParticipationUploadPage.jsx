import { useEffect, useMemo, useRef, useState } from "react";
import {
  DirectorForm,
  VideoUploadForm,
  TeamCompositionForm,
} from "../components/Form/Participation/ui";

export default function ParticipationUploadPage() {
  // Step courant (1: réalisateur, 2: upload, 3: équipe + certificat)
  const [step, setStep] = useState(1);

  // Ref vers l’API exposée par VideoUploadForm: { openConfirm(), requestSubmit() }
  const videoFormRef = useRef(null);

  // On garde tout l'objet ownership (pas juste ownershipCertified)
  const [ownership, setOwnership] = useState({});

  // Au montage: si profil réalisateur complet => step 2
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
      // ignore
    }
  }, []);

  // Sync ownership depuis localStorage (+ écoute storage)
  useEffect(() => {
    function syncOwnership() {
      try {
        const o = JSON.parse(localStorage.getItem("ownership") || "{}");
        setOwnership(o && typeof o === "object" ? o : {});
      } catch {
        setOwnership({});
      }
    }

    syncOwnership();

    let intervalId = null;
    if (step === 3) {
      intervalId = setInterval(syncOwnership, 250);
    }

    window.addEventListener("storage", syncOwnership);

    return () => {
      window.removeEventListener("storage", syncOwnership);
      if (intervalId) clearInterval(intervalId);
    };
  }, [step]);

  const canSend = useMemo(() => {
    return (
      !!ownership?.ownershipCertified &&
      !!ownership?.promoConsent &&
      !!ownership?.termsAccepted &&
      !!ownership?.ageConfirmed &&
      !!ownership?.recaptchaToken
    );
  }, [ownership]);

  function submitVideoFromStep3() {
    if (!canSend) return;

    // ✅ nouveau flow: ouvre la popup de confirmation (puis doUpload dans VideoUploadForm)
    if (videoFormRef.current?.openConfirm) {
      videoFormRef.current.openConfirm();
      return;
    }

    // fallback (au cas où)
    if (videoFormRef.current?.requestSubmit) {
      videoFormRef.current.requestSubmit();
      return;
    }
  }

  return (
    <div className="min-h-screen px-4 py-10 pt-[100px]">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="mb-10 text-center text-3xl font-semibold dark:text-white">
          FORMULAIRE DE PARTICIPATION
        </h1>

        {/* Indicateur step */}
        <div className="mb-8 flex items-center justify-center gap-3 text-sm">
          <span
            className={
              step === 1 ? "font-semibold text-white" : "text-neutral-400"
            }
          >
            1. Réalisateur
          </span>
          <span className="text-neutral-300">→</span>
          <span
            className={
              step === 2 ? "font-semibold text-white" : "text-neutral-400"
            }
          >
            2. Upload vidéo
          </span>
          <span className="text-neutral-300">→</span>
          <span
            className={
              step === 3 ? "font-semibold text-white" : "text-neutral-400"
            }
          >
            3. Équipe & certificat
          </span>
        </div>

        {/* Step 1 */}
        {step === 1 && <DirectorForm onNext={() => setStep(2)} />}

        {/* Step 2/3: VideoUploadForm reste monté (pour garder les fichiers) */}
        {(step === 2 || step === 3) && (
          <div
            className={
              step === 3
                ? "absolute -left-[99999px] top-0 h-0 overflow-hidden"
                : ""
            }
          >
            <div className="rounded-2xl bg-white p-6 text-neutral-900 md:p-10 dark:bg-black dark:text-white">
              <VideoUploadForm formRef={videoFormRef} />

              {/* Nav step 2 */}
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

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <TeamCompositionForm onPrev={() => setStep(2)} />

            <div className="flex justify-center">
              <button
                type="button"
                onClick={submitVideoFromStep3}
                disabled={!canSend}
                className={[
                  "rounded-xl px-12 py-3 font-semibold text-white transition",
                  canSend
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "cursor-not-allowed bg-purple-300 opacity-60",
                ].join(" ")}
                title={
                  canSend
                    ? "Envoyer la participation"
                    : "Valide la propriété + promo + conditions + âge + captcha pour envoyer"
                }
              >
                ENVOYER
              </button>
            </div>

            {!canSend ? (
              <div className="text-center text-sm text-neutral-300">
                Pour activer ENVOYER : coche les cases + captcha dans
                “Validation finale”.
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
