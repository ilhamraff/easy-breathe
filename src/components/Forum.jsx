import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  subscribeToForumPosts,
  createForumPost,
  updateForumPost,
  deleteForumPost,
  createReply,
} from "../services/forum";
import { showErrorToast } from "../utils/toast";
import Replies from "./Replies";
import { ForumPostSkeleton } from "./Skeletons";

function Forum() {
  const { user, userDetails } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newReply, setNewReply] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToForumPosts((fetchedPosts) => {
      setPosts(fetchedPosts);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createPostHandler = async () => {
    if (newPost.trim() === "") return;
    if (!user) {
      showErrorToast("Anda harus login untuk membuat postingan.");
      return;
    }

    try {
      await createForumPost({
        title: newPost,
        authorName: userDetails?.firstName || "Anonymous",
        authorId: user.uid,
      });
      setNewPost("");
    } catch (error) {
      console.error("Failed to create post:", error);
      showErrorToast("Gagal membuat postingan. Silakan coba lagi.");
    }
  };

  const createReplyHandler = async (postId) => {
    if (newReply.trim() === "" || !selectedPost) return;
    if (!user) {
      showErrorToast("Anda harus login untuk membalas.");
      return;
    }

    try {
      await createReply({
        postId,
        content: newReply,
        authorName: userDetails?.firstName || "Anonymous",
        authorId: user.uid,
      });
      setNewReply("");
    } catch (error) {
      console.error("Failed to create reply:", error);
      showErrorToast("Gagal mengirim balasan. Silakan coba lagi.");
    }
  };

  const startEditing = (post) => {
    setEditingPostId(post.id);
    setEditingTitle(post.title);
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setEditingTitle("");
  };

  const saveEdit = async (postId) => {
    if (editingTitle.trim() === "") return;
    try {
      await updateForumPost(postId, editingTitle);
      setEditingPostId(null);
      setEditingTitle("");
    } catch (error) {
      console.error("Failed to update post:", error);
      showErrorToast("Gagal mengubah postingan. Silakan coba lagi.");
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus postingan ini?")) {
      return;
    }
    try {
      await deleteForumPost(postId);
      if (selectedPost?.id === postId) {
        setSelectedPost(null);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
      showErrorToast("Gagal menghapus postingan. Silakan coba lagi.");
    }
  };

  const toggleRepliesVisibility = (postId) => {
    setShowReplies((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const isPostOwner = (post) => {
    return user && post.authorId === user.uid;
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white rounded-3xl p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex gap-4">
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Bagikan pemikiran, pertanyaan, atau pengalaman Anda..."
            className="flex-1 rounded-2xl border-0 py-3 pl-4 pr-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 transition-shadow bg-slate-50 hover:bg-white"
          />
          <button 
            onClick={createPostHandler} 
            className="rounded-2xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-colors"
          >
            Post
          </button>
        </div>
      </div>

      <ul className="flex flex-col gap-6">
        {loading ? (
          <>
            <ForumPostSkeleton />
            <ForumPostSkeleton />
            <ForumPostSkeleton />
          </>
        ) : (
          posts.map((post) => (
            <li
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className={`bg-white rounded-3xl p-6 shadow-sm ring-1 transition-all cursor-pointer ${
              selectedPost?.id === post.id 
                ? "ring-teal-500 shadow-md" 
                : "ring-slate-200 hover:shadow-md hover:ring-slate-300"
            }`}
          >
            {editingPostId === post.id ? (
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="w-full rounded-xl border-0 py-2.5 pl-4 pr-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-teal-600"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      saveEdit(post.id);
                    }}
                    className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelEditing();
                    }}
                    className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-200"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{post.title}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">Oleh: {post.author}</span>
                  {post.updatedAt && <span>(diedit)</span>}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRepliesVisibility(post.id);
                }}
                className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
              >
                {showReplies[post.id] ? "Sembunyikan Balasan" : "Lihat Balasan"}
              </button>
              
              {isPostOwner(post) && editingPostId !== post.id && (
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(post);
                    }}
                    className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePost(post.id);
                    }}
                    className="text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
            
            {showReplies[post.id] && (
              <div className="mt-6 pl-4 border-l-2 border-slate-100">
                <Replies postId={post.id} />
              </div>
            )}
            
            {/* Inline reply section when post is selected */}
            {selectedPost?.id === post.id && (
              <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Membalas {post.author}...</h4>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Tulis balasan Anda..."
                    className="flex-1 rounded-xl border-0 py-2.5 pl-4 pr-4 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-teal-600 bg-slate-50"
                  />
                  <button
                    onClick={() => createReplyHandler(post.id)}
                    className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500"
                  >
                    Balas
                  </button>
                </div>
              </div>
            )}
          </li>
        )))}
      </ul>
    </div>
  );
}

export default Forum;
