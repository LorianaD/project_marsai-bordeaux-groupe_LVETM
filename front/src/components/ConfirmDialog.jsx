/*Permet d'avoir une modal de confirmation avant de changer le role*/

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Demande de confirmation",
  message = "Êtes-vous sûr de vouloir effectuer ce changement ?",
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  confirmVariant = "primary",
}) {
  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  
  const confirmButtonClass =
    confirmVariant === "danger"
      ? "rounded-2xl bg-[#FF3D6E]/90 px-4 py-3 text-sm font-semibold text-white hover:bg-[#FF3D6E] transition-colors"
      : "rounded-2xl bg-[#2F6BFF] px-4 py-3 text-sm font-semibold text-white hover:bg-[#2F6BFF]/90 transition-colors";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4 dark:bg-black/70"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#0b0b0b] dark:shadow-[0_0_40px_rgba(0,0,0,0.3)]"
      >
        <h2
          id="confirm-dialog-title"
          className="text-lg font-semibold text-black/90 dark:text-white/90"
        >
          {title}
        </h2>
        <p
          id="confirm-dialog-message"
          className="mt-2 text-sm text-black/70 dark:text-white/70"
        >
          {message}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/15 dark:bg-white/10 dark:hover:bg-white/15"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={confirmButtonClass}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}