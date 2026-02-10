import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHero from "../../components/admin/AdminHero";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function formatDateTime(v) {
  if (!v) return null;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString();
}

function StatusBadge({ status }) {
  const s = String(status || "draft").toLowerCase();

  const cls =
    s === "sent"
      ? "bg-green-500/10 text-green-700 dark:text-green-400"
      : s === "scheduled"
        ? "bg-blue-500/10 text-blue-700 dark:text-blue-300"
        : s === "sending"
          ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300"
          : "bg-white/10 text-black/70 dark:text-white/70";

  const label = s.toUpperCase();

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold tracking-widest ${cls}`}
    >
      {label}
    </span>
  );
}

export default function AdminNewsletters() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/newsletters`, {
        headers: { Accept: "application/json" },
      });
      const data = await res.json().catch(() => null);
      setItems(data?.items || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex">
      <AdminSidebar active="newsletters-builder" />

      <main className="flex-1 px-8 py-8">
        <AdminHero />

        <div className="mt-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">NEWSLETTERS</h1>
            <p className="mt-2 text-sm opacity-70">
              Brouillons, programmation et historique d’envoi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={load}
              className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold
                         hover:bg-black/[0.03]
                         dark:border-white/10 dark:hover:bg-white/[0.06]"
            >
              {loading ? "..." : "Refresh"}
            </button>

            <button
              onClick={() => navigate("/admin/newsletters/new")}
              className="h-11 rounded-xl bg-black px-5 text-sm font-bold text-white
                         dark:bg-white dark:text-black"
            >
              + Nouvelle newsletter
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {items.map((n) => {
            const scheduled = formatDateTime(n.scheduled_at);
            const sent = formatDateTime(n.sent_at);
            const created = formatDateTime(n.created_at);

            return (
              <div
                key={n.id}
                onClick={() => navigate(`/admin/newsletters/${n.id}`)}
                className="cursor-pointer rounded-2xl border border-black/10 dark:border-white/10 p-5
                           hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="truncate text-base font-semibold">
                        {n.subject || `Newsletter #${n.id}`}
                      </div>
                      <StatusBadge status={n.status} />
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs opacity-70">
                      {created ? <span>Créée : {created}</span> : null}
                      {scheduled ? <span>Programmée : {scheduled}</span> : null}
                      {sent ? <span>Envoyée : {sent}</span> : null}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/newsletters/${n.id}`);
                    }}
                    className="h-10 shrink-0 rounded-xl border border-black/10 px-4 text-sm font-semibold
                               hover:bg-black/[0.03]
                               dark:border-white/10 dark:hover:bg-white/[0.06]"
                  >
                    Ouvrir
                  </button>
                </div>
              </div>
            );
          })}

          {!loading && items.length === 0 && (
            <div className="opacity-60 text-sm">Aucune newsletter.</div>
          )}
        </div>
      </main>
    </div>
  );
}
