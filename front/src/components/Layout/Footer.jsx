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
      {/* ✅ TOP */}
      <div className="mx-auto w-full max-w-[1280px] px-[40px] py-[48px]">
        {/* Grille 3 colonnes : brand | nav+legal | newsletter */}
        <div className="grid grid-cols-[360px_1fr_520px] items-start gap-[56px]">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-semibold tracking-tight">
                MARS<span className="text-fuchsia-500">AI</span>
              </h2>
            </Link>

            <p className="mt-6 max-w-[320px] text-sm italic leading-6 text-black/80 dark:text-white/80">
              {t("tagline")}
            </p>

            {/* Social icons (comme maquette) */}
            <div className="mt-10 flex items-center gap-4">
              {social.map((i) => (
                <a
                  key={i.alt}
                  href="#"
                  aria-label={i.alt}
                  title={i.alt}
                  className="
                    group inline-flex h-[44px] w-[44px] items-center justify-center
                    rounded-full
                    border border-black/10 dark:border-white/15
                    bg-black/[0.03] dark:bg-white/5
                    transition
                    hover:bg-black/[0.06] dark:hover:bg-white/10
                  "
                >
                  <img
                    src={i.src}
                    alt={i.alt}
                    className="
                      h-[18px] w-[18px] object-contain
                      invert dark:invert-0
                      opacity-90 transition group-hover:opacity-100
                    "
                    draggable="false"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* NAV + LEGAL au centre */}
          <div className="grid grid-cols-2 gap-[72px] pt-[6px]">
            <div>
              <h3 className="text-xs font-semibold tracking-[0.25em] text-fuchsia-400 uppercase">
                {t("navigationTitle")}
              </h3>
              <ul className="mt-7 space-y-5 text-sm">
                <li>
                  <Link to="/gallery" className="hover:opacity-70">
                    {t("gallery")}
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="hover:opacity-70">
                    {t("program")}
                  </Link>
                </li>
            
                <li>
                  <Link to="/events" className="hover:opacity-70">
                    {t("tickets")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-[0.25em] text-fuchsia-400 uppercase">
                {t("legalTitle")}
              </h3>
              <ul className="mt-7 space-y-5 text-sm">
                <li>
                  <Link to="/partner" className="hover:opacity-70">
                    {t("partners")}
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:opacity-70">
                    {t("faq")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:opacity-70">
                    {t("contact")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter à droite (fixe, comme maquette) */}
          <div className="justify-self-end">
            <Newsletter />
          </div>
        </div>

        {/* Ligne séparatrice (comme maquette) */}
        <div className="mt-[44px] h-px w-full bg-black/20 dark:bg-white/20" />
      </div>

      {/* ✅ BOTTOM */}
      <div className="mx-auto w-full max-w-[1280px] px-[40px] pb-[26px]">
        <div className="flex items-center justify-between opacity-70">
          <span className="text-[10px] font-bold leading-[15px] tracking-[5px] uppercase">
            © 2026 MARS.AI PROTOCOL · MARSEILLE HUB
          </span>

          <div className="flex items-center gap-[48px]">
            <span className="text-[10px] font-bold leading-[15px] tracking-[5px] uppercase">
              {t("designSystem")}
            </span>
            <Link
              to="/legal"
              className="text-[10px] font-bold leading-[15px] tracking-[5px] uppercase hover:opacity-70"
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
