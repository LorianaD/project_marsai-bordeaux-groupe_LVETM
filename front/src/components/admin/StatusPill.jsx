export default function StatusPill({ status }) {
  const s = String(status || "Pending");

  const map = {
    Published: {
      label: "PUBLIÉ",
      cls: "bg-[#1AFF7A]/15 text-[#1AFF7A] ring-[#1AFF7A]/25",
    },
    Pending: {
      label: "EN ATTENTE",
      cls: "bg-[#FFD24A]/15 text-[#FFD24A] ring-[#FFD24A]/25",
    },
    Rejected: {
      label: "REFUSÉ",
      cls: "bg-[#FF3D6E]/15 text-[#FF3D6E] ring-[#FF3D6E]/25",
    },
    Processing: {
      label: "TRAITEMENT",
      cls: "bg-white/10 text-white/70 ring-white/15",
    },
    Uploading: {
      label: "UPLOAD",
      cls: "bg-white/10 text-white/70 ring-white/15",
    },
    Failed: {
      label: "FAILED",
      cls: "bg-[#FF3D6E]/15 text-[#FF3D6E] ring-[#FF3D6E]/25",
    },
  };

  const conf = map[s] || map.Pending;

  return (
    <span
      className={[
        "inline-flex min-w-[120px] justify-center rounded-full px-4 py-2 text-[11px] font-extrabold tracking-wider ring-1",
        conf.cls,
      ].join(" ")}
    >
      {conf.label}
    </span>
  );
}
