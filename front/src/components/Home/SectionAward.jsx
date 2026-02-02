import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchVideos } from "../../services/Videos/VideosListApi";
import { useTranslation } from "react-i18next";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function SectionAward() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const { t, i18n } = useTranslation("home");
  const isFr = i18n.language?.startsWith("fr");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      console.log("function");
      
      try {

        console.log("try dans HomevideoList useEffect ok");

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

  return (
    <section className="flex flex-col items-center justify-center gap-[80px] px-[100px] self-stretch">

      <div className="flex justify-between items-end self-stretch shrink-[0]">
        <div>
          <div className="flex items-center gap-[12px]">
            <div className="w-[32px] h-[1px] shrink-[0] bg-[#2B7FFF]" />
            <p className="text-[#2B7FFF] text-[12px] font-bold leading-[16px] tracking-[4.8px] uppercase">
              {t("award.eyebrow")}
            </p>
          </div>
          <h2 className="text-[#000000] text-[48px] md:text-[96px] font-bold leading-[48px] md:leading-[96px] tracking-[-2.4px] md:tracking-[-4.8px] uppercase dark:text-[#FFFFFF]">
            <span className="block">
              {t("award.title1")}
            </span>
            <span className="block bg-gradient-to-b from-black to-[rgba(144,144,144,0.2)] bg-clip-text text-transparent dark:from-white dark:to-white/20">
              {t("award.title2")}
            </span>
          </h2>
          <p className="text-[#000000] text-[20px] font-normal leading-[32.5px] text-left dark:text-[#FFFFFF]">
            {t("award.description")}
          </p>
        </div>

        <Link
          to="/gallery"
          className="flex justify-center items-center bg-[rgba(194,122,255,0.52)] rounded-[20px] px-[20px]"
        >
          <span className="flex text-[#000000] text-center text-[14px] font-bold leading-[20px] tracking-[1.4px] uppercase dark:text-[#FFFFFF]">
            {t("award.ctaSeeMore")}
          </span>
          <div className="h-[48px] w-[48px] flex justify-center items-center w-[20px] h-[20px]">
            <img
              src="../src/assets/imgs/icones/arrowRight.svg"
              alt=""
              className=" dark:hidden"
            />
            <img
              src="../src/assets/imgs/icones/arrowRightWhite.svg"
              alt=""
              className="hidden dark:block"
            />
          </div>
        </Link>
      </div>

      <div className="grid h-[346.875px] grid-cols-3 gap-8 shrink-0 self-stretch">

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
                className="flex flex-col items-start self-stretch p-px row-start-1 row-span-1 col-start-1 col-span-1 justify-self-stretch rounded-[40px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-white/5"
              >
                <div className="w-[337px]">
                  <Link
                    to={`/gallery/${video.id}`}
                    aria-label={t("award.ariaViewFilm", { title })}
                  >
                    <img src={coverUrl} alt={title} loading="lazy" />
                  </Link>
                </div>

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
  );
}

export default SectionAward;
