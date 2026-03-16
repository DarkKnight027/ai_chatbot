import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initFirebaseAdmin(): { auth: Auth; db: Firestore } {
  const apps = getApps();

  if (!apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    // Check if all required credentials are available
    if (projectId && clientEmail && privateKey) {
      try {
        initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        });
      } catch (error) {
        console.warn("Firebase Admin initialization failed:", error);
        // Continue with uninitialized services for development
      }
    } else {
      console.warn(
        "Firebase Admin credentials not fully configured. Using mock mode for development."
      );
    }
  }

  try {
    return {
      auth: getAuth(),
      db: getFirestore(),
    };
  } catch (error) {
    console.warn("Firebase services unavailable in current environment");
    // Return mock objects to prevent crashes during development
    return {
      auth: null as any,
      db: null as any,
    };
  }
}

export const { auth, db } = initFirebaseAdmin();
