// One-off: enable Email/Password auth and ensure a Firestore (default) database.
import { cert } from "firebase-admin/app";
import { readFileSync } from "node:fs";

const sa = JSON.parse(
  readFileSync(new URL("../firebase-service-account.json", import.meta.url)),
);
const projectId = sa.project_id;
const credential = cert(sa);
const { access_token } = await credential.getAccessToken();

async function call(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }
  return { status: res.status, json };
}

// 1. Enable Email/Password sign-in.
const authCfg = await call(
  `https://identitytoolkit.googleapis.com/admin/v2/projects/${projectId}/config?updateMask=signIn.email.enabled,signIn.email.passwordRequired`,
  {
    method: "PATCH",
    body: JSON.stringify({ signIn: { email: { enabled: true, passwordRequired: true } } }),
  },
);
console.error("[enable email/password]", authCfg.status, JSON.stringify(authCfg.json).slice(0, 300));

// 2. Ensure a Firestore (default) database exists.
const list = await call(`https://firestore.googleapis.com/v1/projects/${projectId}/databases`);
console.error("[list firestore]", list.status, JSON.stringify(list.json).slice(0, 400));
const hasDefault = (list.json?.databases || []).some(
  (d) => d.name?.endsWith("/databases/(default)"),
);

if (!hasDefault) {
  const create = await call(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases?databaseId=(default)`,
    { method: "POST", body: JSON.stringify({ type: "FIRESTORE_NATIVE", locationId: "nam5" }) },
  );
  console.error("[create firestore]", create.status, JSON.stringify(create.json).slice(0, 400));
  let op = create.json;
  for (let i = 0; i < 30 && op?.name && !op.done; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const o = await call(`https://firestore.googleapis.com/v1/${op.name}`);
    op = o.json;
  }
  console.error("[firestore ready]", JSON.stringify(op).slice(0, 300));
} else {
  console.error("[firestore] (default) database already exists");
}

console.error("DONE");
