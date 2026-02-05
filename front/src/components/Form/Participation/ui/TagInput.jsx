import { useState } from "react";

// Permet d'ajouter et supprimer des tags via un input
export default function TagInput({ value = [], onChange, disabled = false }) {
  const [inputValue, setInputValue] = useState("");

  // Ajoute un tag en évitant les doublons
  function addTag(raw) {
    const t = String(raw || "")
      .trim()
      .toLowerCase();
    if (!t) return;

    if (!value.includes(t)) {
      onChange?.([...value, t]);
    }
  }

  // Gère les actions clavier (ajout ou suppression)
  function handleKeyDown(e) {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    }

    if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      onChange?.(value.slice(0, -1));
    }
  }

  // Supprime un tag sélectionné
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
