import { useState } from "react";
import { inviteUser } from "../../services/Admin/Users.api.js";
import AdminSelect from "./AdminSelect.jsx";

export default function InviteForm({ onSuccess, onCancel }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError("Email requis");
      return;
    }
    if (!role) {
      setError("Veuillez choisir un rôle");
      return;
    }

    setLoading(true);
    try {
      const result = await inviteUser(cleanEmail, role);
      setSuccess(result?.message || "Invitation envoyée");
      setEmail("");
      setRole("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err?.message || "Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full">
      <h3 className="text-sm font-semibold text-black/90 dark:text-white/90">
        Inviter un admin / sélectionneur
      </h3>

      <div>
        <label className="mb-1 block text-xs font-medium text-black/70 dark:text-white/70">
          E-mail *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mon@exemple.com"
          className="w-full rounded-full border border-black/10 bg-black/5 px-3 py-2 text-sm text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:ring-white/20"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-black/70 dark:text-white/70">
          Choix rôle *
        </label>
        <AdminSelect
          value={role}
          onChange={setRole}
          placeholder="Choix rôle"
          options={[
            { value: "admin", label: "Administrateur" },
            { value: "selector", label: "Sélectionneur" },
          ]}
        />
      </div>

      {error && <p className="text-sm text-[#FF3D6E]">{error}</p>}
      {success && <p className="text-sm text-[#1AFF7A]">{success}</p>}

      <div className="w-full flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs font-semibold text-black/70 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#2F6BFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2F6BFF]/90 disabled:opacity-60"
        >
          {loading ? "Envoi..." : "Envoyer invitation"}
        </button>
      </div>
    </form>
  );
}
