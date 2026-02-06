// back/scripts/get-youtube-token.js
import "dotenv/config";
import http from "http";
import { getAuthUrl, getTokensFromCode } from "../src/config/youtube.js";

const PORT = 3001;
const REDIRECT_PATH = "/callback";

const server = http.createServer(async (req, res) => {
  if (req.url?.startsWith(`${REDIRECT_PATH}?`)) {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const code = url.searchParams.get("code");

    if (!code) {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Code manquant");
      server.close();
      return;
    }

    try {
      const tokens = await getTokensFromCode(code);

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`
        <h1>Succès !</h1>
        <p>Ajoute ceci dans ton <b>.env</b> :</p>
        <pre style="background:#f5f5f5;padding:1rem;overflow:auto;">YOUTUBE_REFRESH_TOKEN=${tokens.refresh_token}</pre>
      `);

      console.log("YOUTUBE_REFRESH_TOKEN=" + tokens.refresh_token);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Erreur: " + err.message);
    } finally {
      server.close();
    }
  }
});

server.listen(PORT, () => {
  console.log("\nOuvre ce lien dans ton navigateur :\n");
  console.log(getAuthUrl());
  console.log("\n");
});
