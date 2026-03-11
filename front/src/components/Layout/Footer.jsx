import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import Newsletter from "../Form/Newsletter";

import AdminEntryButton from "./AdminEntryButton.jsx";
import useCmsContent from "../../hooks/useCmsContent.js";
import { resolveCmsAsset } from "../../utils/cmsAssets.js";
import { isVisible } from "../../utils/isVisible.js";

function Footer() {

  const { t, i18n } = useTranslation("footer");
  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

  const page = "layout";
  const section = "footer";

  const { content, loading, message } = useCmsContent(page, locale);


  const logoSrc = resolveCmsAsset(content?.[page]?.[section]?.brand_logo)
  
  const fbIconSrc = resolveCmsAsset(content?.[page]?.[section]?.social_facebook_icon);
  const instaIconSrc = resolveCmsAsset(content?.[page]?.[section]?.social_instagram_icon);
  const youtubeIconSrc = resolveCmsAsset(content?.[page]?.[section]?.social_youtube_icon);
  const xIconSrc = resolveCmsAsset(content?.[page]?.[section]?.social_x_icon);

  const fbHref = content?.[page]?.[section]?.social_facebook_href;
  const instaHref = content?.[page]?.[section]?.social_instagram_href;
  const youtubeHref = content?.[page]?.[section]?.social_youtube_href;
  const xHref = content?.[page]?.[section]?.social_x_href;

  const social = [
    { label: "facebook", src: fbIconSrc, alt: "Facebook", href: fbHref, title: "Facebook" },
    { label: "instagram", src: instaIconSrc, alt: "Instagram", href: instaHref, title: "Instagram" },
    { label: "youtube", src: youtubeIconSrc, alt: "YouTube", href: youtubeHref, title: "Youtube" },
    { label: "x", src: xIconSrc, alt: "X", href: xHref, title: "X" },
  ];

  if (loading) return null;

  return (
    <footer className="w-full border-t border-black/10 bg-[#F5F6F8] text-black dark:border-[#FFFFFF]/60 dark:bg-black dark:text-white flex-col md:flex-row">

      <div className="mx-auto w-full px-10 py-7.5 flex flex-col">

        {/* GRID PRINCIPAL */}

        <div className="grid items-start gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* LEFT */}
          <div className="min-w-0 lg:col-span-1">
            {logoSrc ? (
              <Link to="/">
                <div className="max-w-25 min-w-5">
                  <img src={logoSrc} alt="Logo" className="w-full" draggable={false}/>
                </div> 
              </Link>
            ): null}

            {/* Texte exact maquette */}
            {isVisible(content, page, section, "brand_quote") && (
              <p className="mt-6 text-sm italic leading-7 text-black/80 dark:text-white/80">
                {content?.[page]?.[section]?.brand_quote}
              </p>
            )}

            {/* SOCIAL */}
            {isVisible(content, page, section, "social") && (
              <div className="mt-10 flex items-center gap-5">
                {social.map((i) => (
                  <div key={i.alt}>
                    {isVisible(content, page, section, `social_${i.label}_label`) && (
                      <a
                        href={i.href}
                        className="
                          flex items-center justify-center
                          w-12 h-12
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
                          title={i.title}
                          className="
                            w-5 h-5
                            object-contain
                            invert dark:invert-0
                          "
                        />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CENTER */}
          <div className="min-w-0 md:col-span-1 lg:col-span-2">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">

              {/* NAVIGATION */}
              <div className="min-w-0">
                <h3 className="text-xs font-semibold tracking-[0.25em] text-violet-500 uppercase">
                  {content?.[page]?.[section]?.sections_navigation || t("sections.navigation")}
                </h3>

                <ul className="mt-8 space-y-6 text-sm">
                  <li>
                    <Link to={content?.[page]?.[section]?.links_gallery_href}>
                      {content?.[page]?.[section]?.links_gallery_label || t("links.gallery")}
                    </Link>
                  </li>
                  <li>
                    <Link to={content?.[page]?.[section]?.links_program_href}>
                      {content?.[page]?.[section]?.links_program_label || t("links.program")}
                    </Link>
                  </li>
                  <li>
                    <Link to={content?.[page]?.[section]?.links_jury_href}>
                      {content?.[page]?.[section]?.links_jury_label || t("jury")}
                    </Link>
                  </li>
                </ul>
              </div>
            
              {/* LEGAL */}
              <div className="min-w-0">
                <h3 className="text-xs font-semibold tracking-[0.25em] text-pink-500 uppercase">
                  {content?.[page]?.[section]?.sections_legal}
                </h3>

                <ul className="mt-8 space-y-6 text-sm">
                  <li>
                    <Link to={content?.[page]?.[section]?.links_partners_href}>
                      {content?.[page]?.[section]?.links_patners_label || t("links.partners")}
                    </Link>
                  </li>
                  <li>
                    <Link to={content?.[page]?.[section]?.links_faq_href}>
                      {content?.[page]?.[section]?.links_faq_label || t("links.faq")}
                    </Link>
                  </li>
                  <li>
                    <Link to={content?.[page]?.[section]?.links_contact_href}>
                      {content?.[page]?.[section]?.links_contact_label || t("links.contact")}
                    </Link>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* RIGHT - NEWSLETTER */}
          <div className="min-w-0 md:col-span-2 lg:col-span-1 flex md:justify-start lg:justify-end">
            <div className="max-w-105 md:max-w-150">
              <Newsletter />
            </div>
          </div>

        </div>

        {/* SEPARATOR */}
        <div className="mt-12.5 h-px w-full bg-black/20 dark:bg-[#FFFFFF]/20" />

        {/* BOTTOM BAR */}
        <div className="mt-7.5 flex items-center justify-between opacity-70 flex-col md:flex-row w-full gap-5">
          <span className="text-[10px] font-bold tracking-[5px] uppercase w-full text-center md:text-left">
            {t("bottom.copyright")}
          </span>

          <div className="flex flex-col md:flex-row items-center justify-end gap-5 w-full md:gap-12">
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
