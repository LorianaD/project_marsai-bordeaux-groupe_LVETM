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
        <h3 className="text-sm font-extrabold uppercase tracking-wide text-neutral-900 dark:text-white">
          {title}
        </h3>

        <div className="grid grid-cols-2 gap-x-10 text-[10px] uppercase tracking-wide text-neutral-500 dark:text-white/50">
          {/* RÉALISATEUR */}
          <div>
            <div className="font-semibold leading-none">RÉALISATEUR</div>
            <div className="mt-3 text-[11px] font-semibold normal-case text-neutral-800 dark:text-white/80 leading-none">
              {director}
            </div>
          </div>

          {/* ORIGINE */}
          <div className="ml-auto text-right">
            <div className="font-semibold leading-none">ORIGINE</div>

            <div className="flex items-center justify-end">
              <span className="grid h-13 w-13 place-items-center">
                <img
                  src="/icons/videoDetails/globe.png"
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain scale-110 -translate-y-[10px]"
                  draggable="false"
                />
              </span>

              <span className="text-[11px] font-semibold normal-case text-neutral-800 dark:text-white/80 leading-none">
                {country}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
