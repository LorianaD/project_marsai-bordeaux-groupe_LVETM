import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Select personnalisé pour l'admin : le menu déroulant est stylé.
 * Utilise un portail pour éviter d'être coupé par overflow-hidden des parents.
 */
function AdminSelect({
  value,
  onChange,
  options,
  placeholder,
  placeholderAsOption = true,
  disabled,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const ref = useRef(null);
  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder;

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [open]);

  function handleSelect(val) {
    onChange?.(val);
    setOpen(false);
  }

  const menu = open && (
    <ul
      className="fixed z-[9999] min-w-[140px] rounded-2xl border border-black/10 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-[#0B0F1A] dark:shadow-xl"
      style={{
        listStyle: "none",
        top: pos.top,
        left: pos.left,
        width: Math.max(pos.width, 140),
      }}
    >
      {placeholder && placeholderAsOption && (
        <li>
          <button
            type="button"
            onClick={() => handleSelect("")}
            className="w-full rounded-xl px-3 py-2 text-left text-sm text-black/55 hover:bg-black/5 dark:text-white/55 dark:hover:bg-white/5"
          >
            {placeholder}
          </button>
        </li>
      )}
      {options.map((opt) => (
        <li key={opt.value}>
          <button
            type="button"
            onClick={() => handleSelect(opt.value)}
            className={`w-full rounded-xl px-3 py-2 text-left text-sm ${
              value === opt.value
                ? "bg-black/10 font-semibold dark:bg-white/10"
                : "text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5"
            }`}
          >
            {opt.label}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        className="flex min-h-[36px] min-w-[140px] cursor-pointer items-center justify-between gap-2 rounded-full border border-black/10 bg-black/0 px-3 py-2 text-sm text-black/70 outline-none hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
      >
        <span className="truncate">{selectedLabel}</span>
        <span className={`text-[10px] opacity-60 transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {menu && createPortal(menu, document.body)}
    </div>
  );
}

export default AdminSelect;
