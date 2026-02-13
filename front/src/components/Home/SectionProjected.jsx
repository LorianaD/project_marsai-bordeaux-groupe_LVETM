import { useTranslation } from "react-i18next";

function SectionProjected() {

    const { t } = useTranslation("home");
    const stats =t("projectedStats.stats", {
        returnObjects: true,
        defaultValue: []
    })

    return(
        <section className="flex flex-col md:flex-row items-center justify-center gap-[48px] px-[20px] md:px-[34px] self-stretch w-full">
            <div className="flex w-full md:w-[300px] h-[160px] flex-col items-start gap-[24px] text-center md:text-left">
                <h2 className="w-full text-[36px] md:text-[60px] font-bold leading-[36px] md:leading-[60px] tracking-[-1.8px] md:tracking-[-3px] uppercase">
                    {t("projectedStats.heading.title_main")}
                    <span className="text-[#F6339A] block">
                        {t("projectedStats.heading.title_accent")}
                    </span>
                </h2>
                <p className="w-full text-[12px] font-normal leading-[16px] tracking-[1.2px] uppercase">
                    {t("projectedStats.heading.tagline")}
                </p>
            </div>

            {stats.map((stat, i) => (
                <div key={i} className="flex w-[294px] h-[193px] flex-col items-center gap-[8px] py-[48px] rounded-[40px] border border-[rgba(0,0,0,0.10)] bg-[rgba(255,255,255,0.05)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                    <p className="text-center text-[72px] font-bold leading-[72px] tracking-[-3.6px]">
                        {stat.value}
                    </p>
                    <p className="text-[#AD46FF] text-center text-[10px] font-bold leading-[15px] tracking-[4px] uppercase" style={{ color: stat.color }}>
                        {stat.label}
                    </p>
                </div>
            ))}
        </section>
    )
}

export default SectionProjected