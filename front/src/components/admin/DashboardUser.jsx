import { useState, useEffect, useMemo } from "react";
import {
  getUsers,
  updateUserRole,
  deleteUser,
} from "../../services/Admin/Users.api.js";
import { decodeToken } from "../../utils/decodeToken.js";

const ROLE_OPTIONS = ["All", "admin", "selector", "superAdmin"];

function DashboardUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
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
    const search = searchQuery.trim().toLowerCase();
    return users
      .filter((user) => {
        if (roleFilter === "All") return true;
        return user.role === roleFilter;
      })
      .filter((user) => {
        if (!search) return true;
        const fullText = [user.name, user.last_name, user.email, user.role]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return fullText.includes(search);
      });
  }, [users, searchQuery, roleFilter]);

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
        <h2>Gestion des utilisateurs</h2>
        {error && <p>{error}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by name, email..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <select
          value={roleFilter}
          onChange={(event) => setRoleFilter(event.target.value)}
          className="text-black bg-white"
        >
          {ROLE_OPTIONS.map((role) => (
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
                {currentUser?.role === "superAdmin" && <th>Actions</th>}
              </tr>
            </thead>
            
              <tbody>
                            {filtered.map((user) => (
              <tr key={user.id}>
                <td>{user.last_name}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {/* Si superAdmin connecté → menu déroulant pour changer le rôle */}
                  {/* Sinon → juste le texte du rôle */}
                  {currentUser?.role === "superAdmin" ? (
                    <select
                      value={user.role}
                      disabled={busyId === user.id}
                      onChange={(event) => onChangeRole(user.id, event.target.value)}
                      className="text-black bg-white"
                    >
                      {/* On affiche seulement "admin", "selector", "superAdmin" (pas "All") */}
                      {ROLE_OPTIONS.filter((role) => role !== "All").map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user.role
                  )}
                </td>

                {/* Bouton supprimer — visible seulement pour le superAdmin */}
                {currentUser?.role === "superAdmin" && (
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
