// Server-only Firebase Admin SDK. Never import this from client components.
import { initializeApp, getApps, getApp, cert, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "node:fs";
import path from "node:path";

function loadServiceAccount() {
  // 1) Base64-encoded JSON (recommended for Vercel / serverless).
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
  if (b64) return JSON.parse(Buffer.from(b64, "base64").toString("utf8"));

  // 2) Raw JSON string.
  const inline = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (inline) return JSON.parse(inline);

  // 3) Local file (gitignored) — default for local development.
  const rel =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "./firebase-service-account.json";
  return JSON.parse(readFileSync(path.resolve(process.cwd(), rel), "utf8"));
}

const app: App = getApps().length
  ? getApp()
  : initializeApp({ credential: cert(loadServiceAccount()) });

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
