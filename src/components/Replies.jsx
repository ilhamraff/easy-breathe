import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

function Replies({ postId }) {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const qry = query(
      collection(db, `forums/${postId}/replies`),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(qry, (snapshot) => {
      const repliesData = snapshot.docs.map((doc) => doc.data());
      setReplies(repliesData);
    });
    return () => unsubscribe();
  }, [postId]);

  return (
    <ul className="forum-reply-list">
      {replies.map((reply, index) => (
        <li key={index} className="forum-reply-item">
          <p className="forum-reply-content">{reply.content}</p>
          <p className="forum-reply-author">Oleh: {reply.author}</p>
        </li>
      ))}
    </ul>
  );
}

export default Replies;
