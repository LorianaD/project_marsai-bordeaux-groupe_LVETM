import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function JuryForm({
  open,
  mode,
  initialValues,
  saving,
  error,
  onClose,
  onSubmit,
}) {
  const { t } = useTranslation("jury");

  const [form, setForm] = useState({
    name: "",
    first_name: "",
    bio: "",
    profession: "",
    role_label: "",
    is_president: 0,
    filmography_url: "",
    sort_order: 1,
    imgFile: null,
  });

  useEffect(() => {
    if (initialValues) {
      setForm((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked ? 1 : 0 }));
    } else if (type === "file") {
      setForm((f) => ({ ...f, imgFile: files?.[0] || null }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl dark:bg-neutral-900">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">
            {mode === "create"
              ? t("form.titleCreate")
              : t("form.titleEdit")}
          </h2>

          <button
            onClick={onClose}
            className="text-sm font-bold text-neutral-500 hover:text-neutral-800 dark:text-white/60 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-500/20 dark:text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* First name */}
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder={t("form.fields.firstName")}
            className="rounded-xl border px-4 py-2 dark:bg-white/5"
          />

          {/* Last name */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t("form.fields.lastName")}
            className="rounded-xl border px-4 py-2 dark:bg-white/5"
          />

          {/* Profession */}
          <input
            name="profession"
            value={form.profession}
            onChange={handleChange}
            placeholder={t("form.fields.profession")}
            className="rounded-xl border px-4 py-2 dark:bg-white/5"
          />

          {/* Role */}
          <input
            name="role_label"
            value={form.role_label}
            onChange={handleChange}
            placeholder={t("form.fields.role")}
            className="rounded-xl border px-4 py-2 dark:bg-white/5"
          />

          {/* Bio */}
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder={t("form.fields.bio")}
            rows={4}
            className="rounded-xl border px-4 py-2 dark:bg-white/5"
          />

          {/* Filmography */}
          <input
            name="filmography_url"
            value={form.filmography_url}
            onChange={handleChange}
            placeholder={t("form.fields.filmography")}
            className="rounded-xl border px-4 py-2 dark:bg-white/5"
          />

          {/* Sort order */}
          <input
            type="number"
            name="sort_order"
            value={form.sort_order}
            onChange={handleChange}
            placeholder={t("form.fields.sortOrder")}
            className="rounded-xl border px-4 py-2 dark:bg-white/5"
          />

          {/* President checkbox */}
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              name="is_president"
              checked={Number(form.is_president) === 1}
              onChange={handleChange}
            />
            {t("form.fields.isPresident")}
          </label>

          {/* Image */}
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="rounded-xl border px-4 py-2 dark:bg-white/5"
          />

          {/* Buttons */}
          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border px-5 py-2 text-sm font-bold"
            >
              {t("form.actions.cancel")}
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-gradient-to-r from-blue-600 to-pink-500 px-6 py-2 text-sm font-extrabold text-white disabled:opacity-50"
            >
              {saving
                ? t("form.actions.saving")
                : mode === "create"
                  ? t("form.actions.create")
                  : t("form.actions.update")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}