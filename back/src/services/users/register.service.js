import bcrypt from "bcrypt";
import { pool } from "../../db/index.js";

export async function register(data) {
  const { email, password, firstname, lastname } = data;

  // validation basique (si les champs sont présent)
  if (!email || !password || !firstname || !lastname) {
    const error = new Error(
      "email, password, firstname and lastname are required.",
    );
    error.status = 400;
    console.log(data);
    throw error;
  }

  // console.log("tout est passé", email, password, firstname, lastname);

  const passwordHash = await bcrypt.hash(password, 10);

  // enregister l'utilisateur dans la db
  const query = `INSERT INTO users (email, password_hash, role, name, last_name) VALUES (?, ?, ?, ?, ?)`;

  const [result] = await pool.execute(query, [
    email,
    passwordHash,
    "admin",
    firstname,
    lastname,
  ]);

  return {
    id: result.insertId,
    email,
    firstname,
    lastname,
    role: "admin",
    created_at: new Date(),
  };
}
