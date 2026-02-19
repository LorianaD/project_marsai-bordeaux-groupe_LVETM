import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/Auth/LoginApi";
import { inputLightClasses } from "../../utils/formInputClasses.js";

/**
 * Page de connexion admin — style aligné sur l'espace admin (MARS AI, thème clair/sombre).
 */
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(email, password);
      localStorage.setItem("token", result.token);
      setSuccess(true);

      setTimeout(() => {
        const token = JSON.parse(atob(result.token.split(".")[1]));
        if (token.role === "selector") {
          navigate("/selector/videos");
        } else {
          navigate("/admin/overview");
        }
      }, 1200);

    } catch (err) {
      setError(err?.message || "Échec de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[420px]">
        {/* En-tête */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/10 px-4 py-2 text-[18px] font-semibold tracking-[0.2em] uppercase dark:bg-white/10">
            MARS <span className="text-[#F6339A]">AI</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            Connexion à votre espace utilisateur
          </h1>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            Utilisez vos identifiants pour vous connecter.
          </p>
        </div>

        {/* Carte formulaire */}
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-black/5 dark:border-[#F6339A]/60 dark:bg-white/5 p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70"
              >
                Adresse e-mail
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="admin@example.com"
                required
                className={`mt-2 h-12 text-sm ${inputLightClasses}`}
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70"
              >
                Mot de passe
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                required
                className={`mt-2 h-12 text-sm ${inputLightClasses}`}
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
                Connexion réussie, redirection…
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-black px-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 dark:bg-white dark:text-black"
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>
        </div>

        {/* Liens */}
        <div className="mt-6 flex flex-col items-center gap-2 text-center text-sm">
          <Link
            to="/"
            className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
