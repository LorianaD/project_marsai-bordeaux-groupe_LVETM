import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getEvents } from "../../services/Events/EventsApi.js";
import BookingModal from "../BookingModal.jsx";

export default function EventDetailsContent() {
  const { id } = useParams();
  const { t } = useTranslation("event");
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    getEvents()
      .then((list) => {
        const found = list.find((e) => String(e.id) === String(id));
        setEvent(found ?? null);
      })
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-black/60 dark:text-white/60">{t("detailLoading")}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center space-y-4">
        <h1 className="text-xl font-semibold text-black dark:text-white">
          {t("detailNotFound")}
        </h1>
        <p className="text-sm text-black/60 dark:text-white/60">
          {t("detailNotFoundHint")}
        </p>
        <Link
          to="/events"
          className="inline-block rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white"
        >
          {t("detailBackToEvents")}
        </Link>
      </div>
    );
  }

  const capacity = event.stock != null ? Number(event.stock) : null;
  const registered = Number(event.registered ?? 0);
  const remaining = capacity != null ? Math.max(0, capacity - registered) : null;

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link
          to="/events"
          className="mb-6 inline-block text-sm font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
        >
          ← {t("detailBackToEvents")}
        </Link>

        <article className="rounded-3xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5 p-6 md:p-8">
          {event.illustration && (
            <div className="mb-6 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
              <img
                src={event.illustration}
                alt=""
                className="h-48 w-full object-cover md:h-64"
              />
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex h-8 items-center justify-center rounded-full bg-sky-400 px-4 text-xs font-semibold text-black">
              {event.date
                ? new Date(event.date).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "—"}
            </span>
            {event.location && (
              <span className="text-black/70 dark:text-white/70">
                {event.location}
              </span>
            )}
          </div>
          <h1 className="mt-4 font-['Arimo'] text-2xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
            {event.title}
          </h1>
          {event.description && (
            <p className="mt-4 text-sm text-black/80 dark:text-white/80 whitespace-pre-wrap">
              {event.description}
            </p>
          )}
          {event.length != null && Number(event.length) > 0 && (
            <p className="mt-3 text-xs text-black/60 dark:text-white/60">
              {t("detailDuration", { count: event.length })}
            </p>
          )}
          {remaining != null && (
            <p className="mt-3 text-sm font-medium text-black/80 dark:text-white/80">
              {t("detailPlaceRemaining", { count: remaining })}
            </p>
          )}
          <button
            type="button"
            onClick={() => setShowBooking(true)}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold tracking-[0.18em] text-white uppercase"
          >
            {t("detailReserveCta")}
          </button>
        </article>
      </div>

      {showBooking && (
        <BookingModal
          event={event}
          onClose={() => setShowBooking(false)}
          onSuccess={() => {
            setShowBooking(false);
            getEvents()
              .then((list) => {
                const found = list.find((e) => String(e.id) === String(id));
                setEvent(found ?? event);
              })
              .catch(() => {});
          }}
        />
      )}
    </>
  );
}
