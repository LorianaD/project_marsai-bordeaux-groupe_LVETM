import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Unsubscribe() {
  // Etat du formulaire de désabonnement
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // Envoie la demande de désabonnement au backend
  async function submit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setMsg("");
      setError("");

      const res = await fetch(`${API_BASE}/api/newsletter/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur");

      // Message succès + reset champ
      setMsg(data?.message || "Désabonnement effectué");
      setEmail("");
    } catch (err) {
      setError(err.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[520px] p-6">
      <h1 className="text-2xl font-bold">Se désabonner</h1>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
          className="w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "..." : "Confirmer"}
        </button>

        {/* Affiche message succès */}
        {msg ? <p className="text-sm text-green-700">{msg}</p> : null}

        {/* Affiche message erreur */}
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
      </form>
    </div>
  );
}
