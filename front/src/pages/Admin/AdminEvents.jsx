import { useEffect, useMemo, useState } from "react";
import {
    getAdminEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    togglePublish,
  } from "../../services/Events/AdminEventApi.js";
  




// ---------------------
// Helpers
// ---------------------
function formatTimeFR(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

const NAV = [
  "Overview",
  "Gestion films",
  "Distribution & Jury",
  "Résultats & classement",
  "Leaderboard officiel",
  "Événements",
  "Messages",
  "Festival Box",
  "Configuration Festival",
];

export default function AdminEvents() {
  const [activeNav, setActiveNav] = useState("Événements");
  const [day, setDay] = useState("vendredi");
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal create/edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // event obj or null

  // Form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    startAt: "",
    location: "",
    capacity: 30,
    type: "atelier",
    day: "vendredi",
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getAdminEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Erreur chargement admin events:", e);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

  function openCreate() {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      startAt: "",
      location: "",
      capacity: 30,
      type: "atelier",
      day,
    });
    setModalOpen(true);
  }

  function openEdit(ev) {
    setEditing(ev);
    setForm({
      title: ev.title || "",
      description: ev.description || "",
      startAt: ev.startAt ? ev.startAt.slice(0, 16) : "", // for datetime-local
      location: ev.location || "",
      capacity: ev.capacity ?? 30,
      type: ev.type || "atelier",
      day: ev.day || day,
    });
    setModalOpen(true);
  }

  async function onSave(e) {
    e.preventDefault();

    const payload = {
      ...form,
      capacity: Number(form.capacity) || 0,
      startAt: form.startAt ? new Date(form.startAt).toISOString() : null,
    };

    try {
      if (editing) {
        const updated = await updateEvent(editing.id, { ...editing, ...payload });
        setEvents((prev) => prev.map((x) => (x.id === editing.id ? updated : x)));
      } else {
        const created = await createEvent(payload);
        setEvents((prev) => [created, ...prev]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error("Erreur save event:", err);
      alert("Impossible d’enregistrer l’événement.");
    }
  }

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
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-[1320px] gap-6 px-4 py-5">
        {/* SIDEBAR */}
        <aside className="hidden w-[270px] flex-col rounded-3xl border border-white/10 bg-white/5 p-4 md:flex">
          {/* Profile */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-3">
            <div className="h-10 w-10 rounded-full bg-white/10" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Name </p>
              <p className="truncate text-xs text-white/60">RÉALISATEUR STUDIO</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="mt-4 space-y-1">
            {NAV.map((item) => {
              const active = item === activeNav;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveNav(item)}
                  className={[
                    "w-full rounded-xl px-3 py-2 text-left text-sm transition",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  {item}
                </button>
              );
            })}
          </nav>

          {/* Spacer */}
          <div className="mt-4 flex-1 rounded-2xl border border-dashed border-white/10 bg-black/20" />

          {/* Bottom */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Mars AI</p>
                <p className="text-xs text-white/60">Collaborator</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Admin</span>
            </div>
            <button
              type="button"
              className="mt-3 w-full rounded-xl bg-white/10 px-3 py-2 text-sm text-white/80 hover:bg-white/15"
            >
              Log out
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1">
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.22em] uppercase">
                MARS <span className="text-[#F6339A]">AI</span>
              </span>

              <div className="hidden md:block">
                <p className="text-sm font-semibold">
                  Administration — <span className="text-white/70">Événements</span>
                </p>
                <p className="text-xs text-white/60">
                  Gérer planning, workshops et inscriptions.
                </p>
              </div>
            </div>
            
          </div>

          {/* Hero */}
          <section className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="relative">
              {/* background "banner" */}
              <div className="h-[140px] bg-[radial-gradient(circle_at_20%_20%,rgba(246,51,154,0.35),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.25),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.35))]" />
              <div className="absolute inset-0 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/80">Heureux de vous revoir,</p>
                    <h1 className="mt-1 text-2xl font-semibold">
                      Name <span className="text-white/60">(Admin)</span>
                    </h1>
                    <p className="mt-2 max-w-xl text-xs text-white/60">
                      Gérez l’agenda du festival à Marseille et le flux des participants.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/15"
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-300" />
                    Event management
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-semibold tracking-tight">PLANNING & WORKSHOPS</h2>
              <p className="mt-1 text-sm text-white/60">
                Créez, publiez, mettez à jour et suivez le remplissage en temps réel.
              </p>

              {/* Stats */}
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <p className="text-xs text-white/60">Réservations totales</p>
                  <p className="mt-1 text-2xl font-semibold">{stats.totalReservations}</p>
                  <p className="mt-1 text-xs text-white/50">sur la journée sélectionnée</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <p className="text-xs text-white/60">Taux de remplissage</p>
                  <p className="mt-1 text-2xl font-semibold">{stats.fillRate}%</p>
                  <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500"
                      style={{ width: `${stats.fillRate}%` }}
                    />
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <p className="text-xs text-white/60">Événements publiés</p>
                  <p className="mt-1 text-2xl font-semibold">{stats.publishedCount}</p>
                  <p className="mt-1 text-xs text-white/50">
                    sur {stats.eventsCount} événement(s)
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "vendredi", label: "Vendredi 13" },
                    { key: "samedi", label: "Samedi 14" },
                    { key: "dimanche", label: "Dimanche 15" },
                  ].map((t) => {
                    const active = t.key === day;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setDay(t.key)}
                        className={[
                          "rounded-full px-4 py-2 text-xs font-semibold",
                          active
                            ? "bg-white/15 text-white"
                            : "bg-black/35 text-white/70 hover:bg-white/10 hover:text-white",
                        ].join(" ")}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 md:w-[320px]">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Rechercher un event, lieu, mot-clé…"
                      className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
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
                  <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-white/70">
                    Chargement…
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-white/15 bg-black/25 p-8">
                    <p className="text-sm font-semibold">Aucun événement</p>
                    <p className="mt-1 text-sm text-white/60">
                      Ajoute un workshop ou une conférence pour cette journée.
                    </p>
                    <button
                      type="button"
                      onClick={openCreate}
                      className="mt-4 inline-flex rounded-2xl bg-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/15"
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

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0b0b0b] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/60">
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
                className="rounded-2xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
              >
                ✕
              </button>
            </div>

            <form onSubmit={onSave} className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-xs text-white/60">Titre</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                  required
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm outline-none focus:border-white/20"
                  placeholder="Ex: Atelier — VFX assistés IA"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-white/60">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                  rows={3}
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm outline-none focus:border-white/20"
                  placeholder="Décris l’objectif, le contenu, la cible…"
                />
              </div>

              <div>
                <label className="text-xs text-white/60">Date & heure</label>
                <input
                  type="datetime-local"
                  value={form.startAt}
                  onChange={(e) => setForm((s) => ({ ...s, startAt: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm outline-none focus:border-white/20"
                />
              </div>

              <div>
                <label className="text-xs text-white/60">Capacité</label>
                <input
                  type="number"
                  min={0}
                  value={form.capacity}
                  onChange={(e) => setForm((s) => ({ ...s, capacity: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm outline-none focus:border-white/20"
                />
              </div>

              <div>
                <label className="text-xs text-white/60">Lieu</label>
                <input
                  value={form.location}
                  onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm outline-none focus:border-white/20"
                  placeholder="Ex: Auditorium Mucem"
                />
              </div>

              <div>
                <label className="text-xs text-white/60">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm outline-none focus:border-white/20"
                >
                  <option value="atelier">Atelier</option>
                  <option value="masterclass">Masterclass</option>
                  <option value="conference">Conférence</option>
                  <option value="projection">Projection</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-white/60">Journée</label>
                <select
                  value={form.day}
                  onChange={(e) => setForm((s) => ({ ...s, day: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm outline-none focus:border-white/20"
                >
                  <option value="vendredi">Vendredi</option>
                  <option value="samedi">Samedi</option>
                  <option value="dimanche">Dimanche</option>
                </select>
              </div>

              <div className="md:col-span-2 mt-2 flex flex-col-reverse gap-3 md:flex-row md:justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold"
                >
                  {editing ? "Enregistrer" : "Créer l’événement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function EventCard({ ev, onEdit, onDelete, onTogglePublish, onParticipants }) {
  const fill =
    ev.capacity && ev.capacity > 0 ? Math.round(((ev.registered || 0) / ev.capacity) * 100) : 0;

  const badge =
    ev.type === "masterclass"
      ? { label: "Masterclass", cls: "bg-sky-500/15 text-sky-200 border-sky-400/20" }
      : ev.type === "conference"
      ? { label: "Conférence", cls: "bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-400/20" }
      : ev.type === "projection"
      ? { label: "Projection", cls: "bg-amber-500/15 text-amber-200 border-amber-400/20" }
      : { label: "Atelier", cls: "bg-emerald-500/15 text-emerald-200 border-emerald-400/20" };

  return (
    <article className="rounded-3xl border border-white/10 bg-black/35 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${badge.cls}`}>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
              {badge.label}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
              {formatTimeFR(ev.startAt)} • {ev.location || "Lieu à préciser"}
            </span>
            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold",
                ev.published ? "bg-emerald-500/15 text-emerald-200" : "bg-white/10 text-white/60",
              ].join(" ")}
            >
              {ev.published ? "Publié" : "Brouillon"}
            </span>
          </div>

          <h3 className="mt-3 text-base font-semibold tracking-tight md:text-lg">
            {ev.title}
          </h3>

          {ev.description && (
            <p className="mt-2 max-w-3xl text-sm text-white/60">
              {ev.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/70">
            <span className="rounded-full bg-white/10 px-3 py-1">
              Inscrits: <span className="text-white">{ev.registered ?? 0}</span> /{" "}
              <span className="text-white">{ev.capacity ?? 0}</span>
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              Remplissage: <span className="text-white">{clamp(fill, 0, 100)}%</span>
            </span>
          </div>

          <div className="mt-3 h-2 w-full max-w-xl rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500"
              style={{ width: `${clamp(fill, 0, 100)}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 md:min-w-[220px] md:items-stretch">
          <button
            type="button"
            onClick={onParticipants}
            className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15"
          >
            Liste participants
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15"
          >
            Modifier
          </button>

          <button
            type="button"
            onClick={onTogglePublish}
            className={[
              "rounded-2xl px-4 py-3 text-sm font-semibold",
              ev.published
                ? "bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/20"
                : "bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white",
            ].join(" ")}
          >
            {ev.published ? "Dépublier" : "Publier"}
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 hover:bg-red-500/15"
          >
            Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}
