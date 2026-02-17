import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayoutSidebar from "../../components/admin/AdminLayoutSidebar.jsx";
import AdminHero from "../../components/admin/AdminHero.jsx";
import AdminSidebarModal from "../../components/admin/AdminSidebarModal.jsx";
import NewsletterCkEditor from "../../components/newsletter/NewsletterCkEditor.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function AdminNewsletterNew() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("#ffffff");

  // NEW: contenu HTML (CKEditor)
  const [contentHtml, setContentHtml] = useState("<p>Bonjour 👋</p>");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function create() {
    if (!subject.trim()) {
      setError("Le subject est requis.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/admin/newsletters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          subject,
          title,
          background_color: background,
          content_json: { blocks: [] }, // ✅ on garde ton système actuel
          content_html: contentHtml, // ✅ nouveau champ CKEditor
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur création");

      navigate(`/admin/newsletters/${data.id}`);
    } catch (e) {
      setError(e?.message || "Erreur");
    } finally {
      setLoading(false);
    }
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

            <div className="mt-10">
              <h1 className="text-4xl font-black">NOUVELLE NEWSLETTER</h1>
              <p className="mt-2 text-sm opacity-70">
                Crée un brouillon, puis édite le contenu.
              </p>
            </div>

            <div className="mt-8 max-w-[920px] rounded-2xl border border-black/10 dark:border-white/10 p-6">
              <label className="text-xs font-semibold tracking-widest uppercase opacity-70">
                Subject (objet email)
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm
                           dark:border-white/10 dark:bg-black"
                placeholder="MarsAI — Newsletter #1"
              />

              <label className="mt-6 block text-xs font-semibold tracking-widest uppercase opacity-70">
                Titre (optionnel)
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm
                           dark:border-white/10 dark:bg-black"
                placeholder="Bienvenue"
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

              {/* ✅ NEW: CKEditor */}
              <label className="mt-6 block text-xs font-semibold tracking-widest uppercase opacity-70">
                Contenu (CKEditor)
              </label>
              <div className="mt-2">
                <NewsletterCkEditor
                  value={contentHtml}
                  onChange={setContentHtml}
                />
              </div>

              {error ? (
                <p className="mt-5 text-sm text-red-700 dark:text-red-400">
                  {error}
                </p>
              ) : null}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => navigate("/admin/newsletters")}
                  className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold
                             dark:border-white/10"
                >
                  Annuler
                </button>

                <button
                  onClick={create}
                  disabled={loading}
                  className="h-11 rounded-xl bg-black px-5 text-sm font-bold text-white
                             disabled:opacity-60
                             dark:bg-white dark:text-black"
                >
                  {loading ? "..." : "Créer"}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
