import { getAuthHeaders } from "../../utils/authHeaders.js";

const API = import.meta.env.VITE_API_URL || "";

/*========================
  Lister tout les users
=========================*/
export async function getUsers() {
    const res = await fetch(`${API}/api/users`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Erreur lors du chargement des utilisateurs : ${res.status}`);
    }
    return res.json();
}

/*============================
  changer le role d'un user
=============================*/
export async function updateUserRole(id, role) {
    const res = await fetch(`${API}/api/users/${id}/role`, {
        method: "PUT",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ role }),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Erreur lors du changement de rôle : ${res.status}`);
    }
    return res.json();
}

/*====================
  Supprimer un user
=====================*/
export async function deleteUser(id) {
    const res = await fetch(`${API}/api/users/${id}`,{
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Erreur lors de la suppression : ${res.status}`);
    }
    return res.json()
}

/*==============================
  Inviter un nouvel utilisateur
===============================*/
export async function inviteUser(email, role) {
    const res = await fetch(`${API}/api/users/invite`, {
        method: "POST",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ email, role }),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Erreur lors de l'envoi de l'invitation : ${res.status}`);
    }

    return res.json();
}



