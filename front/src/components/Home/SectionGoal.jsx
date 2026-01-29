function SectionGoal() {
    return(
        <section className="flex flex-col items-center justify-center gap-5 px-[75px] py-[20px] self-stretch">
            <h2 className="flex items-start gap-[5px] self-stretch text-[60px] font-bold leading-[60px] tracking-[-3px] uppercase">
                <span>OBJECTIFS DU </span>
                <span className="text-[#F6339A]">FESTIVAL</span>
            </h2>
            <div className="flex justify-center items-center gap-[48px] self-stretch">
                <div className="w-[300px] rounded-[48px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] p-[48px] flex flex-col gap-[24px]">
                    <div className="flex w-[64px] h-[64px] justify-center items-center rounded-[24px] bg-[rgba(0,212,146,0.10)]">
                        <img src="/src/assets/imgs/icones/IconTarget.svg" alt="" className="w-[32px] h-[32px] shrink-[0]"/>
                    </div>
                    <h3 className="text-[#000000] text-[24px] font-bold leading-[32px] tracking-[-1.2px] uppercase text-left w-144px">
                        L'humain au centre
                    </h3>
                    <p className="text-[#000000] text-[14px] font-bold leading-[23px] tracking-[1.4px] uppercase text-left">
                        Mettre l'humain au coeur de la création pour ne pas perdre l'émotion.
                    </p>
                </div>
                <div className="w-[300px] rounded-[48px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] p-[48px] flex flex-col gap-[24px]">
                    <div className="flex w-[64px] h-[64px] justify-center items-center rounded-[24px] bg-[rgba(0,184,219,0.10)]">
                        <img src="/src/assets/imgs/icones/IconLightning.svg" alt="" className="w-[32px] h-[32px] shrink-[0]"/>
                    </div>
                    <h3 className="text-[#000000] text-[24px] font-bold leading-[32px] tracking-[-1.2px] uppercase text-left w-144px">
                        Challenge créatif
                    </h3>
                    <p className="text-[#000000] text-[14px] font-bold leading-[23px] tracking-[1.4px] uppercase text-left">
                        Challenger la créativité grâce à un format ultra court de 60s.
                    </p>
                </div>
                <div className="w-[300px] rounded-[48px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] p-[48px] flex flex-col gap-[24px]">
                    <div className="flex w-[64px] h-[64px] justify-center items-center rounded-[24px] bg-[rgba(173,70,255,0.10)]">
                        <img src="/src/assets/imgs/icones/IconRocket.svg" alt="" className="w-[32px] h-[32px] shrink-[0]"/>
                    </div>
                    <h3 className="text-[#000000] text-[24px] font-bold leading-[32px] tracking-[-1.2px] uppercase text-left w-144px">
                        Futurs souhaitables
                    </h3>
                    <p className="text-[#000000] text-[14px] font-bold leading-[23px] tracking-[1.4px] uppercase text-left">
                        Explorer les futurs désirables via les technologies émergentes.
                    </p>
                </div>                
            </div>
            <div className="w-[800px] h-[523px] absolute left-[240px] top-[0.375px] bg-[rgba(152,16,250,0.05)] blur-[150px]"></div>
        </section>
    )
}

export default SectionGoal