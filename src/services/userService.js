import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

/**
 * Get a user's role from Firestore.
 * @param {string} uid - Firebase Auth UID.
 * @returns {Promise<string|null>} The user's role or null.
 */
export async function getUserRole(uid) {
  const docRef = doc(db, "Users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().role || "user";
  }
  return null;
}

/**
 * Fetch all users from Firestore (for admin management).
 * @returns {Promise<Array>} List of user objects with uid.
 */
export async function getAllUsers() {
  const usersCollection = collection(db, "Users");
  const usersSnapshot = await getDocs(usersCollection);
  return usersSnapshot.docs.map((docSnap) => ({
    uid: docSnap.id,
    ...docSnap.data(),
  }));
}

/**
 * Update a user's role. Only callable by an admin.
 * @param {string} uid - The target user's UID.
 * @param {string} newRole - The new role ("user" or "admin").
 */
export async function updateUserRole(uid, newRole) {
  const docRef = doc(db, "Users", uid);
  await updateDoc(docRef, { role: newRole });
}
