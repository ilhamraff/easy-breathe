import React, { useEffect, useState } from "react";
import { subscribeToReplies, deleteReply } from "../services/forum";
import { useAuth } from "../contexts/AuthContext";
import { showErrorToast } from "../utils/toast";

function Replies({ postId }) {
  const [replies, setReplies] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = subscribeToReplies(postId, setReplies);
    return () => unsubscribe();
  }, [postId]);

  const handleDeleteReply = async (replyId) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus balasan ini?")) {
      return;
    }
    try {
      await deleteReply(postId, replyId);
    } catch (error) {
      console.error("Failed to delete reply:", error);
      showErrorToast("Gagal menghapus balasan. Silakan coba lagi.");
    }
  };

  return (
    <ul className="flex flex-col gap-4">
      {replies.map((reply) => (
        <li key={reply.id} className="bg-slate-50 rounded-2xl p-4 shadow-sm ring-1 ring-slate-100 flex justify-between items-start group">
          <div>
            <p className="text-slate-800 text-sm mb-1">{reply.content}</p>
            <p className="text-xs text-slate-500 font-medium">Oleh: {reply.author}</p>
          </div>
          {user && reply.authorId === user.uid && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteReply(reply.id);
              }}
              className="text-xs font-medium text-rose-500 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Hapus
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Replies;
