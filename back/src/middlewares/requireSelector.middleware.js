export default function requireSelector(req, res, next) {
  // récupère user peu importe ton auth middleware
  const user = req.user || req.auth || req.admin;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // normalisation SAFE
  const role = String(user.role || user.status || user.type || "")
    .trim()
    .toLowerCase();

  //accepte toutes variantes possibles
  const allowedRoles = ["selector", "selectionneur", "sélectionneur"];

  if (!allowedRoles.includes(role)) {
    console.log("❌ ACCESS REFUSED ROLE:", role);
    return res.status(403).json({ error: "Accès réservé aux sélectionneurs" });
  }

  // debug utile
  console.log("Selector access granted:", user.id, role);

  next();
}
