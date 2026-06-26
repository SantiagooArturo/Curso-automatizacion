import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

// Persists the authenticated user's profile to Firestore (users/{uid}).
// Called after sign-up; uses the Admin SDK so it bypasses client security rules.
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: "Falta el token de autenticación." }, { status: 401 });
  }

  let decoded;
  try {
    decoded = await adminAuth.verifyIdToken(token);
  } catch {
    return NextResponse.json({ error: "Token inválido." }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const name = typeof body?.name === "string" ? body.name.trim() : null;

  const ref = adminDb.collection("users").doc(decoded.uid);
  const snap = await ref.get();

  await ref.set(
    {
      uid: decoded.uid,
      email: decoded.email ?? null,
      name: name || decoded.name || null,
      provider: decoded.firebase?.sign_in_provider ?? "password",
      updatedAt: FieldValue.serverTimestamp(),
      ...(snap.exists ? {} : { createdAt: FieldValue.serverTimestamp() }),
    },
    { merge: true },
  );

  return NextResponse.json({ ok: true });
}
