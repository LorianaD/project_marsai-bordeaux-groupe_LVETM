/* ===========================================================
Récupere l'url de l'api defini dans le fichier d'environnement
=========================================================== */
const API_URL = import.meta.env.VITE_API_URL;

/* ==================
logique d'inscription
================== */ 
export async function register(email, firstName, lastName, password, password) {
    
    /* =========================================================
    faire la request POST sur la route /api/users/admin/register
    ========================================================= */
    const response = await fetch(`${API_URL}api/users/admin/register`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        
        /* ====================
        passer les data au body
        ==================== */
        body: JSON.stringify({email, firstName, lastName, password, password}),
    });

    /* ===================
    parse la response json
    =================== */
    const data = await response.json();

    /* ====================
    petite gestion d'erreur
    ==================== */ 
    if(!response.ok){
        throw new Error(data.Error || 'Account registration failed');
    }

    return data;
}