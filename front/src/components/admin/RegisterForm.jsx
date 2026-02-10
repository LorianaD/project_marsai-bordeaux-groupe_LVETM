import { useState } from "react";
import { registerUser } from "../../services/Auth/RegisterApi.js";

function RegisterForm() {
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
  // const [role, setRole] = useState("Admin");

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
      await registerUser(
        {
          email: email.trim(),
          firstname: firstName.trim(),
          lastname: lastName.trim(),
          password,
        },
        "admin",
      );

      setSuccess("User created successfully !");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-transparent border border-[#2a2a3a] rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-6"
    >
      {/* ===== TITRE ===== */}
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-t from-[#7c2cfb] to-[#2e7afe]">
          Create an Account
        </h2>
        <p className="text-xs text-gray-500 uppercase tracking-wider">
          New Profile
        </p>
      </div>

      {/* ===== FIRSTNAME + LASTNAME (côte à côte) ===== */}
      <div className="w-full flex gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wider text-gray-400">
            Firstname *
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            className="w-full bg-[#08080e] border border-[#2a2a3a] rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wider text-gray-400">
            Lastname *
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            className="w-full bg-[#08080e] border border-[#2a2a3a] rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* ===== EMAIL ===== */}
      <div className="w-full flex flex-col gap-1">
        <label className="text-xs uppercase tracking-wider text-gray-400">
          E-mail address *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mon@exemple.com"
          className="w-full bg-[#08080e] border border-[#2a2a3a] rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* ===== PASSWORD + CONFIRM (côte à côte) ===== */}
      <div className="w-full flex gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wider text-gray-400">
            Password *
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            className="w-full bg-[#08080e] border border-[#2a2a3a] rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wider text-gray-400">
            Confirm *
          </label>
          <input
            type="password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            placeholder="••••••"
            className="w-full bg-[#08080e] border border-[#2a2a3a] rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* ===== MESSAGES ===== */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && <p className="text-green-500 text-sm text-center">{success}</p>}

      {/* ===== BOUTON ===== */}
      <button
        type="submit"
        className="w-full bg-[#0d0d14] border border-[#2a2a3a] rounded-full py-3 text-white uppercase tracking-wider text-sm hover:border-purple-500 transition-colors cursor-pointer"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
