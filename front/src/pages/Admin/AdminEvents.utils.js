// front/src/pages/Admin/adminEvents.utils.js

export function formatTimeFR(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  }
  
  export function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  /** Dérive un "jour" (YYYY-MM-DD) à partir de la date de l'event. Utilisé pour filtrer par onglet. */
  export function getDayKeyFromDate(isoDate) {
    if (!isoDate) return null;
    const s = String(isoDate).trim();
    const match = s.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) return match[1];
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return null;
    return d.toISOString().slice(0, 10);
  }

  export function formatDayLabel(dayKey) {
    if (!dayKey) return "";
    const d = new Date(dayKey + "T12:00:00");
    if (Number.isNaN(d.getTime())) return dayKey;
    const str = d.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /** Construit la liste des onglets "jour" à partir des events.
   */
  export function getDayTabsFromEvents(events) {
    if (!Array.isArray(events) || events.length === 0) return [];
    const keys = [...new Set(events.map((e) => e.day).filter(Boolean))].sort();
    if (keys.length === 0) return [];
    return keys.map((key) => ({ key, label: formatDayLabel(key) }));
  }

  //garder pour le moment l'export pour plus tard au cas ou !!!!
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