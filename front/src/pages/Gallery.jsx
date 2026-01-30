import { useEffect, useMemo, useState } from "react";
import VideoCard from "../components/Videos/VideoCard.jsx";

//   L’adresse de l’API (backend).
// - Si tu as VITE_API_URL dans ton .env, on l’utilise
// - Sinon, on prend localhost 
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

//  Combien de films on affiche par page
const PAGE_SIZE = 20;

export default function Gallery() {
  //  Ce que l’utilisateur tape dans la barre de recherche
  const [query, setQuery] = useState("");

  //  La page actuelle (pagination)
  const [page, setPage] = useState(1);

  //  Liste complète des vidéos récupérées depuis l’API
  const [items, setItems] = useState([]);

  //  "loading" = on charge / "err" = message d’erreur si ça plante
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Au premier affichage de la page, on va chercher les vidéos sur le backend
  // (le [] signifie : “je le fais une seule fois au montage”)
  useEffect(() => {
    //  Petit “truc de sécurité” :
    // si l’utilisateur quitte la page pendant que fetch est en cours,
    // on évite de faire setState après (ça peut provoquer des warnings)
    let alive = true;

    async function load() {
      try {
        //  On démarre : on affiche “Chargement…” et on nettoie l’erreur
        setLoading(true);
        setErr("");

        //  Appel API : on récupère toutes les vidéos
        const res = await fetch(`${API_BASE}/api/videos`);
        const data = await res.json();

        // Si le serveur dit que ça ne va pas (res.ok = false),
        // on déclenche une erreur avec un message clair
        if (!res.ok) throw new Error(data?.error || "Erreur chargement vidéos");

        //  On s’adapte au format de réponse :
        // - soit l’API renvoie directement un tableau
        // - soit elle renvoie un objet { videos: [...] }
        const list = Array.isArray(data) ? data : data?.videos || [];

        //  On met la liste dans le state (si on est toujours sur la page)
        if (alive) setItems(list);
      } catch (e) {
        //  Si ça plante : on affiche un message d’erreur
        if (alive) setErr(e?.message || "Erreur");
      } finally {
        //  Dans tous les cas (succès ou erreur) : on arrête le “loading”
        if (alive) setLoading(false);
      }
    }

    load();

    //  Nettoyage : quand on quitte la page, on dit “stop”
    return () => {
      alive = false;
    };
  }, []);

  // ✅filtered = la liste des vidéos après recherche
  // useMemo = “je recalculerai seulement si items ou query change”
  // (ça évite de refaire un gros filter à chaque mini re-render)
  const filtered = useMemo(() => {
    //  On normalise la recherche (pas d’espaces inutiles, pas de majuscules)
    const q = query.trim().toLowerCase();

    //  Si rien n’est tapé : on renvoie tout
    if (!q) return items;

    //  Sinon : on filtre
    return items.filter((v) => {
      // On prépare des champs en texte (au cas où ce soit null/undefined)
      const title = String(v.title || v.title_en || "").toLowerCase();

      // On regroupe prénom + nom du réalisateur
      const director =
        `${v.director_name || ""} ${v.director_lastname || ""}`.toLowerCase();

      // Pays (on regarde plusieurs champs possibles)
      const country = String(
        v.country || v.director_country || "",
      ).toLowerCase();

      //  On garde la vidéo si la recherche apparaît dans l’un de ces champs
      return title.includes(q) || director.includes(q) || country.includes(q);
    });
  }, [items, query]);

  //  Infos de pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  //  Petit “anti-bug” :
  // si on est sur une page qui n’existe plus (ex: on cherche et ça réduit la liste),
  // on remet à la page 1
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  //  Les éléments à afficher pour la page en cours
  const pageItems = useMemo(() => {
    // Exemple :
    // page 1 -> start = 0
    // page 2 -> start = 6
    const start = (page - 1) * PAGE_SIZE;

    // slice = “je prends juste une tranche”
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="dark:--white text-3xl font-extrabold leading-tight tracking-tight">
            <span className="block text-blue-600">LA GALERIE</span>
            <span className="block bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
              DES FILMS
            </span>
          </h1>
        </div>

        {/* Barre de recherche
            - value = ce qu’il y a dans l’input
            - onChange = à chaque frappe, on met à jour query */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-full max-w-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hinted search text"
              className="w-full rounded-full bg-[#EFEAF7] px-6 py-3 pr-12 text-sm text-neutral-800 outline-none placeholder:text-neutral-500"
            />

            {/*  Petite icône loupe (juste du visuel) */}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/*  Cas 1 : on charge */}
        {loading && (
          <div className="py-16 text-center text-neutral-500">Chargement…</div>
        )}

        {/*  Cas 2 : ça a échoué */}
        {!loading && err && (
          <div className="py-16 text-center text-red-600">{err}</div>
        )}

        {/*  Cas 3 : tout va bien, on affiche la grille + pagination */}
        {!loading && !err && (
          <>
            {/*  Grille de cartes
                On map sur pageItems (donc seulement la page actuelle) */}
            <div className="grid grid-cols-1 justify-items-center gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((v) => (
                // key = important pour React, ça aide à gérer la liste correctement
                <VideoCard key={v.id} video={v} apiBase={API_BASE} />
              ))}
            </div>

            {/*  Pagination */}
            <div className="mt-14 flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                {/* Bouton "précédent" */}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 disabled:opacity-40"
                  disabled={page === 1}
                >
                  ‹
                </button>

                {/* Numéros de pages */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    const active = p === page;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        className={
                          active
                            ? "h-9 w-9 rounded-lg bg-[#6D28D9] text-sm font-semibold text-white"
                            : "h-9 w-9 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
                        }
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                {/* Bouton "suivant" */}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 disabled:opacity-40"
                  disabled={page === totalPages}
                >
                  ›
                </button>
              </div>

              {/* Petit résumé : page actuelle / total pages / total résultats */}
              <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                PAGE {page} SUR {totalPages} - {total} FILMS TROUVÉS
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
