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
    const list = jury
      .filter((j) => Number(j.is_president) !== 1)
      .slice()
      .sort(
        (a, b) => Number(a.sort_order ?? 999) - Number(b.sort_order ?? 999),
      );
    return list;
  }, [jury]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      {/* Top section */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-14">
        <div className="text-center text-[11px] font-semibold tracking-[0.35em] text-blue-500/90 dark:text-blue-300/90">
          LES MEMBRES DU JURY
        </div>

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
            {/* President image card */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-full max-w-[420px] overflow-hidden rounded-[34px] bg-black ring-1 ring-black/10 shadow-[0_30px_80px_rgba(0,0,0,0.18)] dark:ring-white/10 dark:shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
                <img
                  src={resolveImg(president.img)}
                  alt={`${president.first_name || ""} ${president.name || ""}`}
                  className="h-[480px] w-full object-cover grayscale"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  draggable={false}
                />

                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="text-[12px] font-semibold tracking-[0.3em] text-pink-400">
                    {president.role_label || "PRÉSIDENT DU JURY"}
                  </div>
                  <div className="mt-3 text-[28px] font-extrabold tracking-tight text-white">
                    {(president.first_name || "").toUpperCase()}{" "}
                    {(president.name || "").toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* President text */}
            <div className="min-w-0">
              <h1 className="text-[44px] font-extrabold leading-[1.02] tracking-tight md:text-[54px]">
                <span className="block">UN JURY</span>
                <span className="block">
                  D&apos;EXCEPTION{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    POUR LE FUTUR
                  </span>
                </span>
              </h1>

              {/* Quote box */}
              <div className="mt-8 max-w-[520px] rounded-[28px] bg-gradient-to-b from-[#F4D9FF] to-[#E7F0FF] p-7 text-black shadow-[0_25px_70px_rgba(0,0,0,0.10)] ring-1 ring-black/10 dark:from-white/10 dark:to-white/5 dark:text-white dark:ring-white/10 dark:shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
                <div className="text-[11px] font-semibold tracking-[0.28em] text-black/40 dark:text-white/45">
                  {president.profession || "—"}
                </div>

                <p className="mt-4 text-[12px] leading-relaxed text-black/70 dark:text-white/70">
                  {president.bio || "…"}
                </p>

                {president.filmography_url ? (
                  <a
                    href={president.filmography_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#A855F7] to-[#EC4899] px-6 py-3 text-[12px] font-bold tracking-wide text-white"
                  >
                    VOIR SA FILMOGRAPHIE
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Members section background like mock */}
      <div className="mt-20 bg-gradient-to-b from-[#F6ECFF] to-white py-16 dark:from-white/5 dark:to-black">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            <h2 className="text-[44px] font-extrabold tracking-tight md:text-[54px]">
              <span className="block">LES MEMBRES</span>
              <span className="block text-blue-600 dark:text-blue-400">
                DU JURY
              </span>
            </h2>

            <p className="max-w-[520px] text-[12px] leading-relaxed text-black/70 md:pt-2 dark:text-white/70">
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
                className={[
                  "group relative overflow-hidden rounded-[34px] bg-black",
                  "ring-1 ring-black/10 shadow-[0_30px_90px_rgba(0,0,0,0.25)]",
                  "dark:ring-white/10 dark:shadow-[0_30px_110px_rgba(0,0,0,0.75)]",
                  !m.filmography_url ? "pointer-events-none" : "",
                ].join(" ")}
              >
                <img
                  src={resolveImg(m.img)}
                  alt={`${m.first_name || ""} ${m.name || ""}`}
                  className="h-[420px] w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  draggable={false}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/0" />

                <div className="absolute bottom-0 w-full p-7">
                  <div className="text-[12px] font-semibold tracking-[0.28em] text-[#00FFD5]/70">
                    {m.role_label || ""}
                  </div>

                  <div className="mt-3 text-[30px] font-extrabold leading-[1.02] tracking-tight text-white">
                    {(m.first_name || "").toUpperCase()}
                    <br />
                    {(m.name || "").toUpperCase()}
                  </div>

                  <div className="mt-3 text-[14px] text-white/70">
                    {m.profession || "—"}
                  </div>

                  {m.bio ? (
                    <div className="mt-3 line-clamp-3 text-[11px] leading-relaxed text-white/70">
                      {m.bio}
                    </div>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Rating charter */}
      <div className="bg-white pb-20 pt-10 dark:bg-black">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="rounded-[48px] bg-gradient-to-b from-[#D7CCFF] to-[#E9E2FF] p-10 ring-1 ring-black/10 dark:from-white/10 dark:to-white/5 dark:ring-white/10">
            <h3 className="text-center text-[44px] font-extrabold tracking-tight md:text-[54px]">
              <span>LA CHARTE </span>
              <span className="text-blue-600 dark:text-blue-400">
                DE NOTATION
              </span>
            </h3>

            <p className="mx-auto mt-4 max-w-[760px] text-center text-[12px] leading-relaxed text-black/65 dark:text-white/65">
              Le jury s&apos;engage à évaluer chaque court-métrage selon quatre
              piliers fondamentaux pour garantir l&apos;équité entre les
              participants.
            </p>

            <div className="mx-auto mt-10 max-w-[860px] space-y-6">
              {[
                {
                  n: 1,
                  t: "ORIGINALITÉ IA",
                  d: "L’audace et la pertinence de l’usage des outils génératifs.",
                },
                {
                  n: 2,
                  t: "ESTHÉTIQUE VISUELLE",
                  d: "La cohérence et la beauté du rendu global.",
                },
                {
                  n: 3,
                  t: "QUALITÉ NARRATIVE",
                  d: "La force de l’histoire racontée en seulement 60 secondes.",
                },
                {
                  n: 4,
                  t: "ÉMOTION & IMPACT",
                  d: "La capacité du film à toucher le spectateur.",
                },
              ].map((x) => (
                <div
                  key={x.n}
                  className="flex items-center gap-6 rounded-[26px] bg-white/65 p-7 ring-1 ring-black/10 backdrop-blur dark:bg-white/5 dark:ring-white/10"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-[18px] font-extrabold text-white">
                    {x.n}
                  </div>

                  <div className="min-w-0">
                    <div className="text-[16px] font-extrabold tracking-wide text-black dark:text-white">
                      {x.t}
                    </div>
                    <div className="mt-1 text-[13px] text-black/70 dark:text-white/70">
                      {x.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
