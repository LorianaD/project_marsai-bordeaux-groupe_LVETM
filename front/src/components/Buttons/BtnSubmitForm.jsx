function BtnSubmitForm({ type="submit", children,  loading = false, disabled = false, variant = "primary", onClick }) {

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
        danger: "bg-[#FB64B6] text-white hover:bg-red-700",
        submit: "bg-blue-600 text-white hover:bg-blue-800",
    };

    return(
        <div className="flex justify-center">
            <button type={type} onClick={onClick} disabled={loading || disabled} 
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
//<BtnSubmitForm type="button" variant="danger" onClick={() => handleDelete()(ou le nom de votre fonction)>
//    Supprimer
//</BtnSubmitForm>