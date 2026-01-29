function SectionAward() {
    return(
        <section className="flex flex-col items-center justify-center gap-[80px] px-[100px] self-stretch">
            <div className="flex justify-between items-end self-stretch shrink-[0]">
                <div>
                    <div className="flex items-center gap-[12px]">
                        <div className="w-[32px] h-[1px] shrink-[0] bg-[#2B7FFF]"/>
                        <p className="text-[#2B7FFF] text-[12px] font-bold leading-[16px] tracking-[4.8px] uppercase">Le projet MARS.AI</p>
                    </div>
                    <h2>
                        <span className="flex text-[#000000] text-[96px] font-bold leading-[96px] tracking-[-4.8px] uppercase">Films en </span>
                        <span className="flex text-[#000000] text-[96px] font-bold leading-[96px] tracking-[-4.8px] uppercase bg-gradient-to-b from-black to-[rgba(144,144,144,0.2)] bg-clip-text text-transparent">compétition</span>
                    </h2>
                    <p className="text-[#000000] text-[20px] font-normal leading-[32.5px]">Découvrez une sélection d'œuvres pionnières explorant les nouvelles frontières de l'imaginaire assisté par l'IA.</p>
                </div>
                <button className="flex justify-center items-center bg-[rgba(194,122,255,0.52)] rounded-[20px] px-[20px]">
                    <span className="flex text-[#000000] text-center text-[14px] font-bold leading-[20px] tracking-[1.4px] uppercase">
                        Voir la sélection
                    </span>
                    <div className="h-[48px] w-[48px] flex justify-center items-center">
                        <img src="../src/assets/imgs/icones/arrowRight.svg" alt="" className="w-[20px] h-[20px]"/>
                    </div>
                </button>
            </div>
            <div className="grid h-[346.875px] grid-cols-3 gap-8 shrink-0 self-stretch">
                <div className="flex flex-col items-start self-stretch p-px row-start-1 row-span-1 col-start-1 col-span-1 justify-self-stretch rounded-[40px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)]">

                </div>
            </div>
        </section>
    )
}

export default SectionAward