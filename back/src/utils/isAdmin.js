import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/*================================================
  Vérifie que le token JWT est présent et valide
================================================*/
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    /*======================================================================
       Vérifie le token et ajoute les infos de l'utilisateur à la requête
    ======================================================================*/
    req.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalide" });
  }
}

/*===================================================
  Vérifie si l'utilisateur est admin ou superadmin
===================================================*/
function isAdmin(req, res, next) {
  if (req.user.role !== "admin" && req.user.role !== "superadmin") {
    return res.status(403).json({ error: "Accès non autorisé" });
  }
  next();
}

function isSuperAdmin(req, res, next) {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ error: "Accès non autorisé" });
  }
  next();
}

export { verifyToken, isAdmin, isSuperAdmin };
