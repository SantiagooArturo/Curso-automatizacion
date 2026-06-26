// One-off helper: uses the service account to fetch (or create) the Firebase
// Web App config via the Firebase Management API. Prints the config JSON to stdout.
import { cert } from "firebase-admin/app";
import { readFileSync } from "node:fs";

const sa = JSON.parse(
  readFileSync(new URL("../firebase-service-account.json", import.meta.url)),
);
const projectId = sa.project_id;
const credential = cert(sa);
const { access_token } = await credential.getAccessToken();

async function api(path, opts = {}) {
  const res = await fetch(`https://firebase.googleapis.com/v1beta1/${path}`, {
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

// 1. Find an existing web app, or create one.
let { status, json } = await api(`projects/${projectId}/webApps`);
console.error("[list webApps]", status, JSON.stringify(json).slice(0, 400));
let apps = (json && json.apps) || [];
let appId = apps[0]?.appId;

if (!appId) {
  const create = await api(`projects/${projectId}/webApps`, {
    method: "POST",
    body: JSON.stringify({ displayName: "Cine de Santiago Web" }),
  });
  console.error("[create webApp]", create.status, JSON.stringify(create.json).slice(0, 400));
  let op = create.json;
  for (let i = 0; i < 20 && op && op.name && !op.done; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const o = await api(op.name);
    op = o.json;
  }
  appId = op?.response?.appId;
}

if (!appId) {
  console.error("NO_APP_ID — could not list or create a web app (check SA permissions).");
  process.exit(2);
}

// 2. Fetch the web config for that app.
const cfg = await api(`projects/${projectId}/webApps/${appId}/config`);
console.error("[config]", cfg.status);
console.log(JSON.stringify(cfg.json));
