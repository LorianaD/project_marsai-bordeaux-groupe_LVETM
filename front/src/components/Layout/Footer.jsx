import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import fb from "../../assets/imgs/icones/fb.png";
import insta from "../../assets/imgs/icones/insta.png";
import youtube from "../../assets/imgs/icones/youtube.png";
import x from "../../assets/imgs/icones/x.png";

import Newsletter from "../Form/Newsletter";

import {decodeToken} from "../../utils/decodeToken.js";
import AdminEntryButton from "./AdminEntryButton.jsx";

function Footer() {
  const { t } = useTranslation("footer");

  const social = [
    { src: fb, alt: "Facebook" },
    { src: insta, alt: "Instagram" },
    { src: youtube, alt: "YouTube" },
    { src: x, alt: "X" },
  ];

  const user = decodeToken();
  const isLoggedIn = user && user.exp * 1000 > Date.now();

  return (
    <footer className="w-full border-t border-black/10 bg-[#F5F6F8] text-black dark:border-[#FFFFFF]/60 dark:bg-black dark:text-white flex-col md:flex-row">

      <div className="mx-auto w-full px-[40px] py-[30px] flex flex-col">

        {/* GRID PRINCIPAL */}

        <div className="flex gap-[80px] items-start flex-col md:flex-row justify-between">
          {/* LEFT */}
          <div>
            <Link to="/">
              <h2 className="text-3xl font-semibold tracking-tight">
                {t("brand.logo1")}
                <span className="text-violet-600">{t("brand.logo2")}</span>
              </h2>
            </Link>

            {/* Texte exact maquette */}
            <p className="mt-6 text-sm italic leading-7 text-black/80 dark:text-white/80">
              {t("brand.quote")}
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
                    border border-black/15 dark:border-[#FFFFFF]/60
                    bg-[#ECECEC] dark:bg-[#FFFFFF]/5
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
          <div className="flex gap-x-[100px] flex-col md:flex-row">
            {/* NAVIGATION */}
            <div className="w-full">
              <h3 className="text-xs font-semibold tracking-[0.25em] text-violet-500 uppercase">
                {t("sections.navigation")}
              </h3>

              <ul className="mt-8 space-y-6 text-sm">
                <li>
                  <Link to="/gallery">{t("links.gallery")}</Link>
                </li>
                <li>
                  <Link to="/events">{t("links.program")}</Link>
                </li>
                <li>
                  <Link to="/events">{t("links.tickets")}</Link>
                </li>
               
              </ul>
            </div>

            {/* LEGAL */}
            <div className="w-full">
              <h3 className="text-xs font-semibold tracking-[0.25em] text-pink-500 uppercase">
                {t("sections.legal")}
              </h3>

              <ul className="mt-8 space-y-6 text-sm">
                <li>
                  <Link to="/partner">{t("links.partners")}</Link>
                </li>
                <li>
                  <Link to="/faq">{t("links.faq")}</Link>
                </li>
                <li>
                  <Link to="/contact">{t("links.contact")}</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT - NEWSLETTER */}
          <div className="max-w-[400px]">
            <Newsletter />
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="mt-[50px] h-px w-full bg-black/20 dark:bg-[#FFFFFF]/20" />

        {/* BOTTOM BAR */}
        <div className="mt-[30px] flex items-center justify-between opacity-70 flex-col md:flex-row w-full">
          <span className="text-[10px] font-bold tracking-[5px] uppercase w-full">
            {t("bottom.copyright")}
          </span>

          <div className="flex flex-col md:flex-row items-center justify-end gap-[48px] w-full">
            <span className="text-[10px] font-bold tracking-[5px] uppercase">
              {t("designSystem")}
            </span>

            <Link to="/legal"  className="text-[10px] font-bold tracking-[5px] uppercase" >
              {t("links.legal")}
            </Link>
             
            <AdminEntryButton/>
                
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
