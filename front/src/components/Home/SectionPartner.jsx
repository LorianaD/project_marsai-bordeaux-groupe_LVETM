function SectionPartner() {
    return(
        <section className="flex flex-col items-start gap-[80px] px-[75px] py-[100px] self-stretch">
            <div className="flex h-[91px] flex-col items-center gap-[16px] self-stretch">
                <div className="flex h-[91px] flex-col items-center gap-[16px] shrink-0 self-stretch">
                    <div className="w-[48px] h-[1px] shrink-0 bg-black dark:bg-[#FFFFFF]"></div>
                    <p className="text-center text-[10px] font-bold leading-[15px] tracking-[4px] uppercase">Nos Soutiens</p>
                    <div className="w-[48px] h-[1px] shrink-0 bg-black dark:bg-[#FFFFFF]"></div>
                </div>
                <h2 className="text-center text-[60px] font-bold leading-[60px] tracking-[-3px] uppercase w-full">
                    <span>ILS SOUTIENNENT </span>
                    <span className="text-[#00D3F2]">
                        LE FUTUR
                    </span>
                </h2>
            </div>
            <div className="grid h-[146px] grid-cols-4 gap-[16px] self-stretch">
                <div className="flex items-center justify-center self-stretch justify-self-stretch row-span-1 col-span-1 rounded-[24px] border border-[rgba(128,128,128,0.05)] bg-[rgba(128,128,128,0.05)] dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.05)]">
                    <div className="w-[154px] h-[108px] bg-[url('src/assets/imgs/partnersLogo/psl.png')] bg-contain bg-no-repeat bg-center">
                        {/* <img src="src/assets/imgs/partnersLogo/psl.png" alt="psl" /> */}
                    </div>
                </div>        
            </div>
        </section>
    )
}

export default SectionPartner