import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchVideos } from "../../services/Videos/VideosListApi";
import { useTranslation } from "react-i18next";
// import GetAllContentApi from "../../services/CMS/GetAllContentApi";
// import { buildCmsMap } from "../../utils/buildCmsMap";
import { isSectionVisible, isVisible } from "../../utils/isVisible";
import useCmsContent from "../../hooks/useCmsContent";

import arrowSrc from "../../assets/imgs/icones/arrowRightWhite.svg";

const API_BASE = import.meta.env.VITE_API_URL;

function SectionAward() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [Message, setMessage] = useState("");

  const { t, i18n } = useTranslation("home");
  const isFr = i18n.language?.startsWith("fr");

  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

  const section = "award";

  const { content, loading: cmsLoading } = useCmsContent(locale);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      // console.log("function");
      
      try {

        // console.log("try dans HomevideoList useEffect ok");

        setLoading(true);
        setErrorMsg("");

        const data = await fetchVideos();

        const list = Array.isArray(data) ? data : (data?.videos ?? []);

        const first = list.slice(0, 3);

        if (isMounted) setVideos(first);

      } catch (err) {

        if (isMounted) setErrorMsg(err?.message || "Erreur inconnue");

      } finally {

        if (isMounted) setLoading(false);

      }
    }

    load();
    return () => {
      isMounted = false;
    };

  }, []);

  if (cmsLoading) return null;

  return (
    <>
      {isSectionVisible(content, section) && (
        <section className="flex flex-col items-center justify-center gap-[25px] md:gap-[80px] p-[25px] md:px-[100px] self-stretch">

          <div className="flex flex-col md:flex-row justify-between items-end self-stretch shrink-[0] gap-[20px] p-[20px]">
            <div>
              {isVisible(content, section, "eyebrow") && (
                <div className="flex items-center gap-[12px]">
                  <div className="w-[32px] h-[1px] shrink-[0] bg-[#2B7FFF]" />
                  <p className="text-[#2B7FFF] text-[12px] font-bold leading-[16px] tracking-[4.8px] uppercase">
                    {content?.[section]?.eyebrow}
                  </p>
                </div>
              )}
              <h2 className="text-[#000000] text-[48px] md:text-[96px] font-bold leading-[48px] md:leading-[96px] tracking-[-2.4px] md:tracking-[-4.8px] uppercase dark:text-[#FFFFFF]">
                {isVisible(content, section, "title1") && (
                  <span className="block">
                    {content?.[section]?.title1}
                  </span>
                )}
                {isVisible(content, section, "title2") && (
                  <span className="block bg-gradient-to-b from-black to-[rgba(144,144,144,0.2)] bg-clip-text text-transparent dark:from-white dark:to-white/20">
                    {content?.[section]?.title2}
                  </span>
                )}
              </h2>
              {isVisible(content, section, "description") && (
                <p className="text-[#000000] text-[20px] leading-[32.5px] text-left dark:text-[#FFFFFF]">
                  {content?.[section]?.description}
                </p>
              )}
            </div>

            
            {isVisible(content, section, "ctaSeeMore") && (
              <Link
                to={content?.[section]?.ctaSeeMore_link || "/gallery"}
                className="flex justify-center items-center bg-[rgba(194,122,255,0.52)] rounded-[20px] px-[20px] gap-[10px]"
              >
                <span className="flex text-[#FFFFFF] text-center text-[14px] font-bold leading-[20px] tracking-[1.4px] uppercase">
                  {content?.[section]?.ctaSeeMore}
                </span>
                <div className="flex justify-center items-center w-[20px] h-[20px]">
                  <img src={arrowSrc} alt="" className="" />
                </div>
              </Link>
            )}
          </div>

          <div className="grid w-full grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-8">

            {loading && (
              <div>
                <span className="loading loading-spinner loading-md"></span>
                <p>{t("award.loading")}</p>
              </div>
            )}

            {!loading && errorMsg && (
              <div className="col-span-3 alert alert-error">
                <span>{t("award.error")} {errorMsg}</span>
              </div>
            )}

            {!loading && !errorMsg && videos.length === 0 && (
              <div className="col-span-3 alert">
                <span>{t("award.notFound")}</span>
              </div>
            )}

            {!loading &&
              !errorMsg &&
              videos.map((video) => {
                const title = isFr ? (video?.title || video?.title_en || "Sans titre") : (video?.title_en || video?.title || "Untitled");

                const director =
                  `${video?.director_name || ""} ${video?.director_lastname || ""}`.trim() ||
                  "Unknown director";

                const coverUrl = video?.cover
                  ? `${API_BASE}/uploads/covers/${video.cover}`
                  : "";

                return (

                  <div
                    key={video.id}
                    className="w-full overflow-hidden rounded-[40px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-white/5"
                  >
                    
                    <Link
                      to={`/gallery/${video.id}`}
                      aria-label={t("award.ariaViewFilm", { title })}
                    >
                      <div className="w-full aspect-video overflow-hidden rounded-t-[40px]">  
                        <img src={coverUrl} alt={title} loading="lazy" className="h-full w-full object-cover"/>
                      </div>
                    </Link>
                    

                    <div className="flex h-[175px] flex-col items-start gap-2 pt-[40px] px-[40px] pb-0 self-stretch">
                      <h3 className="text-[#000000] dark:text-[#FFFFFF] text-[30px] font-bold leading-[36px] tracking-[-1.5px] uppercase text-left">
                        {title}
                      </h3>
                      <p className="text-[#000000] dark:text-white/80 text-[10px] font-bold leading-[15px] tracking-[3px] uppercase">
                        {director}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      )}
    </>
  );
}

export default SectionAward;
