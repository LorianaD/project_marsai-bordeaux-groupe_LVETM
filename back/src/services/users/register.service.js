import bcrypt from "bcrypt";
import { pool } from "../../db/index.js";

export async function register(data, role) {
  // Récupération des données
  const { email, password, firstname, lastname } = data;

  // validation des champs
  if (!email || !password || !firstname || !lastname) {
    const error = new Error(
      "email, password, firstname and lastname are required.",
    );
    error.status = 400;
    console.log(data);
    throw error;
  }
git 
  console.log("tout est passé", email, password, firstname, lastname);

  // Hash du mot de passe
  const passwordHash = await bcrypt.hash(password, 10);

  // Préparation et exécution de la requête SQL
  const query = `INSERT INTO users (email, password_hash, role, name, last_name) VALUES (?, ?, ?, ?, ?)`;

  const [result] = await pool.execute(query, [
    email,
    passwordHash,
    role,
    firstname,
    lastname,
  ]);
  

  // Retour de l’utilisateur créé
  return {
    id: result.insertId,
    email,
    firstname,
    lastname,
    role: role,
    created_at: new Date(),
  };
}
