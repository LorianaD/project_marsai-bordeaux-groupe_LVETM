import { useEffect, useState } from "react";
import {
  getProgramAdmin,
  createItem,
  updateItem,
  deleteItem,
} from "../../../services/Events/ConferenceProgramAPI.js";

const COLORS = [
  { value: "bg-sky-400", label: "Bleu" },
  { value: "bg-emerald-400", label: "Vert" },
];

function formatDayLabel(dayStr) {
  if (!dayStr) return "—";
  const d = new Date(dayStr + "T12:00:00");
  if (Number.isNaN(d.getTime())) return dayStr;
  const s = d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function AdminConferenceProgramContent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    day: "",
    time: "09:00",
    title: "",
    speaker: "",
    color: "bg-sky-400",
  });

  useEffect(() => {
    getProgramAdmin()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditing(null);
    const today = new Date().toISOString().slice(0, 10);
    setForm({ day: today, time: "09:00", title: "", speaker: "", color: "bg-sky-400" });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      day: item.day || "",
      time: item.time || "09:00",
      title: item.title || "",
      speaker: item.speaker || "",
      color: item.color || "bg-sky-400",
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        day: form.day || null,
        time: form.time,
        title: form.title,
        speaker: form.speaker || null,
        color: form.color,
      };
      if (editing) {
        const updated = await updateItem(editing.id, payload);
        setItems((prev) => prev.map((x) => (x.id === editing.id ? updated : x)));
      } else {
        const created = await createItem(payload);
        setItems((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (err) {
      alert(err?.message || "Erreur");
    }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Supprimer « ${item.title} » ?`)) return;
    try {
      await deleteItem(item.id);
      setItems((prev) => prev.filter((x) => x.id !== item.id));
    } catch (err) {
      alert(err?.message || "Erreur");
    }
  };

  return (
    <>
      <section className="mt-5 rounded-3xl border border-black/10 bg-black/5 p-6 dark:border-[#F6339A]/60 dark:bg-white/5">
        <h2 className="text-xl font-semibold">Programme des conférences</h2>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">
          Les créneaux affichés sur la page Events (programme statique remplacé par ce contenu).
        </p>
        <button
          type="button"
          onClick={openCreate}
          className="mt-4 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white"
        >
          + Ajouter un créneau
        </button>
        {loading ? (
          <p className="mt-4 text-sm text-black/60">Chargement…</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/10 bg-black/5 px-4 py-3 dark:border-white/10 dark:bg-white/5"
              >
                <span className="text-sm text-black/70 dark:text-white/70">{formatDayLabel(item.day)}</span>
                <span className="font-mono text-sm">{item.time}</span>
                <span className="font-medium">{item.title}</span>
                {item.speaker && (
                  <span className="text-sm text-black/60 dark:text-white/60">{item.speaker}</span>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="rounded-lg bg-black/10 px-3 py-1 text-sm dark:bg-white/10"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="rounded-lg bg-red-500/10 px-3 py-1 text-sm text-red-600 dark:text-red-400"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 dark:bg-black dark:border-white/10">
            <h3 className="text-lg font-semibold">{editing ? "Modifier" : "Nouveau créneau"}</h3>
            <form onSubmit={handleSave} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs text-black/60">Jour</label>
                <input
                  type="date"
                  value={form.day}
                  onChange={(e) => setForm((f) => ({ ...f, day: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 dark:bg-white/5"
                />
              </div>
              <div>
                <label className="block text-xs text-black/60">Heure</label>
                <input
                  type="text"
                  value={form.time}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  placeholder="09:30"
                  className="mt-1 w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 dark:bg-white/5"
                />
              </div>
              <div>
                <label className="block text-xs text-black/60">Titre</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  required
                  className="mt-1 w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 dark:bg-white/5"
                />
              </div>
              <div>
                <label className="block text-xs text-black/60">Intervenant (optionnel)</label>
                <input
                  type="text"
                  value={form.speaker}
                  onChange={(e) => setForm((f) => ({ ...f, speaker: e.target.value }))}
                  placeholder="Par : …"
                  className="mt-1 w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 dark:bg-white/5"
                />
              </div>
              <div>
                <label className="block text-xs text-black/60">Couleur</label>
                <select
                  value={form.color}
                  onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 dark:bg-white/5"
                >
                  {COLORS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl bg-black/10 px-4 py-2 text-sm dark:bg-white/10"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  {editing ? "Enregistrer" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
