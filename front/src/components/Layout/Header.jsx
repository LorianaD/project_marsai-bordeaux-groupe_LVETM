import { Link } from "react-router"

function Header() {
    return(
        <header>
            <div><Link to="home"><img src="" alt="logo" /></Link></div>
            <nav>
                <ul>
                    <li><Link>GALERIE</Link></li>
                    <li><Link>PROGRAMME & INFOS</Link></li>
                    <li><Link>JURY</Link></li>
                </ul>
            </nav>
            <div>
                <Link>Soumettre</Link>
                <div><img src="./src/assets/imgs/english.png" alt="change-language" /></div>
                <Link><div><img src="./src/assets/imgs/userIcon.png" alt="" /></div></Link>
            </div>
        </header>
    )
}

export default Header