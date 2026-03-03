import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DirectorForm,
  VideoUploadForm,
  TeamCompositionForm,
} from "../components/Form/Participation/ui";

export default function ParticipationUploadPage() {
  const { t } = useTranslation("participation");

  // Step courant (1: réalisateur, 2: upload, 3: équipe + certificat)
  const [step, setStep] = useState(1);

  // bloque Step2 -> Step3 tant que Step2 n'est pas complet
  const [canGoStep3, setCanGoStep3] = useState(false);

  // Ref vers l’API exposée par VideoUploadForm: { openConfirm(), requestSubmit() }
  const videoFormRef = useRef(null);

  // On garde tout l'objet ownership
  const [ownership, setOwnership] = useState({});

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

    if (videoFormRef.current?.openConfirm) {
      videoFormRef.current.openConfirm();
      return;
    }

    if (videoFormRef.current?.requestSubmit) {
      videoFormRef.current.requestSubmit();
      return;
    }
  }

  return (
    <div className="min-h-screen px-4 py-10 pt-[100px]">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="mb-10 text-center text-3xl font-semibold dark:text-white">
          {t("page.title")}
        </h1>

        {/* Indicateur step */}
        <div className="mb-8 flex items-center justify-center gap-3 text-sm">
          <span
            className={
              step === 1 ? "font-semibold text-white" : "text-neutral-400"
            }
          >
            {t("page.steps.1")}
          </span>
          <span className="text-neutral-300">→</span>
          <span
            className={
              step === 2 ? "font-semibold text-white" : "text-neutral-400"
            }
          >
            {t("page.steps.2")}
          </span>
          <span className="text-neutral-300">→</span>
          <span
            className={
              step === 3 ? "font-semibold text-white" : "text-neutral-400"
            }
          >
            {t("page.steps.3")}
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
              <VideoUploadForm
                formRef={videoFormRef}
                onCanProceedChange={setCanGoStep3}
              />

              {/* Nav step 2 */}
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-xl border border-purple-400 px-10 py-3 font-semibold text-purple-500"
                >
                  {t("page.prev")}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!canGoStep3}
                  className={[
                    "rounded-xl px-12 py-3 font-semibold text-white transition",
                    canGoStep3
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "cursor-not-allowed bg-purple-300 opacity-60",
                  ].join(" ")}
                  title={
                    canGoStep3 ? t("page.next") : t("page.nextDisabledHint")
                  }
                >
                  {t("page.next")}
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
                  canSend ? t("page.sendHint") : t("page.sendDisabledHint")
                }
              >
                {t("page.send")}
              </button>
            </div>

            {!canSend ? (
              <div className="text-center text-sm text-neutral-300">
                {t("page.sendDisabledText")}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
