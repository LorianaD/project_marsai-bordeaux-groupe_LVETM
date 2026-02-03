// Composant de sidebar version modal (mobile / overlay)
export default function AdminSidebarModal({
  open,           // booléen : est-ce que la sidebar est ouverte ?
  onClose,        // fonction pour fermer la sidebar
  active = "gestion-films", // menu actuellement actif par défaut
}) {

  // Si la sidebar n’est pas ouverte → on n’affiche rien du tout
  if (!open) return null;

  // Composant interne pour chaque item du menu
  const Item = ({ id, label, badge }) => {

    // On vérifie si cet item est le menu actif
    const isActive = id === active;

    return (
      // Chaque item est un bouton cliquable
      <button
        // Quand on clique → on ferme la sidebar
        onClick={onClose}
        // Classes dynamiques selon l’état actif ou non
        className={[
          // Style de base
          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition",

          // Si actif → fond bleu + texte bleu clair
          isActive
            ? "bg-[#2F6BFF]/20 text-[#8FB1FF] ring-1 ring-[#2F6BFF]/25"
            // Sinon → texte discret + hover
            : "text-white/70 hover:bg-white/5 hover:text-white/85",
        ].join(" ")}
      >
        {/* Partie gauche : dot + label */}
        <span className="flex items-center gap-3">

          {/* Petit point indicateur */}
          <span
            className={[
              "h-2 w-2 rounded-full",
              // Bleu si actif, gris sinon
              isActive ? "bg-[#2F6BFF]" : "bg-white/20",
            ].join(" ")}
          />

          {/* Texte du menu */}
          {label}
        </span>

        {/* Badge à droite (ex: nombre de messages) */}
        {badge ? (
          <span className="rounded-full bg-[#2F6BFF] px-2 py-0.5 text-xs font-semibold text-white">
            {badge}
          </span>
        ) : null}
      </button>
    );
  };

  // Rendu principal de la modal
  return (
    // Conteneur plein écran
    <div className="fixed inset-0 z-50">

      {/* OVERLAY sombre derrière la sidebar */}
      <button
        // Cliquer sur l’overlay ferme la sidebar
        onClick={onClose}
        // Fond noir semi-transparent + flou
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        // Accessibilité
        aria-label="Close sidebar"
      />

      {/* PANEL de la sidebar */}
      <aside className="absolute left-6 top-6 h-[calc(100vh-48px)] w-[320px] overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.65)]">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5">
          <div className="text-sm font-semibold text-white/85">
            Mars AI
          </div>

          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="rounded-lg bg-white/5 px-3 py-2 text-xs text-white/70 ring-1 ring-white/10 hover:bg-white/10"
          >
            Fermer
          </button>
        </div>

        {/* PROFIL */}
        <div className="flex flex-col items-center px-5 pb-5 pt-4">

          {/* Avatar */}
          <div className="relative">
            <div className="h-20 w-20 overflow-hidden rounded-full ring-2 ring-[#B84DFF]/60">
              <img
                // Image de profil
                src="/assets/avatar.png"
                alt=""
                // L’image remplit le cercle
                className="h-full w-full object-cover"
              />
            </div>

            {/* Point vert = en ligne */}
            <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-[#1AFF7A] ring-2 ring-black" />
          </div>

          {/* Nom */}
          <div className="mt-3 text-sm font-semibold text-white/90">
            Ocean Breeze
          </div>

          {/* Rôle */}
          <div className="mt-1 text-[11px] tracking-widest text-white/45">
            RÉALISATEUR STUDIO
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="space-y-2 px-5">
          <Item id="overview" label="Overview" />
          <Item id="gestion-films" label="Gestion films" />
          <Item id="distribution-jury" label="Distribution & Jury" />
          <Item id="resultats" label="Résultats & classement" />
          <Item id="leaderboard" label="Leaderboard officiel" />
          <Item id="events" label="Evenements" />
          <Item id="messages" label="Messages" badge="2" />
          <Item id="festival-box" label="Festival Box" />
          <Item id="config" label="Configuration Festival" />
        </div>

        {/* CARTE DU BAS */}
        <div className="mx-5 mt-6 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">

          {/* Nom app */}
          <div className="text-sm font-semibold text-white/85">
            Mars AI
          </div>

          {/* Sous-titre */}
          <div className="mt-1 text-xs text-white/45">
            Dashboard
          </div>

          {/* Bouton logout */}
          <button className="mt-4 w-full rounded-xl bg-[#0E1628] py-3 text-sm font-semibold text-white/90 ring-1 ring-white/10 hover:bg-[#111c34]">
            Log out
          </button>
        </div>
      </aside>
    </div>
  );
}
