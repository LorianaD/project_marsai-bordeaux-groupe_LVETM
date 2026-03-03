import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function About() {
  const { t } = useTranslation("about");

  return (
    <div className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white pt-[96px]">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[32px] border border-neutral-200/60 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-950">
          {/* background glow */}
          <div className="absolute inset-0 opacity-60 dark:opacity-70">
            <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
            <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-pink-500/25 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_60%)]" />
          </div>

          <div className="relative p-8 sm:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/70">
              <span className="inline-block h-2 w-2 rounded-full bg-pink-500" />
              {t("hero.badge")}
            </div>

            <h1
              className="mt-6 font-extrabold leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(44px, 6vw, 84px)" }}
            >
              <span>{t("hero.title1")} </span>
              <span className="text-neutral-900 dark:text-white">
                {t("hero.title2")}
              </span>
              <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                {t("hero.title3")}
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-neutral-700 dark:text-white/70 sm:text-base">
              {t("hero.description")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-pink-500 px-6 py-3 text-sm font-extrabold text-white shadow-sm hover:opacity-95 active:opacity-90"
              >
                {/* icon */}
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                {t("hero.ctaGallery")}
              </Link>

              <Link
                to="/participation"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-6 py-3 text-sm font-extrabold text-neutral-800 backdrop-blur hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-black/5 dark:bg-white/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                {t("hero.ctaSubmit")}
              </Link>
            </div>
          </div>
        </section>

        {/* STATS (cards + icons) */}
        <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "films", icon: "🎬", v: "600+" },
            { k: "countries", icon: "🌍", v: "120+" },
            { k: "visitors", icon: "🏛️", v: "3000" },
            { k: "bilingual", icon: "🗣️", v: "FR/EN" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-3xl border border-neutral-200/60 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-neutral-100 text-lg dark:bg-white/10">
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-extrabold leading-none">
                    {s.v}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-white/60">
                    {t(`stats.${s.k}`)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* VISION */}
        <section className="mt-14 rounded-[28px] border border-neutral-200/60 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3l9 4.5-9 4.5-9-4.5L12 3z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M3 7.5V17l9 4.5 9-4.5V7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold">{t("vision.title")}</h2>
          </div>

          <div className="mt-6 space-y-3 text-sm leading-relaxed text-neutral-700 dark:text-white/70">
            <p>{t("vision.p1")}</p>
            <p>{t("vision.p2")}</p>
            <p>{t("vision.p3")}</p>
          </div>
        </section>

        {/* WORKFLOW */}
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold">{t("workflow.title")}</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", key: "step1" },
              { n: "02", key: "step2" },
              { n: "03", key: "step3" },
              { n: "04", key: "step4" },
            ].map((x) => (
              <div
                key={x.key}
                className="rounded-3xl border border-neutral-200/60 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-neutral-500 dark:text-white/50">
                  {x.n}
                </div>
                <div className="mt-2 text-sm font-bold">
                  {t(`workflow.${x.key}`)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* QUALITY */}
        <section className="mt-14 rounded-[28px] border border-neutral-200/60 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-extrabold">{t("quality.title")}</h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 text-sm text-neutral-700 dark:text-white/70">
            <div className="flex gap-3">
              <span className="mt-[2px]">🔐</span>
              <p>{t("quality.security")}</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-[2px]">🌐</span>
              <p>{t("quality.i18n")}</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-[2px]">⚡</span>
              <p>{t("quality.performance")}</p>
            </div>
          </div>
        </section>

        {/* FOOT */}
        <div className="mt-14 flex flex-wrap gap-6 text-sm font-semibold">
          <Link to="/contact" className="underline underline-offset-4">
            {t("footer.contact")}
          </Link>
          <Link to="/newsletter" className="underline underline-offset-4">
            {t("footer.newsletter")}
          </Link>
        </div>
      </div>
    </div>
  );
}