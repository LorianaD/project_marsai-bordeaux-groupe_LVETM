import { useState } from "react";
import { useTranslation } from "react-i18next";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Newsletter() {

  const { t } = useTranslation("newsletters");

  // Etat du formulaire newsletter
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // Envoie l'email au backend
  async function submit(e) {
    e.preventDefault();

    const cleanEmail = String(email || "").trim();
    if (!cleanEmail) return;

    if (!consent) {
      setMsg("");
      setError("Vous devez accepter de recevoir la newsletter.");
      return;
    }

    try {
      setLoading(true);
      setMsg("");
      setError("");

      const res = await fetch(`${API_BASE}/api/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: cleanEmail, consent }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Erreur inscription");
      }

      // Message succès + reset champ
      setMsg(data?.message || "Inscription réussie");
      setEmail("");
      setConsent(false);
    } catch (err) {
      setError(err?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="w-full box-border overflow-hidden flex flex-col items-center justify-center gap-[6px] md:gap-[12px] lg:gap-[25px] p-[10px] md:p-[20px] lg:p-[41px] rounded-[10px] md:rounded-[20px] lg:rounded-[40px] rounded-[10px] md:rounded-[20px] lg:rounded-[40px] bg-[rgba(0,0,0,0.05)] dark:bg-white/20"
    >
      <h2 className="text-[16px] lg:text-[24px] font-bold leading-[24px] tracking-[-1.2px] uppercase text-left w-full flex flex-row lg:flex-col gap-[5px]">
        <span>{t("title_main")}</span>
        <span className="block">{t("title_accent")}</span>
      </h2>

      <div className="flex flex-col md:flex-row lg:flex-row items-start md:items-center gap-2 self-stretch">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("email_placeholder")}
          className="flex h-[13.5px] md:h-[27px] lg:h-[54px] flex-1 items-center px-[6px] md:px-[12px] lg:px-[24px] py-[3px] md:py-[6px] lg:py-[16px] rounded-[4px] md:rounded-[8px] lg:rounded-[16px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.05)] placeholder:text-[rgba(0,0,0,0.50)] dark:placeholder:text-[rgba(255,255,255,0.50)] placeholder:text-[10px] lg:placeholder:text-[14px] placeholder:font-normal dark:bg-white/20"
        />

        <button
          type="submit"
          disabled={loading}
          className="shrink-0 h-[44px] lg:h-[54px] px-4 rounded-[16px] bg-[linear-gradient(270deg,#3B82F6_-0.39%,#C27AFF_100.48%)] text-[12px] font-bold leading-[16px] tracking-[1.2px] uppercase text-white disabled:opacity-60"
        >
          {loading ? "..." : "OK"}
        </button>
      </div>

      {/* Consentement obligatoire */}
      <label className="w-full flex items-start gap-2 text-xs opacity-80">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span>
          {t("consent")}
        </span>
      </label>

      {/* Affiche message succès */}
      {msg ? (
        <p className="w-full text-left text-[10px] lg:text-[12px] text-green-700 dark:text-green-400">
          {msg}
        </p>
      ) : null}

      {/* Affiche message erreur */}
      {error ? (
        <p className="w-full text-left text-xs text-red-700 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </form>
  );
}

export default Newsletter;
