import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function NewsletterUnsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!token) {
        setStatus("error");
        setMessage("Token manquant.");
        return;
      }

      try {
        const res = await fetch(
          `${API_BASE}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`,
          { method: "GET", headers: { Accept: "application/json" } },
        );

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.error || "Erreur désinscription");
        }

        if (!cancelled) {
          setStatus("ok");
          setMessage(data?.message || "Désinscription effectuée ✅");
        }
      } catch (e) {
        if (!cancelled) {
          setStatus("error");
          setMessage(e?.message || "Erreur");
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="text-2xl font-bold">Désinscription newsletter</h1>

      <div className="mt-6 rounded-2xl border border-black/10 p-6 dark:border-white/10">
        {status === "loading" ? (
          <p>Désinscription en cours…</p>
        ) : status === "ok" ? (
          <p className="text-green-700 dark:text-green-400">{message}</p>
        ) : (
          <p className="text-red-700 dark:text-red-400">{message}</p>
        )}

        <div className="mt-6 flex gap-4">
          <Link
            to="/"
            className="rounded-xl border border-black/10 px-4 py-2 text-sm dark:border-white/10"
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
