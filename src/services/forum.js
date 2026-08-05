import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

/**
 * Subscribe to forum posts in realtime.
 * @param {function} callback - Called with array of posts on each update.
 * @returns {function} Unsubscribe function.
 */
export function subscribeToForumPosts(callback) {
  const postsQuery = query(
    collection(db, "forums"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(postsQuery, (snapshot) => {
    const posts = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    callback(posts);
  });
}

/**
 * Create a new forum post.
 * @param {Object} params
 * @param {string} params.title - Post title/content.
 * @param {string} params.authorName - Display name of the author.
 * @param {string} params.authorId - Firebase Auth UID of the author.
 * @returns {Promise<DocumentReference>}
 */
export async function createForumPost({ title, authorName, authorId }) {
  return addDoc(collection(db, "forums"), {
    title,
    author: authorName,
    authorId,
    createdAt: serverTimestamp(),
  });
}

/**
 * Update an existing forum post (only owner should call this).
 * @param {string} postId - Document ID.
 * @param {string} newTitle - Updated title/content.
 * @returns {Promise<void>}
 */
export async function updateForumPost(postId, newTitle) {
  const postRef = doc(db, "forums", postId);
  return updateDoc(postRef, {
    title: newTitle,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a forum post (only owner should call this).
 * @param {string} postId - Document ID.
 * @returns {Promise<void>}
 */
export async function deleteForumPost(postId) {
  const postRef = doc(db, "forums", postId);
  return deleteDoc(postRef);
}

/**
 * Subscribe to replies for a specific forum post.
 * @param {string} postId - The parent post document ID.
 * @param {function} callback - Called with array of replies on each update.
 * @returns {function} Unsubscribe function.
 */
export function subscribeToReplies(postId, callback) {
  const repliesQuery = query(
    collection(db, `forums/${postId}/replies`),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(repliesQuery, (snapshot) => {
    const replies = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    callback(replies);
  });
}

/**
 * Create a reply to a forum post.
 * @param {Object} params
 * @param {string} params.postId - Parent post document ID.
 * @param {string} params.content - Reply content.
 * @param {string} params.authorName - Display name of the author.
 * @param {string} params.authorId - Firebase Auth UID of the author.
 * @returns {Promise<DocumentReference>}
 */
export async function createReply({ postId, content, authorName, authorId }) {
  return addDoc(collection(db, `forums/${postId}/replies`), {
    content,
    author: authorName,
    authorId,
    createdAt: serverTimestamp(),
  });
}

/**
 * Delete a reply (only owner should call this).
 * @param {string} postId - Parent post document ID.
 * @param {string} replyId - Reply document ID.
 * @returns {Promise<void>}
 */
export async function deleteReply(postId, replyId) {
  const replyRef = doc(db, `forums/${postId}/replies`, replyId);
  return deleteDoc(replyRef);
}
