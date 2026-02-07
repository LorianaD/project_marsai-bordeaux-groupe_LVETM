import { useState } from "react";

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

    console.log("Sending data:", {
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      password,
      role,
    });
  };

  return (
    /* ====================================
    formulaire d'energistrement utilisateur
    =====================================*/
    <form onSubmit={handleSubmit}>
      <div>
        <label>E-mail address* :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Firstname*:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <label>Lastname*:</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <div>
        <label>New-password*:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label>Confirm your password*:</label>
        <input
          type="password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
      </div>

      {/* <div>
        <label>Role*</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Admin"></option>
          <option value="Super_admin"></option>
          <option value="Selector"></option>
        </select>
      </div> */}

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
