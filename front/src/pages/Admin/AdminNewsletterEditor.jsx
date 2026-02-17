import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayoutSidebar from "../../components/admin/AdminLayoutSidebar.jsx";
import AdminHero from "../../components/admin/AdminHero.jsx";
import AdminSidebarModal from "../../components/admin/AdminSidebarModal.jsx";
import NewsletterCkEditor from "../../components/newsletter/NewsletterCkEditor.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const blockTemplates = [
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

function esc(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export default function AdminNewsletterEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("#ffffff");
  const [blocks, setBlocks] = useState([]);

  const [contentHtml, setContentHtml] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [testTo, setTestTo] = useState("");

  const [scheduledAt, setScheduledAt] = useState("");
  const [sendingAll, setSendingAll] = useState(false);
  const [scheduling, setScheduling] = useState(false);

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
      setScheduledAt(
        data?.scheduled_at ? toDatetimeLocal(data.scheduled_at) : "",
      );
      setContentHtml(data?.content_html || "");

      const parsed =
        typeof data.content_json === "string"
          ? JSON.parse(data.content_json)
          : data.content_json;

      // ✅ on garde uniquement image/divider si jamais des vieux blocs existent
      const onlyAllowed = (parsed?.blocks || []).filter(
        (b) => b?.type === "image" || b?.type === "divider",
      );
      setBlocks(onlyAllowed);
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
        : { type: "divider" };

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
          content_json: { blocks }, // compat
          content_html: contentHtml,
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

  async function cancelSchedule() {
    setScheduling(true);
    setError("");
    setMsg("");

    try {
      const res = await fetch(
        `${API_BASE}/api/admin/newsletters/${id}/cancel-schedule`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
        },
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

  // ✅ PREVIEW LIVE (sans API)
  const previewDoc = useMemo(() => {
    const blocksHtml = blocks
      .map((b) => {
        if (b.type === "divider") {
          return `<hr style="border:none;border-top:1px solid rgba(0,0,0,.12);margin:16px 0" />`;
        }
        if (b.type === "image" && b.url) {
          return `<img alt="${esc(b.alt || "")}" src="${esc(
            b.url,
          )}" style="width:100%;border-radius:12px;margin:12px 0" />`;
        }
        return "";
      })
      .join("");

    const unsubscribeUrl =
      "http://localhost:5173/newsletter/unsubscribe?token=TEST";

    return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${esc(subject || "Newsletter")}</title>
</head>
<body style="margin:0;background:${esc(background)};font-family:Arial,sans-serif;">
  <div style="max-width:650px;margin:0 auto;padding:28px;">
    <div style="background:#fff;border-radius:18px;padding:22px;">
      ${
        title?.trim()
          ? `<h1 style="margin:0 0 16px;font-size:28px">${esc(title)}</h1>`
          : ""
      }

      ${contentHtml || ""}

      ${blocksHtml}

      <hr style="border:none;border-top:1px solid rgba(0,0,0,.12);margin:22px 0" />
      <p style="font-size:12px;opacity:.75;margin:0">
        Unsubscribe:
        <a href="${esc(unsubscribeUrl)}">click here</a>
      </p>
    </div>
  </div>
</body>
</html>`;
  }, [subject, title, background, contentHtml, blocks]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <AdminSidebarModal
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          active="newsletters-builder"
        />
        <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
          <div className="flex gap-7">
            <AdminLayoutSidebar active="newsletters-builder" />
            <main className="min-w-0 flex-1">
              <div className="mb-4 flex lg:hidden">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="rounded-xl bg-black/5 px-4 py-3 text-sm text-black/80 ring-1 ring-black/10 hover:bg-black/10 dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/10"
                >
                  ☰ Menu
                </button>
              </div>
              <div className="mt-5">
                <AdminHero />
              </div>
              <div className="mt-10 opacity-70">Chargement…</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <AdminSidebarModal
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="newsletters-builder"
      />
      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <AdminLayoutSidebar active="newsletters-builder" />
          <main className="min-w-0 flex-1">
            <div className="mb-4 flex lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm text-black/80 ring-1 ring-black/10 hover:bg-black/10 dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/10"
              >
                ☰ Menu
              </button>
            </div>
            <div className="mt-5">
              <AdminHero />
            </div>

            <div className="mt-10 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black">NEWSLETTER #{id}</h1>
              </div>

              <button
                onClick={() => navigate("/admin/newsletters")}
                className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold dark:border-white/10"
              >
                ← Retour
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[520px_1fr]">
              {/* Left */}
              <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
                <label className="text-xs font-semibold tracking-widest uppercase opacity-70">
                  Subject
                </label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm dark:border-white/10 dark:bg-black"
                />

                <label className="mt-6 block text-xs font-semibold tracking-widest uppercase opacity-70">
                  Titre (optionnel)
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm dark:border-white/10 dark:bg-black"
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

                {/* CKEditor */}
                <div className="mt-6">
                  <div className="text-xs font-semibold tracking-widest uppercase opacity-70">
                    Contenu (CKEditor)
                  </div>
                  <div className="mt-3">
                    <NewsletterCkEditor
                      value={contentHtml}
                      onChange={setContentHtml}
                    />
                  </div>
                </div>

                {/* Blocks (image/divider only) */}
                <div className="mt-6">
                  <div className="text-xs font-semibold tracking-widest uppercase opacity-70">
                    Ajouter
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {blockTemplates.map((t) => (
                      <button
                        key={t.type}
                        type="button"
                        onClick={() => addBlock(t.type)}
                        className="h-10 rounded-xl border border-black/10 px-3 text-sm font-semibold hover:bg-black/[0.03] dark:border-white/10 dark:hover:bg-white/[0.06]"
                      >
                        + {t.label}
                      </button>
                    ))}
                  </div>
                </div>

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
                            className="h-9 rounded-xl border border-red-500/20 px-3 text-xs font-semibold text-red-700 hover:bg-red-500/10 dark:text-red-400"
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
                            className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm dark:border-white/10 dark:bg-black"
                            placeholder="URL de l'image (optionnel)"
                          />

                          <input
                            value={b.alt || ""}
                            onChange={(e) =>
                              updateBlock(i, { alt: e.target.value })
                            }
                            className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm dark:border-white/10 dark:bg-black"
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
                    </div>
                  ))}

                  {blocks.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-black/20 p-6 text-sm opacity-60 dark:border-white/20">
                      Aucun bloc (optionnel). Tu peux ajouter une image ou un
                      divider.
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
                      className="h-11 rounded-xl bg-black px-5 text-sm font-bold text-white disabled:opacity-60 dark:bg-white dark:text-black"
                    >
                      {saving ? "..." : "Sauvegarder"}
                    </button>

                    <div className="flex items-center gap-2">
                      <input
                        value={testTo}
                        onChange={(e) => setTestTo(e.target.value)}
                        placeholder="Email test…"
                        className="h-11 w-[260px] rounded-xl border border-black/10 bg-white px-4 text-sm dark:border-white/10 dark:bg-black"
                      />
                      <button
                        onClick={sendTest}
                        className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold hover:bg-black/[0.03] dark:border-white/10 dark:hover:bg-white/[0.06]"
                      >
                        Envoyer test
                      </button>
                    </div>
                  </div>

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
                          className="h-11 w-full md:w-[260px] rounded-xl border border-black/10 bg-white px-4 text-sm dark:border-white/10 dark:bg-black"
                        />

                        <button
                          type="button"
                          onClick={scheduleNewsletter}
                          disabled={scheduling}
                          className="h-11 rounded-xl bg-black px-4 text-sm font-bold text-white disabled:opacity-60 dark:bg-white dark:text-black"
                        >
                          {scheduling ? "..." : "Programmer"}
                        </button>

                        <button
                          type="button"
                          onClick={cancelSchedule}
                          disabled={scheduling}
                          className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold disabled:opacity-60 dark:border-white/10"
                        >
                          Annuler programmation
                        </button>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={sendNowToAll}
                          disabled={sendingAll}
                          className="h-11 rounded-xl border border-red-500/20 px-4 text-sm font-bold text-red-700 hover:bg-red-500/10 disabled:opacity-60 dark:text-red-400"
                        >
                          {sendingAll ? "..." : "Envoyer à tous maintenant"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: preview LIVE */}
              <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
                <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
                  <div className="text-sm font-semibold">Preview (live)</div>
                </div>

                <iframe
                  title="preview"
                  srcDoc={previewDoc}
                  className="h-[820px] w-full bg-white"
                  sandbox="" // ✅ pas besoin de scripts
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
