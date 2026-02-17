import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AdminHero from "../../components/admin/AdminHero.jsx";
import AdminLayoutSidebar from "../../components/admin/AdminLayoutSidebar.jsx";
import AdminSidebarModal from "../../components/admin/AdminSidebarModal.jsx";
import { getEventBookings } from "../../services/Events/AdminEventApi.js";

export default function AdminEventParticipants() {
  const { t } = useTranslation("adminEventParticipants");
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!eventId) return;
    let alive = true;
    getEventBookings(eventId)
      .then((data) => {
        if (alive) {
          setEvent(data.event || null);
          setBookings(Array.isArray(data.bookings) ? data.bookings : []);
        }
      })
      .catch((e) => {
        if (alive) setErr(e?.message || "Erreur chargement");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => { alive = false; };
  }, [eventId]);

  const formatDate = (v) => {
    if (!v) return "—";
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <AdminSidebarModal
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="events"
      />

      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <AdminLayoutSidebar active="events" />

          <main className="min-w-0 flex-1">
            <div className="mb-4 flex lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl bg-black/5 px-4 py-3 text-sm text-black/80 ring-1 ring-black/10 hover:bg-black/10 dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/10"
              >
                {t("menuButton")}
              </button>
            </div>

            <div className="mt-5">
              <AdminHero />
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-black dark:text-white">
                  {t("title")}
                </h1>
                <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                  {event ? event.title : "…"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/admin/events")}
                className="rounded-2xl bg-black/10 dark:bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-black/15 dark:hover:bg-white/15"
              >
                {t("backToEvents")}
              </button>
            </div>

            {loading && (
              <div className="mt-8 text-sm text-black/60 dark:text-white/60">
                {t("loading")}
              </div>
            )}

            {err && (
              <div className="mt-8 rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                {err}
              </div>
            )}

            {!loading && !err && (
              <div className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="border-b border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.06]">
                      <tr className="text-left">
                        <th className="px-5 py-4 font-semibold text-black/70 dark:text-white/70">
                          {t("tableFirstName")}
                        </th>
                        <th className="px-5 py-4 font-semibold text-black/70 dark:text-white/70">
                          {t("tableLastName")}
                        </th>
                        <th className="px-5 py-4 font-semibold text-black/70 dark:text-white/70">
                          {t("tableEmail")}
                        </th>
                        <th className="px-5 py-4 font-semibold text-black/70 dark:text-white/70">
                          {t("tableRegisteredAt")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                      {bookings.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-5 py-8 text-center text-black/50 dark:text-white/50">
                            {t("noParticipants")}
                          </td>
                        </tr>
                      ) : (
                        bookings.map((b) => (
                          <tr key={b.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03]">
                            <td className="px-5 py-3">{b.first_name || "—"}</td>
                            <td className="px-5 py-3">{b.last_name || "—"}</td>
                            <td className="px-5 py-3">{b.email || "—"}</td>
                            <td className="px-5 py-3 text-black/60 dark:text-white/60">
                              {formatDate(b.created_at)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {bookings.length > 0 && (
                  <div className="border-t border-black/10 px-5 py-3 text-xs text-black/50 dark:border-white/10 dark:text-white/50">
                    {t("participantCount", { count: bookings.length })}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
