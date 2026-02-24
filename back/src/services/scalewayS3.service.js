import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";

/* =========================
   CLIENT S3
========================= */

function createClient() {
  const endpoint = process.env.SCALEWAY_ENDPOINT;
  const region = process.env.SCALEWAY_REGION || "fr-par";

  return new S3Client({
    region,
    endpoint,
    credentials: {
      accessKeyId: process.env.SCALEWAY_ACCESS_KEY,
      secretAccessKey: process.env.SCALEWAY_SECRET_KEY,
    },
    forcePathStyle: true,
  });
}

const s3 = createClient();

function getBucket() {
  if (!process.env.SCALEWAY_BUCKET_NAME) {
    throw new Error("SCALEWAY_BUCKET_NAME manquant");
  }
  return process.env.SCALEWAY_BUCKET_NAME;
}

function baseFolder() {
  return (process.env.SCALEWAY_FOLDER || "").replace(/\/+$/, "");
}

/* =========================
   BUILD KEYS (generic + specific)
========================= */

// Générique: grp4/<prefix>/<filename>
export function buildKey(prefix, filename) {
  const safePrefix = String(prefix || "").replace(/^\/+|\/+$/g, "");
  return [baseFolder(), safePrefix, filename].filter(Boolean).join("/");
}

export function buildVideoKey(filename) {
  return buildKey("videos", filename);
}

export function buildCoverKey(filename) {
  return buildKey("covers", filename);
}

export function buildStillKey(filename) {
  return buildKey("stills", filename);
}

export function buildSubtitleKey(filename) {
  return buildKey("subtitles", filename);
}

/* =========================
   UPLOAD (generic)
========================= */

export async function uploadFromDisk({
  localPath,
  key,
  contentType,
  acl = "private",
}) {
  const Bucket = getBucket();

  if (!localPath) throw new Error("uploadFromDisk: localPath manquant");
  if (!key) throw new Error("uploadFromDisk: key manquante");

  await fs.promises.access(localPath);

  await s3.send(
    new PutObjectCommand({
      Bucket,
      Key: key,
      Body: fs.createReadStream(localPath),
      ...(contentType ? { ContentType: contentType } : {}),
      ACL: acl,
    }),
  );

  return { bucket: Bucket, key };
}

/* =========================
   UPLOAD VIDEO / COVER / STILL / SUBTITLE (helpers)
========================= */

export async function uploadVideoFromDisk({ localPath, filename, mimetype }) {
  const Key = buildVideoKey(filename);

  return uploadFromDisk({
    localPath,
    key: Key,
    contentType: mimetype || "video/mp4",
    acl: "private",
  });
}

// Covers: généralement public pour affichage front (modifiable)
export async function uploadCoverFromDisk({ localPath, filename, mimetype }) {
  const Key = buildCoverKey(filename);

  return uploadFromDisk({
    localPath,
    key: Key,
    contentType: mimetype || "image/jpeg",
    acl: "public-read",
  });
}

// Stills: généralement public pour affichage front (modifiable)
export async function uploadStillFromDisk({ localPath, filename, mimetype }) {
  const Key = buildStillKey(filename);

  return uploadFromDisk({
    localPath,
    key: Key,
    contentType: mimetype || "image/jpeg",
    acl: "public-read",
  });
}

// Subtitles: tu peux choisir private ou public. Je mets private par défaut.
export async function uploadSubtitleFromDisk({
  localPath,
  filename,
  mimetype,
}) {
  const Key = buildSubtitleKey(filename);

  return uploadFromDisk({
    localPath,
    key: Key,
    contentType: mimetype || "application/x-subrip",
    acl: "private",
  });
}

/* =========================
   STREAM FROM S3
========================= */

export async function getObjectFromS3({ key, range }) {
  const Bucket = getBucket();

  const response = await s3.send(
    new GetObjectCommand({
      Bucket,
      Key: key,
      ...(range ? { Range: range } : {}),
    }),
  );

  return response;
}
