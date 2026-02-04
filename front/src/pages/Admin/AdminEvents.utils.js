// front/src/pages/Admin/adminEvents.utils.js

export function formatTimeFR(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  }
  
  export function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }
  
  export const NAV = [
    "Overview",
    "Gestion films",
    "Distribution & Jury",
    "Résultats & classement",
    "Leaderboard officiel",
    "Événements",
    "Messages",
    "Festival Box",
    "Configuration Festival",
  ];
  
  export const DAY_TABS = [
    { key: "vendredi", label: "Vendredi 13" },
    { key: "samedi", label: "Samedi 14" },
    { key: "dimanche", label: "Dimanche 15" },
  ];
  