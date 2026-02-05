import React from "react";

export function Field({ label, required, children }) {
  return (
    <div className="w-full">
      {label ? (
        <label className="mb-2 block text-[11px] uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
          {label}
          {required ? " *" : ""}
        </label>
      ) : null}

      {children}
    </div>
  );
}

// ✅ Input : light par défaut, dark si mode dark
export function TextInput({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-2xl px-6 py-4 text-sm outline-none transition",
        // ✅ LIGHT
        "bg-[#E9E9EA] text-neutral-800 placeholder:text-neutral-400",
        // ✅ DARK
        "dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500",
        // focus
        "focus:ring-2 focus:ring-purple-500/40",
        className,
      ].join(" ")}
    />
  );
}

export function TextArea({ className = "", rows = 4, ...props }) {
  return (
    <textarea
      {...props}
      rows={rows}
      className={[
        "w-full resize-none rounded-2xl px-6 py-4 text-sm outline-none transition",
        "bg-[#E9E9EA] text-neutral-800 placeholder:text-neutral-400",
        "dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500",
        "focus:ring-2 focus:ring-purple-500/40",
        className,
      ].join(" ")}
    />
  );
}

export function Select({ children, className = "", ...props }) {
  return (
    <select
      {...props}
      className={[
        "w-full rounded-2xl px-6 py-4 text-sm outline-none transition",
        "bg-[#E9E9EA] text-neutral-800",
        "dark:bg-neutral-800 dark:text-white",
        "focus:ring-2 focus:ring-purple-500/40",
        className,
      ].join(" ")}
    >
      {children}
    </select>
  );
}
