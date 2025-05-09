import * as admin from 'firebase-admin';
import path from "path";

const serviceAccountPath = path.resolve(__dirname, "../../config/serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath as any),
  });
}

const db = admin.firestore();

export { admin, db };