function BtnAdd({ onClick, children = "Ajouter", loading = false, type = "button" }) {
    return(
        <button type={ type } onClick={ onClick } disabled={ loading } 
        
            className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-pink-500 px-6 py-3 text-sm font-extrabold text-white shadow-sm hover:opacity-95 active:opacity-90"
        >
            {loading ? "Chargement..." : children}

        </button>
    )
}

export default BtnAdd