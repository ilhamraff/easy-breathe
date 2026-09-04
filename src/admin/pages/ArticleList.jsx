import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiSearch } from "react-icons/fi";
import { getAllArticles, deleteArticle } from "@/services/articles";
import ArticleTable from "@/admin/components/ArticleTable";
import ConfirmDeleteModal from "@/admin/components/ConfirmDeleteModal";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import { ToastContainer } from "react-toastify";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllArticles();
      // Sort by createdAt descending
      data.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
      setArticles(data);
      setFilteredArticles(data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      showErrorToast("Gagal memuat daftar artikel.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Filter articles by search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredArticles(articles);
      return;
    }
    const query = searchQuery.toLowerCase();
    setFilteredArticles(
      articles.filter((a) => a.title.toLowerCase().includes(query))
    );
  }, [searchQuery, articles]);

  function handleEdit(articleId) {
    navigate(`/admin/articles/${articleId}/edit`);
  }

  function handleDeleteClick(article) {
    setDeleteTarget(article);
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteArticle(deleteTarget.id);
      showSuccessToast("Artikel berhasil dihapus.");
      setDeleteTarget(null);
      fetchArticles();
    } catch (error) {
      console.error("Failed to delete article:", error);
      showErrorToast("Gagal menghapus artikel. Pastikan Anda memiliki izin.");
    } finally {
      setDeleting(false);
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-10 w-36 animate-pulse rounded-xl bg-slate-200" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Artikel</h1>
          <p className="mt-1 text-sm text-slate-500">
            {articles.length} artikel total
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/articles/new")}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700 active:scale-[0.98]"
        >
          <FiPlus size={18} />
          Tambah Artikel
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <FiSearch
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari judul artikel..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>

      {/* Table */}
      <ArticleTable
        articles={filteredArticles}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        articleTitle={deleteTarget?.title || ""}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />

      <ToastContainer />
    </div>
  );
}

export default ArticleList;
