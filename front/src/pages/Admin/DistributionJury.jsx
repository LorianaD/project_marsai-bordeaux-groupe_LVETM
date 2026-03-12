import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import JuryForm from "../../components/Form/Jury/JuryForm.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function resolveImg(src) {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${API_BASE}/uploads/jury/${src}`;
}

export default function DistributionJury() {
  const { t } = useTranslation("jury");

  const [jury, setJury] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal / form
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit
  const [currentId, setCurrentId] = useState(null);
  const [initialValues, setInitialValues] = useState(null);

  // ui
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadJury() {
    setLoading(true);
    setError("");
    try {
      const r = await fetch(`${API_BASE}/api/jury`);
      const d = await r.json();
      setJury(d?.jury || []);
    } catch {
      setError(t("admin.errors.load"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJury();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedJury = useMemo(() => {
    const list = [...jury];
    list.sort((a, b) => {
      const ap = Number(a.is_president || 0);
      const bp = Number(b.is_president || 0);
      if (bp !== ap) return bp - ap;
      const aso = Number(a.sort_order || 0);
      const bso = Number(b.sort_order || 0);
      if (aso !== bso) return aso - bso;
      return Number(a.id) - Number(b.id);
    });
    return list;
  }, [jury]);

  function openCreate() {
    setMode("create");
    setCurrentId(null);
    setInitialValues({ sort_order: (jury?.length || 0) + 1 });
    setError("");
    setOpen(true);
  }

  function openEdit(j) {
    setMode("edit");
    setCurrentId(j.id);
    setInitialValues({
      name: j.name || "",
      first_name: j.first_name || "",
      bio: j.bio || "",
      profession: j.profession || "",
      role_label: j.role_label || "",
      is_president: Number(j.is_president || 0),
      filmography_url: j.filmography_url || "",
      sort_order: Number(j.sort_order || 1),
      imgFile: null,
    });
    setError("");
    setOpen(true);
  }

  async function onSubmit(form) {
    setSaving(true);
    setError("");

    try {
      if (!form.first_name?.trim() || !form.name?.trim()) {
        throw new Error(t("admin.errors.requiredName"));
      }
      if (!form.role_label?.trim()) {
        throw new Error(t("admin.errors.requiredRole"));
      }

      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("first_name", form.first_name.trim());
      fd.append("bio", form.bio || "");
      fd.append("profession", form.profession || "");
      fd.append("role_label", form.role_label || "");
      fd.append("is_president", String(Number(form.is_president || 0)));
      fd.append("filmography_url", form.filmography_url || "");
      fd.append("sort_order", String(Number(form.sort_order || 1)));
      if (form.imgFile) fd.append("img", form.imgFile);

      const url =
        mode === "create"
          ? `${API_BASE}/api/jury`
          : `${API_BASE}/api/jury/${currentId}`;

      const method = mode === "create" ? "POST" : "PUT";

      const r = await fetch(url, { method, body: fd });
      const d = await r.json().catch(() => ({}));

      if (!r.ok) throw new Error(d?.error || t("admin.errors.save"));

      setOpen(false);
      await loadJury();
    } catch (e) {
      setError(e?.message || t("admin.errors.generic"));
    } finally {
      setSaving(false);
    }
  }

  async function removeMember(j) {
    const ok = confirm(
      t("admin.confirmDelete", { first_name: j.first_name, name: j.name }),
    );
    if (!ok) return;

    try {
      const r = await fetch(`${API_BASE}/api/jury/${j.id}`, {
        method: "DELETE",
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d?.error || t("admin.errors.delete"));
      await loadJury();
    } catch (e) {
      alert(e?.message || t("admin.errors.delete"));
    }
  }

  return (
    <div className="w-full">
      <div className="mx-auto w-full px-6 pb-14 pt-10">
        <main className="min-w-0 w-full">
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-[42px] font-extrabold tracking-tight">
                {t("admin.title")}
              </h3>
              <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                {t("admin.subtitle")}
              </p>
            </div>

            <button
              onClick={openCreate}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-pink-500 px-6 py-3 text-sm font-extrabold text-white shadow-sm hover:opacity-95 active:opacity-90"
            >
              {t("admin.addButton")}
            </button>
          </div>

          {error && !open && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
              {error}
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading && <div>{t("admin.states.loading")}</div>}

            {!loading &&
              sortedJury.map((j) => (
                <div
                  key={j.id}
                  className="rounded-[28px] bg-white p-6 ring-1 ring-black/5 shadow-sm dark:bg-white/5 dark:ring-white/10"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={resolveImg(j.img)}
                      alt=""
                      className="h-16 w-16 rounded-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                          {j.role_label}
                        </div>

                        {Number(j.is_president) === 1 && (
                          <span className="rounded-full bg-pink-500/15 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-pink-600 dark:text-pink-300">
                            {t("admin.badges.president")}
                          </span>
                        )}
                      </div>

                      <div className="text-lg font-bold truncate">
                        {j.first_name} {j.name}
                      </div>

                      <div className="text-sm text-black/60 dark:text-white/60 truncate">
                        {j.profession}
                      </div>
                    </div>
                  </div>

                  {j.bio && (
                    <p className="mt-4 text-sm text-black/65 dark:text-white/65 line-clamp-3">
                      {j.bio}
                    </p>
                  )}

                  {j.filmography_url && (
                    <a
                      href={j.filmography_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex rounded-full bg-[#2F6BFF] px-5 py-2 text-xs font-semibold text-white"
                    >
                      {t("admin.actions.filmography")}
                    </a>
                  )}

                  <div className="mt-6 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(j)}
                      className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-bold text-neutral-800 hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                    >
                      {t("admin.actions.edit")}
                    </button>

                    <button
                      onClick={() => removeMember(j)}
                      className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-extrabold text-red-700 hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200 dark:hover:bg-red-500/20"
                    >
                      {t("admin.actions.delete")}
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <JuryForm
            open={open}
            mode={mode}
            initialValues={initialValues}
            saving={saving}
            error={error}
            onClose={() => setOpen(false)}
            onSubmit={onSubmit}
          />
        </main>
      </div>
    </div>
  );
}
