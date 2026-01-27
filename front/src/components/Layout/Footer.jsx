import fb from "../../assets/imgs/icones/fb.png";
import insta from "../../assets/imgs/icones/insta.png";
import youtube from "../../assets/imgs/icones/youtube.png";
import x from "../../assets/imgs/icones/x.png";
import Newsletter from "../Form/Newsletter";

function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-semibold tracking-tight">
              MARS<span className="text-fuchsia-500">AI</span>
            </h2>

            <p className="mt-6 max-w-xs text-sm italic leading-6 text-white/45">
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

          {/* Navigation */}
          <div className="md:col-span-1 md:pl-6">
            <h3 className="text-xs font-semibold tracking-[0.25em] text-fuchsia-400">
              NAVIGATION
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-white/55">
              <li>
                <a className="hover:text-white" href="#">
                  Galerie
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Programme
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Top 50
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Billetterie
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xs font-semibold tracking-[0.25em] text-fuchsia-400">
              LÉGAL
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-white/55">
              <li>
                <a className="hover:text-white" href="#">
                  Partenaires
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1 md:flex md:justify-end">
            <div className="w-full max-w-sm rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-[0_20px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              <Newsletter />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-[10px] tracking-[0.35em] text-white/35 md:flex-row md:items-center md:justify-between">
          <div>© 2026 MARS.AI PROTOCOL · MARSEILLE HUB</div>
          <div className="flex items-center gap-8">
            <span>DESIGN SYSTEME CYBER-PREMIUM</span>
            <a href="#" className="hover:text-white/70">
              LÉGAL
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
