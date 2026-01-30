function SectionHero() {
    return(
        <section className="relative flex w-full px-[75px] flex-col items-center g-[10px] self-stretch">

            <video className="absolute inset-0 h-full w-full object-cover brightness-[0.72] contrast-[1.05] saturate-[1.05] z-0" autoPlay muted loop playsInline >
                <source src="/imgs/backgroundSections/HomeSectionHero.mp4" type="video/mp4" />
            </video>

            <div className="flex py-[24px] flex-col justify-center items-center gap-[50px] self-stretch z-1">

                <div className="flex flex-col justify-center items-center gap-[10px] self-stretch">
                    <div className="flex px-[17px] py-[9px] justify-center items-start gap-[8px]">
                        <div className="">
                            <img src="/src/assets/imgs/icones/iconStars.svg" alt="" className="h-5 w-5 opacity-80" />
                        </div>
                        <p className="text-[rgba(0,0,0,0.60)] text-center text-[10px] font-bold leading-[15px] tracking-[3px] uppercase">
                            LE PROTOCOLE TEMPOREL 2026
                        </p>
                    </div>
                    <h1 className="flex items-center justify-center self-stretch">
                        <span className="text-[#FFFFFF] text-center text-[192px] font-bold leading-[192px] tracking-[-9.6px] uppercase">
                            MARS
                        </span>
                        <span className="text-center text-[192px] font-bold leading-[192px] tracking-[-9.6px] uppercase bg-gradient-to-b from-[#51A2FF] via-[#AD46FF] to-[#FF2B7F] bg-clip-text text-transparent">
                            AI
                        </span>
                    </h1>
                    <p className="flex items-center justify-center gap-5 text-[#FFFFFF] text-[35px] font-bold tracking-[0.5px] uppercase">
                        IMAGINEZ DES
                        <span className="bg-gradient-to-r from-[#AD46FF] via-[#F6339A] to-[#FF6900] bg-clip-text text-transparent">
                            FUTURS
                        </span>
                        SOUHAITABLES
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-[6px] px-1 self-stretch text-white/40 text-center text-[24px] font-normal leading-[39px]">
                    <p>Le festival de courts-métrages de 60 secondes réalisés par IA.</p>
                    <p>2 jours d'immersion au cœur de Marseille.</p>                
                </div>

                <div className="flex items-start justify-end gap-6 py-0 px-[217.773px] pl-[223.82px]">
                    <button className="flex h-[68px] items-center justify-end gap-[30px] p-[25px] rounded-full bg-white shadow-[0_0_30px_0_rgba(255,255,255,0.1)]">
                        <span className="text-black text-center text-[14px] font-bold leading-[20px] tracking-[1.4px] uppercase">
                            Participer
                        </span>
                        <div className="w-[20px] h-[20px]">
                            <img src="../src/assets/imgs/icones/arrowRight.svg" alt=""/>
                        </div>
                    </button>
                    <button className="flex items-center justify-center gap-5 p-[25px] rounded-full border border-white/10 bg-white/5 text-white">
                        <span className=" text-center text-[14px] font-bold leading-[20px] tracking-[1.4px] uppercase">
                            EN SAVOIR PLUS
                        </span>
                        <span className="flex flex-col justify-center text-[#AD46FF] text-center text-[24px] font-bold leading-[0] uppercase">
                            +
                        </span>
                    </button>
                </div> 

            </div>

        </section>
    )
}

export default SectionHero