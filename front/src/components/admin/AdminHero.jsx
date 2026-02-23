import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { decodeToken } from "../../utils/decodeToken.js";


/*=====================================================================================================================
  Hero du dashboard admin affichant un message de bienvenue pour l'utilisateur connecté avec fond et bouton d'action
======================================================================================================================*/
export default function AdminHero() {
  const { t } = useTranslation("adminHero");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(decodeToken());
  }, []);

  const name = currentUser?.name ?? "";

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-black/10 dark:border-[#FFFFFF]/20 min-h-[240px]">
      <img
        src="/imgs/admin-hero.png"
        alt={t("imageAlt")}
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex flex-col md:flex-row h-full items-center justify-between gap-8 px-10 py-10 md:px-14 md:py-12">
        <div>
          <h1 className="text-[36px] font-extrabold leading-tight tracking-tight text-white md:text-[42px]">
            {t("greeting")}{" "}
            <span className="text-[#3B82F6]">{name}</span>
          </h1>

          <p className="mt-3 text-sm text-white/90">
            {t("message")}{" "}
            <span className="font-medium text-white">{t("deadline")}</span>.
          </p>
        </div>

        <button className="group relative flex items-center gap-3 rounded-full bg-[#22C55E]/90 px-7 py-3 text-sm font-semibold text-black ring-1 ring-white/30 transition hover:bg-[#22C55E]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="text-black"
            >
              <path
                d="M12 12a5 5 0 100-10 5 5 0 000 10z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M3 22a9 9 0 0118 0"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>
          {t("button")}
        </button>
      </div>
    </div>
  );
}
