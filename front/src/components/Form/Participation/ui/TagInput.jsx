import { useState } from "react";

/**
 * Composant Tags façon Instagram/TikTok
 * - Entrée ou virgule => ajoute le tag
 * - Backspace sur input vide => supprime le dernier tag
 */
export default function TagInput({ value = [], onChange, disabled = false }) {
  const [inputValue, setInputValue] = useState("");

  function addTag(raw) {
    const t = String(raw || "")
      .trim()
      .toLowerCase();
    if (!t) return;

    // ✅ évite les doublons
    if (!value.includes(t)) {
      onChange?.([...value, t]);
    }
  }

  function handleKeyDown(e) {
    // Entrée ou virgule => ajouter
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    }

    // Backspace avec input vide => supprimer dernier tag
    if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      onChange?.(value.slice(0, -1));
    }
  }

  function removeTag(tag) {
    onChange?.(value.filter((t) => t !== tag));
  }

  return (
    <div>
      <div
        className={[
          "flex flex-wrap items-center gap-2 rounded-2xl p-3",
          "bg-[#E9E9EA]",
          "dark:bg-neutral-800",
          disabled ? "opacity-60" : "",
        ].join(" ")}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className={[
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm",
              "bg-white text-neutral-800",
              "dark:bg-neutral-900 dark:text-white",
            ].join(" ")}
          >
            #{tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                aria-label={`Supprimer le tag ${tag}`}
              >
                ×
              </button>
            )}
          </span>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={
            value.length === 0 ? "Tapez un tag et appuyez sur Entrée" : ""
          }
          className={[
            "min-w-[180px] flex-1 bg-transparent outline-none text-sm",
            "text-neutral-800 placeholder:text-neutral-500",
            "dark:text-white dark:placeholder:text-neutral-400",
          ].join(" ")}
        />
      </div>

      <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
        Entrée ou virgule pour ajouter un tag • Backspace pour supprimer le
        dernier
      </p>
    </div>
  );
}
