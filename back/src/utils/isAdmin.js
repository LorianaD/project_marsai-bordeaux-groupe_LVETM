import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/* ============
   verifyToken
============ */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    const role = String(decoded.role || "").trim().toLowerCase();

    req.user = {
      id: decoded.sub || decoded.id,
      role: role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalide" });
  }
}

/* ========
   isAdmin
======== */
function isAdmin(req, res, next) {
  const role = String(req.user?.role || "").trim().toLowerCase();

  if (role !== "admin" && role !== "superadmin") {
    return res.status(403).json({ error: "Accès non autorisé" });
  }

  next();
}

/* =============
   isSuperAdmin
============= */
function isSuperAdmin(req, res, next) {
  const role = String(req.user?.role || "").trim().toLowerCase();

  if (role !== "superadmin") {
    return res.status(403).json({ error: "Accès non autorisé" });
  }

  next();
}

/* ==========
   isSelector
========== */
function isSelector(req, res, next) {
  const role = String(req.user?.role || "").trim().toLowerCase();

  if (role !== "selector") {
    return res.status(403).json({ error: "Accès réservé aux sélectionneurs" });
  }

  next();
}

/* ==================
   isAdminOrSelector
================== */
function isAdminOrSelector(req, res, next) {
  const role = String(req.user?.role || "").trim().toLowerCase();
  const allowed = ["admin", "superadmin", "selector"];

  if (!allowed.includes(role)) {
    return res.status(403).json({ error: "Accès non autorisé" });
  }

  next();
}

export { verifyToken, isAdmin, isSuperAdmin, isSelector, isAdminOrSelector };
