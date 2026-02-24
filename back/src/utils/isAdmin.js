import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/*================================================
  VERIFY TOKEN
================================================*/
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // DEBUG
  console.log("🔎 Authorization header =", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ Token manquant ou mauvais format");
    return res.status(401).json({ error: "Token manquant" });
  }

  const token = authHeader.split(" ")[1];

  console.log("🔎 Token reçu longueur =", token?.length);

  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    /* ================================
       NORMALISATION ROLE
    ================================= */
    const rawRole =
      decoded?.role || decoded?.user?.role || decoded?.data?.role || "";

    const role = String(rawRole)
      .replace(/[\r\n]+/g, "")
      .trim()
      .toLowerCase();

    /* ================================
       ✅ FIX CRITIQUE : NORMALISATION USER ID
       TON TOKEN UTILISE "sub"
    ================================= */
    const id =
      decoded?.id ||
      decoded?.sub || // ⭐ TON CAS PRINCIPAL
      decoded?.user?.id ||
      decoded?.data?.id ||
      null;

    req.user = {
      ...decoded,
      id,
      role,
    };

    console.log("✅ USER NORMALIZED =", {
      id,
      role,
    });

    next();
  } catch (err) {
    console.log("❌ JWT VERIFY ERROR =", err.message);
    return res.status(401).json({ error: "Token invalide" });
  }
}

/*================================================
  ADMIN
================================================*/
function isAdmin(req, res, next) {
  const role = String(req.user?.role || "")
    .trim()
    .toLowerCase();

  console.log("🔎 isAdmin role =", role);

  if (role !== "admin" && role !== "superadmin") {
    console.log("❌ isAdmin forbidden");
    return res.status(403).json({ error: "Accès non autorisé" });
  }

  next();
}

/*================================================
  SUPER ADMIN
================================================*/
function isSuperAdmin(req, res, next) {
  const role = String(req.user?.role || "")
    .trim()
    .toLowerCase();

  console.log("🔎 isSuperAdmin role =", role);

  if (role !== "superadmin") {
    console.log("❌ isSuperAdmin forbidden");
    return res.status(403).json({ error: "Accès non autorisé" });
  }

  next();
}

/*================================================
  SELECTOR / SELECTIONNEUR
================================================*/
function isSelector(req, res, next) {
  const role = String(req.user?.role || "")
    .trim()
    .toLowerCase();

  console.log("🔎 isSelector role =", role);

  if (role !== "selector" && role !== "selectionneur") {
    console.log("❌ isSelector forbidden");
    return res.status(403).json({
      error: "Accès réservé aux sélectionneurs",
    });
  }

  console.log("✅ isSelector OK");
  next();
}

export { verifyToken, isAdmin, isSuperAdmin, isSelector };
