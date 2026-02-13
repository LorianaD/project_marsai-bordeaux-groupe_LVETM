function BtnSubmitForm({ type="submit", children,  loading = false, disabled = false, variant = "primary" }) {

    const baseStyle = `
        flex w-[200px] h-[53px] items-center justify-center gap-[13px]
        px-[21px] py-[10px] rounded-[5px]
        transition-all duration-200
        active:scale-[0.98]
        disabled:opacity-60 disabled:cursor-not-allowed
    `;

    const variants = {
        primary: "border border-[#DBE3E6] bg-white dark:bg-[#333] hover:bg-[#D5D5D5] dark:hover:bg-[#DBE3E6] dark:hover:text-[#000000]",
        success: "bg-green-600 text-white hover:bg-green-700",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    return(
        <div className="w-full flex justify-center">
            <button type={type} disabled={loading || disabled} 
                className={`${baseStyle} ${variants[variant]}`}
            >
            {loading ? (
                <span className="animate-pulse">Chargement...</span>
                ) : (
                children
            )}
            </button>
        </div>
    )
}

export default BtnSubmitForm

// exemple sur l'affichage dans le formulaire:

// Mise à jour :
// <BtnSubmitForm loading={loading}>
//    Mettre à jour
// </BtnSubmitForm>


// Ajout
// <BtnSubmitForm variant="success" loading={loading}>
//      Ajouter
// </BtnSubmitForm>

// Suppression
//<BtnSubmitForm variant="danger">
//    Supprimer
//</BtnSubmitForm>