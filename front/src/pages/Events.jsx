import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agendaIcon from "../assets/imgs/icones/agenda.png";
import arrowIcon from "../assets/imgs/icones/arrow.png";
import baliseIcon from "../assets/imgs/icones/balise.png";
import horlogeIcon from "../assets/imgs/icones/horloge.png";
import wagonIcon from "../assets/imgs/icones/wagon.png";
import carsIcon from "../assets/imgs/icones/cars.png";
import peopleIcon from "../assets/imgs/icones/people.png";
import starIcon from "../assets/imgs/icones/star.png";
import { getEvents } from "../services/Events/EventsApi.js";
import { getProgram } from "../services/Events/ConferenceProgramAPI.js";
import BookingModal from "../components/BookingModal.jsx";


function Events() {
  const [workshops, setWorkshops] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [programItems, setProgramItems] = useState([]);

  useEffect(() => {
    getEvents()
      .then(setWorkshops)
      .catch((err) => console.error("Erreur chargement événements:", err));
  }, []);

  useEffect(() => {
    getProgram()
      .then(setProgramItems)
      .catch((err) => console.error("Erreur programme:", err));
  }, []);

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-16">
        {/* INFOS PRATIQUES */}
        <section id="infos-pratiques" className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5 px-5 py-2 text-xs font-semibold tracking-[0.25em] uppercase">
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

          <article className="mt-6 flex gap-5 rounded-3xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5 p-6 backdrop-blur">
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
          <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5 px-5 py-2 text-xs font-semibold tracking-[0.25em] uppercase">
            <img src={horlogeIcon} alt="" className="h-6 w-6" />
            <span>Programme des conférences</span>
          </div>

          <ul className="mt-4 space-y-3">
            {programItems.length > 0
              ? programItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-4 rounded-2xl border border-black/5 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5 px-4 py-3"
                  >
                    <span
                      className={`mt-1 inline-flex h-8 items-center justify-center rounded-full px-4 text-xs font-semibold text-black ${item.color || "bg-sky-400"}`}
                    >
                      {item.time}
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-black dark:text-white">
                        {item.title}
                      </p>
                      {item.speaker && (
                        <p className="text-xs text-black/60 dark:text-white/60 text-left">
                          {item.speaker}
                        </p>
                      )}
                    </div>
                  </li>
                ))
              : (
                <li className="rounded-2xl border border-dashed border-black/15 bg-black/5 px-4 py-6 text-center text-sm text-black/60 dark:text-white/60">
                  Aucun créneau pour le moment.
                </li>
              )}
          </ul>
        </section>

        {/* ACCÈS */}
        <section id="acces" className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5 px-5 py-2 text-xs font-semibold tracking-[0.25em] uppercase">
            <img src={arrowIcon} alt="" className="h-6 w-6" />
            <span>Accès</span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5 p-5">
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

            <article className="rounded-2xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5 p-5">
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

            <article className="rounded-2xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5 p-5">
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
          <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5 px-5 py-2 text-xs font-semibold tracking-[0.25em] uppercase">
            <img src={starIcon} alt="" className="h-6 w-6" />
            <span>Ateliers pratiques</span>
          </div>

          <article className="rounded-3xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5 p-6 md:p-8">
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
                      className="flex flex-col justify-between gap-3 rounded-2xl border border-black/10 bg-black/15 dark:border-[#F6339A]/60 dark:bg-black/40 p-5"
                    >
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <span className="inline-flex h-8 items-center justify-center rounded-full bg-sky-400 px-4 text-xs font-semibold text-black">
                          {w.date
                            ? new Date(w.date).toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "—"}
                        </span>
                        <span className="text-xs text-black/70 dark:text-white/70">
                          {w.location ? `• ${w.location}` : "• Lieu à préciser"}
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
                        {(() => {
                          const capacity = w.stock != null ? Number(w.stock) : null;
                          const registered = Number(w.registered ?? 0);
                          const remaining = capacity != null ? Math.max(0, capacity - registered) : null;
                          if (remaining == null) return "—";
                          return `${remaining} place${remaining !== 1 ? "s" : ""} restante${remaining !== 1 ? "s" : ""}`;
                        })()}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Link
                          to={`/events/${w.id}`}
                          className="inline-flex items-center justify-center rounded-full border border-black/20 dark:border-[#F6339A]/60 px-4 py-2 text-xs font-semibold text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
                        >
                          Voir le détail
                        </Link>
                        <button
                          type="button"
                          onClick={() => setSelectedEvent(w)}
                          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500 px-5 py-2 text-xs font-semibold tracking-[0.18em] text-white uppercase"
                        >
                          RÉSERVER SA PLACE
                        </button>
                      </div>
                    </li>
                  ))
                : (  
                    <li
                      className="col-span-2 flex items-center justify-center rounded-2xl border border-dashed border-black/15 bg-black/5 dark:border-[#F6339A]/60 dark:bg-black/40 p-6 text-sm text-black/70 dark:text-white/70"
                    >
                      Aucun atelier n’est programmé pour le moment. Revenez plus tard.
                    </li>
                  )}
            </ul>
          </article>
        </section>
      </div>

      {selectedEvent && (
        <BookingModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSuccess={() => {
            setSelectedEvent(null);
            getEvents().then(setWorkshops).catch(console.error);
          }}
        />
      )}
    </main>
  );
}

export default Events;