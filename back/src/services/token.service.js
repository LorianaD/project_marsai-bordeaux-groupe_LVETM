import crypto from "crypto";

export function makeToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex"); // 64 chars si bytes=32
}
