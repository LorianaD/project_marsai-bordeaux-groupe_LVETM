const S3 = import.meta.env.VITE_S3_PUBLIC_BASE;

export function toMediaUrl(keyOrFilename, type, apiBase = "") {
  if (!keyOrFilename) return "";

  // Si ça contient "/" => clé S3 (grp4/covers/...)
  if (String(keyOrFilename).includes("/")) {
    if (!S3) return ""; // évite une URL "undefined/..."
    return `${S3}/${keyOrFilename}`;
  }

  // Fallback ancien système local
  // apiBase est utile si tu servais /uploads via ton backend
  return apiBase
    ? `${apiBase}/uploads/${type}/${keyOrFilename}`
    : `/uploads/${type}/${keyOrFilename}`;
}
