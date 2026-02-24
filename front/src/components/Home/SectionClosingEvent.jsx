import { useTranslation } from "react-i18next";

function SectionClosingEvent() {

    const { t } = useTranslation("home");

    return(
        <section className="flex flex-col md:flex-row items-center gap-[30px] justify-between px-[20px] md:px-[100px] self-stretch text-black dark:text-white w-full">
            
            {/* Div left */}
            <div className="flex flex-col items-start justify-center gap-[32px] md:gap-8 flex-1 md:py-[2.5px] w-full">

                {/* Eyebrowbox */}
                <div className="flex h-[23px] items-center justify-center rounded-[4px] px-[12px] py-[4px] bg-[rgba(173,70,255,0.2)]">
                    <p className="text-[#C27AFF] text-[10px] font-bold leading-[15px] tracking-[1px] uppercase">
                        {t("closingEvent.eyebrow")}
                    </p>
                </div>

                {/* Title */}
                <h2 className="text-[48px] md:text-[90px] font-bold leading-[48px] md:leading-[90px] tracking-[-2.4px] md:tracking-[-4.5px] uppercase text-left w-full">
                    {t("closingEvent.title_main")}
                    <span className="block text-[#F6339A] italic">
                        {t("closingEvent.title_accent")}
                    </span>
                </h2>

                {/* Paragraphe */}
                <p className="text-[18px] font-normal leading-[29.25px] w-full">
                    {t("closingEvent.description.ligne1")}<br/>
                    {t("closingEvent.description.ligne2")}
                </p>
            </div>

            {/* Card / Div right */}
            <div className="w-full md:w-[280px] h-[313px] rounded-[32px] border border-black/10 bg-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center gap-[40px] md:p-[40px]">
                <div className="w-[40px] h-[40px]">
                    <img src="/src/assets/imgs/icones/iconClock.svg" alt="" />
                </div>
                <div>
                    <h3 className="text-center text-[36px] font-bold leading-[40px] tracking-[-1.8px] uppercase">
                        {t("closingEvent.card.date")}
                    </h3>
                    <p className="text-center text-[10px] font-bold leading-[15px] tracking-[3px] uppercase">
                        {t("closingEvent.card.hour")} • {t("closingEvent.card.localisation")}
                    </p>
                </div>
                <button className="inline-flex items-center justify-center rounded-[16px] bg-[#CBCBCB] dark:bg-[#FFFFFF] py-[20px] px-[49.5px] text-[16px] font-bold leading-[24px] tracking-[1.6px] uppercase dark:text-[#000000]">
                    {t("closingEvent.card.ctaBooking")}
                </button>                
            </div>
        </section>
    )
}

export default SectionClosingEvent