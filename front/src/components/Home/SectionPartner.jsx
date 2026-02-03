import { useTranslation } from "react-i18next";

function SectionPartner() {

    const { t } = useTranslation("home");

    return(
        <section className="flex flex-col items-start gap-[48px] p-[20px] md:gap-[80px] md:px-[75px] md:py-[100px] self-stretch">
            <div className="flex md:h-[91px] flex-col items-center gap-[16px] self-stretch">
                <div className="flex md:h-[91px] flex-col items-center gap-[16px] shrink-0 self-stretch">
                    <div className="w-[48px] h-[1px] shrink-0 bg-black dark:bg-[#FFFFFF]"></div>
                    <p className="text-center text-[10px] font-bold leading-[15px] tracking-[4px] uppercase">Nos Soutiens</p>
                    <div className="w-[48px] h-[1px] shrink-0 bg-black dark:bg-[#FFFFFF]"></div>
                </div>
                <h2 className="text-center text-[36px] md:text-[60px] font-bold leading-[40px] md:leading-[60px] tracking-[-1.8px] md:tracking-[-3px] uppercase w-full">
                    <span>
                        {t("partnersSection.titleLine1")}
                    </span>
                    <span className="block md:inline text-[#00D3F2]">
                        {t("partnersSection.titleLine2")}
                    </span>
                </h2>
            </div>
            <div className="grid md:h-[146px] grid-cols-2 md:grid-cols-4 gap-[16px] self-stretch">
                <div className="flex items-center justify-center self-stretch justify-self-stretch row-span-1 col-span-1 rounded-[24px] border border-[rgba(128,128,128,0.05)] bg-[rgba(128,128,128,0.05)] dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.05)]">
                    <div className="h-[145px] w-[175px] md:w-[154px] md:h-[108px] bg-[url('src/assets/imgs/partnersLogo/psl.png')] bg-contain bg-no-repeat bg-center">
                        {/* <img src="src/assets/imgs/partnersLogo/psl.png" alt="psl" /> */}
                    </div>
                </div>        
            </div>
        </section>
    )
}

export default SectionPartner