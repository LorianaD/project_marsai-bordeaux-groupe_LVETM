import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  clamp,
  getDayKeyFromDate,
  getDayTabsFromEvents,
} from "../../../pages/Admin/AdminEvents.utils.js";
import {
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  togglePublish,
} from "../../../services/Events/AdminEventApi.js";
import EventCard from "../EventCard.jsx";

export default function AdminEventsContent() {
  const { t } = useTranslation("adminEvents");
  const navigate = useNavigate();

  const [day, setDay] = useState(null);
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startAt: "",
    location: "",
    capacity: 30,
    type: "atelier",
  });

  // Load
  useEffect(() => {
    let mounted = true;

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

        if (mounted) setEvents(normalized);
      } catch (e) {
        console.error("Erreur chargement admin events:", e);
        if (mounted) setEvents([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const dayTabs = useMemo(() => getDayTabsFromEvents(events), [events]);

  // Ensure day is always valid
  useEffect(() => {
    if (dayTabs.length === 0) return;

    if (!day || !dayTabs.some((tab) => tab.key === day)) {
      setDay(dayTabs[0].key);
    }
  }, [dayTabs, day]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const activeDay = day; // peut être null au tout début

    return events
      .filter((e) => (activeDay ? e.day === activeDay : true))
      .filter((e) => {
        if (!q) return true;
        return (
          (e.title || "").toLowerCase().includes(q) ||
          (e.location || "").toLowerCase().includes(q) ||
          (e.description || "").toLowerCase().includes(q)
        );
      })
      .sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      );
  }, [events, day, query]);

  const stats = useMemo(() => {
    const dayEvents = day ? events.filter((e) => e.day === day) : [];
    const totalReservations = dayEvents.reduce(
      (acc, e) => acc + (e.registered || 0),
      0
    );
    const totalCapacity = dayEvents.reduce(
      (acc, e) => acc + (e.capacity || 0),
      0
    );
    const fillRate = totalCapacity
      ? Math.round((totalReservations / totalCapacity) * 100)
      : 0;
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
    });
    setModalOpen(true);
  }

  function openEdit(ev) {
    setEditing(ev);
    setForm({
      title: ev.title || "",
      description: ev.description || "",
      startAt: ev.startAt ? String(ev.startAt).slice(0, 16) : "",
      location: ev.location || "",
      capacity: ev.capacity ?? 30,
      type: ev.type || "atelier",
    });
    setModalOpen(true);
  }

  async function onSave(e) {
    e.preventDefault();

    const startAtRaw =
      form.startAt && String(form.startAt).trim() ? form.startAt.trim() : null;

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
              ? {
                  ...x,
                  ...updated,
                  day: updatedDay,
                  capacity,
                  startAt: updated.date,
                }
              : x
          )
        );
      } else {
        const created = await createEvent(apiPayload);
        const createdDay = getDayKeyFromDate(created.date);

        setEvents((prev) => [
          {
            ...created,
            day: createdDay,
            type: form.type,
            capacity,
            startAt: created.date,
            published: false,
          },
          ...prev,
        ]);

        if (createdDay) setDay(createdDay);
      }

      setModalOpen(false);
    } catch (err) {
      console.error("Erreur save event:", err);
      alert("Impossible d'enregistrer l'événement.");
    }
  }

  async function onDelete(ev) {
    const ok = window.confirm(`Supprimer "${ev.title}" ?`);
    if (!ok) return;

    try {
      await deleteEvent(ev.id);
      setEvents((prev) => prev.filter((x) => x.id !== ev.id));
    } catch (err) {
      console.error("Erreur delete:", err);
      alert("Impossible de supprimer l'événement.");
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
    <>
      <section className="mt-5 overflow-hidden rounded-3xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5">
        <div className="p-6">
          <h2 className="text-xl font-semibold tracking-tight">{t("sectionTitle")}</h2>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            {t("sectionSubtitle")}
          </p>

          {/* Stats */}
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-[#F6339A]/60 dark:bg-black/35">
              <p className="text-xs text-black/60 dark:text-white/60">{t("statsTotalReservations")}</p>
              <p className="mt-1 text-2xl font-semibold">{stats.totalReservations}</p>
              <p className="mt-1 text-xs text-black/50 dark:text-white/50">{t("statsOnSelectedDay")}</p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-[#F6339A]/60 dark:bg-black/35">
              <p className="text-xs text-black/60 dark:text-white/60">{t("statsFillRate")}</p>
              <p className="mt-1 text-2xl font-semibold">{stats.fillRate}%</p>
              <div className="mt-3 h-2 w-full rounded-full bg-black/10 dark:bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500"
                  style={{ width: `${stats.fillRate}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-[#F6339A]/60 dark:bg-black/35">
              <p className="text-xs text-black/60 dark:text-white/60">{t("statsPublished")}</p>
              <p className="mt-1 text-2xl font-semibold">{stats.publishedCount}</p>
              <p className="mt-1 text-xs text-black/50 dark:text-white/50">
                {t("statsOnEvents", { count: stats.eventsCount })}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {dayTabs.length > 0 ? (
                dayTabs.map((tab) => {
                  const active = tab.key === day;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setDay(tab.key)}
                      className={[
                        "rounded-full px-4 py-2 text-xs font-semibold",
                        active
                          ? "bg-black/15 text-black dark:bg-white/15 dark:text-white"
                          : "bg-black/10 text-black/70 dark:bg-black/35 dark:text-white/70 hover:bg-black/15 hover:text-black dark:hover:bg-white/10 dark:hover:text-white",
                      ].join(" ")}
                    >
                      {tab.label}
                    </button>
                  );
                })
              ) : (
                <p className="text-xs text-black/60 dark:text-white/60">{t("noEventsYet")}</p>
              )}
            </div>

            <div className="flex gap-2">
              <div className="flex-1 md:w-[320px]">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-2 text-sm text-black outline-none placeholder:text-black/40 focus:border-black/20 dark:border-[#F6339A]/60 dark:bg-black/35 dark:text-white dark:placeholder:text-white/40 dark:focus:border-[#F6339A]/60"
                />
              </div>

              <button
                type="button"
                onClick={openCreate}
                className="rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase"
              >
                {t("addButton")}
              </button>
            </div>
          </div>

          {/* List */}
          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="rounded-3xl border border-black/10 bg-black/10 p-6 text-sm text-black/70 dark:border-[#F6339A]/60 dark:bg-black/30 dark:text-white/70">
                {t("loading")}
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-black/15 bg-black/5 p-8 dark:border-[#F6339A]/60 dark:bg-black/25">
                <p className="text-sm font-semibold">{t("noEvents")}</p>
                <p className="mt-1 text-sm text-black/60 dark:text-white/60">{t("noEventsHint")}</p>

                <button
                  type="button"
                  onClick={openCreate}
                  className="mt-4 inline-flex rounded-2xl bg-black/10 px-4 py-2 text-xs font-semibold hover:bg-black/15 dark:bg-white/10 dark:hover:bg-white/15"
                >
                  {t("createEvent")}
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
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4 dark:bg-black/70">
          <div className="w-full max-w-2xl rounded-3xl border border-black/10 bg-white p-6 shadow-xl dark:border-[#F6339A]/60 dark:bg-[#0b0b0b] dark:shadow-[0_0_40px_rgba(246,51,154,0.2)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-black/60 dark:text-white/60">
                  {editing ? t("modalSubtitleEdit") : t("modalSubtitleCreate")}{" "}
                  {t("modalSubtitleSuffix")}
                </p>
                <h3 className="mt-1 text-lg font-semibold">
                  {editing ? t("modalTitleEdit") : t("modalTitleNew")} —{" "}
                  <span className="text-[#F6339A]">marsAI</span>
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-2xl bg-black/10 px-3 py-2 text-sm hover:bg-black/15 dark:bg-white/10 dark:hover:bg-white/15"
              >
                ✕
              </button>
            </div>

            <form onSubmit={onSave} className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-xs text-black/60 dark:text-white/60">{t("labelTitle")}</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                  required
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-[#F6339A]/60 dark:bg-black/35 dark:focus:border-[#F6339A]/60"
                  placeholder={t("placeholderTitle")}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-black/60 dark:text-white/60">{t("labelDescription")}</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                  rows={3}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-[#F6339A]/60 dark:bg-black/35 dark:focus:border-[#F6339A]/60"
                  placeholder={t("placeholderDescription")}
                />
              </div>

              <div>
                <label className="text-xs text-black/60 dark:text-white/60">{t("labelDateHour")}</label>
                <input
                  type="datetime-local"
                  value={form.startAt}
                  onChange={(e) => setForm((s) => ({ ...s, startAt: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-[#F6339A]/60 dark:bg-black/35 dark:focus:border-[#F6339A]/60"
                />
              </div>

              <div>
                <label className="text-xs text-black/60 dark:text-white/60">{t("labelCapacity")}</label>
                <input
                  type="number"
                  min={0}
                  value={form.capacity}
                  onChange={(e) => setForm((s) => ({ ...s, capacity: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-[#F6339A]/60 dark:bg-black/35 dark:focus:border-[#F6339A]/60"
                />
              </div>

              <div>
                <label className="text-xs text-black/60 dark:text-white/60">{t("labelLocation")}</label>
                <input
                  value={form.location}
                  onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-[#F6339A]/60 dark:bg-black/35 dark:focus:border-[#F6339A]/60"
                  placeholder={t("placeholderLocation")}
                />
              </div>

              <div>
                <label className="text-xs text-black/60 dark:text-white/60">{t("labelType")}</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-[#F6339A]/60 dark:bg-black/35 dark:focus:border-[#F6339A]/60"
                >
                  <option value="atelier">{t("typeAtelier")}</option>
                  <option value="masterclass">{t("typeMasterclass")}</option>
                  <option value="conference">{t("typeConference")}</option>
                  <option value="projection">{t("typeProjection")}</option>
                </select>
              </div>

              <div className="md:col-span-2 mt-2 flex flex-col-reverse gap-3 md:flex-row md:justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-2xl bg-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/15 dark:bg-white/10 dark:hover:bg-white/15"
                >
                  {t("cancel")}
                </button>

                <button
                  type="submit"
                  className="rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold"
                >
                  {editing ? t("save") : t("createEventButton")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
