import { useState, useEffect, useMemo } from "react";
import {
  getUsers,
  updateUserRole,
  deleteUser,
} from "../../services/Admin/Users.api.js";
import { decodeToken } from "../../utils/decodeToken.js";

const ROLE_OPTIONS = ["Filter by role", "admin", "selector", "superadmin"];

function DashboardUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [roleFilter, setRoleFilter] = useState("Filter by role");
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
      setError(error?.message || "Loading error");
    } finally {
      setLoading(false);
    }
  }

  // Filtre les users en temps réel selon la recherche et le filtre de rôle
  const filtered = useMemo(() => {
    const superadmins = users.filter((user) => user.role === "superadmin");
    const others = users.filter((user) => {
      if (user.role === "superadmin") return false;
      if (roleFilter === "Filter by role") return true;

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
      setSuccess(`The role has been successfully updated to "${newRole}"`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setUsers(previousUsers);
      setError(error?.message || "Error while changing role");
    } finally {
      setBusyId(null);
    }
  }

  // Delete un user
  async function onDeleteUser(userId) {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setBusyId(userId);
    const previousUsers = [...users];
    setUsers((prev) => prev.filter((user) => user.id !== userId));

    try {
      await deleteUser(userId);
      setSuccess("The user has been successfully deleted.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setUsers(previousUsers);
      setError(error?.message || "Error while deleting");
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

      <div>
        <h2>Gestion des utilisateurs</h2>
      </div>

      <div>
        {/* <input
          type="text"
          placeholder="Search by name, email..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        /> */}

        <select
          value={roleFilter}
          onChange={(event) => setRoleFilter(event.target.value)}
          className="text-black bg-white"
        >
          {ROLE_OPTIONS.filter((role) => role !== "superadmin").map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div>
        {loading && <p>Loading...</p>}
        {!loading && filtered.length === 0 && <p>No users found.</p>}
        {!loading && filtered.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>E-mail</th>
                <th>Role</th>
                {currentUser?.role === "superadmin" && <th>Change role</th>}
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

                          <option value= "" disabled>Change role</option>,
                          {ROLE_OPTIONS.filter(
                            
                            (role) =>
                              role !== "Filter by role" &&
                              role !== "superadmin",
                          ).map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      ) : (
                        "—"
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
                          Delete
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
