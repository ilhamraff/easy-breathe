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
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllArticles();
      setArticles(data);
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

  // Filter articles by search query and status
  useEffect(() => {
    let result = articles;

    if (statusFilter !== "all") {
      result = result.filter((a) => {
        const itemStatus = a.status || "approved";
        return itemStatus === statusFilter;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((a) =>
        a.title.toLowerCase().includes(query) ||
        (a.author && a.author.toLowerCase().includes(query))
      );
    }

    setFilteredArticles(result);
  }, [searchQuery, statusFilter, articles]);

  const stats = {
    all: articles.length,
    approved: articles.filter((a) => (a.status || "approved") === "approved").length,
    pending: articles.filter((a) => a.status === "pending").length,
    rejected: articles.filter((a) => a.status === "rejected").length,
  };

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
          <h1 className="text-2xl font-bold text-slate-900">Kelola Artikel</h1>
          <p className="mt-1 text-sm text-slate-500">
            Total {articles.length} artikel terdaftar dalam sistem
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/articles/new")}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700 active:scale-[0.98]"
        >
          <FiPlus size={18} />
          Tambah Artikel Baru
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100/80 border border-slate-200 w-fit">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              statusFilter === "all"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Semua ({stats.all})
          </button>
          <button
            onClick={() => setStatusFilter("approved")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              statusFilter === "approved"
                ? "bg-white text-emerald-700 shadow-sm font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Dipublikasikan ({stats.approved})
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              statusFilter === "pending"
                ? "bg-white text-amber-700 shadow-sm font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Menunggu Review ({stats.pending})
          </button>
          <button
            onClick={() => setStatusFilter("rejected")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              statusFilter === "rejected"
                ? "bg-white text-rose-700 shadow-sm font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Ditolak ({stats.rejected})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <FiSearch
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul / penulis..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
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
