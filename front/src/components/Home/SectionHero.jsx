function SectionHero() {
    return(
        <section className="relative mx-auto mt-6 flex h-[520px] w-full flex-col items-center justify-center gap-[10px] overflow-hidden p-[75px] shadow-[0_20px_60px_rgba(0,0,0,0.18)]">

            <video className="absolute inset-0 h-full w-full object-cover brightness-[0.72] contrast-[1.05] saturate-[1.05]" autoPlay muted loop playsInline >
                <source src="/imgs/backgroundSections/HomeSectionHero.mp4" type="video/mp4" />
            </video>

            <div className="relative z-10 flex w-full flex-col items-center text-center">
                <div className="relative z-10 flex w-full flex-col items-center text-center">
                    <div className="flex items-center gap-2">
                        <div className="">
                            <img src="/src/assets/imgs/icones/iconStars.svg" alt="" className="h-5 w-5 opacity-80" />
                        </div>
                        <p className="text-[11px] font-semibold tracking-[0.28em] text-white/70">LE PROTOCOLE TEMPOREL 2026</p>
                    </div>
                    <h1 className="mt-4 text-[88px] font-black leading-[0.9] tracking-[-0.02em] text-white">
                        MARS
                        <span className="bg-gradient-to-r from-[#AD46FF] via-[#FF2B7F] to-[#FF6900] bg-clip-text text-transparent">
                            AI
                        </span>
                    </h1>
                    <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.24em] text-white/90">
                        IMAGINEZ DES
                        <span className="bg-gradient-to-r from-[#51A2FF] via-[#AD46FF] to-[#FF2B7F] bg-clip-text text-transparent">
                            FUTURS
                        </span>
                        SOUHAITABLES
                    </p>
                </div>
                <div className="mt-6 flex flex-col items-center gap-2">
                    <p className="text-[11px] leading-relaxed text-white/45">Le festival de courts-métrages de 60 secondes réalisés par IA.</p>
                    <p className="text-[11px] leading-relaxed text-white/45">2 jours d'immersion au cœur de Marseille.</p>                
                </div>
                <div className="mt-7 flex items-center gap-4">
                    <button className="h-11 rounded-full bg-white px-6 text-[11px] font-bold tracking-[0.18em] text-black flex justify-center items-center">
                        <span className="flex">VOIR LES FILMS</span>
                        <div className="h-[48px] w-[48px] flex justify-center items-center">
                            <img src="../src/assets/imgs/icones/arrowRight.svg" alt=""/>
                        </div>
                    </button>
                    <button className="h-11 rounded-full border border-white/20 bg-white/10 px-7 text-[10px] font-bold tracking-[0.20em] text-white/70 backdrop-blur-sm hover:bg-white/15 hover:text-white">EN SAVOIR PLUS</button>
                </div>                
            </div>

        </section>
    )
}

export default SectionHero