import { useState } from "react";
import { registerUser } from "../../services/Auth/RegisterApi.js";
import AdminSelect from "./AdminSelect.jsx";

function RegisterForm({
  role = "admin",
  selectableRole = false,
  onSuccess,
  onCancel,
  variant = "register",
}) {
  const isDashboard = variant === "dashboard";
  const formClass = isDashboard
    ? "flex flex-col gap-3 w-full"
    : "bg-transparent border border-[#2a2a3a] rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-6";

  const inputClass = isDashboard
    ? "w-full rounded-full border border-black/10 bg-black/5 px-3 py-2 text-sm text-black placeholder:text-black/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
    : "w-full bg-[#08080e] border border-[#2a2a3a] rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500";

  const selectClass = isDashboard
    ? "min-w-[140px] rounded-full border border-black/10 bg-black/0 px-3 py-2 text-sm text-black/70 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white/80"
    : inputClass;

  const labelClass = isDashboard
    ? "mb-1 block text-xs font-medium text-black/70 dark:text-white/70"
    : "text-xs uppercase tracking-wider text-gray-400";

  const btnCancelClass = isDashboard
    ? "rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs font-semibold text-black/70 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
    : "flex-1 rounded-full border border-[#2a2a3a] py-3 text-sm uppercase tracking-wider hover:border-purple-500 transition-colors cursor-pointer";

  const btnSubmitClass = isDashboard
    ? "rounded-full bg-[#2F6BFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2F6BFF]/90"
    : "flex-1 w-full bg-[#0d0d14] border border-[#2a2a3a] rounded-full py-3 text-white uppercase tracking-wider text-sm hover:border-purple-500 transition-colors cursor-pointer";
  /* ======================================================================
  state pour stocker et changer les valeur grace au champ vide usestate("")
  ====================================================================== */
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState(role);

  /* =================================================
  fonction pour verifier le formulaire a sa soumission
  ==================================================*/
  const handleSubmit = async (e) => {
    /* =================================
    empeche le rechargement de la page
    ================================== */
    e.preventDefault();

    /*=============================
  reset du state error et success
  =============================*/
    setError("");
    setSuccess("");

    /* ================================================================================== 
    Vérifie si les datas sont bien saisie dans les input sinon renvoi un message d'erreur 
    =================================================================================== */
    if (
      !email.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !password.trim() ||
      !verifyPassword.trim()
    ) {
      setError("Please fill in all fields");
      return;
    }

    /*===============================================================================
    conditions pour lastname et firstname minimum 3 et max 30 caractères
    ===============================================================================*/

    if (lastName.length < 1) {
      setError("Lastname must be at least 1 character");
      return;
    } else if (lastName.length > 100) {
      setError("Lastname must be no more than 100 characters");
      return;
    }

    if (firstName.length < 1) {
      setError("Firstname must be at least 1 character");
      return;
    } else if (firstName.length > 100) {
      setError("Firstname must be no more than 100 characters");
      return;
    }

    /*==================================
      Validation de la regex pour le mdp
    ==================================*/
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,128}$/.test(
        password,
      )
    ) {
      setError(
        "Password must be at least 12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!?#$^&*@)",
      );
      return;
    }

    if (password != verifyPassword) {
      setError("Password and confirmation password do not match.");
      return;
    }

    try {
      const roleToUse = selectableRole ? selectedRole : role;
      await registerUser(
        {
          email: email.trim(),
          firstname: firstName.trim(),
          lastname: lastName.trim(),
          password,
        },
        roleToUse,
      );

      setSuccess(
        onSuccess
          ? "Utilisateur créé avec succès !"
          : "User created successfully !",
      );
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={formClass}>
      <div className={isDashboard ? "" : "flex flex-col items-center gap-2"}>
        {isDashboard ? (
          <h3 className="text-sm font-semibold text-black/90 dark:text-white/90">
            Nouvel utilisateur
          </h3>
        ) : (
          <>
            <h2 className="text-2xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-t from-[#7c2cfb] to-[#2e7afe]">
              Create an Account
            </h2>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              New Profile
            </p>
          </>
        )}
      </div>

      <div className={isDashboard ? "grid sm:grid-cols-2 gap-4" : "w-full flex gap-4"}>
        <div className={isDashboard ? "" : "flex-1 flex flex-col gap-1"}>
          <label className={labelClass}>{isDashboard ? "Prénom *" : "Firstname *"}</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            className={inputClass}
          />
        </div>
        <div className={isDashboard ? "" : "flex-1 flex flex-col gap-1"}>
          <label className={labelClass}>{isDashboard ? "Nom *" : "Lastname *"}</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            className={inputClass}
          />
        </div>
      </div>

      <div className={isDashboard ? "" : "w-full flex flex-col gap-1"}>
        <label className={labelClass}>{isDashboard ? "E-mail *" : "E-mail address *"}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mon@exemple.com"
          className={inputClass}
        />
      </div>

      {selectableRole && (
        <div className={isDashboard ? "" : "w-full flex flex-col gap-1"}>
          <label className={labelClass}>{isDashboard ? "Rôle *" : "Role *"}</label>
          {isDashboard ? (
            <AdminSelect
              value={selectedRole}
              onChange={setSelectedRole}
              options={[
                { value: "admin", label: "Administrateur" },
                { value: "selector", label: "Sélectionneur" },
              ]}
            />
          ) : (
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className={selectClass}
            >
              <option value="admin" className="bg-white text-black dark:bg-black dark:text-white">
                Administrateur
              </option>
              <option value="selector" className="bg-white text-black dark:bg-black dark:text-white">
                Sélectionneur
              </option>
            </select>
          )}
        </div>
      )}

      <div className={isDashboard ? "grid sm:grid-cols-2 gap-4" : "w-full flex gap-4"}>
        <div className={isDashboard ? "" : "flex-1 flex flex-col gap-1"}>
          <label className={labelClass}>{isDashboard ? "Mot de passe *" : "Mot de passe *"}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            className={inputClass}
          />
        </div>
        <div className={isDashboard ? "" : "flex-1 flex flex-col gap-1"}>
          <label className={labelClass}>{isDashboard ? "Confirmation *" : "Confirm *"}</label>
          <input
            type="password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            placeholder="••••••"
            className={inputClass}
          />
        </div>
      </div>

      {error && (
        <p className={isDashboard ? "text-sm text-[#FF3D6E]" : "text-red-500 text-sm text-center"}>
          {error}
        </p>
      )}
      {success && (
        <p className={isDashboard ? "text-sm text-[#1AFF7A]" : "text-green-500 text-sm text-center"}>
          {success}
        </p>
      )}

      <div className="w-full flex gap-3">
        {onCancel && (
          <button type="button" onClick={onCancel} className={btnCancelClass}>
            Annuler
          </button>
        )}
        <button type="submit" className={btnSubmitClass}>
          {onCancel ? "Créer" : "Register"}
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
