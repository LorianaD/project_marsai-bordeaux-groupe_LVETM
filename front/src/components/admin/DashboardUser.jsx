import { useState, useEffect, useMemo } from "react";
import { getUsers, updateUserRole, deleteUser } from "../../services/Admin/Users.api.js";
import { decodeToken } from "../../utils/decodeToken.js";

const ROLE_OPTIONS = ["Filtrer par rôle", "admin", "selector", "superadmin"];

// Traduction des rôles pour l'affichage
const ROLE_LABELS = {
  "Filtrer par rôle": "Filtrer par rôle",
  admin: "Administrateur",
  selector: "Sélectionneur",
  superadmin: "Super admin",
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
            {error && (
        <div className="mb-3 rounded-2xl bg-[#FF3D6E]/15 px-5 py-3 text-sm font-semibold text-[#FF3D6E] ring-1 ring-[#FF3D6E]/25">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-3 rounded-2xl bg-[#1AFF7A]/15 px-5 py-3 text-sm font-semibold text-[#1AFF7A] ring-1 ring-[#1AFF7A]/25">
          {success}
        </div>
      )}

            <div className="flex flex-col gap-3 pt-2 pb-4 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="flex items-center gap-3">
<span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFE9F4] ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">            👥
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
        {loading && (
          <div className="py-8 text-sm text-black/55 dark:text-white/55">
            Chargement...
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="py-8 text-sm text-black/55 dark:text-white/55">
            Aucun utilisateur trouvé.
          </div>
        )}
                {!loading && filtered.length > 0 && (
          <>
            {/* Header */}
            <div
              className="grid grid-cols-[1fr_1fr_1.5fr_0.8fr_0.8fr_0.6fr] gap-4 border-t border-black/10 py-3 text-xs font-semibold tracking-wider text-black/55
                          dark:border-white/10 dark:text-white/55"
            >
              <div>PRÉNOM</div>
              <div>NOM</div>
              <div>E-MAIL</div>
              <div>RÔLE</div>
              {currentUser?.role === "superadmin" && <div>CHANGER LE RÔLE</div>}
              {currentUser?.role === "superadmin" && <div className="text-right">ACTIONS</div>}
            </div>

            {/* Lignes */}
            <div className="divide-y divide-black/10 dark:divide-white/10">
              {filtered.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-[1fr_1fr_1.5fr_0.8fr_0.8fr_0.6fr] items-center gap-4 py-4 text-sm"
                >
                  {/* Prénom */}
                  <div className="truncate font-semibold text-black/90 dark:text-white/90">
                    {user.name}
                  </div>

                  {/* Nom */}
                  <div className="truncate text-black/70 dark:text-white/70">
                    {user.last_name}
                  </div>

                  {/* Email */}
                  <div className="truncate text-black/55 dark:text-white/55">
                    {user.email}
                  </div>

                  {/* Rôle — badge pill */}
                  <div>
                    <span
                      className={[
                        "inline-flex min-w-[120px] justify-center rounded-full px-4 py-2 text-[11px] font-extrabold tracking-wider ring-1",
                        user.role === "superadmin"
                          ? "bg-[#F6339A]/15 text-[#F6339A] ring-[#F6339A]/25"
                          : user.role === "admin"
                            ? "bg-[#2F6BFF]/15 text-[#2F6BFF] ring-[#2F6BFF]/25"
                            : "bg-[#FFD24A]/15 text-[#FFD24A] ring-[#FFD24A]/25",
                      ].join(" ")}
                    >
                      {ROLE_LABELS[user.role] || user.role}
                    </span>
                  </div>

                  {/* Changer le rôle */}
                  {currentUser?.role === "superadmin" && (
                    <div>
                      {user.role !== "superadmin" ? (
                        <div className="w-full rounded-full border border-black/10 bg-black/0 px-3 py-2 dark:border-white/10 dark:bg-white/5">
                          <select
                            value=""
                            disabled={busyId === user.id}
                            onChange={(event) => onChangeRole(user.id, event.target.value)}
                            className="w-full bg-transparent text-sm text-black/70 outline-none dark:text-white/80"
                          >
                            <option value="" disabled className="bg-white text-black dark:bg-black dark:text-white">
                              Modifier rôle
                            </option>
                            {ROLE_OPTIONS.filter(
                              (role) => role !== "Filtrer par rôle" && role !== "superadmin",
                            ).map((role) => (
                              <option key={role} value={role} className="bg-white text-black dark:bg-black dark:text-white">
                                {ROLE_LABELS[role] || role}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}

                  {/* Bouton supprimer */}
                  {currentUser?.role === "superadmin" && (
                    <div className="text-right">
                      {user.role !== "superadmin" && (
                        <button
                          disabled={busyId === user.id}
                          onClick={() => onDeleteUser(user.id)}
                          className="rounded-full border border-[#FF3D6E]/25 bg-[#FF3D6E]/15 px-4 py-2 text-xs font-semibold text-[#FF3D6E] hover:bg-[#FF3D6E]/25
                                     disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DashboardUser;
