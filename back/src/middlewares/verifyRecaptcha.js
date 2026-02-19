// middlewares/verifyRecaptcha.js
export default async function verifyRecaptcha(req, res, next) {
  try {
    const token = req.body?.recaptcha_token;
    if (!token) {
      return res.status(400).json({ error: "Captcha manquant" });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return res.status(500).json({ error: "RECAPTCHA_SECRET_KEY manquant" });
    }

    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);
    // optionnel : IP
    if (req.ip) params.append("remoteip", req.ip);

    const r = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await r.json();

    if (!data.success) {
      return res.status(400).json({ error: "Captcha invalide" });
    }

    // (optionnel) on garde le résultat pour debug/log si tu veux
    req.recaptcha = data;

    return next();
  } catch (e) {
    console.error("reCAPTCHA error:", e);
    return res.status(500).json({ error: "Erreur captcha" });
  }
}
