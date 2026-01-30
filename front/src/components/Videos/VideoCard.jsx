import { Link } from "react-router-dom";

export default function VideoCard({ video, apiBase }) {
  const title = video.title || video.title_en || "NEURAL ODYSSEY";
  const director =
    `${video.director_name || ""} ${video.director_lastname || ""}`.trim() ||
    "Nom du réalisateur";
  const country = video.country || video.director_country || "Pays";

  const coverUrl = video.cover
    ? `${apiBase}/uploads/covers/${video.cover}`
    : "https://via.placeholder.com/800x450?text=Cover";

  return (
    <article className="w-full">
      <div className="relative overflow-hidden rounded-2xl">
        {/* ✅ COVER CLIQUABLE VERS PAGE DÉTAIL */}
        <Link
          to={`/gallery/${video.id}`}
          className="relative z-10 block"
          aria-label={`Voir le film ${title}`}
        >
          <img
            src={coverUrl}
            alt={title}
            className="h-[120px] w-full cursor-pointer object-cover sm:h-[130px]"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-extrabold uppercase tracking-wide text-neutral-900">
          {title}
        </h3>

        <div className="grid grid-cols-2 gap-10 text-[10px] uppercase tracking-wide text-neutral-500">
          <div>
            <div className="font-semibold">RÉALISATEUR</div>
            <div className="mt-1 text-[11px] font-semibold normal-case text-neutral-800">
              {director}
            </div>
          </div>

          <div className="ml-auto text-right">
            <div className="font-semibold">ORIGINE</div>
            <div className="mt-1 text-[11px] font-semibold normal-case text-neutral-800">
              {country}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
