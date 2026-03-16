import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      `Missing Firebase Admin credentials. Check your .env.local file.\n` +
      `FIREBASE_PROJECT_ID: ${!!projectId}\n` +
      `FIREBASE_CLIENT_EMAIL: ${!!clientEmail}\n` +
      `FIREBASE_PRIVATE_KEY: ${!!privateKey}`
    );
  }

  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export const auth = getAuth();
export const db = getFirestore();