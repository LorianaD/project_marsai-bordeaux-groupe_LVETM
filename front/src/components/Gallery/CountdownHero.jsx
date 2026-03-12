import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";

function pad2(n) {
    return String(n).padStart(2, "0");
}

function diffParts(ms) {
    const total = Math.max(0, ms);
    const sec = Math.floor(total / 1000);

    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;

    return { days, hours, minutes, seconds };
}

function CountdownHero() {
    const { t, i18n } = useTranslation("gallery");
    const [now, setNow] = useState(() => new Date());

    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "gallery";
    const section = "countdown";

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(page, locale);
    

    const startDate = content?.[page]?.[section]?.start_date;
    const endDate = content?.[page]?.[section]?.end_date;

    // Dates festival (heure locale)
    const FESTIVAL_START = startDate 
        ? new Date(`${startDate}T00:00:00`) 
        : new Date(2026, 10, 2, 0, 0, 0); // 02 nov 2026

    const FESTIVAL_END = endDate
        ? new Date(`${endDate}T23:59:59`)
        : new Date(2026, 10, 30, 23, 59, 59); // 30 nov 2026

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const { phase, targetDate, msLeft } = useMemo(() => {
        const n = now.getTime();
        const start = FESTIVAL_START.getTime();
        const end = FESTIVAL_END.getTime();

    if (n < start) {
      return { phase: "before", targetDate: FESTIVAL_START, msLeft: start - n };
    }
    if (n >= start && n <= end) {
      return { phase: "during", targetDate: FESTIVAL_END, msLeft: end - n };
    }
        return { phase: "after", targetDate: FESTIVAL_END, msLeft: 0 };
    }, [now, FESTIVAL_START, FESTIVAL_END]);

    const parts = diffParts(msLeft);

    const label =
        phase === "before"
        ? t("hero.badge.before")
        : phase === "during"
            ? t("hero.badge.during")
            : t("hero.badge.after");

    const targetDateLabel = targetDate.toLocaleDateString(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const endFullDate = FESTIVAL_END.toLocaleDateString(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    
    if (loading) return null;
    
    return (
        <section className="mb-10 overflow-hidden rounded-3xl border border-neutral-200/60 bg-white text-neutral-900 shadow-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white">
            <div className="relative">
                <div className="absolute inset-0 opacity-60 dark:opacity-70">
                    <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
                    <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-pink-500/25 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_60%)]" />
                </div>

                <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                    <div className="flex flex-col gap-5">
                        {/* TITRE MarsAI */}
                        <h2
                        className="font-extrabold leading-[0.95] tracking-tight"
                        style={{ fontSize: "clamp(44px, 6vw, 96px)" }}
                        >
                            <span className="text-neutral-900 dark:text-white">
                                {content?.[page]?.[section]?.title_main || t("hero.festivalName.mars")}
                            </span>
                            <span className="bg-linear-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                                {content?.[page]?.[section]?.title_accent || t("hero.festivalName.ai")}
                            </span>
                        </h2>

                        {/* Message */}
                        <p className="max-w-3xl text-sm leading-relaxed text-neutral-700 dark:text-white/75 sm:text-base">
                            {content?.[page]?.[section]?.description || t("hero.message")}
                        </p>

                        {/* Badge */}
                        <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                            <span className="inline-block h-2 w-2 rounded-full bg-pink-500" />
                            {label}
                        </div>

                        {/* Countdown */}
                        <div className="mt-5">
                        {phase === "after" ? (
                            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-6 text-center text-sm font-semibold text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                                {t("hero.thanks")}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                                {[
                                    { k: t("hero.countdown.days"), v: parts.days },
                                    { k: t("hero.countdown.hours"), v: pad2(parts.hours) },
                                    { k: t("hero.countdown.minutes"), v: pad2(parts.minutes) },
                                    { k: t("hero.countdown.seconds"), v: pad2(parts.seconds) },
                                ].map((b) => (
                                    <div
                                    key={b.k}
                                    className="rounded-2xl border border-neutral-200 bg-white/70 px-4 py-5 text-center backdrop-blur dark:border-white/10 dark:bg-white/5"
                                    >
                                    <div
                                        className="font-extrabold leading-none tracking-tight"
                                        style={{ fontSize: "clamp(34px, 4.2vw, 64px)" }}
                                    >
                                        {b.v}
                                    </div>
                                    <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-600 dark:text-white/60">
                                        {b.k}
                                    </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* date cible */}
                        <div className="mt-4 text-xs text-neutral-500 dark:text-white/45">
                            {phase !== "after" ? (
                            <>
                                {content?.[page]?.[section]?.target || t("hero.targetDateLabel")}{" : "}
                                <span className="font-semibold text-neutral-700 dark:text-white/70">
                                    {targetDateLabel}
                                </span>
                            </>
                            ) : null}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CountdownHero