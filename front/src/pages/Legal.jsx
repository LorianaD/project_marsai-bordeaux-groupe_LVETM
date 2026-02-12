export default function Legal() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        {/* Title */}
        <header className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Mentions légales
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-black/60 dark:text-white/60">
            Informations légales relatives au site et au projet MarsAI.
          </p>
        </header>

        {/* Content */}
        <div className="mt-12 space-y-8">
          {/* Section 1 */}
          <section className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm dark:border-[#F6339A]/60 dark:bg-white/5">
            <h2 className="text-lg font-bold">Mobile Film Festival</h2>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                  Hébergement
                </dt>
                <dd className="mt-1 text-sm text-black/80 dark:text-white/80">
                  Greenshift – 9, Rue Campagne Première, 75014 Paris, France
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                  Directeur de publication
                </dt>
                <dd className="mt-1 text-sm text-black/80 dark:text-white/80">
                  Bruno Smadja
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                  Société
                </dt>
                <dd className="mt-1 text-sm text-black/80 dark:text-white/80">
                  MobilEvent agency
                  <br />
                  4, impasse Truillot, 75011 Paris, France
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                  Contact
                </dt>
                <dd className="mt-1 text-sm text-black/80 dark:text-white/80">
                  <a
                    className="underline underline-offset-4 hover:opacity-80"
                    href="mailto:support@mobilefilmfestival.com"
                  >
                    support@mobilefilmfestival.com
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          {/* Section 2 */}
          <section className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm dark:border-[#F6339A]/60 dark:bg-white/5">
            <h2 className="text-lg font-bold">La Plateforme (Marseille)</h2>

            <p className="mt-3 text-sm text-black/70 dark:text-white/70">
              Projet réalisé dans le cadre d’un travail pédagogique encadré par
              La Plateforme, école des métiers du numérique à Marseille.
            </p>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                  Établissement
                </dt>
                <dd className="mt-1 text-sm text-black/80 dark:text-white/80">
                  La Plateforme — École du numérique
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                  Localisation
                </dt>
                <dd className="mt-1 text-sm text-black/80 dark:text-white/80">
                  Marseille, France
                </dd>
              </div>
            </dl>

            <div className="mt-6 text-xs text-black/50 dark:text-white/50">
              *Les informations ci-dessus peuvent être complétées/ajustées selon
              les mentions officielles de l’établissement.
            </div>
          </section>

          {/* Section 3 */}
          <section className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm dark:border-[#F6339A]/60 dark:bg-white/5">
            <h2 className="text-lg font-bold">Festival MarsAI</h2>

            <p className="mt-3 text-sm text-black/70 dark:text-white/70">
              MarsAI est une plateforme et un événement autour de la narration
              générative. Cette page regroupe les informations légales et
              contacts liés au projet.
            </p>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                  Nom du projet
                </dt>
                <dd className="mt-1 text-sm text-black/80 dark:text-white/80">
                  MarsAI
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                  Contact
                </dt>
                <dd className="mt-1 text-sm text-black/80 dark:text-white/80">
                  <span className="text-black/60 dark:text-white/60">
                    (à renseigner)
                  </span>
                </dd>
              </div>
            </dl>

            <div className="mt-6 text-xs text-black/50 dark:text-white/50">
              contact@marsai.io
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
