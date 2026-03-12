import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { isSectionVisible, isVisible } from "../../utils/isVisible";

function SectionProjected() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";
    // const stats =t("projectedStats.stats", {
    //     returnObjects: true,
    //     defaultValue: []
    // })

    const page = "home";
    const section = "projectedStats";

    const stats = [ 1, 2 ];

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(page, locale);

    return(
        <>
            {isSectionVisible(content, page, section) && (
                <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 px-5 md:px-25 self-stretch w-full">
                    <div className="flex w-full md:w-75 h-40 flex-col items-start gap-6 text-left">
                        <h2 className="w-full text-[36px] md:text-[60px] font-bold leading-9 md:leading-15 tracking-[-1.8px] md:tracking-[-3px] uppercase">
                            {content?.[page]?.[section]?.heading_title_main  || t("projectedStats.heading.title_main")}
                            <span className={`text-[${content?.[page]?.[section]?.heading_title_accent_color}] block`}>
                                {content?.[page]?.[section]?.heading_title_accent || t("projectedStats.heading.title_accent")}
                            </span>
                        </h2>
                        <p className="w-full text-[12px] font-normal leading-4 tracking-[1.2px] uppercase">
                            {content?.[page]?.[section]?.heading_tagline || t("projectedStats.heading.tagline")}
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 px-5 md:px-8.5">
                        {stats.map((n) => {
                            const value = content?.[page]?.[section]?.[`stat${n}_value`];
                            const label = content?.[page]?.[section]?.[`stat${n}_label`];
                            const color = content?.[page]?.[section]?.[`stat${n}_label_color`];

                            return (
                                <div key={n} >
                                    {isVisible(content, page, section, `stat${n}_value`) && (
                                        <div className="flex w-73.5 h-48.25 flex-col items-center gap-2 py-12 rounded-[40px] border border-[rgba(0,0,0,0.10)] bg-[rgba(255,255,255,0.05)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                                            <p className="text-center text-[72px] font-bold leading-18 tracking-[-3.6px]">
                                                {value}
                                            </p>
                                            <p className="text-[#AD46FF] text-center text-[10px] font-bold leading-3.75 tracking-[4px] uppercase" style={{ color: color }}>
                                                {label}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </section>
            )}
        </>
    )
}

export default SectionProjected