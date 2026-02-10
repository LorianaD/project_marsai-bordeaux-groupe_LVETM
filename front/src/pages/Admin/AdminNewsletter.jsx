import { useEffect, useState } from "react";
import AdminHero from "../../components/admin/AdminHero";
import AdminSidebar from "../../components/admin/AdminSidebar";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState(null);

  const [status, setStatus] = useState("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const limit = 20;

  async function loadAll() {
    setLoading(true);
    try {
      const subsUrl = `${API_BASE}/api/admin/newsletter/subscribers?status=${status}&q=${encodeURIComponent(
        q,
      )}&limit=${limit}&offset=${page * limit}`;

      const [subsRes, statsRes] = await Promise.all([
        fetch(subsUrl, { headers: { Accept: "application/json" } }),
        fetch(`${API_BASE}/api/admin/newsletter/stats`, {
          headers: { Accept: "application/json" },
        }),
      ]);

      const subsData = await subsRes.json();
      const statsData = await statsRes.json();

      setSubscribers(subsData?.items || []);
      setStats(statsData?.stats || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page]);

  function onSearch(e) {
    e.preventDefault();
    setPage(0);
    loadAll();
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[320px] shrink-0">
          {/* ✅ active correct */}
          <AdminSidebar active="newsletter-subs" />
        </div>

        {/* Main */}
        <main className="flex-1 px-8 py-8">
          <AdminHero />

          <div className="mt-10">
            <h1 className="text-4xl font-black tracking-tight">NEWSLETTER</h1>
            <p className="mt-2 text-sm opacity-70">
              Gestion des abonnés et statistiques (double opt-in).
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatCard label="Total" value={stats?.total ?? "—"} />
            <StatCard label="Actifs" value={stats?.active ?? "—"} />
            <StatCard label="Pending" value={stats?.pending ?? "—"} />
            <StatCard label="Désabonnés" value={stats?.unsubscribed ?? "—"} />
          </div>

          {/* Filtres */}
          <form
            onSubmit={onSearch}
            className="mt-8 flex flex-col gap-3 md:flex-row md:items-center"
          >
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(0);
              }}
              className="h-11 rounded-xl border border-black/10 bg-white px-3 text-sm
                         dark:border-white/10 dark:bg-black"
            >
              <option value="all">Tous</option>
              <option value="active">Actifs</option>
              <option value="pending">Pending</option>
              <option value="unsubscribed">Désabonnés</option>
            </select>

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un email…"
              className="h-11 flex-1 rounded-xl border border-black/10 bg-white px-4 text-sm
                         placeholder:text-black/40
                         dark:border-white/10 dark:bg-black dark:placeholder:text-white/40"
            />

            <button
              type="submit"
              className="h-11 rounded-xl bg-black px-5 text-sm font-bold text-white
                         hover:opacity-90
                         dark:bg-white dark:text-black"
            >
              Rechercher
            </button>
          </form>

          {/* Table */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
              <div className="text-sm font-semibold">Abonnés</div>
              <div className="text-xs opacity-60">
                {loading ? "Chargement…" : `${subscribers.length} résultat(s)`}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-black/[0.03] dark:bg-white/[0.06]">
                  <tr className="text-left">
                    <th className="px-5 py-3 font-semibold">Email</th>
                    <th className="px-5 py-3 font-semibold">Statut</th>
                    <th className="px-5 py-3 font-semibold">Confirmé</th>
                    <th className="px-5 py-3 font-semibold">Désinscrit</th>
                  </tr>
                </thead>

                <tbody>
                  {subscribers.map((s) => (
                    <tr
                      key={s.id}
                      className="border-t border-black/10 dark:border-white/10"
                    >
                      <td className="px-5 py-4">{s.email}</td>
                      <td className="px-5 py-4">
                        <StatusPill
                          status={s.status}
                          unsubscribed_at={s.unsubscribed_at}
                        />
                      </td>
                      <td className="px-5 py-4">
                        {s.confirmed_at ? "Oui" : "Non"}
                      </td>
                      <td className="px-5 py-4">
                        {s.unsubscribed_at ? "Oui" : "Non"}
                      </td>
                    </tr>
                  ))}

                  {!loading && subscribers.length === 0 && (
                    <tr>
                      <td
                        className="px-5 py-10 text-center opacity-60"
                        colSpan={4}
                      >
                        Aucun résultat
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold
                         disabled:opacity-40
                         dark:border-white/10"
            >
              ← Précédent
            </button>

            <div className="text-xs opacity-60">Page {page + 1}</div>

            <button
              disabled={subscribers.length < limit}
              onClick={() => setPage((p) => p + 1)}
              className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold
                         disabled:opacity-40
                         dark:border-white/10"
            >
              Suivant →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-5 dark:border-white/10 dark:bg-white/[0.06]">
      <div className="text-2xl font-black">{value}</div>
      <div className="mt-1 text-xs font-semibold tracking-[0.2em] uppercase opacity-60">
        {label}
      </div>
    </div>
  );
}

function StatusPill({ status, unsubscribed_at }) {
  const isUnsub = Boolean(unsubscribed_at);
  const label = isUnsub ? "unsubscribed" : status;

  const cls =
    label === "active"
      ? "bg-green-500/10 text-green-600 dark:text-green-400"
      : label === "pending"
        ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
        : "bg-red-500/10 text-red-700 dark:text-red-400";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${cls}`}
    >
      {label}
    </span>
  );
}
