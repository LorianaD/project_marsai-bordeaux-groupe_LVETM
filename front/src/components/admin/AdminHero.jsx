// On exporte le composant pour pouvoir l’utiliser ailleurs dans le projet
export default function AdminHero({ name = "Ocean" }) {
  // Ici on retourne ce que le composant affiche à l’écran
  return (
    // Conteneur principal :
    // - relative : pour pouvoir positionner des éléments en absolute dedans
    // - overflow-hidden : tout ce qui dépasse est coupé
    // - rounded : coins arrondis
    // - border : petite bordure discrète
    <div className="relative overflow-hidden rounded-[28px] border border-black/10 dark:border-white/10">

      {/* IMAGE DE FOND, sans filtre */}
      <img
        // Chemin de l’image affichée en fond
        src="/imgs/admin-hero.jpg.png"
        // Pas de texte alternatif car c’est décoratif
        alt=""
        // L’image prend toute la place du conteneur
        // absolute + inset-0 = collée aux 4 côtés
        className="absolute inset-0 h-full w-full object-cover"
        // On empêche de la glisser par erreur
        draggable={false}
      />

      {/* CONTENU PAR-DESSUS L’IMAGE */}
      <div className="relative flex items-center justify-between gap-8 px-10 py-10 md:px-14 md:py-12">
        
        {/* PARTIE TEXTE */}
        <div>
          {/* Titre principal */}
          <h1 className="text-[36px] font-extrabold leading-tight tracking-tight text-white md:text-[42px]">
            {/* Texte fixe */}
            Heureux de vous revoir,{" "}
            {/* Nom de l’utilisateur en bleu */}
            <span className="text-[#3B82F6]">{name}</span>
          </h1>

          {/* Texte descriptif sous le titre */}
          <p className="mt-3 max-w-[720px] text-sm text-white/90">
            {/* Message d’information */}
            Le festival approche. N&apos;oubliez pas de finaliser vos soumissions
            avant le{" "}
            {/* Date mise en avant */}
            <span className="font-medium text-white">15 Mai</span>.
          </p>
        </div>

        {/* BOUTON D’ACTION */}
        <button className="group relative flex items-center gap-3 rounded-full bg-[#22C55E]/90 px-7 py-3 text-sm font-semibold text-black ring-1 ring-white/30 transition hover:bg-[#22C55E]">
          
          {/* Cercle qui contient l’icône */}
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
            
            {/* Icône SVG (profil utilisateur) */}
            <svg
              // Taille de l’icône
              width="14"
              height="14"
              // Zone de dessin
              viewBox="0 0 24 24"
              // Pas de remplissage, juste les traits
              fill="none"
              // Couleur héritée du texte
              className="text-black"
            >
              {/* Tête de l’icône */}
              <path
                d="M12 12a5 5 0 100-10 5 5 0 000 10z"
                // Couleur du trait
                stroke="currentColor"
                // Épaisseur du trait
                strokeWidth="2"
              />
              {/* Corps de l’icône */}
              <path
                d="M3 22a9 9 0 0118 0"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>

          {/* Texte du bouton */}
          ADMIN MANAGEMENT
        </button>
      </div>
    </div>
  );
}
