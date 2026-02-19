import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function resolveImg(src) {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  if (src.startsWith("/imgs/")) return src;
  if (src.startsWith("/uploads/")) return `${API_BASE}${src}`;
  return `${API_BASE}/uploads/jury/${src}`;
}

export default function Jury() {
  const [jury, setJury] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function loadJury() {
    try {
      setLoading(true);
      setErr("");

      const res = await fetch(`${API_BASE}/api/jury`, {
        headers: { Accept: "application/json" },
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur chargement jury");

      const list = Array.isArray(data?.jury) ? data.jury : [];
      setJury(list);
    } catch (e) {
      setErr(e?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJury();
  }, []);

  const president = useMemo(
    () => jury.find((j) => Number(j.is_president) === 1) || null,
    [jury],
  );

  const members = useMemo(() => {
    return jury
      .filter((j) => Number(j.is_president) !== 1)
      .slice()
      .sort(
        (a, b) => Number(a.sort_order ?? 999) - Number(b.sort_order ?? 999),
      );
  }, [jury]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      {/* ================= TOP SECTION ================= */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-16">
        {/* 🔥 TITRE PRINCIPAL (équilibré comme Galerie des films) */}
        <h1
          className="font-extrabold uppercase tracking-tight leading-[0.95]
                       text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="block text-black dark:text-white">LES MEMBRES</span>
          <span className="block text-blue-600 dark:text-blue-400">
            DU JURY
          </span>
        </h1>

        {loading ? (
          <div className="py-16 text-center text-black/50 dark:text-white/55">
            Chargement…
          </div>
        ) : err ? (
          <div className="py-16 text-center text-red-600 dark:text-red-300">
            {err}
          </div>
        ) : !president ? (
          <div className="py-16 text-center text-black/50 dark:text-white/55">
            Aucun président du jury défini.
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* President image */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-full max-w-[420px] overflow-hidden rounded-[34px] bg-black ring-1 ring-black/10 shadow-xl">
                <img
                  src={resolveImg(president.img)}
                  alt={`${president.first_name} ${president.name}`}
                  className="h-[480px] w-full object-cover grayscale"
                  draggable={false}
                />

                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="text-xs font-semibold tracking-[0.3em] text-pink-400">
                    {president.role_label || "PRÉSIDENT DU JURY"}
                  </div>
                  <div className="mt-3 text-2xl font-extrabold text-white">
                    {(president.first_name || "").toUpperCase()}{" "}
                    {(president.name || "").toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* President text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                UN JURY D'EXCEPTION{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  POUR LE FUTUR
                </span>
              </h2>

              <div
                className="mt-8 max-w-[520px] rounded-[28px] p-7 text-white
                              bg-gradient-to-br from-purple-600 via-blue-900 to-black shadow-xl"
              >
                <div className="text-xs tracking-widest text-white/70">
                  {president.profession || "—"}
                </div>

                <p className="mt-4 text-sm text-white/80">
                  {president.bio || "…"}
                </p>

                {president.filmography_url && (
                  <a
                    href={president.filmography_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex rounded-full
                               bg-gradient-to-r from-purple-500 to-pink-500
                               px-6 py-3 text-xs font-bold text-white"
                  >
                    VOIR SA FILMOGRAPHIE
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= MEMBERS GRID ================= */}
      <div className="mt-20 bg-gradient-to-b from-[#F6ECFF] to-white py-16 dark:from-white/5 dark:to-black">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              LES MEMBRES
            </h2>

            <p className="max-w-[520px] text-sm text-black/70 dark:text-white/70">
              Experts IA, cinéastes et visionnaires réunis pour délibérer sur la
              sélection officielle.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => (
              <a
                key={m.id}
                href={m.filmography_url || "#"}
                target={m.filmography_url ? "_blank" : undefined}
                rel={m.filmography_url ? "noreferrer" : undefined}
                className="group relative overflow-hidden rounded-[34px] bg-black shadow-xl"
              >
                <img
                  src={resolveImg(m.img)}
                  alt={`${m.first_name} ${m.name}`}
                  className="h-[420px] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-0 w-full p-7">
                  <div className="text-xs tracking-widest text-cyan-400">
                    {m.role_label}
                  </div>

                  <div className="mt-3 text-xl font-extrabold text-white">
                    {(m.first_name || "").toUpperCase()}{" "}
                    {(m.name || "").toUpperCase()}
                  </div>

                  <div className="mt-2 text-sm text-white/70">
                    {m.profession}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
