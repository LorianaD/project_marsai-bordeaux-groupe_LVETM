function SectionPartner() {
    return(
        <section className="flex flex-col items-start gap-[10px] p-[10px] self-stretch dark:text-[#FFFFFF]">
            <div className="flex h-[317px] flex-col items-start gap-[80px] px-[24px] self-stretch">
                <div className="flex h-[91px] flex-col items-center gap-[16px] shrink-0 self-stretch">
                    <div className="w-[48px] h-[1px] shrink-0 bg-black dark:bg-[#FFFFFF]"></div>
                    <p className="text-center text-[10px] font-bold leading-[15px] tracking-[4px] uppercase">Nos Soutiens</p>
                    <div className="w-[48px] h-[1px] shrink-0 bg-black dark:bg-[#FFFFFF]"></div>
                </div>
                <h2 className="text-center text-[60px] font-bold leading-[60px] tracking-[-3px] uppercase">
                    ILS SOUTIENNENT 
                    <span className="text-[#00D3F2]">
                        LE FUTUR
                    </span>
                </h2>
            </div>
        </section>
    )
}

export default SectionPartner