import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";

function SectionProjected() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";
    // const stats =t("projectedStats.stats", {
    //     returnObjects: true,
    //     defaultValue: []
    // })

    const section = "projectedStats";

    const stats = [ 1, 2 ];

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(locale);

    return(
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-[20px] px-[20px] md:px-[100px] self-stretch w-full">
            <div className="flex w-full md:w-[300px] h-[160px] flex-col items-start gap-[24px] text-left">
                <h2 className="w-full text-[36px] md:text-[60px] font-bold leading-[36px] md:leading-[60px] tracking-[-1.8px] md:tracking-[-3px] uppercase">
                    {content?.[section]?.heading_title_main  || t("projectedStats.heading.title_main")}
                    <span className={`text-[${content?.[section]?.heading_title_accent_color}] block`}>
                        {content?.[section]?.heading_title_accent || t("projectedStats.heading.title_accent")}
                    </span>
                </h2>
                <p className="w-full text-[12px] font-normal leading-[16px] tracking-[1.2px] uppercase">
                    {content?.[section]?.heading_tagline || t("projectedStats.heading.tagline")}
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-[48px] px-[20px] md:px-[34px]">
                {stats.map((n) => {
                    const value = content?.[section]?.[`stat${n}_value`];
                    const label = content?.[section]?.[`stat${n}_label`];
                    const color = content?.[section]?.[`stat${n}_label_color`];

                    return (
                        <div key={n} className="flex w-[294px] h-[193px] flex-col items-center gap-[8px] py-[48px] rounded-[40px] border border-[rgba(0,0,0,0.10)] bg-[rgba(255,255,255,0.05)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                            <p className="text-center text-[72px] font-bold leading-[72px] tracking-[-3.6px]">
                                {value}
                            </p>
                            <p className="text-[#AD46FF] text-center text-[10px] font-bold leading-[15px] tracking-[4px] uppercase" style={{ color: color }}>
                                {label}
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default SectionProjected