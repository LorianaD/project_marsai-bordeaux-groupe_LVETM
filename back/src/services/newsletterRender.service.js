function esc(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderNewsletterHtml({
  subject,
  blocks = [],
  background = "#ffffff",
  unsubscribeUrl = "",
}) {
  const body = blocks
    .map((b) => {
      if (b.type === "h1")
        return `<h1 style="margin:0 0 16px;font-size:28px">${esc(b.text)}</h1>`;
      if (b.type === "h2")
        return `<h2 style="margin:0 0 12px;font-size:20px">${esc(b.text)}</h2>`;
      if (b.type === "p")
        return `<p style="margin:0 0 12px;font-size:14px;line-height:1.6">${esc(b.text)}</p>`;
      if (b.type === "image" && b.url)
        return `<img alt="${esc(b.alt || "")}" src="${esc(b.url)}" style="width:100%;border-radius:12px;margin:12px 0" />`;
      if (b.type === "divider")
        return `<hr style="border:none;border-top:1px solid rgba(0,0,0,.12);margin:16px 0" />`;
      return "";
    })
    .join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${esc(subject || "Newsletter")}</title>
</head>
<body style="margin:0;background:${esc(background)};font-family:Arial,sans-serif;">
  <div style="max-width:650px;margin:0 auto;padding:28px;">
    <div style="background:#fff;border-radius:18px;padding:22px;">
      ${body}
      <hr style="border:none;border-top:1px solid rgba(0,0,0,.12);margin:22px 0" />
      <p style="font-size:12px;opacity:.75;margin:0">
        Se désinscrire :
        <a href="${esc(unsubscribeUrl)}">clique ici</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}
