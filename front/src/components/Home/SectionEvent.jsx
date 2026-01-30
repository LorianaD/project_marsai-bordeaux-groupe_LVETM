function SectionEvent() {
    return(
        <section>
            <div className="flex flex-col gap-[66px]">
                <h2 className="text-[#000000] text-[72px] leading-[64.8px] font-bold tracking-[-3.6px] uppercase text-left">
                    Deux journées de
                    <span className="block text-[#AD46FF] underline decoration-[3px] underline-offset-[6px] mt-3">
                        Conférences gratuites
                    </span>
                </h2>
                <p className="text-[#000000] text-[20px] leading-[32.5px] text-left">
                    <ol className="list-decimal pl-[20px]">
                        <li>Débats engagés sur l’éthique et le future</li>
                        <li>Confrontations d'idées entre artistes et tech</li>
                        <li>Interrogations stimulantes sur la création</li>
                    </ol>
                </p>
                <button className="inline-block h-[42px] px-[25px] py-[13px] gap-[8px] justify-center items-start rounded-[100px] border-[rgba(15,15,15,0.1)] bg-[rgba(0,0,0,0.05)]">
                    <div>
                        <img src="/src/assets/imgs/icones/iconCalendar.svg" alt="" />
                    </div>
                    <span>Agenda Complet</span>
                </button>
            </div>


        </section>
    )
}

export default SectionEvent