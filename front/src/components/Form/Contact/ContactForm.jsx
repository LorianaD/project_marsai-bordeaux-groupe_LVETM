import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function ContactForm() {
  // Etat du formulaire
  const [form, setForm] = useState({
    name: "",
    surname: "",
    subject: "",
    email: "",
    message: "",
  });

  // Etats de feedback utilisateur
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const setField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  // Envoie les données du formulaire à l'API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const payload = {
        name: form.name,
        last_name: form.surname,
        subject: form.subject,
        email: form.email,
        message: form.message,
      };

      const r = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Erreur envoi message");

      setSuccess(true);
      setForm({ name: "", surname: "", subject: "", email: "", message: "" });
    } catch (err) {
      setError(err.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  // Classes CSS réutilisées pour les inputs
  const inputCls =
    "w-full rounded-md px-4 py-2.5 text-sm outline-none transition " +
    "border border-black/10 bg-[#F1EEF7] text-black/85 placeholder:text-black/35 " +
    "focus:ring-2 focus:ring-blue-500/20 " +
    "dark:border-white/10 dark:bg-white/10 dark:text-white/90 dark:placeholder:text-white/35 dark:focus:ring-blue-400/20";

  const labelCls = "block text-[13px] text-black/80 dark:text-white/80";

  return (
    <div className="w-full max-w-[460px] rounded-2xl bg-transparent p-0 dark:rounded-2xl dark:bg-black/0">
      <form onSubmit={handleSubmit} className="w-full max-w-[420px]">
        <div className="space-y-2">
          <label className={labelCls}>Name</label>
          <input
            value={form.name}
            onChange={setField("name")}
            placeholder="Value"
            className={inputCls}
          />
        </div>

        <div className="mt-5 space-y-2">
          <label className={labelCls}>Surname</label>
          <input
            value={form.surname}
            onChange={setField("surname")}
            placeholder="Value"
            className={inputCls}
          />
        </div>

        <div className="mt-5 space-y-2">
          <label className={labelCls}>Subject</label>
          <input
            value={form.subject}
            onChange={setField("subject")}
            placeholder="Value"
            className={inputCls}
          />
        </div>

        <div className="mt-5 space-y-2">
          <label className={labelCls}>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={setField("email")}
            placeholder="Value"
            className={inputCls}
          />
        </div>

        <div className="mt-5 space-y-2">
          <label className={labelCls}>Message</label>
          <textarea
            value={form.message}
            onChange={setField("message")}
            placeholder="Value"
            rows={4}
            className={inputCls + " resize-none py-3"}
          />
        </div>

        {/* Affiche les messages de succès ou d'erreur */}
        {error && (
          <div className="mt-4 text-center text-xs text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 text-center text-xs text-green-600 dark:text-green-400">
            Message envoyé
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            mx-auto mt-6 block w-[220px] rounded-md bg-[#3B82F6] py-2.5
            text-sm font-semibold text-white transition
            hover:bg-[#2563EB] active:scale-[0.99]
            disabled:opacity-60
          "
        >
          {loading ? "Envoi..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
