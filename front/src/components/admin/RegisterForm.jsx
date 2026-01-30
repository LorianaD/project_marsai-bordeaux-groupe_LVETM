import { useState } from "react";

function RegisterForm() {

  /* ======================================================================
  state pour stocker et changer les valeur grace au champ vide usestate("")
  ====================================================================== */
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  console.log(lastName);
  
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState(""); 
  const [error, setError] = useState("");

   // voir avec Atif si je creer aussi une const pour comparer les mp avec des operateurs ?!!!!!!!!!

  const handleSubmit = (e) => {

    /* ==================================
     empeche le rechargement de la page
    ================================== */
    e.preventDefault();

    /* ================================================================================== 
    Vérifie si les datas sont bien saisie dans les input sinon renvoi un message d'erreur 
    =================================================================================== */
    if (!email.trim() || !firstName.trim() || !lastName.trim() || !password.trim() || !verifyPassword.trim()) 
      {
        console.log("ici il manque une donnée au moins si ce message s'affiche")
        setError("Veuillez remplir tous les champs");
        return;
      }

    console.log(" si ce message s'affiche alors c'est que tous les champs sont remplis ");
    

    // setError("");

    // console.log("Envoi des données:", {
    //   email,
    //   firstName,
    //   lastName,
    //   password,
    //   verifyPassword,
    // });

    // setEmail("");
    // setFirstName("");
    // setLastName("");
    // setPassword("");
    // setVerifyPassword("");
  };

  return (
    /* ========================
    formulaire d'energistrement 
    =========================*/
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
          type="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label>Confirm your password*:</label>
        <input
          type="current-password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
