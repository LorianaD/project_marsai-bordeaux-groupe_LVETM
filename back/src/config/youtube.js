// back/src/config/youtube.js
import { google } from "googleapis";

export const SCOPES = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtube.force-ssl",
];

export function getOAuth2Client() {
  const clientId = process.env.YOUTUBE_CLIENT_ID?.trim();
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET?.trim();
  const redirectUri =
    process.env.YOUTUBE_REDIRECT_URI?.trim() || "http://localhost:3001/callback";

  if (!clientId || !clientSecret) {
    throw new Error("YOUTUBE_CLIENT_ID et YOUTUBE_CLIENT_SECRET requis dans .env");
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN?.trim();
  if (refreshToken) {
    oauth2Client.setCredentials({ refresh_token: refreshToken });
  }

  return oauth2Client;
}

export function getAuthUrl() {
  const oauth2Client = getOAuth2Client();
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });
}

export async function getTokensFromCode(code) {
  const oauth2Client = getOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}
