import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "node:fs";

const sa = JSON.parse(readFileSync(new URL("../firebase-service-account.json", import.meta.url)));
const app = initializeApp({ credential: cert(sa) });
const email = "qa.prueba@cinedesantiago.test";

const u = await getAuth(app).getUserByEmail(email);
console.log("AUTH USER:", JSON.stringify({ uid: u.uid, email: u.email, displayName: u.displayName, provider: u.providerData.map(p=>p.providerId) }));

const snap = await getFirestore(app).collection("users").doc(u.uid).get();
console.log("FIRESTORE users/" + u.uid + " exists:", snap.exists);
console.log("FIRESTORE DATA:", JSON.stringify(snap.data()));
