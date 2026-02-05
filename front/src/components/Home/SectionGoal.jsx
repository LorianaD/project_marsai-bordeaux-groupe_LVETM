import { useTranslation } from "react-i18next";

function SectionGoal() {

    const { t } = useTranslation("home");

    return(
        <section className="flex flex-col items-center justify-center md:gap-5 px-[20px] md:px-[75px] md:py-[20px] self-stretch dark:text-[#FFFFFF] text-left w-full">
            <h2 className="text-[36px] md:text-[60px] font-bold md:leading-[60px] tracking-[-1.8px] md:tracking-[-3px] uppercase leading-none w-full py-[20px]">
                <span className="block">{t("goal.title")} </span>
                <span className="block text-[#F6339A]">{t("goal.title2")}</span>
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-start gap-[25px] md:gap-[48px] self-stretch w-full md:h-[500px]">
                <div className="md:w-[400px] rounded-[48px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] p-[48px] flex flex-col gap-[24px] dark:border-white/10 dark:bg-white/5 md:h-[400px]">
                    <div className="flex w-[64px] h-[64px] justify-center items-center rounded-[24px] bg-[rgba(0,212,146,0.10)]">
                        <img src="/src/assets/imgs/icones/IconTarget.svg" alt="" className="w-[32px] h-[32px] shrink-[0]"/>
                    </div>
                    <h3 className="text-[#000000] dark:text-[#FFFFFF] text-[24px] font-bold leading-[32px] tracking-[-1.2px] uppercase text-left w-144px dark:text-[#FFFFFFF]">
                        {t("goal.cards.card1.title")}
                    </h3>
                    <p className="text-[#000000] dark:text-[#FFFFFF] text-[14px] font-bold leading-[23px] tracking-[1.4px] uppercase text-left">
                        {t("goal.cards.card1.description")}
                    </p>
                </div>
                <div className="md:w-[400px] rounded-[48px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] p-[48px] flex flex-col gap-[24px] dark:border-white/10 dark:bg-white/5 md:h-[400px]">
                    <div className="flex w-[64px] h-[64px] justify-center items-center rounded-[24px] bg-[rgba(0,184,219,0.10)]">
                        <img src="/src/assets/imgs/icones/IconLightning.svg" alt="" className="w-[32px] h-[32px] shrink-[0]"/>
                    </div>
                    <h3 className="text-[#000000] dark:text-[#FFFFFF] text-[24px] font-bold leading-[32px] tracking-[-1.2px] uppercase text-left w-144px">
                        {t("goal.cards.card2.title")}
                    </h3>
                    <p className="text-[#000000] dark:text-[#FFFFFF] text-[14px] font-bold leading-[23px] tracking-[1.4px] uppercase text-left">
                        {t("goal.cards.card2.description")}
                    </p>
                </div>
                <div className="md:w-[400px] rounded-[48px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] p-[48px] flex flex-col gap-[24px] dark:border-white/10 dark:bg-white/5 md:h-[400px]">
                    <div className="flex w-[64px] h-[64px] justify-center items-center rounded-[24px] bg-[rgba(173,70,255,0.10)]">
                        <img src="/src/assets/imgs/icones/IconRocket.svg" alt="" className="w-[32px] h-[32px] shrink-[0]"/>
                    </div>
                    <h3 className="text-[#000000] dark:text-[#FFFFFF] text-[24px] font-bold leading-[32px] tracking-[-1.2px] uppercase text-left w-144px">
                        {t("goal.cards.card3.title")}
                    </h3>
                    <p className="text-[#000000] dark:text-[#FFFFFF] text-[14px] font-bold leading-[23px] tracking-[1.4px] uppercase text-left">
                        {t("goal.cards.card3.description")}
                    </p>
                </div>                
            </div>
        </section>
    )
}

export default SectionGoal