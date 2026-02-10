import { useEffect, useState } from "react";
import AdminHero from "../../components/admin/AdminHero.jsx";
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import AdminSidebarModal from "../../components/admin/AdminSidebarModal.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Résout l’URL complète d’une image de jury
function resolveImg(src) {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${API_BASE}/uploads/jury/${src}`;
}

export default function DistributionJury() {
  // États UI et données
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jury, setJury] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chargement de la liste des membres du jury
  useEffect(() => {
    fetch(`${API_BASE}/api/jury`)
      .then((r) => r.json())
      .then((d) => setJury(d?.jury || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    // Conteneur global de la page admin
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      {/* Sidebar mobile (overlay) */}
      <AdminSidebarModal
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="distribution-jury"
      />

      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex gap-7">
          {/* Sidebar desktop */}
          <aside className="hidden shrink-0 lg:block lg:sticky lg:top-10 lg:self-start">
            <AdminSidebar active="distribution-jury" />
          </aside>

          {/* Contenu principal */}
          <div className="min-w-0 flex-1">
            {/* Bouton menu mobile */}
            <div className="mb-4 flex lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm dark:bg-white/5"
              >
                Menu
              </button>
            </div>

            {/* Hero admin */}
            <AdminHero />

            {/* En-tête de page */}
            <h1 className="mt-10 text-[42px] font-extrabold tracking-tight">
              DISTRIBUTION & JURY
            </h1>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              Informations des membres du jury pour l’administration.
            </p>

            {/* Grille des membres du jury */}
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* État de chargement */}
              {loading && <div>Chargement…</div>}

              {/* Cartes jury */}
              {!loading &&
                jury.map((j) => (
                  <div
                    key={j.id}
                    className="rounded-[28px] bg-white p-6 ring-1 ring-black/5 shadow-sm
                               dark:bg-white/5 dark:ring-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={resolveImg(j.img)}
                        alt=""
                        className="h-16 w-16 rounded-full object-cover"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />

                      <div>
                        <div className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                          {j.role_label}
                        </div>
                        <div className="text-lg font-bold">
                          {j.first_name} {j.name}
                        </div>
                        <div className="text-sm text-black/60 dark:text-white/60">
                          {j.profession}
                        </div>
                      </div>
                    </div>

                    {/* Biographie (optionnelle) */}
                    {j.bio && (
                      <p className="mt-4 text-sm text-black/65 dark:text-white/65 line-clamp-3">
                        {j.bio}
                      </p>
                    )}

                    {/* Lien externe vers la filmographie */}
                    {j.filmography_url && (
                      <a
                        href={j.filmography_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex rounded-full bg-[#2F6BFF] px-5 py-2 text-xs font-semibold text-white"
                      >
                        Voir la filmographie
                      </a>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
