import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  first_name: "",
  bio: "",
  profession: "",
  role_label: "",
  is_president: 0,
  filmography_url: "",
  sort_order: 1,
  imgFile: null,
};

export default function JuryForm({
  open,
  mode, // "create" | "edit"
  initialValues,
  saving,
  error,
  onClose,
  onSubmit, // (formState) => void
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;
    setForm({ ...emptyForm, ...(initialValues || {}) });
  }, [open, initialValues]);

  if (!open) return null;

  function onChangeField(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        type === "checkbox"
          ? checked
            ? 1
            : 0
          : name === "sort_order"
            ? Number(value)
            : value,
    }));
  }

  function close() {
    if (saving) return;
    onClose?.();
  }

  function submit(e) {
    e.preventDefault();
    onSubmit?.(form);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
      />

      <form
        onSubmit={submit}
        className="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/10 dark:bg-neutral-950 dark:ring-white/10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold">
              {mode === "create"
                ? "Ajouter un membre du jury"
                : "Modifier le membre du jury"}
            </h2>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">
              Champs obligatoires : prénom, nom, rôle.
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
            {error}
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-black/60 dark:text-white/50">
              Prénom *
            </label>
            <input
              name="first_name"
              value={form.first_name}
              onChange={onChangeField}
              className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-white/5"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-black/60 dark:text-white/50">
              Nom *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={onChangeField}
              className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-white/5"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-black/60 dark:text-white/50">
              Rôle (role_label) *
            </label>
            <input
              name="role_label"
              value={form.role_label}
              onChange={onChangeField}
              placeholder="PRÉSIDENT DU JURY, RÉALISATRICE, ..."
              className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-white/5"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-black/60 dark:text-white/50">
              Profession
            </label>
            <input
              name="profession"
              value={form.profession}
              onChange={onChangeField}
              className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-white/5"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wide text-black/60 dark:text-white/50">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={onChangeField}
              rows={4}
              className="mt-2 w-full resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-white/5"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wide text-black/60 dark:text-white/50">
              URL filmographie
            </label>
            <input
              name="filmography_url"
              value={form.filmography_url}
              onChange={onChangeField}
              placeholder="https://..."
              className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-white/5"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-black/60 dark:text-white/50">
              Ordre (sort_order)
            </label>
            <input
              type="number"
              name="sort_order"
              value={form.sort_order}
              onChange={onChangeField}
              className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-white/5"
            />
          </div>

          <div className="flex items-end gap-3">
            <label className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5">
              <input
                type="checkbox"
                name="is_president"
                checked={Number(form.is_president) === 1}
                onChange={onChangeField}
              />
              <span className="font-semibold">Président du jury</span>
            </label>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wide text-black/60 dark:text-white/50">
              Photo (img)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm((f) => ({ ...f, imgFile: e.target.files?.[0] || null }))
              }
              className="mt-2 block w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={close}
            disabled={saving}
            className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-bold text-neutral-800 hover:bg-neutral-50 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-gradient-to-r from-blue-600 to-pink-500 px-6 py-2 text-sm font-extrabold text-white disabled:opacity-50"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}
