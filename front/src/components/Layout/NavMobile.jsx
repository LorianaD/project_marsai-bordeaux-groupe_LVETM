import { Link } from "react-router";

import closeMenuIcon from "../../assets/imgs/icones/mobile-nav.svg";
import { useTranslation } from "react-i18next";

import englishFlag from "../../assets/imgs/icones/englishFlag.png";
import frenchFlag from "../../assets/imgs/icones/franceFlag.png";

function NavMobile({onClose, onToggleLang, OnIsFr}) {

    const { t } =useTranslation("header");

    return(
        <div className="flex flex-col items-start w-full gap-[20px] p-[10px] rounded-[30px] bg-white dark:bg-black shadow-[0_0_12px_0_rgba(0,0,0,0.25)] text-[#3B82F6] dark:text-[#FFFFFF]">

            {/* Header */}
            <div className="flex items-center justify-between self-stretch p-[8px] w-full">
                <Link to="/">
                    <h1 className="text-center font-bold uppercase text-[14px] leading-[20px] tracking-[-0.7px]">
                        <span>MARS</span>
                        <span className="bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent">
                            AI
                        </span>
                    </h1>
                </Link>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex w-[36px] h-[36px] flex-col items-center justify-center p-[8px] shrink-0"
                >
                    <img src={ closeMenuIcon } alt="" />
                </button>
            </div>

            {/* Body */}
            <div className="w-full">
                <div className="w-full">
                    <ul className="flex flex-col items-start justify-center self-stretch p-[10px] gap-[41px] w-full text-[16px] font-bold leading-[15px] tracking-[3px] uppercase">
                        <li><Link to="/" onClick={onClose}>{t("home")}</Link></li>
                        <li><Link to="/gallery" onClick={onClose}>{t("gallery")}</Link></li>
                        <li><Link to="/events" onClick={onClose}>{t("program")}</Link></li>
                        <li><Link to="/jury" onClick={onClose}>{t("jury")}</Link></li>
                    </ul>                 
                </div>
                <div className="flex items-center justify-center gap-[20px] w-full">
                    <Link to="/participation" className="flex items-center justify-center gap-[10px] px-[40px] py-[10px] rounded-[20px] bg-[linear-gradient(90deg,#2B7FFF_0%,#9810FA_100%)] text-white text-center text-[16px] font-bold leading-[16px] uppercase">
                        {t("participate")}
                    </Link>
                    <button
                        type="button"
                        onClick={onToggleLang}
                        className="h-[46px] cursor-pointer"
                        aria-label={OnIsFr ? "Switch to English" : "Passer en français"}
                        title={OnIsFr ? "English" : "Français"}
                    >
                        <img
                            src={OnIsFr ? englishFlag : frenchFlag}
                            alt={OnIsFr ? "English" : "Français"}
                            className="h-full w-full "
                        />
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="w-full p-5 border-t-2 border-black/5">
            
                <div className="flex flex-col items-start gap-[10px]">

                    <h2 className="flex items-center gap-1 text-4xl font-bold uppercase leading-10">
                        <span className="">
                            MARS
                        </span>
                        <span className="text-purple-500">
                            AI
                        </span>
                    </h2>

                    <p className="text-xs font-normal font-[Arimo] text-black/80 text-justify">
                        “La plateforme mondiale de la narration générative, ancrée dans la lumière de Marseille.”
                    </p>

                    <div className="flex items-center gap-4">

                        <a
                            href="#"
                            aria-label="Instagram"
                            className="grid h-12 w-12 place-items-center rounded-full bg-black/5 outline outline-1 -outline-offset-1 outline-black/10"
                        >
                            <span className="h-5 w-5 rounded bg-black/20" />
                        </a>
                        <a
                            href="#"
                            aria-label="X"
                            className="grid h-12 w-12 place-items-center rounded-full bg-black/5 outline outline-1 -outline-offset-1 outline-black/10"
                        >
                            <span className="h-5 w-5 rounded bg-black/20" />
                        </a>
                        <a
                            href="#"
                            aria-label="YouTube"
                            className="grid h-12 w-12 place-items-center rounded-full bg-black/5 outline outline-1 -outline-offset-1 outline-black/10"
                        >
                            <span className="h-5 w-5 rounded bg-black/20" />
                        </a>
                        <a
                            href="#"
                            aria-label="LinkedIn"
                            className="grid h-12 w-12 place-items-center rounded-full bg-black/5 outline outline-1 -outline-offset-1 outline-black/10"
                        >
                            <span className="h-5 w-5 rounded bg-black/20" />
                        </a>

                    </div>

                </div>

                <div className="mt-5 flex w-full items-start justify-between">

                    <nav aria-label="Navigation" className="flex flex-col gap-2.5">

                        <p className="text-xs font-bold font-[Arimo] uppercase leading-4 tracking-[4px] text-purple-500">
                            Navigation
                        </p>

                        <ul className="flex flex-col gap-2.5">

                            <li>
                                <Link to="/gallery" className="text-[10px] font-normal font-[Arimo] leading-6 tracking-wider text-black/80">
                                    Galerie
                                </Link>
                            </li>
                            <li>
                                <Link to="/events" className="text-[10px] font-normal font-[Arimo] leading-6 tracking-wider text-black/80">
                                    Programme
                                </Link>
                            </li>
                            <li>
                                <Link to="/top50" className="text-[10px] font-normal font-[Arimo] leading-6 tracking-wider text-black/80">
                                    Top 50
                                </Link>
                            </li>
                            <li>
                                <Link to="/tickets" className="text-[10px] font-normal font-[Arimo] leading-6 tracking-wider text-black/80">
                                    Billetterie
                                </Link>
                            </li>

                        </ul>

                    </nav>

                    <nav aria-label="Légal" className="flex flex-col gap-2.5">

                        <p className="text-xs font-bold font-[Arimo] uppercase leading-4 tracking-[4px] text-pink-500">
                            Légal
                        </p>

                        <ul className="flex flex-col gap-2.5">

                            <li>
                                <Link to="/partners" className="text-[10px] font-normal font-[Arimo] leading-6 tracking-wider text-black/80">
                                    Partenaires
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-[10px] font-normal font-[Arimo] leading-6 tracking-wider text-black/80">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-[10px] font-normal font-[Arimo] leading-6 tracking-wider text-black/80">
                                    Contact
                                </Link>
                            </li>

                        </ul>

                    </nav>

                </div>

                <div className="mt-5 border-t border-black/50 py-2.5 opacity-70">

                    <p className="text-[10px] font-bold font-[Arimo] uppercase leading-4 tracking-[5px] text-black">
                        © 2026 MARS.A.I PROTOCOL • MARSEILLE HUB
                    </p>

                    <div className="mt-2.5 flex flex-col gap-2.5">

                        <p className="text-[10px] font-bold font-[Arimo] uppercase leading-4 tracking-[5px] text-black">
                            DESIGN SYSTÈME CYBER-PREMIUM
                        </p>
                        <p className="text-[10px] font-bold font-[Arimo] uppercase leading-4 tracking-[5px] text-black">
                            LÉGAL
                        </p>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default NavMobile