import { useTranslation } from "react-i18next";

function SectionClosingEvent() {

    const { t } = useTranslation("home");

    return(
        <section className="flex items-center justify-center px-[150px] self-stretch text-black dark:text-white">
            <div className="flex flex-col items-start justify-center gap-8 flex-1 pt-[2.5px] pr-[124px]">
                <div className="flex h-[23px] items-center justify-center rounded-[4px] px-[12px] py-[4px] bg-[rgba(173,70,255,0.2)]">
                    <p className="text-[#C27AFF] text-[10px] font-bold leading-[15px] tracking-[1px] uppercase">Soirée de Clôture</p>
                </div>
                <h2 className="text-[90px] font-bold leading-[90px] tracking-[-4.5px] uppercase text-left">
                    MARS.A.I
                    <span className="block text-[#F6339A] italic">
                        NIGHT
                    </span>
                </h2>
                <p className="text-[18px] font-normal leading-[29.25px]">Fête Électro mêlant IA et futurs souhaitables.<br/>
                Une expérience immersive sonore et visuelle.</p>
            </div>
            <div className="w-[280px] h-[313px] rounded-[32px] border border-black/10 bg-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center gap-[40px] p-[40px]">
                <div className="w-[40px] h-[40px]">
                    <img src="/src/assets/imgs/icones/iconClock.svg" alt="" />
                </div>
                <div>
                    <h3 className="text-center text-[36px] font-bold leading-[40px] tracking-[-1.8px] uppercase">
                        13 JUIN
                    </h3>
                    <p className="text-center text-[10px] font-bold leading-[15px] tracking-[3px] uppercase">
                        DÈS 19H00 • MARSEILLE
                    </p>
                </div>
                <button className="inline-flex items-center justify-center rounded-[16px] bg-[#CBCBCB] dark:bg-[#FFFFFF] py-[20px] px-[49.5px] text-[16px] font-bold leading-[24px] tracking-[1.6px] uppercase dark:text-[#000000]">
                    Réserver
                </button>                
            </div>
        </section>
    )
}

export default SectionClosingEvent