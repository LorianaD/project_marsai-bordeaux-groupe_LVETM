import nodemailer from "nodemailer";

const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
  MAIL_FROM,
} = process.env;

if (!MAIL_HOST || !MAIL_PORT || !MAIL_USER || !MAIL_PASS) {
  console.warn("[mailer] Missing SMTP env vars (MAIL_HOST/PORT/USER/PASS)");
}

export const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_PORT || 2525),
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
  // Mailtrap sandbox: pas besoin de config TLS spéciale ici
});

export async function sendMail({ to, subject, text, html }) {
  const from = MAIL_FROM || "MARS.AI <no-reply@marsai.local>";
  return transporter.sendMail({ from, to, subject, text, html });
}
