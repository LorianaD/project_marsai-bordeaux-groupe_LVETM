import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ENDPOINTS = {
  list: "/api/contact/admin/messages",
  markRead: (id) => `/api/contact/admin/messages/${id}/read`,
  reply: (id) => `/api/contact/admin/messages/${id}/reply`,
};

function fmtDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return String(d);
  return dt.toLocaleString("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function StatusPill({ status }) {
  const cls =
    status === "new"
      ? "bg-[#EAF1FF] text-[#2F6BFF] border-black/10 dark:bg-white/5 dark:text-white/80 dark:border-white/10"
      : status === "replied"
        ? "bg-[#E9FFF2] text-[#10B981] border-black/10 dark:bg-white/5 dark:text-white/80 dark:border-white/10"
        : "bg-black/[0.03] text-black/60 border-black/10 dark:bg-white/5 dark:text-white/70 dark:border-white/10";

  const label =
    status === "new" ? "NOUVEAU" : status === "replied" ? "RÉPONDU" : "LU";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest",
        cls,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

export default function AdminMessages() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [sendErr, setSendErr] = useState("");
  const [sendOk, setSendOk] = useState("");

  async function loadMessages() {
    try {
      setLoading(true);
      setErr("");

      const res = await fetch(`${API_BASE}${ENDPOINTS.list}`, {
        headers: { Accept: "application/json" },
        credentials: "include",
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur chargement messages");

      const list = Array.isArray(data?.messages)
        ? data.messages
        : Array.isArray(data)
          ? data
          : [];

      list.sort(
        (a, b) =>
          new Date(b.created_at || b.createdAt || 0) -
          new Date(a.created_at || a.createdAt || 0),
      );

      setMessages(list);

      if (!selectedId && list[0]?.id != null) {
        setSelectedId(list[0].id);
      }
    } catch (e) {
      setErr(e?.message || "Erreur");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return messages;

    return messages.filter((m) => {
      const hay = [m.subject, m.message, m.email, m.name, m.last_name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(s);
    });
  }, [messages, q]);

  const selected = useMemo(() => {
    return filtered.find((m) => m.id === selectedId) || filtered[0] || null;
  }, [filtered, selectedId]);

  // Marquer comme lu (si endpoint dispo)
  async function markRead(id) {
    if (!id) return;

    try {
      const res = await fetch(`${API_BASE}${ENDPOINTS.markRead(id)}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        credentials: "include",
      });

      if (!res.ok) return;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                is_read: 1,
                read_at: m.read_at || new Date().toISOString(),
              }
            : m,
        ),
      );
    } catch {
      // silencieux
    }
  }

  // marque lu quand on sélectionne
  useEffect(() => {
    if (selected?.id != null && !selected?.is_read && !selected?.replied_at) {
      markRead(selected.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  async function sendReply() {
    if (!selected?.id) return;
    const text = reply.trim();
    if (!text) return;

    try {
      setSending(true);
      setSendErr("");
      setSendOk("");

      const res = await fetch(`${API_BASE}${ENDPOINTS.reply(selected.id)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ reply: text }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur envoi réponse");

      setSendOk("Réponse enregistrée");
      setReply("");

      // update local
      setMessages((prev) =>
        prev.map((m) =>
          m.id === selected.id
            ? {
                ...m,
                admin_reply: text,
                replied_at: new Date().toISOString(),
                is_read: 1,
              }
            : m,
        ),
      );
    } catch (e) {
      setSendErr(e?.message || "Erreur");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="">

      <div className="mx-auto w-full px-6 pb-14 pt-10">
        <div className="flex gap-7">

          <div className="min-w-0 flex-1">

            <div className="w-full">
              <h3 className="w-full text-[44px] font-extrabold tracking-tight md:text-[56px]">
                MESSAGES
              </h3>
              <div className="mt-2 max-w-2xl text-black/55 dark:text-white/55">
                Messages reçus via le formulaire de contact. Réponds directement
                depuis cette page.
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-[0.95fr_1.35fr]">
              {/* LEFT */}
              <div
                className="
                  overflow-hidden rounded-[22px] border border-black/10 bg-white
                  shadow-[0_18px_60px_rgba(0,0,0,0.06)]
                  dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl
                  dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]
                "
              >
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div className="text-[16px] font-extrabold">
                    Boîte de réception
                  </div>
                  <button
                    type="button"
                    onClick={loadMessages}
                    className="rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-xs font-semibold text-black/70 hover:bg-black/[0.05]
                               dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                  >
                    Rafraîchir
                  </button>
                </div>

                <div className="px-6 pb-4">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Rechercher un email, nom, sujet…"
                    className="w-full rounded-xl border border-black/10 bg-black/[0.03] px-5 py-3 text-sm text-black/70 outline-none
                               dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                  />
                </div>

                <div className="divide-y divide-black/10 dark:divide-white/10">
                  {loading && (
                    <div className="px-6 py-8 text-sm text-black/60 dark:text-white/60">
                      Chargement…
                    </div>
                  )}

                  {!loading && err && (
                    <div className="px-6 py-8 text-sm text-red-600 dark:text-red-300">
                      {err}
                    </div>
                  )}

                  {!loading && !err && filtered.length === 0 && (
                    <div className="px-6 py-10 text-sm text-black/50 dark:text-white/50">
                      Aucun message.
                    </div>
                  )}

                  {!loading &&
                    !err &&
                    filtered.map((m) => {
                      const isActive = selected?.id === m.id;

                      // ✅ LOGIQUE DEMANDÉE
                      const status = m.replied_at
                        ? "replied"
                        : m.is_read
                          ? "read"
                          : "new";

                      const subject = m.subject || "Sans sujet";
                      const from =
                        `${m.name || "—"} ${m.last_name || ""}`.trim();
                      const date = fmtDate(m.created_at);

                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSelectedId(m.id)}
                          className={[
                            "w-full px-6 py-4 text-left transition",
                            isActive
                              ? "bg-black/[0.03] dark:bg-white/5"
                              : "hover:bg-black/[0.02] dark:hover:bg-white/[0.04]",
                          ].join(" ")}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
                                {subject}
                              </div>
                              <div className="mt-1 truncate text-xs text-black/55 dark:text-white/55">
                                {from} • {m.email || "—"}
                              </div>
                              <div className="mt-2 line-clamp-2 text-xs text-black/45 dark:text-white/45">
                                {m.message || ""}
                              </div>
                            </div>

                            <div className="flex shrink-0 flex-col items-end gap-2">
                              <StatusPill status={status} />
                              <div className="text-[10px] font-semibold text-black/40 dark:text-white/40">
                                {date}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* RIGHT */}
              <div
                className="
                  rounded-[22px] border border-black/10 bg-white
                  shadow-[0_18px_60px_rgba(0,0,0,0.06)]
                  dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl
                  dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]
                "
              >
                {!selected ? (
                  <div className="p-8 text-sm text-black/60 dark:text-white/60">
                    Sélectionne un message à gauche.
                  </div>
                ) : (
                  <div className="p-6">
                    {/* header detail */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[18px] font-extrabold tracking-tight">
                          {selected.subject || "Sans sujet"}
                        </div>

                        <div className="mt-2 text-xs text-black/55 dark:text-white/55">
                          <span className="font-semibold text-black/80 dark:text-white/80">
                            De :
                          </span>{" "}
                          {`${selected.name || "—"} ${selected.last_name || ""}`.trim()}
                          {" • "}
                          <span className="font-semibold">
                            {selected.email || "—"}
                          </span>
                        </div>

                        <div className="mt-1 text-xs text-black/45 dark:text-white/45">
                          Reçu : {fmtDate(selected.created_at)}
                        </div>
                      </div>

                      {/* status detail */}
                      <div className="shrink-0">
                        <StatusPill
                          status={
                            selected.replied_at
                              ? "replied"
                              : selected.is_read
                                ? "read"
                                : "new"
                          }
                        />
                      </div>
                    </div>

                    {/* message */}
                    <div className="mt-5 rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-sm leading-7 text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                      {selected.message || "—"}
                    </div>

                    {/* last reply */}
                    {selected.admin_reply ? (
                      <div className="mt-5">
                        <div className="text-xs font-extrabold uppercase tracking-widest text-black/45 dark:text-white/45">
                          Réponse envoyée
                        </div>
                        <div className="mt-2 rounded-2xl border border-black/10 bg-white p-4 text-sm text-black/75 shadow-sm dark:border-white/10 dark:bg-black/30 dark:text-white/75">
                          {selected.admin_reply}
                        </div>
                        {selected.replied_at ? (
                          <div className="mt-2 text-xs text-black/45 dark:text-white/45">
                            Envoyée : {fmtDate(selected.replied_at)}
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {/* reply box */}
                    <div className="mt-6">
                      <div className="text-xs font-extrabold uppercase tracking-widest text-black/45 dark:text-white/45">
                        Répondre
                      </div>

                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        rows={6}
                        placeholder="Écris ta réponse ici…"
                        className="
                          mt-3 w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 outline-none
                          focus:ring-2 focus:ring-black/10
                          dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:focus:ring-white/10
                        "
                      />

                      {sendErr ? (
                        <div className="mt-3 text-sm text-red-600 dark:text-red-300">
                          {sendErr}
                        </div>
                      ) : null}

                      {sendOk ? (
                        <div className="mt-3 text-sm text-emerald-600 dark:text-emerald-300">
                          {sendOk}
                        </div>
                      ) : null}

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setReply("")}
                          className="rounded-full border border-black/10 bg-black/[0.03] px-5 py-2 text-sm font-semibold text-black/70 hover:bg-black/[0.05]
                                     dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                        >
                          Effacer
                        </button>

                        <button
                          type="button"
                          onClick={sendReply}
                          disabled={sending || !reply.trim()}
                          className="
                            rounded-full bg-black px-6 py-2 text-sm font-extrabold tracking-wide text-white
                            hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50
                            dark:bg-white dark:text-black
                          "
                        >
                          {sending ? "Envoi…" : "Envoyer la réponse"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
