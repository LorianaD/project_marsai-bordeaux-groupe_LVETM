import React from "react";

export function Field({ label, required, children }) {
  return (
    <div className="w-full">
      {label ? (
        <label className="mb-2 block text-[11px] uppercase tracking-[0.12em] text-neutral-500">
          {label}
          {required ? " *" : ""}
        </label>
      ) : null}
      {children}
    </div>
  );
}

export function TextInput({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={[
        "w-full rounded-xl bg-neutral-100 px-4 py-3 text-sm text-neutral-700",
        "placeholder:text-neutral-400 outline-none",
        className,
      ].join(" ")}
    />
  );
}

export function TextArea({
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  className = "",
}) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={[
        "w-full resize-none rounded-xl bg-neutral-100 px-4 py-3 text-sm text-neutral-700",
        "placeholder:text-neutral-400 outline-none",
        className,
      ].join(" ")}
    />
  );
}

export function Select({ name, value, onChange, children, className = "" }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={[
        "w-full rounded-xl bg-neutral-100 px-4 py-3 text-sm text-neutral-700 outline-none",
        className,
      ].join(" ")}
    >
      {children}
    </select>
  );
}
