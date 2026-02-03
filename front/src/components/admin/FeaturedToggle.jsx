// Composant pour un toggle ON / OFF (mise en avant)
export default function FeaturedToggle({
  value,      // valeur actuelle (true / false)
  onChange,   // fonction appelée quand on change l’état
  disabled,  // permet de désactiver le toggle
}) {

  // On transforme la valeur en vrai booléen
  const on = Boolean(value);

  return (
    // Le toggle est en réalité un bouton
    <button
      // Type bouton classique
      type="button"

      // Si disabled est true → le bouton est désactivé
      disabled={disabled}

      // Au clic, on inverse la valeur actuelle (ON ↔ OFF)
      onClick={() => onChange(!on)}

      // Classes CSS calculées dynamiquement
      className={[
        // Style de base du toggle (taille + forme)
        "relative h-7 w-12 rounded-full ring-1 transition",

        // Si désactivé → visuel grisé + curseur interdit
        disabled
          ? "opacity-50 cursor-not-allowed"
          // Sinon → curseur normal cliquable
          : "cursor-pointer",

        // Si ON → fond bleu
        // Si OFF → fond clair discret
        on
          ? "bg-[#2F6BFF]/40 ring-[#2F6BFF]/40"
          : "bg-white/10 ring-white/15",
      ].join(" ")}

      // Tooltip au survol selon l’état
      title={on ? "Retirer de la mise en avant" : "Mettre en avant"}
    >
      {/* Le rond qui glisse à l’intérieur du toggle */}
      <span
        className={[
          // Positionné au centre verticalement
          "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition",

          // À droite si ON, à gauche si OFF
          on ? "left-6" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}
