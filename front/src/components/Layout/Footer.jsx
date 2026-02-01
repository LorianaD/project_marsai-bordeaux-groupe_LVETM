import { Link } from "react-router"
// import { useTranslation } from "react-i18next";

import fb from "../../assets/imgs/icones/fb.png";
import insta from "../../assets/imgs/icones/insta.png";
import youtube from "../../assets/imgs/icones/youtube.png";
import x from "../../assets/imgs/icones/x.png";
import Newsletter from "../Form/Newsletter";

function Footer() {
  return (
    <footer className="hidden md:block flex w-full flex-col items-center justify-center gap-[40px] p-[40px] border-t-2 border-[rgba(0,0,0,0.05)] bg-[rgba(0,34,91,0.05)] text-[#000000] dark:text-[#FFFFFF]">

      <div className="flex items-start justify-center gap-[50px] self-stretch w-full p-[30px]">
        
        <div className="md:col-span-1">
          <h2 className="text-3xl font-semibold tracking-tight">
            MARS<span className="text-fuchsia-500">AI</span>
          </h2>

          <p className="mt-6 max-w-xs text-sm italic leading-6">
            “La plateforme mondiale de la narration générative, ancrée dans la
            lumière de Marseille.”
          </p>

          <div className="mt-7 flex items-center gap-4">
            {[
              { src: fb, alt: "Facebook" },
              { src: insta, alt: "Instagram" },
              { src: youtube, alt: "YouTube" },
              { src: x, alt: "X" },
            ].map((i) => (
              <a
                key={i.alt}
                href="#"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition hover:border-white/30 hover:bg-white/10"
              >
                <img
                  src={i.src}
                  alt={i.alt}
                  className="h-5 w-5 opacity-80 transition group-hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </div>

        
        <div className="md:col-span-1 md:pl-6">
          <h3 className="text-xs font-semibold tracking-[0.25em] text-fuchsia-400">
            NAVIGATION
          </h3>
          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <Link className="" to="/gallery">
                Galerie
              </Link>
            </li>
            <li>
              <Link className="" to="/events">
                Programme
              </Link>
            </li>
            <li>
              <Link className="" to="/gallery">
                Top 50
              </Link>
            </li>
            <li>
              <Link className="" to="/events">
                Billetterie
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-1">
          <h3 className="text-xs font-semibold tracking-[0.25em] text-fuchsia-400">
            LÉGAL
          </h3>
          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <Link className="" to="#">
                Partenaires
              </Link>
            </li>
            <li>
              <Link className="" to="/faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Newsletter />
        </div>

      </div>


      <div className="flex h-[80px] items-center justify-between self-stretch border-t border-[rgba(0,0,0,0.50)] opacity-70">
        <span className="text-[10px] font-bold leading-[15px] tracking-[5px] uppercase">© 2026 MARS.AI PROTOCOL · MARSEILLE HUB</span>
        <div className="flex w-[424.133px] h-[15px] items-start gap-[48px]">
          <span className="text-[10px] font-bold leading-[15px] tracking-[5px] uppercase">DESIGN SYSTEME CYBER-PREMIUM</span>
          <Link to="/legal" className="text-[10px] font-bold leading-[15px] tracking-[5px] uppercase">
            LÉGAL
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
