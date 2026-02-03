import { Link } from "react-router"

function SectionEvent() {
    return(
        <section className="flex flex-col items-center gap-[96px] py-[128px] px-[99px] self-stretch">

            <div className="flex flex-col gap-[66px] items-start w-full">
                <h2 className="text-[#000000] dark:text-[#FFFFFF] text-[72px] leading-[64.8px] font-bold tracking-[-3.6px] uppercase text-left">
                    Deux journées de
                    <span className="block text-[#AD46FF] underline decoration-[3px] underline-offset-[6px] mt-3">
                        Conférences gratuites
                    </span>
                </h2>
                <div className="text-[#000000] dark:text-[#FFFFFF] text-[20px] leading-[32.5px] text-left">
                    <ol className="list-decimal pl-[20px]">
                        <li>Débats engagés sur l’éthique et le futur</li>
                        <li>Confrontations d'idées entre artistes et tech</li>
                        <li>Interrogations stimulantes sur la création</li>
                    </ol>
                </div>
                <Link className="flex h-[42px] px-[25px] py-[13px] gap-[8px] justify-center items-center rounded-[100px] border-[rgba(15,15,15,0.1)] bg-[rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-white/5">
                    <div>
                        <img src="/src/assets/imgs/icones/iconCalendar.svg" alt="" />
                    </div>
                    <span className="text-[#000000] dark:text-[#FFFFFF] text-center text-[12px] font-bold leading-[16px] tracking-[1.2px] uppercase">
                        Agenda Complet
                    </span>
                </Link>
            </div>

            <div className="grid h-[259.5px] grid-cols-3 gap-8 self-stretch text-left">

                <div className="self-stretch row-start-1 row-span-1 col-start-1 col-span-1 justify-self-stretch rounded-[40px] border border-black/10 bg-[rgba(217,217,217,0.05)] p-[40px] flex flex-col gap-[30px] hover:border-[#F1F1F1] hover:bg-[#F1F1F1] hover:text-black">
                    <div className="h-[40px] w-[40px]">
                        <img src="/src/assets/imgs/icones/iconPlay.svg" alt="" />
                    </div>
                    <h3 className="text-[30px] font-bold leading-[36px] tracking-[-1.5px] uppercase">Projections</h3>
                    <p className="text-[14px] font-normal leading-[22.75px]">Diffusion sur écran géant en présence des réalisateurs.</p>
                </div>
                <div className="self-stretch row-start-1 row-span-1 col-start-2 col-span-1 justify-self-stretch rounded-[40px] border border-black/10 bg-[rgba(217,217,217,0.05)] p-[40px] flex flex-col gap-[30px] hover:border-[#F1F1F1] hover:bg-[#F1F1F1] hover:text-black">
                    <div className="h-[40px] w-[40px]">
                        <img src="/src/assets/imgs/icones/iconPeople.svg" alt="" />
                    </div>
                    <h3 className="text-[30px] font-bold leading-[36px] tracking-[-1.5px] uppercase">Workshops</h3>
                    <p className="text-[14px] font-normal leading-[22.75px]">Sessions pratiques pour maîtriser les outils IA.</p>
                </div>
                <div className="self-stretch row-start-1 row-span-1 col-start-3 col-span-1 justify-self-stretch rounded-[40px] border border-black/10 bg-[rgba(217,217,217,0.05)] p-[40px] flex flex-col gap-[30px] hover:border-[#F1F1F1] hover:bg-[#F1F1F1] hover:text-black">
                    <div className="h-[40px] w-[40px]">
                        <img src="/src/assets/imgs/icones/iconAward.svg" alt="" />
                    </div>
                    <h3 className="text-[30px] font-bold leading-[36px] tracking-[-1.5px] uppercase">Awards</h3>
                    <p className="text-[14px] font-normal leading-[22.75px]">Cérémonie de clôture récompensant l'audace.</p>
                </div>

            </div>

        </section>
    )
}

export default SectionEvent