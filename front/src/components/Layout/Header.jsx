import { Link } from "react-router"

function Header() {
    return(
        <header className="w-full bg-[#E9E9E9]">

            <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">

                <div>
                    <Link to="home" className="flex items-center gap-1 text-xs font-semibold tracking-[0.22em] text-[#6B7280]">
                        <span>MARS</span>
                        <span className="font-bold text-[#A855F7]">AI</span>
                    </Link></div>

                <nav className="hidden md:block">
                    <ul className="flex items-center gap-8 text-[11px] font-semibold tracking-[0.22em] text-[#6B7280]">
                        <li><Link className="hover:text-[#111827] transition-colors">GALERIE</Link></li>
                        <li><Link className="hover:text-[#111827] transition-colors">PROGRAMME & INFOS</Link></li>
                        <li><Link className="hover:text-[#111827] transition-colors">JURY</Link></li>
                    </ul>
                </nav>

                <div className="flex items-center gap-3">
                    <Link className="rounded-full bg-[#3B82F6] px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-white shadow-sm hover:bg-[#2563EB] transition-colors">Participer</Link>
                    <button className="h-6 w-9 overflow-hidden rounded-sm border border-white/40 shadow-sm">
                        <img src="./src/assets/imgs/english.png" alt="change-language" className="h-full w-full object-cover"/>
                    </button>
                </div>

            </div>

        </header>
    )
}

export default Header