import { useState } from "react";
import { createBooking } from "../services/Events/EventsApi.js";

export default function BookingModal({ event, onClose, onSuccess }) {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createBooking(event.id, { first_name, last_name, email });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Erreur lors de la réservation");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white dark:bg-black rounded-2xl border border-black/10 dark:border-[#F6339A]/60 shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-black dark:text-white">
          Réserver pour : {event.title}
        </h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <div>
            <label className="block text-xs font-medium text-black/70 dark:text-white/70 mb-1">Prénom</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              required
              className="w-full rounded-xl border border-black/20 dark:border-[#F6339A]/60 bg-black/5 dark:bg-white/5 px-4 py-2 text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-black/70 dark:text-white/70 mb-1">Nom</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              required
              className="w-full rounded-xl border border-black/20 dark:border-[#F6339A]/60 bg-black/5 dark:bg-white/5 px-4 py-2 text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-black/70 dark:text-white/70 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-black/20 dark:border-[#F6339A]/60 bg-black/5 dark:bg-white/5 px-4 py-2 text-black dark:text-white"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-black/20 dark:border-[#F6339A]/60 px-4 py-2 text-sm font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Envoi…" : "Confirmer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
