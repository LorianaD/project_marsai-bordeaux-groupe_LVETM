import { Link } from "react-router";

import closeMenuIcon from "../../assets/imgs/icones/mobile-nav.svg";

function NavMobile() {
    return(
        <div className="flex w-full p-[10px] flex-col items-center gap-[20px] rounded-[30px] bg-white dark:bg-black shadow-[0_0_12px_0_rgba(0,0,0,0.25)]">

            {/* Header */}
            <div className="flex items-center justify-between self-stretch p-2 rounded-full">
                <Link to="/">
                    <h1 className="text-center font-bold uppercase text-[14px] leading-[20px] tracking-[-0.7px]">
                        <span>MARS</span>
                        <span className="bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent">
                            AI
                        </span>
                    </h1>
                </Link>
                <div className="flex w-[36px] h-[36px] flex-col items-center justify-center p-[8px] shrink-0">
                    <img src={ closeMenuIcon } alt="" />
                </div>
            </div>

            {/* Body */}
            <div>
                <div>
                    <ul className="flex flex-col items-start justify-center self-stretch p-[20px] gap-[41px] text-[16px] font-bold leading-[15px] tracking-[3px] uppercase">
                        <li><Link to="/">{t("home")}</Link></li>
                        <li><Link to="/gallery">{t("gallery")}</Link></li>
                        <li><Link to="/events">{t("program")}</Link></li>
                        <li><Link to="/jury">{t("jury")}</Link></li>
                    </ul>                 
                </div>
                <div>
                    
                </div>
            </div>

            {/* Footer */}
            <div>

            </div>

        </div>
    )
}

export default NavMobile