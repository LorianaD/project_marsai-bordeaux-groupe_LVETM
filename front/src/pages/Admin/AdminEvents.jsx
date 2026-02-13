import { useEffect, useMemo, useState } from "react";
import { clamp, getDayKeyFromDate, getDayTabsFromEvents } from "./AdminEvents.utils.js";
import {
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  togglePublish,
} from "../../services/Events/AdminEventApi.js";
import AdminLayoutSidebar from "../../components/admin/AdminLayoutSidebar.jsx";
import AdminSidebarModal from "../../components/admin/AdminSidebarModal.jsx";
import AdminHero from "../../components/admin/AdminHero.jsx";
import AdminTopBar from "../../components/admin/AdminTopBar.jsx";
import EventCard from "../../components/admin/EventCard.jsx";

// Page Admin : gestion des événements
export default function AdminEvents() {
 
  const [day, setDay] = useState(null);
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // formulaire
  const [form, setForm] = useState({
    title: "",
    description: "",
    startAt: "",
    location: "",
    capacity: 30,
    type: "atelier",
  });

//récupère les events

useEffect(() => {
  (async () => {
    try {
      setLoading(true);
      const data = await getAdminEvents();

      const normalized = Array.isArray(data)
        ? data.map((ev) => {
            const dayKey = getDayKeyFromDate(ev.date);
            return {
              ...ev,
              day: ev.day ?? dayKey,
              startAt: ev.startAt ?? ev.date,
              capacity: ev.capacity ?? ev.stock ?? 0,
              type: ev.type ?? "atelier",
              published: ev.published ?? false,
              registered: ev.registered ?? 0,
            };
          })
        : [];

      setEvents(normalized);
    } catch (e) {
      console.error("Erreur chargement admin events:", e);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  })();
}, []);

  // 2) Liste filtrée + triée (jour + recherche + tri par date)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return events
      .filter((e) => e.day === day) 
      .filter((e) => {
        if (!q) return true;
        return (
          (e.title || "").toLowerCase().includes(q) ||
          (e.location || "").toLowerCase().includes(q) ||
          (e.description || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }, [events, day, query]);

  // Onglets "jour" dérivés des events
  const dayTabs = useMemo(() => getDayTabsFromEvents(events), [events]);

  // Garder l’onglet sélectionné valide : s’il n’est plus dans dayTabs, passer au premier
  useEffect(() => {
    if (dayTabs.length === 0) return;
    if (!dayTabs.some((t) => t.key === day)) {
      setDay(dayTabs[0].key);
    }
  }, [dayTabs, day]);

  // 3) Stats calculées pour la journée affichée
  const stats = useMemo(() => {
    const dayEvents = events.filter((e) => e.day === day);

    const totalReservations = dayEvents.reduce((acc, e) => acc + (e.registered || 0), 0);
    const totalCapacity = dayEvents.reduce((acc, e) => acc + (e.capacity || 0), 0);

    const fillRate = totalCapacity ? Math.round((totalReservations / totalCapacity) * 100) : 0;
    const publishedCount = dayEvents.filter((e) => e.published).length;

    return {
      totalReservations,
      fillRate: clamp(fillRate, 0, 100),
      publishedCount,
      eventsCount: dayEvents.length,
    };
  }, [events, day]);

  // Ouvre le modal en mode "création"
  function openCreate() {
    setEditing(null);

    
    setForm({
      title: "",
      description: "",
      startAt: "",
      location: "",
      capacity: 30,
      type: "atelier",
    });

    setModalOpen(true);
  }

  // Ouvre le modal en mode "édition"
  function openEdit(ev) {
    setEditing(ev);

    setForm({
      title: ev.title || "",
      description: ev.description || "",
      startAt: ev.startAt ? ev.startAt.slice(0, 16) : "", // datetime-local
      location: ev.location || "",
      capacity: ev.capacity ?? 30,
      type: ev.type || "atelier",
    });

    setModalOpen(true);
  }

  // Créer ou modifier  event
   
   async function onSave(e) {
    e.preventDefault();

    const startAtRaw = form.startAt && String(form.startAt).trim() ? form.startAt.trim() : null;
    const capacity = Number(form.capacity) || 0;
    const dateForApi = startAtRaw
      ? new Date(startAtRaw).toISOString().slice(0, 19).replace("T", " ")
      : new Date().toISOString().slice(0, 19).replace("T", " ");

    const apiPayload = {
      title: form.title,
      description: form.description || null,
      date: dateForApi,
      length: 90,
      stock: capacity,
      illustration: "",
      location: form.location || null,
    };

    try {
      if (editing) {
        const updatePayload = {
          ...apiPayload,
          date: editing.date || dateForApi,
          length: editing.length ?? 90,
          stock: editing.stock ?? capacity,
        };
        const updated = await updateEvent(editing.id, updatePayload);
        const updatedDay = getDayKeyFromDate(updated.date);
        setEvents((prev) =>
          prev.map((x) =>
            x.id === editing.id
              ? { ...x, ...updated, day: updatedDay, capacity, startAt: updated.date }
              : x
          )
        );
      } else {
        const created = await createEvent(apiPayload);
        const createdDay = getDayKeyFromDate(created.date);
        setEvents((prev) => [
          { ...created, day: createdDay, type: form.type, capacity, startAt: created.date, published: false },
          ...prev,
        ]);
        setDay(createdDay ?? day);
      }

      setModalOpen(false);
    } catch (err) {
      console.error("Erreur save event:", err);
      alert("Impossible d'enregistrer l'événement.");
    }
  }

  // Suppr un event
  async function onDelete(ev) {
    const ok = confirm(`Supprimer "${ev.title}" ?`);
    if (!ok) return;

    try {
      await deleteEvent(ev.id);
      setEvents((prev) => prev.filter((x) => x.id !== ev.id));
    } catch (err) {
      console.error("Erreur delete:", err);
      alert("Impossible de supprimer l’événement.");
    }
  }

  // Publier / Dépublier
  async function onTogglePublish(ev) {
    try {
      const res = await togglePublish(ev.id, !ev.published);

      setEvents((prev) =>
        prev.map((x) => (x.id === ev.id ? { ...x, published: res.published } : x))
      );
    } catch (err) {
      console.error("Erreur publish:", err);
      alert("Impossible de changer le statut de publication.");
    }
  }

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
            {/* Menu mobile */}
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm text-black/80 ring-1 ring-black/10 hover:bg-black/10 dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/10"
              >
                ☰ Menu
              </button>
            </div>

            <AdminTopBar
              pageTitle="Événements"
              subtitle="Gérer planning, workshops et inscriptions."
            />

          {/* Hero — même bloc que Overview / Gestion films */}
          <div className="mt-5">
            <AdminHero name="Ocean" />
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
                      onParticipants={() => alert("TODO: page participants / modal")}
                    />
                  ))
                )}
              </div>
            </div>
          </section>
        </main>
        </div>
      </div>

      {/* MODAL (création / édition) */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 dark:bg-black/70 p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-black/10 bg-white dark:border-[#F6339A]/60 dark:bg-[#0b0b0b] shadow-xl dark:shadow-[0_0_40px_rgba(246,51,154,0.2)] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-black/60 dark:text-white/60">
                  {editing ? "Modifier" : "Créer"} un événement
                </p>
                <h3 className="mt-1 text-lg font-semibold">
                  {editing ? "Mise à jour" : "Nouvel event"} —{" "}
                  <span className="text-[#F6339A]">marsAI</span>
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-2xl bg-black/10 dark:bg-white/10 px-3 py-2 text-sm hover:bg-black/15 dark:hover:bg-white/15"
              >
                ✕
              </button>
            </div>

            <form onSubmit={onSave} className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-xs text-black/60 dark:text-white/60">Titre</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                  required
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-black/35 px-4 py-3 text-sm outline-none focus:border-black/20 dark:focus:border-[#F6339A]/60"
                  placeholder="Ex: Atelier — VFX assistés IA"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-black/60 dark:text-white/60">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                  rows={3}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-black/35 px-4 py-3 text-sm outline-none focus:border-black/20 dark:focus:border-[#F6339A]/60"
                  placeholder="Décris l’objectif, le contenu, la cible…"
                />
              </div>

              <div>
                <label className="text-xs text-black/60 dark:text-white/60">Date & heure</label>
                <input
                  type="datetime-local"
                  value={form.startAt}
                  onChange={(e) => setForm((s) => ({ ...s, startAt: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-black/35 px-4 py-3 text-sm outline-none focus:border-black/20 dark:focus:border-[#F6339A]/60"
                />
              </div>

              <div>
                <label className="text-xs text-black/60 dark:text-white/60">Capacité</label>
                <input
                  type="number"
                  min={0}
                  value={form.capacity}
                  onChange={(e) => setForm((s) => ({ ...s, capacity: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-black/35 px-4 py-3 text-sm outline-none focus:border-black/20 dark:focus:border-[#F6339A]/60"
                />
              </div>

              <div>
                <label className="text-xs text-black/60 dark:text-white/60">Lieu</label>
                <input
                  value={form.location}
                  onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-black/35 px-4 py-3 text-sm outline-none focus:border-black/20 dark:focus:border-[#F6339A]/60"
                  placeholder="Ex: Auditorium Mucem"
                />
              </div>

              <div>
                <label className="text-xs text-black/60 dark:text-white/60">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-black/35 px-4 py-3 text-sm outline-none focus:border-black/20 dark:focus:border-[#F6339A]/60"
                >
                  <option value="atelier">Atelier</option>
                  <option value="masterclass">Masterclass</option>
                  <option value="conference">Conférence</option>
                  <option value="projection">Projection</option>
                </select>
              </div>

              <div className="md:col-span-2 mt-2 flex flex-col-reverse gap-3 md:flex-row md:justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-2xl bg-black/10 dark:bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-black/15 dark:hover:bg-white/15"
                >
                  Annuler
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onSave(e);
                  }}
                  className="rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold"
                >
                  {editing ? "Enregistrer" : "Créer l'événement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
