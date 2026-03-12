import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

/* =========================================================
  genere un token d'invitation par mail qui expire dans 24h
==========================================================*/
export function generateInviteToken(email, role) {
  return jwt.sign(
    {
      email: String(email).trim().toLowerCase(),
      role: String(role).trim().toLowerCase(),
      type: "invite",
    },
    env.jwtSecret,
    { expiresIn: "24h" },
  );
}

/* ========================================
verifie et decode le token d'invitation
=========================================*/
export function verifyInviteToken(token) {
  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    if (decoded.type !== "invite") return null;
    return [decoded.email, decoded.role];
  } catch (error) {
    return null;
  }
}
