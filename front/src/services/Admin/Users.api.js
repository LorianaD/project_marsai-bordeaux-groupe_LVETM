const API = import.meta.env.VITE_API_URL || "";

// Lister tout les users
export async function getUsers() {
    const res = await fetch(`${API}/api/users`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Erreur lors du chargement des utilisateurs : ${res.status}`);
    }
    return res.json();
}

// changer le role d'un user
export async function updateUserRole(id, role) {
    const res = await fetch(`${API}/api/users/${id}/role`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ role }),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Erreur lors du changement de rôle : ${res.status}`);
    }
    return res.json();
}

// Supprimer un user
export async function deleteUser(id) {
    const res = await fetch(`${API}/api/users/${id}`,{
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Erreur lors de la suppression : ${res.status}`);
    }
    return res.json()
}