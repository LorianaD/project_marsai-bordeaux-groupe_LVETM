import { Link } from "react-router"

function Header() {
    return(
        <header className="w-full bg-transparent">

            <div className="mx-auto flex h-[180px] items-center justify-between px-8">

                <div>
                    <Link to="home" className="flex items-center gap-0 text-xs font-semibold tracking-[0.22em] text-[#4F6BFF] dark:text-white">
                        <span>MARS</span>
                        <span className="font-bold text-[#A855F7]">AI</span>
                    </Link></div>

                <nav className="">
                    <ul className="flex items-center gap-10 text-[11px] font-semibold tracking-[0.22em] text-[#4F6BFF] dark:text-white">
                        <li><Link>GALERIE</Link></li>
                        <li><Link>PROGRAMME & INFOS</Link></li>
                        <li><Link>JURY</Link></li>
                    </ul>
                </nav>

                <div className="flex items-center gap-3">
                    <Link className="rounded-full bg-gradient-to-r from-[#2B7FFF] to-[#9810FA] px-8 py-2 text-[11px] font-semibold text-white">Participer</Link>
                    <button className="h-8 w-12 overflow-hidden rounded-md bg-transparent shadow-none" aria-label="Change language">
                        <img src="./src/assets/imgs/english.png" alt="change-language" className="h-full w-full "/>
                    </button>
                </div>

            </div>

        </header>
    )
}

export default Header