import { useState } from "react";
import AdminLayoutSidebar from "../../components/admin/AdminLayoutSidebar.jsx";
import AdminSidebarModal from "../../components/admin/AdminSidebarModal.jsx";
import AdminHero from "../../components/admin/AdminHero.jsx";
import AdminEventsContent from "../../components/admin/Events/AdminEventsContent.jsx";

export default function AdminEvents() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <AdminSidebarModal
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="events"
      />

      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <AdminLayoutSidebar active="events" />

          <main className="min-w-0 flex-1">
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm text-black/80 ring-1 ring-black/10 hover:bg-black/10 dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/10"
              >
                ☰ Menu
              </button>
            </div>

          {/* Hero — même bloc que Overview / Gestion films */}
          <div className="mt-5">
            <AdminHero />
          </div>

          {/* Contenu Planning & Workshops */}
          <section className="mt-5 overflow-hidden rounded-3xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5">
            <div className="p-6">
              <h2 className="text-xl font-semibold tracking-tight">PLANNING & WORKSHOPS</h2>
              <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                Créez, publiez, mettez à jour et suivez le remplissage en temps réel.
              </p>

              {/* Stats */}
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-black/35 p-4">
                  <p className="text-xs text-black/60 dark:text-white/60">Réservations totales</p>
                  <p className="mt-1 text-2xl font-semibold">{stats.totalReservations}</p>
                  <p className="mt-1 text-xs text-black/50 dark:text-white/50">sur la journée sélectionnée</p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-black/35 p-4">
                  <p className="text-xs text-black/60 dark:text-white/60">Taux de remplissage</p>
                  <p className="mt-1 text-2xl font-semibold">{stats.fillRate}%</p>
                  <div className="mt-3 h-2 w-full rounded-full bg-black/10 dark:bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500"
                      style={{ width: `${stats.fillRate}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-black/35 p-4">
                  <p className="text-xs text-black/60 dark:text-white/60">Événements publiés</p>
                  <p className="mt-1 text-2xl font-semibold">{stats.publishedCount}</p>
                  <p className="mt-1 text-xs text-black/50 dark:text-white/50">sur {stats.eventsCount} événement(s)</p>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                {/* Boutons jour (filtre) — onglets dynamiques selon les dates des events */}
                <div className="flex flex-wrap gap-2">
                  {dayTabs.length > 0 ? (
                    dayTabs.map((t) => {
                      const active = t.key === day;
                      return (
                        <button
                          key={t.key}
                          type="button"
                          onClick={() => setDay(t.key)}
                          className={[
                            "rounded-full px-4 py-2 text-xs font-semibold",
                            active
                              ? "bg-black/15 text-black dark:bg-white/15 dark:text-white"
                              : "bg-black/10 text-black/70 dark:bg-black/35 dark:text-white/70 hover:bg-black/15 hover:text-black dark:hover:bg-white/10 dark:hover:text-white",
                          ].join(" ")}
                        >
                          {t.label}
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-xs text-black/60 dark:text-white/60">
                      Aucun événement pour le moment —
                    </p>
                  )}
                </div>

                {/* Recherche + bouton ajouter */}
                <div className="flex gap-2">
                  <div className="flex-1 md:w-[320px]">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Rechercher un event, lieu, mot-clé…"
                      className="w-full rounded-2xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-black/35 px-4 py-2 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-black/20 dark:focus:border-[#F6339A]/60"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={openCreate}
                    className="rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase"
                  >
                    + Ajouter
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="mt-6 space-y-4">
                {loading ? (
                  <div className="rounded-3xl border border-black/10 bg-black/10 dark:border-[#F6339A]/60 dark:bg-black/30 p-6 text-sm text-black/70 dark:text-white/70">
                    Chargement…
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-black/15 bg-black/5 dark:border-[#F6339A]/60 dark:bg-black/25 p-8">
                    <p className="text-sm font-semibold">Aucun événement</p>
                    <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                      Ajoute un workshop ou une conférence pour cette journée.
                    </p>

                    <button
                      type="button"
                      onClick={openCreate}
                      className="mt-4 inline-flex rounded-2xl bg-black/10 dark:bg-white/10 px-4 py-2 text-xs font-semibold hover:bg-black/15 dark:hover:bg-white/15"
                    >
                      Créer un événement
                    </button>
                  </div>
                ) : (
                  filtered.map((ev) => (
                    <EventCard
                      key={ev.id}
                      ev={ev}
                      onEdit={() => openEdit(ev)}
                      onDelete={() => onDelete(ev)}
                      onTogglePublish={() => onTogglePublish(ev)}
                      onParticipants={() => navigate(`/admin/events/${ev.id}/participants`)}
                    />
                  ))
                )}
              </div>
            </div>
            <AdminEventsContent />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
