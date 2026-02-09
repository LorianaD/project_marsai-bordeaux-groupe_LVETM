import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import fb from "../../assets/imgs/icones/fb.png";
import insta from "../../assets/imgs/icones/insta.png";
import youtube from "../../assets/imgs/icones/youtube.png";
import x from "../../assets/imgs/icones/x.png";

import Newsletter from "../Form/Newsletter";

function Footer() {
  const { t } = useTranslation("footer");

  const social = [
    { src: fb, alt: "Facebook" },
    { src: insta, alt: "Instagram" },
    { src: youtube, alt: "YouTube" },
    { src: x, alt: "X" },
  ];

  return (
    <footer className="hidden md:block w-full border-t border-black/10 bg-[#F5F6F8] text-black dark:border-white/10 dark:bg-black dark:text-white">

      <div className="mx-auto w-full max-w-[1280px] px-[40px] py-[60px]">

        {/* GRID PRINCIPAL EXACT MAQUETTE */}
        <div className="grid grid-cols-[340px_1fr_500px] gap-[80px] items-start">

          {/* LEFT */}
          <div>
            <Link to="/">
              <h2 className="text-3xl font-semibold tracking-tight">
                MARS<span className="text-fuchsia-500">AI</span>
              </h2>
            </Link>

            {/* ✅ Texte exact maquette */}
            <p className="mt-6 max-w-[320px] text-sm italic leading-7 text-black/80 dark:text-white/80">
              “La plateforme mondiale de la narration générative,
              ancrée dans la lumière de Marseille.”
            </p>

            {/* SOCIAL */}
            <div className="mt-10 flex items-center gap-5">
              {social.map((i) => (
                <a
                  key={i.alt}
                  href="#"
                  className="
                    flex items-center justify-center
                    w-[48px] h-[48px]
                    rounded-full
                    border border-black/15 dark:border-white/15
                    bg-[#ECECEC] dark:bg-white/5
                    transition
                    hover:scale-105
                  "
                >
                  <img
                    src={i.src}
                    alt={i.alt}
                    className="
                      w-[20px] h-[20px]
                      object-contain
                      invert dark:invert-0
                    "
                  />
                </a>
              ))}
            </div>
          </div>

          {/* CENTER */}
          <div className="grid grid-cols-2 gap-x-[100px]">

            {/* NAVIGATION */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.25em] text-fuchsia-400 uppercase">
                {t("navigation")}
              </h3>

              <ul className="mt-8 space-y-6 text-sm">
                <li><Link to="/gallery">{t("gallery")}</Link></li>
                <li><Link to="/events">{t("program")}</Link></li>
                <li><Link to="/events">{t("tickets")}</Link></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.25em] text-fuchsia-400 uppercase">
                {t("legal")}
              </h3>

              <ul className="mt-8 space-y-6 text-sm">
                <li><Link to="/partner">{t("partners")}</Link></li>
                <li><Link to="/faq">{t("faq")}</Link></li>
                <li><Link to="/contact">{t("contact")}</Link></li>
              </ul>
            </div>

          </div>

          {/* RIGHT - NEWSLETTER */}
          <div className="justify-self-end">
            <Newsletter />
          </div>

        </div>

        {/* SEPARATOR */}
        <div className="mt-[50px] h-px w-full bg-black/20 dark:bg-white/20" />

        {/* BOTTOM BAR */}
        <div className="mt-[30px] flex items-center justify-between opacity-70">

          <span className="text-[10px] font-bold tracking-[5px] uppercase">
            © 2026 MARS.AI PROTOCOL · MARSEILLE HUB
          </span>

          <div className="flex items-center gap-[48px]">
            <span className="text-[10px] font-bold tracking-[5px] uppercase">
              {t("designSystem")}
            </span>

            <Link
              to="/legal"
              className="text-[10px] font-bold tracking-[5px] uppercase"
            >
              {t("legal")}
            </Link>
          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
