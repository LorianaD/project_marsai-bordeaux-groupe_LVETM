import React from "react";

// Wrapper label + champ
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

/**
 * Force Chrome autofill à respecter tes couleurs
 * - marche si darkMode = "class" (via .dark)
 * - ET si darkMode = "media" (prefers-color-scheme)
 */
function AutofillStyles() {
  return (
    <style>{`
      /* ===================== LIGHT AUTOFILL ===================== */
      .marsai-input:-webkit-autofill,
      .marsai-input:-webkit-autofill:hover,
      .marsai-input:-webkit-autofill:focus,
      .marsai-input:-webkit-autofill:active {
        -webkit-text-fill-color: #111827 !important;
        caret-color: #111827 !important;

        background-color: #E9E9EA !important;
        background-image: none !important;

        -webkit-box-shadow: 0 0 0px 1000px #E9E9EA inset !important;
        box-shadow: 0 0 0px 1000px #E9E9EA inset !important;

        transition: background-color 999999s ease-in-out 0s !important;
      }

      .marsai-input:-internal-autofill-selected {
        -webkit-text-fill-color: #111827 !important;
        caret-color: #111827 !important;
        background-color: #E9E9EA !important;
        background-image: none !important;
        box-shadow: 0 0 0px 1000px #E9E9EA inset !important;
      }

      /* ===================== DARK AUTOFILL (CLASS MODE) ===================== */
      .dark .marsai-input:-webkit-autofill,
      .dark .marsai-input:-webkit-autofill:hover,
      .dark .marsai-input:-webkit-autofill:focus,
      .dark .marsai-input:-webkit-autofill:active {
        -webkit-text-fill-color: #ffffff !important;
        caret-color: #ffffff !important;

        background-color: #0b0b0f !important;
        background-image: none !important;

        -webkit-box-shadow: 0 0 0px 1000px #0b0b0f inset !important;
        box-shadow: 0 0 0px 1000px #0b0b0f inset !important;

        transition: background-color 999999s ease-in-out 0s !important;
      }

      .dark .marsai-input:-internal-autofill-selected {
        -webkit-text-fill-color: #ffffff !important;
        caret-color: #ffffff !important;

        background-color: #0b0b0f !important;
        background-image: none !important;

        box-shadow: 0 0 0px 1000px #0b0b0f inset !important;
      }

      /* ===================== DARK AUTOFILL (MEDIA MODE) ===================== */
      @media (prefers-color-scheme: dark) {
        .marsai-input:-webkit-autofill,
        .marsai-input:-webkit-autofill:hover,
        .marsai-input:-webkit-autofill:focus,
        .marsai-input:-webkit-autofill:active {
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #ffffff !important;

          background-color: #0b0b0f !important;
          background-image: none !important;

          -webkit-box-shadow: 0 0 0px 1000px #0b0b0f inset !important;
          box-shadow: 0 0 0px 1000px #0b0b0f inset !important;

          transition: background-color 999999s ease-in-out 0s !important;
        }

        .marsai-input:-internal-autofill-selected {
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #ffffff !important;

          background-color: #0b0b0f !important;
          background-image: none !important;

          box-shadow: 0 0 0px 1000px #0b0b0f inset !important;
        }
      }
    `}</style>
  );
}

const common =
  "marsai-input w-full rounded-2xl px-6 py-4 text-sm outline-none transition " +
  "focus:ring-2 focus:ring-purple-500/40";

export function TextInput({ className = "", ...props }) {
  return (
    <>
      <AutofillStyles />
      <input
        {...props}
        className={[
          common,
          // LIGHT
          "bg-[#E9E9EA] text-neutral-900 placeholder:text-neutral-500",
          "focus:bg-[#E9E9EA] focus:text-neutral-900",
          // DARK (tailwind gère class OU media selon ta config)
          "dark:bg-[#0b0b0f] dark:text-white dark:placeholder:text-neutral-400",
          "dark:focus:bg-[#0b0b0f] dark:focus:text-white",
          className,
        ].join(" ")}
      />
    </>
  );
}

export function TextArea({ className = "", rows = 4, ...props }) {
  return (
    <>
      <AutofillStyles />
      <textarea
        {...props}
        rows={rows}
        className={[
          common,
          "resize-none",
          // LIGHT
          "bg-[#E9E9EA] text-neutral-900 placeholder:text-neutral-500",
          "focus:bg-[#E9E9EA] focus:text-neutral-900",
          // DARK
          "dark:bg-[#0b0b0f] dark:text-white dark:placeholder:text-neutral-400",
          "dark:focus:bg-[#0b0b0f] dark:focus:text-white",
          className,
        ].join(" ")}
      />
    </>
  );
}

export function Select({ children, className = "", ...props }) {
  return (
    <>
      <AutofillStyles />
      <select
        {...props}
        className={[
          common,
          // LIGHT
          "bg-[#E9E9EA] text-neutral-900",
          "focus:bg-[#E9E9EA] focus:text-neutral-900",
          // DARK
          "dark:bg-[#0b0b0f] dark:text-white",
          "dark:focus:bg-[#0b0b0f] dark:focus:text-white",
          className,
        ].join(" ")}
      >
        {children}
      </select>
    </>
  );
}
