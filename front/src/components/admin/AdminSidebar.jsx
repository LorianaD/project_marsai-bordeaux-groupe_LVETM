// On importe le hook de React Router qui permet de naviguer entre les pages
import { useNavigate } from "react-router-dom";

// Composant principal de la sidebar admin
// "active" sert à savoir quel menu est actuellement sélectionné
export default function AdminSidebar({ active = "overview" }) {

  // Hook pour changer de page par code (sans recharger)
  const navigate = useNavigate();

  // Composant interne pour un item du menu
  const Item = ({ id, label, to }) => {

    // On vérifie si cet item est le menu actif
    const isActive = id === active;

    return (
      // Chaque item est un bouton cliquable
      <button
        // Type bouton classique
        type="button"
        // Au clic, on navigue vers la route si elle existe
        onClick={() => to && navigate(to)}
        // Classes CSS calculées dynamiquement
        className={[
          // Style de base du bouton
          "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",

          // MODE CLAIR
          // Si l’item est actif → bleu + fond léger
          isActive
            ? "bg-[#2F6BFF]/15 text-[#2F6BFF] ring-1 ring-[#2F6BFF]/15"
            // Sinon → texte discret + hover
            : "text-black/70 hover:bg-black/5 hover:text-black/85",

          // MODE SOMBRE (styles ajoutés par-dessus)
          "dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white/90",

          // Si actif en mode sombre → bleu plus clair
          isActive
            ? "dark:bg-[#2F6BFF]/20 dark:text-[#8FB1FF] dark:ring-[#2F6BFF]/25"
            : "",
        ].join(" ")} // On transforme le tableau en string CSS
      >
        {/* Petit point coloré à gauche */}
        <span
          className={[
            // Taille et forme du point
            "h-2 w-2 rounded-full",
            // Bleu si actif, gris sinon
            isActive ? "bg-[#2F6BFF]" : "bg-black/15",
            // Couleur par défaut en dark mode
            "dark:bg-white/20",
            // Override si actif en dark
            isActive ? "dark:bg-[#2F6BFF]" : "",
          ].join(" ")}
        />

        {/* Texte du menu */}
        {label}
      </button>
    );
  };

  // Rendu principal de la sidebar
  return (
    // Aside = zone latérale
    <aside
      className="
       h-[calc(100vh-40px)] w-[290px] px-4
      "
    >
      {/* Conteneur principal en colonne */}
      <div className="flex h-full flex-col px-5 py-6">

        {/* CARTE PROFIL */}
        <div className="rounded-[18px] bg-white p-5 ring-1 ring-black/5 shadow-sm dark:bg-white/5 dark:ring-white/10">
          <div className="flex flex-col items-center">

            {/* Avatar */}
            <div className="relative">
              <div className="h-[86px] w-[86px] overflow-hidden rounded-full ring-2 ring-[#B84DFF]/70 bg-black/5 dark:bg-white/10">
                <img
                  // Image de profil
                  src="/imgs/avatar.png"
                  alt=""
                  // L’image remplit le cercle
                  className="h-full w-full object-cover"
                  // Si l’image ne charge pas, on la cache
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  // Pas déplaçable
                  draggable="false"
                />
              </div>

              {/* Point vert = en ligne */}
              <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-[#1AFF7A] ring-2 ring-white dark:ring-black" />
            </div>

            {/* Nom de l’utilisateur */}
            <div className="mt-4 text-base font-semibold text-black/85 dark:text-white/90">
              Ocean Breeze
            </div>

            {/* Rôle */}
            <div className="mt-1 text-[11px] tracking-widest text-black/40 dark:text-white/45">
              RÉALISATEUR STUDIO
            </div>
          </div>
        </div>

        {/* CARTE NAVIGATION */}
        <div
          className="mt-5 rounded-[18px] bg-white p-3 ring-1 ring-black/5 shadow-sm
                dark:bg-white/5 dark:ring-white/10"
        >
          {/* Liste des menus */}
          <div className="space-y-1">
            <Item id="overview" label="Overview" to="/admin" />
            <Item id="gestion-films" label="Gestion films" to="/admin/videos" />
            <Item
              id="distribution-jury"
              label="Distribution & Jury"
              to="/admin/jury"
            />
            <Item
              id="resultats"
              label="Resultats & classement"
              to="/admin/results"
            />
            <Item
              id="leaderboard"
              label="Leaderboard officiel"
              to="/admin/leaderboard"
            />
            <Item id="events" label="Evenements" to="/admin/events" />
            <Item id="messages" label="Messages" to="/admin/messages" />
            <Item
              id="festival-box"
              label="Festival Box"
              to="/admin/festival-box"
            />
            <Item
              id="config"
              label="Configuration Festival"
              to="/admin/config"
            />
          </div>
        </div>

        {/* CARTE DU BAS */}
        <div className="mt-auto pt-6">
          <div className="rounded-[18px] bg-white p-4 ring-1 ring-black/5 shadow-sm dark:bg-white/10 dark:ring-white/10">

            {/* Info app */}
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/10">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2F6BFF]" />
              </span>

              <div className="text-sm font-semibold text-black/85 dark:text-white/85">
                Mars AI
              </div>
            </div>

            {/* Sous-titre */}
            <div className="mt-1 text-xs text-black/45 dark:text-white/45">
              Dashboard
            </div>

            {/* Bouton logout */}
            <button
              type="button"
              className="
                mt-4 w-full rounded-xl bg-[#0E1628] py-3 text-sm font-semibold text-white
                hover:bg-[#111c34]
              "
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
