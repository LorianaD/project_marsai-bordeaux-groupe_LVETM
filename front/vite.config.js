import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    proxy: {
      "/api": "http://localhost:3000",
      "/uploads": "http://localhost:3000"
    }
  }
});