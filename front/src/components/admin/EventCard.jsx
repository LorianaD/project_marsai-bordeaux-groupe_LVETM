import { clamp, formatTimeFR } from "../../pages/Admin/AdminEvents.utils.js";

export default function EventCard({
  ev,
  onEdit,
  onDelete,
  onTogglePublish,
  onParticipants,
}) {
  // Calcul du pourcentage de remplissage
  const fill =
    ev.capacity && ev.capacity > 0
      ? Math.round(((ev.registered || 0) / ev.capacity) * 100)
      : 0;

  // Badge selon le type d’événement
  const badge =
    ev.type === "masterclass"
      ? {
          label: "Masterclass",
          cls: "bg-sky-500/15 text-sky-700 border-sky-400/30 dark:text-sky-200 dark:border-sky-400/20",
        }
      : ev.type === "conference"
        ? {
            label: "Conférence",
            cls: "bg-fuchsia-500/15 text-fuchsia-700 border-fuchsia-400/30 dark:text-fuchsia-200 dark:border-fuchsia-400/20",
          }
        : ev.type === "projection"
          ? {
              label: "Projection",
              cls: "bg-amber-500/15 text-amber-700 border-amber-400/30 dark:text-amber-200 dark:border-amber-400/20",
            }
          : {
              label: "Atelier",
              cls: "bg-emerald-500/15 text-emerald-700 border-emerald-400/30 dark:text-emerald-200 dark:border-emerald-400/20",
            };

  return (
    // Carte événement
    <article className="rounded-3xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-black/35 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {/* Contenu principal */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${badge.cls}`}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-black/60 dark:bg-white/70" />
              {badge.label}
            </span>

            <span className="rounded-full bg-black/10 dark:bg-white/10 px-3 py-1 text-xs text-black/70 dark:text-white/70">
              {formatTimeFR(ev.startAt)} • {ev.location || "Lieu à préciser"}
            </span>

            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold",
                ev.published
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-200"
                  : "bg-black/10 text-black/60 dark:bg-white/10 dark:text-white/60",
              ].join(" ")}
            >
              {ev.published ? "Publié" : "Brouillon"}
            </span>
          </div>

          <h3 className="mt-3 text-base font-semibold tracking-tight md:text-lg">
            {ev.title}
          </h3>

          {ev.description && (
            <p className="mt-2 max-w-3xl text-sm text-black/60 dark:text-white/60">
              {ev.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-black/70 dark:text-white/70">
            <span className="rounded-full bg-black/10 dark:bg-white/10 px-3 py-1">
              Inscrits: <span>{ev.registered ?? 0}</span>{" "}
              / <span>{ev.capacity ?? 0}</span>
            </span>

            <span className="rounded-full bg-black/10 dark:bg-white/10 px-3 py-1">
              Remplissage:{" "}
              <span>{clamp(fill, 0, 100)}%</span>
            </span>
          </div>

          <div className="mt-3 h-2 w-full max-w-xl rounded-full bg-black/10 dark:bg-white/10">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500"
              style={{ width: `${clamp(fill, 0, 100)}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 md:min-w-[220px] md:items-stretch">
          <button
            type="button"
            onClick={onParticipants}
            className="rounded-2xl bg-black/10 dark:bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-black/15 dark:hover:bg-white/15"
          >
            Liste participants
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-2xl bg-black/10 dark:bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-black/15 dark:hover:bg-white/15"
          >
            Modifier
          </button>

          <button
            type="button"
            onClick={onTogglePublish}
            className={[
              "rounded-2xl px-4 py-3 text-sm font-semibold",
              ev.published
                ? "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-200"
                : "bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white",
            ].join(" ")}
          >
            {ev.published ? "Dépublier" : "Publier"}
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-700 dark:text-red-200 hover:bg-red-500/15"
          >
            Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}
