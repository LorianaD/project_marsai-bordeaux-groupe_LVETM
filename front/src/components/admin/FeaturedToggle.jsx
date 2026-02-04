export default function FeaturedToggle({ value, onChange, disabled }) {
  const on = Boolean(value);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!on)}
      className={[
        "relative h-7 w-12 rounded-full ring-1 transition",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        on ? "bg-[#2F6BFF]/40 ring-[#2F6BFF]/40" : "bg-white/10 ring-white/15",
      ].join(" ")}
      title={on ? "Retirer de la mise en avant" : "Mettre en avant"}
    >
      <span
        className={[
          "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition",
          on ? "left-6" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}
