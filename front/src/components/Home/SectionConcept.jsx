import { useTranslation } from "react-i18next";

function SectionConcept() {

    const { t } = useTranslation("home");

    return(
        <section className="flex justify-center items-center gap-[10px] md:px-[80px] py-[10px]">
            <div className="grid md:h-[218.75px] md:grid-cols-4 gap-6 self-stretch text-left">
                <div className="flex p-[41px] gap-[16px] flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-[32px] border-[1px] border-solid border-[rgba(173,70,255,0.20)]">
                    <h3 className="uppercase text-[#C27AFF] font-bold text-[30px] leading-[36px] tracking-[-1.5px]">
                        {t("concept.OneMinute.title")}
                    </h3>
                    <p className="text-[#000000] text-[10px] font-bold leading-[16.25px] tracking-[1px] uppercase dark:text-white">
                        {t("concept.OneMinute.description")}
                    </p>
                </div>
                <div className="flex p-[41px] gap-[16px] flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-[32px] border-[1px] border-solid border-[rgba(173,70,255,0.20)]">
                    <h3 className="uppercase text-[#00D492] font-bold text-[30px] leading-[36px] tracking-[-1.5px]">
                        {t("concept.free.title")}
                    </h3>
                    <p className="text-[#000000] text-[10px] font-bold leading-[16.25px] tracking-[1px] uppercase dark:text-white">
                        {t("concept.free.description")}
                    </p>
                </div>
                <div className="flex p-[41px] gap-[16px] flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-[32px] border-[1px] border-solid border-[rgba(173,70,255,0.20)]">
                    <h3 className="uppercase text-[#FB64B6] font-bold text-[30px] leading-[36px] tracking-[-1.5px]">
                        {t("concept.forAll.title")}
                    </h3>
                    <p className="text-[#000000] text-[10px] font-bold leading-[16.25px] tracking-[1px] uppercase dark:text-white">
                        {t("concept.forAll.description")}
                    </p>
                </div>
                <div className="flex p-[41px] gap-[16px] flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-[32px] border-[1px] border-solid border-[rgba(173,70,255,0.20)]">
                    <h3 className="uppercase text-[#2B7FFF] font-bold text-[30px] leading-[36px] tracking-[-1.5px]">
                        {t("concept.expertise.title")}
                    </h3>
                    <p className="text-[#000000] text-[10px] font-bold leading-[16.25px] tracking-[1px] uppercase dark:text-white">
                        {t("concept.expertise.description")}
                    </p>
                </div>
            </div>

        </section>
    )
}

export default SectionConcept