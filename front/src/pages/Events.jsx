import { useEffect, useState } from "react";
import agendaIcon from "../assets/imgs/icones/agenda.png";
import arrowIcon from "../assets/imgs/icones/arrow.png";
import baliseIcon from "../assets/imgs/icones/balise.png";
import horlogeIcon from "../assets/imgs/icones/horloge.png";
import wagonIcon from "../assets/imgs/icones/wagon.png";
import carsIcon from "../assets/imgs/icones/cars.png";
import peopleIcon from "../assets/imgs/icones/people.png";
import starIcon from "../assets/imgs/icones/star.png";
import { getEvents } from "../services/Events/EventsApi.js";

function Events() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    getEvents()
      .then(setWorkshops)
      .catch((err) => console.error("Erreur chargement événements:", err));
  }, []);

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-16">
        {/* INFOS PRATIQUES */}
        <section id="infos-pratiques" className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 px-5 py-2 text-xs font-semibold tracking-[0.25em] uppercase">
            <img src={agendaIcon} alt="" className="h-6 w-6" />
            <span>Infos pratiques</span>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-[0.35em] text-black dark:text-white">
              13 JUIN 2026
            </p>
            <p className="text-3xl font-semibold tracking-tight text-[#F6339A]">
              MARSEILLE
            </p>
          </div>

          <article className="mt-6 flex gap-5 rounded-3xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 p-6 backdrop-blur">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#51A2FF]">
              <img src={baliseIcon} alt="" className="h-6 w-6" />
            </div>
            <div className="space-y-2 justify-center w-full ">
              <h3 className="text-sm font-semibold tracking-[0.25em] text-blue-600 dark:text-blue-300">
                LA PLATEFORME
              </h3>
              <p className="text-sm text-black/80 dark:text-white/80">
                L&apos; épicentre de la révolution créative marseillaise.<br/>
                4000m² dédiés à l'image et au futur.
              </p>
              <p className="text-xs font-medium text-black/60 dark:text-white/60">
                2 Rue d&apos;Arras, 13007 Marseille (France)
              </p>
            </div>
          </article>
        </section>

        {/* PROGRAMME DES CONFÉRENCES */}
        <section id="programme" className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 px-5 py-2 text-xs font-semibold tracking-[0.25em] uppercase">
            <img src={horlogeIcon} alt="" className="h-6 w-6" />
            <span>Programme des conférences</span>
          </div>

          <ul className="mt-4 space-y-3">
            {[
              {
                time: "09:30",
                color: "bg-emerald-400",
                title: "Accueil & Café Networking",
                speaker: null,
              },
              {
                time: "10:30",
                color: "bg-sky-400",
                title: "Conférence d'ouverture : L'IA au service du Cinéma",
                speaker: "Par : Jean-Luc Godart",
              },
              {
                time: "13:00",
                color: "bg-emerald-400",
                title: "Déjeuner Libre",
                speaker: null,
              },
              {
                time: "14:30",
                color: "bg-sky-400",
                title: "Projection Débat/IA Difficile",
                speaker: "Par : Wim Wenders, Paul Verhoeven",
              },
              {
                time: "16:30",
                color: "bg-emerald-400",
                title: "Table Ronde : Futurs Distopiales",
                speaker: null,
              },
              {
                time: "20:30",
                color: "bg-sky-400",
                title: "Grand Prix IA Créative de l'EDI",
                speaker: null,
              },
              {
                time: "21:30",
                color: "bg-emerald-400",
                title: "Soirée DJ & VJ : DJ Samantha",
                speaker: null,
              },
            ].map((item) => (
              <li
                key={item.time + item.title}
                className="flex items-start gap-4 rounded-2xl border border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5 px-4 py-3"
              >
                <span
                  className={`mt-1 inline-flex h-8 items-center justify-center rounded-full px-4 text-xs font-semibold text-black ${item.color}`}
                >
                  {item.time}
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-black dark:text-white">
                    {item.title}
                  </p>
                  {item.speaker && (
                    <p className="text-xs text-black/60 dark:text-white/60 text-left">{item.speaker}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ACCÈS */}
        <section id="acces" className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 px-5 py-2 text-xs font-semibold tracking-[0.25em] uppercase">
            <img src={arrowIcon} alt="" className="h-6 w-6" />
            <span>Accès</span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 p-5">
              <img src={wagonIcon} alt="" className="h-6 w-6" />
              <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-sky-600 dark:text-sky-300">
                Transports en commun
              </h3>
              <p className="mt-3 text-sm text-black/80 dark:text-white/80">
                Bus Ligne 32, Arrêt Ruisseau
              </p>
              <p className="text-sm text-black/80 dark:text-white/80">
                Métro Ligne 2, Arrêt National
              </p>
            </article>

            <article className="rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 p-5">
              <img src={carsIcon} alt="" className="h-6 w-6" />
              <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 dark:text-emerald-300">
                Voiture
              </h3>
              <p className="mt-3 text-sm text-black/80 dark:text-white/80">
                Avenue Kiff-Saoul 1
              </p>
              <p className="text-sm text-black/80 dark:text-white/80">
                Parking du Château de la Buzine à 500m
              </p>
            </article>

            <article className="rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 p-5">
              <img src={baliseIcon} alt="" className="h-6 w-6" />
              <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-fuchsia-600 dark:text-fuchsia-300">
                Adresses
              </h3>
              <p className="mt-3 text-sm text-black/80 dark:text-white/80">
              12 Rue d&apos;Uzes, 13002 Marseille (Entrée Principale).
              </p>
            </article>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-dashed border-black/20 bg-black/5 dark:border-white/20 dark:bg-white/5 flex justify-center
          ">
            <iframe
              src="https://www.google.com/maps?q=%C3%89cole+de+la+Plateforme+12+Rue+d%27Uzes+13002+Marseille&output=embed"
              width={622}
              height={349}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte — École de la Plateforme, 12 Rue d'Uzes, Marseille"
              className="max-w-full"
            />
          </div>
        </section>

        {/* ATELIERS PRATIQUES */}
        <section id="ateliers" className="space-y-6 pb-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 px-5 py-2 text-xs font-semibold tracking-[0.25em] uppercase">
            <img src={starIcon} alt="" className="h-6 w-6" />
            <span>Ateliers pratiques</span>
          </div>

          <article className="rounded-3xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-['Arimo'] text-[30px] font-bold uppercase leading-[36px] tracking-[-1.5px] text-black dark:text-white">
                WORKSHOPS{" "}
                <span className="text-[#F6339A]">IA CREATIVE</span>
              </h3>
              <img src={peopleIcon} alt="" className="h-9 w-9" />
            </div>

            <p className="mt-4 text-sm text-black/80 dark:text-white/80">
              Profitez de la plateforme pour développer vos compétences. Découvrez
              nos ateliers pratiques et participez à nos sessions.
            </p>

            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {workshops.length > 0
                ? workshops.map((w) => (
                    <li
                      key={w.id}
                      className="flex flex-col justify-between gap-3 rounded-2xl border border-black/10 bg-black/15 dark:border-white/10 dark:bg-black/40 p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex h-8 items-center justify-center rounded-full bg-sky-400 px-4 text-xs font-semibold text-black">
                          {w.date
                            ? new Date(w.date).toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "—"}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-black dark:text-white">
                          {w.title}
                        </h4>
                        {w.description && (
                          <p className="mt-1 text-xs text-black/60 dark:text-white/60 line-clamp-2">
                            {w.description}
                          </p>
                        )}
                      </div>
                      <p className="text-xs font-medium text-black/80 dark:text-white/80">
                        {w.stock != null
                          ? `${w.stock} place${w.stock > 1 ? "s" : ""} restante${w.stock > 1 ? "s" : ""}`
                          : "—"}
                      </p>
                      <button className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500 px-5 py-2 text-xs font-semibold tracking-[0.18em] text-white uppercase">
                        RÉSERVER SA PLACE
                      </button>
                    </li>
                  ))
                : [
                    {
                      time: "14h00",
                      title: "GÉNÉRATION VIDÉO : LES BASES",
                      speaker: "PAR ANNA J. SMITH",
                    },
                    {
                      time: "14h00",
                      title: "IA & SCÉNARIO : CO-ÉCRITURE",
                      speaker: "PAR MAX MULLER",
                    },
                    {
                      time: "16h00",
                      title: "MUSIQUE & IA",
                      speaker: "PAR LÉA DUPONT",
                    },
                    {
                      time: "16h00",
                      title: "EFFETS VISUELS ASSISTÉS IA",
                      speaker: "PAR THOMAS BERNARD",
                    },
                  ].map((w, i) => (
                    <li
                      key={i}
                      className="flex flex-col justify-between gap-3 rounded-2xl border border-black/10 bg-black/15 dark:border-white/10 dark:bg-black/40 p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex h-8 items-center justify-center rounded-full bg-sky-400 px-4 text-xs font-semibold text-black">
                          {w.time}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-black dark:text-white">
                          {w.title}
                        </h4>
                        <p className="mt-1 text-xs font-medium tracking-[0.18em] text-black/60 dark:text-white/60">
                          {w.speaker}
                        </p>
                      </div>
                      <p className="text-xs font-medium text-black/80 dark:text-white/80">
                        X places restantes
                      </p>
                      <button className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500 px-5 py-2 text-xs font-semibold tracking-[0.18em] text-white uppercase">
                        RÉSERVER SA PLACE
                      </button>
                    </li>
                  ))}
            </ul>
          </article>
        </section> 
      </div>
    </main>
  );
}

export default Events;