import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";

/**
 * Fetch all articles from Firestore.
 * @returns {Promise<Array>} List of article objects with id.
 */
export async function getAllArticles() {
  const articlesCollection = collection(db, "articles");
  const articlesSnapshot = await getDocs(articlesCollection);
  return articlesSnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

/**
 * Fetch a limited number of recent articles (for homepage preview).
 * @param {number} count - Number of articles to fetch.
 * @returns {Promise<Array>} List of article objects with id.
 */
export async function getRecentArticles(count = 3) {
  const articlesQuery = query(
    collection(db, "articles"),
    orderBy("createdAt", "desc"),
    limit(count)
  );
  const articlesSnapshot = await getDocs(articlesQuery);
  return articlesSnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

/**
 * Fetch a single article by ID.
 * @param {string} articleId - The Firestore document ID.
 * @returns {Promise<Object|null>} Article data or null if not found.
 */
export async function getArticleById(articleId) {
  const docRef = doc(db, "articles", articleId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}
