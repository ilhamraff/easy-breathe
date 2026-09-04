import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../config/firebase";

/**
 * Fetch all articles from Firestore (admin use).
 * @returns {Promise<Array>} List of article objects with id.
 */
export async function getAllArticles() {
  const articlesCollection = collection(db, "articles");
  const articlesSnapshot = await getDocs(articlesCollection);
  const list = articlesSnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
  return list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}

/**
 * Fetch public approved articles only.
 * Safe from requiring composite indexes by sorting client-side while strictly
 * querying `where("status", "==", "approved")` for Security Rules compliance.
 * @param {number} [count] - Optional limit count.
 * @returns {Promise<Array>} List of approved article objects.
 */
export async function getPublicArticles(count) {
  const articlesQuery = query(
    collection(db, "articles"),
    where("status", "==", "approved")
  );
  const articlesSnapshot = await getDocs(articlesQuery);
  const list = articlesSnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
  list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  return typeof count === "number" ? list.slice(0, count) : list;
}

/**
 * Fetch recent approved articles for homepage preview.
 * @param {number} count - Number of articles to fetch.
 * @returns {Promise<Array>} List of article objects with id.
 */
export async function getRecentArticles(count = 3) {
  return getPublicArticles(count);
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
 * Fetch articles authored by a specific user.
 * @param {string} uid - Firebase Auth UID of the user.
 * @returns {Promise<Array>} List of articles authored by user.
 */
export async function getMyArticles(uid) {
  if (!uid) return [];
  const q = query(collection(db, "articles"), where("authorId", "==", uid));
  const snapshot = await getDocs(q);
  const list = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
  return list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}

/**
 * Fetch articles pending admin review.
 * @returns {Promise<Array>} List of pending articles.
 */
export async function getPendingArticles() {
  const q = query(
    collection(db, "articles"),
    where("status", "==", "pending")
  );
  const snapshot = await getDocs(q);
  const list = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
  return list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}

/**
 * Upload a thumbnail image to Firebase Storage.
 * @param {File} imageFile - The image file to upload.
 * @returns {Promise<string>} The download URL of the uploaded image.
 */
async function uploadThumbnail(imageFile) {
  const timestamp = Date.now();
  const cleanName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const fileName = `${timestamp}_${cleanName}`;
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
    const url = new URL(thumbnailUrl);
    const pathMatch = url.pathname.match(/\/o\/(.+?)(\?|$)/);
    if (pathMatch) {
      const storagePath = decodeURIComponent(pathMatch[1]);
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);
    }
  } catch (error) {
    console.warn("Failed to delete old thumbnail from Storage:", error);
  }
}

/**
 * Submit an article as a regular user (status will always be 'pending').
 * @param {Object} data - { title, content, author?, createdAt? }
 * @param {File|null} imageFile - Thumbnail file to upload.
 * @param {Object} user - Firebase Auth user object { uid, displayName, email }.
 * @param {Object} [userDetails] - User doc data { firstName, lastName }.
 * @returns {Promise<string>} Document ID.
 */
export async function submitArticleAsUser(data, imageFile, user, userDetails) {
  if (!user?.uid) {
    throw new Error("Pengguna harus masuk untuk mengirimkan artikel.");
  }

  let thumbnailUrl = "";
  if (imageFile) {
    thumbnailUrl = await uploadThumbnail(imageFile);
  }

  let authorName = data.author;
  if (!authorName) {
    if (userDetails?.firstName || userDetails?.lastName) {
      authorName = `${userDetails.firstName || ""} ${userDetails.lastName || ""}`.trim();
    } else {
      authorName = user.displayName || user.email?.split("@")[0] || "Kontributor";
    }
  }

  const articleData = {
    title: data.title.trim(),
    author: authorName,
    authorId: user.uid,
    content: data.content,
    thumbnail: thumbnailUrl,
    createdAt: data.createdAt || new Date().toISOString().split("T")[0],
    status: "pending",
    rejectionReason: "",
  };

  const docRef = await addDoc(collection(db, "articles"), articleData);
  return docRef.id;
}

/**
 * Update an article authored by a user.
 * Resets status to 'pending' and clears rejectionReason.
 * @param {string} articleId - Document ID.
 * @param {Object} data - Updated article data.
 * @param {File|null} imageFile - New thumbnail if replacing.
 * @param {Object} user - Firebase Auth user object.
 */
export async function updateArticleAsUser(articleId, data, imageFile, user) {
  if (!user?.uid) {
    throw new Error("Pengguna harus masuk untuk memperbarui artikel.");
  }

  const updateData = {
    title: data.title.trim(),
    content: data.content,
    authorId: user.uid,
    status: "pending",
    rejectionReason: "",
    createdAt: data.createdAt || new Date().toISOString().split("T")[0],
  };

  if (imageFile) {
    if (data.oldThumbnail) {
      await deleteThumbnailByUrl(data.oldThumbnail);
    }
    updateData.thumbnail = await uploadThumbnail(imageFile);
  }

  const docRef = doc(db, "articles", articleId);
  await updateDoc(docRef, updateData);
}

/**
 * Create a new article in Firestore (admin use - default status: 'approved').
 * @param {Object} data - Article data { title, author, content, createdAt, status? }.
 * @param {File|null} imageFile - Optional thumbnail image file.
 * @param {Object} [user] - Optional auth user creating the article.
 * @returns {Promise<string>} The ID of the newly created article.
 */
export async function createArticle(data, imageFile, user) {
  let thumbnailUrl = "";
  if (imageFile) {
    thumbnailUrl = await uploadThumbnail(imageFile);
  }

  const articleData = {
    title: data.title.trim(),
    author: data.author.trim(),
    authorId: user?.uid || data.authorId || "",
    content: data.content,
    thumbnail: thumbnailUrl,
    createdAt: data.createdAt || new Date().toISOString().split("T")[0],
    status: data.status || "approved",
    rejectionReason: "",
  };

  const docRef = await addDoc(collection(db, "articles"), articleData);
  return docRef.id;
}

/**
 * Update an existing article in Firestore (admin use).
 * @param {string} articleId - The Firestore document ID.
 * @param {Object} data - Updated article data.
 * @param {File|null} imageFile - New thumbnail image file (null to keep existing).
 */
export async function updateArticle(articleId, data, imageFile) {
  const updateData = {
    title: data.title.trim(),
    author: data.author.trim(),
    content: data.content,
    createdAt: data.createdAt,
  };

  if (data.status) {
    updateData.status = data.status;
  }
  if (typeof data.rejectionReason !== "undefined") {
    updateData.rejectionReason = data.rejectionReason;
  }

  if (imageFile) {
    if (data.oldThumbnail) {
      await deleteThumbnailByUrl(data.oldThumbnail);
    }
    updateData.thumbnail = await uploadThumbnail(imageFile);
  }

  const docRef = doc(db, "articles", articleId);
  await updateDoc(docRef, updateData);
}

/**
 * Admin action: Approve an article.
 * @param {string} articleId - Document ID.
 */
export async function approveArticle(articleId) {
  const docRef = doc(db, "articles", articleId);
  await updateDoc(docRef, {
    status: "approved",
    rejectionReason: "",
  });
}

/**
 * Admin action: Reject an article with an optional reason.
 * @param {string} articleId - Document ID.
 * @param {string} [reason=""] - Optional explanation for rejection.
 */
export async function rejectArticle(articleId, reason = "") {
  const docRef = doc(db, "articles", articleId);
  await updateDoc(docRef, {
    status: "rejected",
    rejectionReason: reason.trim(),
  });
}

/**
 * Delete an article from Firestore and its thumbnail from Storage.
 * @param {string} articleId - The Firestore document ID.
 */
export async function deleteArticle(articleId) {
  const article = await getArticleById(articleId);
  if (article && article.thumbnail) {
    await deleteThumbnailByUrl(article.thumbnail);
  }

  const docRef = doc(db, "articles", articleId);
  await deleteDoc(docRef);
}
