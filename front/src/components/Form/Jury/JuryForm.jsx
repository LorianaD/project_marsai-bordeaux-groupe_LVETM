import { useEffect, useId, useMemo, useState } from "react";
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
  const fileInputId = useId();

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
    if (initialValues) setForm((prev) => ({ ...prev, ...initialValues }));
  }, [initialValues]);

  const fileName = useMemo(() => form.imgFile?.name || "", [form.imgFile]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked ? 1 : 0 }));
      return;
    }
    if (type === "file") {
      setForm((f) => ({ ...f, imgFile: files?.[0] || null }));
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-neutral-900">
        {/* Header */}
        <div className="flex items-start justify-between px-8 pb-5 pt-7">
          <div>
            <h2 className="text-2xl font-extrabold">
              {mode === "create" ? t("form.titleCreate") : t("form.titleEdit")}
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-white/60">
              {t("form.helper")}
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label={t("form.actions.close")}
            className="grid h-10 w-10 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-8 pb-8">
          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-5">
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label={t("form.labels.firstName")} required>
                <Input
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder={t("form.placeholders.firstName")}
                />
              </Field>

              <Field label={t("form.labels.lastName")} required>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("form.placeholders.lastName")}
                />
              </Field>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label={t("form.labels.role")} required>
                <Input
                  name="role_label"
                  value={form.role_label}
                  onChange={handleChange}
                  placeholder={t("form.placeholders.role")}
                />
              </Field>

              <Field label={t("form.labels.profession")}>
                <Input
                  name="profession"
                  value={form.profession}
                  onChange={handleChange}
                  placeholder={t("form.placeholders.profession")}
                />
              </Field>
            </div>

            {/* Bio */}
            <Field label={t("form.labels.bio")}>
              <Textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder={t("form.placeholders.bio")}
              />
            </Field>

            {/* Filmography */}
            <Field label={t("form.labels.filmography")}>
              <Input
                name="filmography_url"
                value={form.filmography_url}
                onChange={handleChange}
                placeholder={t("form.placeholders.filmography")}
              />
            </Field>

            {/* Order + president */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label={t("form.labels.sortOrder")}>
                <Input
                  type="number"
                  name="sort_order"
                  value={form.sort_order}
                  onChange={handleChange}
                  placeholder={t("form.placeholders.sortOrder")}
                />
              </Field>

              <div className="flex items-end">
                <label className="flex w-full items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm font-semibold text-neutral-800 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                  <input
                    type="checkbox"
                    name="is_president"
                    checked={Number(form.is_president) === 1}
                    onChange={handleChange}
                  />
                  <span>{t("form.labels.isPresident")}</span>
                </label>
              </div>
            </div>

            {/* Photo */}
            <div>
              <div className="text-sm font-semibold text-neutral-800 dark:text-white/85">
                {t("form.labels.photo")}
              </div>

              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-neutral-600 dark:text-white/60">
                  {fileName ? (
                    <>
                      <span className="font-semibold text-neutral-800 dark:text-white/85">
                        {t("form.file.selected")}:
                      </span>{" "}
                      {fileName}
                    </>
                  ) : (
                    t("form.file.none")
                  )}
                </div>

                {/* input natif caché */}
                <input
                  id={fileInputId}
                  type="file"
                  accept="image/*"
                  name="img"
                  onChange={handleChange}
                  className="hidden"
                />

                {/* bouton custom traduit */}
                <label
                  htmlFor={fileInputId}
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-bold text-neutral-800 hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                >
                  {t("form.actions.addPhoto")}
                </label>
              </div>

              <div className="mt-1 text-xs text-neutral-500 dark:text-white/45">
                {t("form.hints.photo")}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="mt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-neutral-200 bg-white px-6 py-2 text-sm font-bold text-neutral-800 hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
              >
                {t("form.actions.cancel")}
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-gradient-to-r from-blue-600 to-pink-500 px-7 py-2 text-sm font-extrabold text-white shadow-sm disabled:opacity-50"
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
    </div>
  );
}

/* Helpers UI */
function Field({ label, required, children }) {
  return (
    <div>
      <div className="text-sm font-semibold text-neutral-800 dark:text-white/85">
        {label} {required ? <span className="text-pink-500">*</span> : null}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="
        w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm
        text-neutral-900 placeholder:text-neutral-400
        outline-none focus:ring-2 focus:ring-blue-500/25
        dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-white/35
      "
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      rows={props.rows ?? 4}
      className="
        w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm
        text-neutral-900 placeholder:text-neutral-400
        outline-none focus:ring-2 focus:ring-blue-500/25
        dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-white/35
      "
    />
  );
}