import { useState, useEffect, useMemo } from "react";
import { getUsers, updateUserRole, deleteUser } from "../../services/Admin/Users.api.js";
import { decodeToken } from "../../utils/decodeToken.js";

const ROLE_OPTIONS = ["Filtrer par rôle", "admin", "selector", "superadmin"];

// Traduction des rôles pour l'affichage
const ROLE_LABELS = {
  "Filtrer par rôle": "Filtrer par rôle",
  admin: "Administrateur",
  selector: "Sélectionneur",
  superadmin: "Super administrateur",
};

function DashboardUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [roleFilter, setRoleFilter] = useState("Filtrer par rôle");
  const [busyId, setBusyId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Charge la liste des users depuis le backend
  async function refresh() {
    try {
      setLoading(true);
      setError("");
      const data = await getUsers();
      setUsers(Array.isArray(data?.users) ? data.users : []);
    } catch (error) {
      setError(error?.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }

  // Filtre les users en temps réel selon la recherche et le filtre de rôle
  const filtered = useMemo(() => {
    const superadmins = users.filter((user) => user.role === "superadmin");
    const others = users.filter((user) => {
      if (user.role === "superadmin") return false;
      if (roleFilter === "Filtrer par rôle") return true;

      return user.role === roleFilter;
    });

    return [...superadmins, ...others];
  }, [users, roleFilter]);

  useEffect(() => {
    refresh();
    setCurrentUser(decodeToken());
  }, []);

  // Change le rôle d'un utilisateur (fonction superAdmin uniquement)
  async function onChangeRole(userId, newRole) {
    setBusyId(userId);

    const previousUsers = [...users];

    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user,
      ),
    );

    try {
      await updateUserRole(userId, newRole);
      setSuccess(`Le rôle a été changé en "${newRole}" avec succès`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setUsers(previousUsers);
      setError(error?.message || "Erreur lors du changement de rôle");
    } finally {
      setBusyId(null);
    }
  }

  // Delete un user
  async function onDeleteUser(userId) {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      return;
    }

    setBusyId(userId);
    const previousUsers = [...users];
    setUsers((prev) => prev.filter((user) => user.id !== userId));

    try {
      await deleteUser(userId);
      setSuccess("L'utilisateur a été supprimé avec succès");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setUsers(previousUsers);
      setError(error?.message || "Erreur lors de la suppression");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>

            <div className="flex flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#F6339A]/15 ring-1 ring-[#F6339A]/25">
            👥
          </span>
          <div className="text-sm font-semibold">Gestion des utilisateurs</div>
        </div>

        <div className="w-full rounded-full border border-black/10 bg-black/0 px-3 py-2 md:w-auto dark:border-white/10 dark:bg-white/5">
          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            className="w-full bg-transparent text-sm text-black/70 outline-none md:w-auto dark:text-white/80"
          >
            {ROLE_OPTIONS.filter((role) => role !== "superadmin").map((role) => (
              <option
                key={role}
                value={role}
                className="bg-white text-black dark:bg-black dark:text-white"
              >
                {ROLE_LABELS[role] || role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        {loading && <p>Chargement...</p>}
        {!loading && filtered.length === 0 && <p>Aucun utilisateur trouvé.</p>}
        {!loading && filtered.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>E-mail</th>
                <th>Rôle</th>
                {currentUser?.role === "superadmin" && <th>Changer le rôle</th>}
                {currentUser?.role === "superadmin" && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {filtered.map((user) => (
                <tr key={user.id}>
                  <td>{user.last_name}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {/* Colonne Role — affiche toujours le rôle en texte */}
                  <td>{user.role}</td>

                  {/* Colonne Change role — select pour changer le rôle (superadmin uniquement) */}
                  {currentUser?.role === "superadmin" && (
                    <td>
                      {user.role !== "superadmin" ? (
                        <select
                          value=""
                          disabled={busyId === user.id}
                          onChange={(event) =>
                            onChangeRole(user.id, event.target.value)
                          }
                          className="text-black bg-white"
                        >
                          <option value="" disabled>
                            Changer le rôle
                          </option>
                          {ROLE_OPTIONS.filter(
                            (role) =>
                              role !== "Filtrer par rôle" &&
                              role !== "superadmin",
                          ).map((role) => (
                            <option key={role} value={role}>
                              {ROLE_LABELS[role] || role}
                            </option>
                          ))}
                        </select>
                      ) : (
                        ""
                      )}
                    </td>
                  )}

                  {/* Bouton supprimer — visible seulement pour le superAdmin */}
                  {currentUser?.role === "superadmin" &&
                    user.role !== "superadmin" && (
                      <td>
                        <button
                          disabled={busyId === user.id}
                          onClick={() => onDeleteUser(user.id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default DashboardUser;
