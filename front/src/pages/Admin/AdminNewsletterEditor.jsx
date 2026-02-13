import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayoutSidebar from "../../components/admin/AdminLayoutSidebar.jsx";
import AdminHero from "../../components/admin/AdminHero.jsx";
import AdminTopBar from "../../components/admin/AdminTopBar.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const blockTemplates = [
  { type: "h1", label: "Titre " },
  { type: "h2", label: "Sous-titre " },
  { type: "p", label: "Texte" },
  { type: "image", label: "Image" },
  { type: "divider", label: "Divider" },
];

function fullUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
}

function toDatetimeLocal(value) {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

export default function AdminNewsletterEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("#ffffff");
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [testTo, setTestTo] = useState("");

  // ✅ AJOUTS : programmation + envoi global
  const [scheduledAt, setScheduledAt] = useState(""); // datetime-local
  const [sendingAll, setSendingAll] = useState(false);
  const [scheduling, setScheduling] = useState(false);

  const previewUrl = useMemo(
    () => `${API_BASE}/api/admin/newsletters/${id}/preview`,
    [id],
  );

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/admin/newsletters/${id}`, {
        headers: { Accept: "application/json" },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur chargement");

      setSubject(data.subject || "");
      setTitle(data.title || "");
      setBackground(data.background_color || "#ffffff");

      // ✅ scheduled_at -> datetime-local
      setScheduledAt(
        data?.scheduled_at ? toDatetimeLocal(data.scheduled_at) : "",
      );

      const parsed =
        typeof data.content_json === "string"
          ? JSON.parse(data.content_json)
          : data.content_json;
      setBlocks(parsed?.blocks || []);
    } catch (e) {
      setError(e?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function addBlock(type) {
    const b =
      type === "image"
        ? { type: "image", url: "", alt: "" }
        : type === "divider"
          ? { type: "divider" }
          : { type, text: "" };

    setBlocks((prev) => [...prev, b]);
    setMsg("");
  }

  function updateBlock(i, patch) {
    setBlocks((prev) =>
      prev.map((b, idx) => (idx === i ? { ...b, ...patch } : b)),
    );
    setMsg("");
  }

  function removeBlock(i) {
    setBlocks((prev) => prev.filter((_, idx) => idx !== i));
    setMsg("");
  }

  function moveBlock(i, dir) {
    setBlocks((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setMsg("");
  }

  async function uploadImage(file, blockIndex) {
    const form = new FormData();
    form.append("image", file);

    const res = await fetch(`${API_BASE}/api/admin/newsletters/upload-image`, {
      method: "POST",
      body: form,
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || "Erreur upload");

    updateBlock(blockIndex, { url: fullUrl(data.file.url) });
  }

  async function save() {
    if (!subject.trim()) {
      setError("Le subject est requis.");
      return;
    }

    setSaving(true);
    setError("");
    setMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/admin/newsletters/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          subject,
          title,
          background_color: background,
          content_json: { blocks },
          status: "draft",
          scheduled_at: null,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur sauvegarde");

      setMsg("Sauvegardé ✅");
    } catch (e) {
      setError(e?.message || "Erreur");
    } finally {
      setSaving(false);
    }
  }

  async function sendTest() {
    if (!testTo.trim()) {
      setError("Ajoute un email pour l’envoi test.");
      return;
    }
    setError("");
    setMsg("");

    try {
      const res = await fetch(
        `${API_BASE}/api/admin/newsletters/${id}/send-test`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ to: testTo }),
        },
      );

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur envoi test");

      setMsg("Test envoyé (check Mailtrap) ✅");
    } catch (e) {
      setError(e?.message || "Erreur");
    }
  }

  // ✅ Programmer
  async function scheduleNewsletter() {
    if (!scheduledAt) {
      setError("Choisis une date/heure pour programmer.");
      return;
    }

    setScheduling(true);
    setError("");
    setMsg("");

    try {
      const iso = new Date(scheduledAt).toISOString();

      const res = await fetch(
        `${API_BASE}/api/admin/newsletters/${id}/schedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ scheduled_at: iso }),
        },
      );

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur programmation");

      setMsg("Programmée ✅");
      await load();
    } catch (e) {
      setError(e?.message || "Erreur");
    } finally {
      setScheduling(false);
    }
  }

  // ✅ Annuler programmation
  async function cancelSchedule() {
    setScheduling(true);
    setError("");
    setMsg("");

    try {
      const res = await fetch(
        `${API_BASE}/api/admin/newsletters/${id}/cancel-schedule`,
        { method: "POST", headers: { Accept: "application/json" } },
      );

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur annulation");

      setMsg("Programmation annulée ✅");
      setScheduledAt("");
      await load();
    } catch (e) {
      setError(e?.message || "Erreur");
    } finally {
      setScheduling(false);
    }
  }

  // ✅ Envoyer à tous maintenant
  async function sendNowToAll() {
    setSendingAll(true);
    setError("");
    setMsg("");

    try {
      const res = await fetch(
        `${API_BASE}/api/admin/newsletters/${id}/send-now`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
        },
      );

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur envoi");

      setMsg("Envoi terminé ✅ (check Mailtrap)");
      await load();
    } catch (e) {
      setError(e?.message || "Erreur");
    } finally {
      setSendingAll(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex">
        <AdminLayoutSidebar active="newsletters-builder" />
        <main className="flex-1 px-8 py-8">
          <AdminTopBar pageTitle={`Newsletter #${id}`} subtitle="Builder simple par blocs + preview." />
          <div className="mt-5">
            <AdminHero />
          </div>
          <div className="mt-10 opacity-70">Chargement…</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex">
      <AdminLayoutSidebar active="newsletters-builder" />
      <main className="flex-1 px-8 py-8">
        <AdminTopBar pageTitle={`Newsletter #${id}`} subtitle="Builder simple par blocs + preview." />
        <div className="mt-5">
          <AdminHero />
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">NEWSLETTER #{id}</h1>
            <p className="mt-2 text-sm opacity-70">
              Builder simple par blocs + preview.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/newsletters")}
            className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold dark:border-white/10"
          >
            ← Retour
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[520px_1fr]">
          {/* Left: editor */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
            <label className="text-xs font-semibold tracking-widest uppercase opacity-70">
              Subject
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm
                         dark:border-white/10 dark:bg-black"
            />

            <label className="mt-6 block text-xs font-semibold tracking-widest uppercase opacity-70">
              Titre (optionnel)
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm
                         dark:border-white/10 dark:bg-black"
            />

            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase opacity-70">
                  Background
                </div>
                <div className="mt-1 text-xs opacity-60">{background}</div>
              </div>

              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="h-10 w-16 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
              />
            </div>

            {/* Add block */}
            <div className="mt-6">
              <div className="text-xs font-semibold tracking-widest uppercase opacity-70">
                Ajouter un bloc
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {blockTemplates.map((t) => (
                  <button
                    key={t.type}
                    type="button"
                    onClick={() => addBlock(t.type)}
                    className="h-10 rounded-xl border border-black/10 px-3 text-sm font-semibold
                               hover:bg-black/[0.03]
                               dark:border-white/10 dark:hover:bg-white/[0.06]"
                  >
                    + {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Blocks */}
            <div className="mt-6 space-y-4">
              {blocks.map((b, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-black/10 dark:border-white/10 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold uppercase tracking-widest opacity-60">
                      {b.type}
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => moveBlock(i, -1)}
                        className="h-9 rounded-xl border border-black/10 px-3 text-xs font-semibold dark:border-white/10"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlock(i, 1)}
                        className="h-9 rounded-xl border border-black/10 px-3 text-xs font-semibold dark:border-white/10"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBlock(i)}
                        className="h-9 rounded-xl border border-red-500/20 px-3 text-xs font-semibold text-red-700
                                   hover:bg-red-500/10
                                   dark:text-red-400"
                      >
                        Suppr
                      </button>
                    </div>
                  </div>

                  {b.type === "divider" ? (
                    <div className="mt-4 opacity-60">— Divider —</div>
                  ) : null}

                  {b.type === "image" ? (
                    <div className="mt-4 space-y-3">
                      <input
                        value={b.url || ""}
                        onChange={(e) =>
                          updateBlock(i, { url: e.target.value })
                        }
                        className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm
                                   dark:border-white/10 dark:bg-black"
                        placeholder="URL de l'image (ou upload)"
                      />

                      <input
                        value={b.alt || ""}
                        onChange={(e) =>
                          updateBlock(i, { alt: e.target.value })
                        }
                        className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm
                                   dark:border-white/10 dark:bg-black"
                        placeholder="Alt"
                      />

                      <div className="flex items-center justify-between">
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            try {
                              await uploadImage(file, i);
                              setMsg("Image uploadée ✅");
                            } catch (err) {
                              setError(err?.message || "Erreur upload");
                            } finally {
                              e.target.value = "";
                            }
                          }}
                          className="text-xs"
                        />

                        {b.url ? (
                          <a
                            href={b.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold underline opacity-70"
                          >
                            Ouvrir
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {b.type === "h1" || b.type === "h2" || b.type === "p" ? (
                    <textarea
                      value={b.text || ""}
                      onChange={(e) => updateBlock(i, { text: e.target.value })}
                      className="mt-4 min-h-[110px] w-full rounded-xl border border-black/10 bg-white p-4 text-sm
                                 dark:border-white/10 dark:bg-black"
                      placeholder="Texte…"
                    />
                  ) : null}
                </div>
              ))}

              {blocks.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-black/20 p-6 text-sm opacity-60 dark:border-white/20">
                  Aucun bloc. Ajoute un titre, du texte ou une image.
                </div>
              ) : null}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3">
              {error ? (
                <p className="text-sm text-red-700 dark:text-red-400">
                  {error}
                </p>
              ) : null}
              {msg ? (
                <p className="text-sm text-green-700 dark:text-green-400">
                  {msg}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={save}
                  disabled={saving}
                  className="h-11 rounded-xl bg-black px-5 text-sm font-bold text-white disabled:opacity-60
                             dark:bg-white dark:text-black"
                >
                  {saving ? "..." : "Sauvegarder"}
                </button>

                <div className="flex items-center gap-2">
                  <input
                    value={testTo}
                    onChange={(e) => setTestTo(e.target.value)}
                    placeholder="Email test…"
                    className="h-11 w-[260px] rounded-xl border border-black/10 bg-white px-4 text-sm
                               dark:border-white/10 dark:bg-black"
                  />
                  <button
                    onClick={sendTest}
                    className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold
                               hover:bg-black/[0.03]
                               dark:border-white/10 dark:hover:bg-white/[0.06]"
                  >
                    Envoyer test
                  </button>
                </div>
              </div>

              {/* ✅ Scheduling + send now */}
              <div className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 p-4">
                <div className="text-xs font-bold uppercase tracking-widest opacity-60">
                  Envoi & Programmation
                </div>

                <div className="mt-3 flex flex-col gap-3">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <input
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                      className="h-11 w-full md:w-[260px] rounded-xl border border-black/10 bg-white px-4 text-sm
                                 dark:border-white/10 dark:bg-black"
                    />

                    <button
                      type="button"
                      onClick={scheduleNewsletter}
                      disabled={scheduling}
                      className="h-11 rounded-xl bg-black px-4 text-sm font-bold text-white disabled:opacity-60
                                 dark:bg-white dark:text-black"
                    >
                      {scheduling ? "..." : "Programmer"}
                    </button>

                    <button
                      type="button"
                      onClick={cancelSchedule}
                      disabled={scheduling}
                      className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold disabled:opacity-60
                                 dark:border-white/10"
                    >
                      Annuler programmation
                    </button>
                  </div>

                  <div className="flex">
                    <button
                      type="button"
                      onClick={sendNowToAll}
                      disabled={sendingAll}
                      className="h-11 rounded-xl border border-red-500/20 px-4 text-sm font-bold text-red-700
                                 hover:bg-red-500/10 disabled:opacity-60
                                 dark:text-red-400"
                    >
                      {sendingAll ? "..." : "Envoyer à tous maintenant"}
                    </button>
                  </div>

                  <p className="text-xs opacity-60">
                    Conseil : clique d’abord sur <b>Sauvegarder</b>, puis
                    programme ou envoie.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: preview */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
              <div className="text-sm font-semibold">Preview</div>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("nl-preview");
                  if (el) el.src = `${previewUrl}?t=${Date.now()}`;
                }}
                className="text-xs font-semibold underline opacity-70"
              >
                Rafraîchir
              </button>
            </div>

            <iframe
              id="nl-preview"
              title="preview"
              src={previewUrl}
              className="h-[820px] w-full bg-white"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
