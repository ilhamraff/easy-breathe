import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../config/firebase";

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

/**
 * Upload a thumbnail image to Firebase Storage.
 * @param {File} imageFile - The image file to upload.
 * @returns {Promise<string>} The download URL of the uploaded image.
 */
async function uploadThumbnail(imageFile) {
  const timestamp = Date.now();
  const fileName = `${timestamp}_${imageFile.name}`;
  const storageRef = ref(storage, `thumbnails/${fileName}`);
  await uploadBytes(storageRef, imageFile);
  return getDownloadURL(storageRef);
}

/**
 * Delete a thumbnail image from Firebase Storage by its download URL.
 * @param {string} thumbnailUrl - The download URL of the image to delete.
 */
async function deleteThumbnailByUrl(thumbnailUrl) {
  if (!thumbnailUrl) return;
  try {
    // Extract the storage path from the download URL
    const url = new URL(thumbnailUrl);
    const pathMatch = url.pathname.match(/\/o\/(.+?)(\?|$)/);
    if (pathMatch) {
      const storagePath = decodeURIComponent(pathMatch[1]);
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);
    }
  } catch (error) {
    // Log but don't throw — the Firestore doc is still the priority
    console.warn("Failed to delete old thumbnail from Storage:", error);
  }
}

/**
 * Create a new article in Firestore.
 * @param {Object} data - Article data { title, author, content, createdAt }.
 * @param {File|null} imageFile - Optional thumbnail image file.
 * @returns {Promise<string>} The ID of the newly created article.
 */
export async function createArticle(data, imageFile) {
  let thumbnailUrl = "";
  if (imageFile) {
    thumbnailUrl = await uploadThumbnail(imageFile);
  }

  const articleData = {
    title: data.title,
    author: data.author,
    content: data.content,
    thumbnail: thumbnailUrl,
    createdAt: data.createdAt || new Date().toISOString().split("T")[0],
  };

  const docRef = await addDoc(collection(db, "articles"), articleData);
  return docRef.id;
}

/**
 * Update an existing article in Firestore.
 * @param {string} articleId - The Firestore document ID.
 * @param {Object} data - Updated article data.
 * @param {File|null} imageFile - New thumbnail image file (null to keep existing).
 */
export async function updateArticle(articleId, data, imageFile) {
  const updateData = {
    title: data.title,
    author: data.author,
    content: data.content,
    createdAt: data.createdAt,
  };

  if (imageFile) {
    // Delete the old thumbnail if it exists
    if (data.oldThumbnail) {
      await deleteThumbnailByUrl(data.oldThumbnail);
    }
    updateData.thumbnail = await uploadThumbnail(imageFile);
  }

  const docRef = doc(db, "articles", articleId);
  await updateDoc(docRef, updateData);
}

/**
 * Delete an article from Firestore and its thumbnail from Storage.
 * @param {string} articleId - The Firestore document ID.
 */
export async function deleteArticle(articleId) {
  // Fetch the article first to get the thumbnail URL
  const article = await getArticleById(articleId);
  if (article && article.thumbnail) {
    await deleteThumbnailByUrl(article.thumbnail);
  }

  const docRef = doc(db, "articles", articleId);
  await deleteDoc(docRef);
}

