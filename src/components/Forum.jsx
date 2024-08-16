import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import Replies from "./Replies";

function Forum({ firstName }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newReply, setNewReply] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showReplies, setShowReplies] = useState({});

  useEffect(() => {
    const qry = query(collection(db, "forums"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(qry, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postsData);
    });
    return () => unsubscribe();
  }, []);

  const createPostHandler = async () => {
    if (newPost.trim() === "") return;
    await addDoc(collection(db, "forums"), {
      title: newPost,
      createdAt: serverTimestamp(),
      author: firstName,
    });
    setNewPost("");
  };

  const createReplyHandler = async (postId) => {
    if (newReply.trim() === "" || !selectedPost) return;
    await addDoc(collection(db, `forums/${postId}/replies`), {
      content: newReply,
      createdAt: serverTimestamp(),
      author: firstName,
    });
    setNewReply("");
  };

  const toggleRepliesVisibility = (postId) => {
    setShowReplies((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="forum-container">
      <div className="forum-new-post">
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Buat Postingan Baru ..."
          className="forum-input"
        />
        <button onClick={createPostHandler} className="forum-post-button">
          Post
        </button>
      </div>

      <ul className="forum-post-list">
        {posts.map((post) => (
          <li
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="forum-post-item"
          >
            <h3 className="forum-post-title">{post.title}</h3>
            <p className="forum-post-author">Oleh: {post.author}</p>
            <button
              onClick={() => toggleRepliesVisibility(post.id)}
              className="forum-toggle-button"
            >
              {showReplies[post.id] ? "Sembunyikan Balasan" : "Lihat Balasan"}
            </button>
            {showReplies[post.id] && <Replies postId={post.id} />}
          </li>
        ))}
      </ul>

      {selectedPost && (
        <div className="forum-reply-section">
          <h4 className="forum-reply-title">Balas ke: {selectedPost.author}</h4>
          <div className="forum-reply-input">
            <input
              type="text"
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Tulis balasan..."
              className="forum-input"
            />
            <button
              onClick={() => createReplyHandler(selectedPost.id)}
              className="forum-reply-button"
            >
              Balas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Forum;
