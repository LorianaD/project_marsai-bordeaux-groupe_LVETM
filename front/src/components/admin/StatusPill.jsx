// Petit composant qui affiche un badge de statut (pill)
export default function StatusPill({ status }) {

  // On transforme le status en string
  // Si rien n’est fourni → on met "Pending" par défaut
  const s = String(status || "Pending");

  // Dictionnaire qui associe chaque statut à :
  // - un texte à afficher
  // - des classes CSS pour les couleurs
  const map = {
    // Cas : publié
    Published: {
      // Texte affiché dans le badge
      label: "PUBLIÉ",
      // Couleurs vertes
      cls: "bg-[#1AFF7A]/15 text-[#1AFF7A] ring-[#1AFF7A]/25",
    },

    // Cas : en attente
    Pending: {
      label: "EN ATTENTE",
      cls: "bg-[#FFD24A]/15 text-[#FFD24A] ring-[#FFD24A]/25",
    },

    // Cas : refusé
    Rejected: {
      label: "REFUSÉ",
      cls: "bg-[#FF3D6E]/15 text-[#FF3D6E] ring-[#FF3D6E]/25",
    },

    // Cas : en cours de traitement
    Processing: {
      label: "TRAITEMENT",
      cls: "bg-white/10 text-white/70 ring-white/15",
    },

    // Cas : upload en cours
    Uploading: {
      label: "UPLOAD",
      cls: "bg-white/10 text-white/70 ring-white/15",
    },

    // Cas : erreur / échec
    Failed: {
      label: "FAILED",
      cls: "bg-[#FF3D6E]/15 text-[#FF3D6E] ring-[#FF3D6E]/25",
    },
  };

  // On récupère la config correspondant au statut actuel
  // Si le statut n’existe pas → on retombe sur "Pending"
  const conf = map[s] || map.Pending;

  return (
    // Le badge final affiché à l’écran
    <span
      className={[
        // Style de base du pill (forme + taille + typo)
        "inline-flex min-w-[120px] justify-center rounded-full px-4 py-2 text-[11px] font-extrabold tracking-wider ring-1",

        // Classes spécifiques au statut choisi
        conf.cls,
      ].join(" ")}
    >
      {/* Texte du statut */}
      {conf.label}
    </span>
  );
}
