import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiAlertCircle,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { getMyArticles, deleteArticle } from "@/services/articles";
import StatusBadge from "@/components/ui/StatusBadge";
import ConfirmDeleteModal from "@/admin/components/ConfirmDeleteModal";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import { stripHtml } from "@/utils/text";
import { ToastContainer } from "react-toastify";

function MyArticlesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUserArticles = useCallback(async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      const data = await getMyArticles(user.uid);
      setArticles(data);
    } catch (error) {
      console.error("Failed to load user articles:", error);
      showErrorToast("Gagal memuat daftar artikel Anda.");
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    fetchUserArticles();
  }, [fetchUserArticles]);

  const filteredArticles = articles.filter((article) => {
    if (activeFilter === "all") return true;
    return article.status === activeFilter;
  });

  const stats = {
    all: articles.length,
    pending: articles.filter((a) => a.status === "pending").length,
    approved: articles.filter((a) => a.status === "approved").length,
    rejected: articles.filter((a) => a.status === "rejected").length,
  };

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteArticle(deleteTarget.id);
      showSuccessToast("Artikel berhasil dihapus.");
      setDeleteTarget(null);
      fetchUserArticles();
    } catch (error) {
      console.error("Failed to delete article:", error);
      showErrorToast("Gagal menghapus artikel.");
    } finally {
      setDeleting(false);
    }
  }

  // Strip html for excerpt
  function getExcerpt(htmlContent, maxLength = 120) {
    if (!htmlContent) return "";
    const text = stripHtml(htmlContent);
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Artikel Kontribusi Saya
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Kelola dan pantau status publikasi artikel edukasi yang Anda kirimkan.
            </p>
          </div>
          <Link
            to="/kontribusi/tulis"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-700 active:scale-[0.98]"
          >
            <FiPlus size={18} />
            Tulis Artikel Baru
          </Link>
        </div>

        {/* Filter Stats Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => setActiveFilter("all")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
              activeFilter === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <FiFileText size={15} />
            Semua ({stats.all})
          </button>
          <button
            onClick={() => setActiveFilter("pending")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
              activeFilter === "pending"
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <FiClock size={15} />
            Menunggu Review ({stats.pending})
          </button>
          <button
            onClick={() => setActiveFilter("approved")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
              activeFilter === "approved"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <FiCheckCircle size={15} />
            Dipublikasikan ({stats.approved})
          </button>
          <button
            onClick={() => setActiveFilter("rejected")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
              activeFilter === "rejected"
                ? "bg-rose-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <FiXCircle size={15} />
            Ditolak ({stats.rejected})
          </button>
        </div>

        {/* Content list */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-16 px-4 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-600">
              <FiFileText size={26} />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              {activeFilter === "all"
                ? "Belum ada artikel yang dikirimkan"
                : `Tidak ada artikel dengan status "${activeFilter}"`}
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Mulai berbagi inspirasi dan pengalaman Anda sekarang untuk membantu orang lain berhenti merokok.
            </p>
            <Link
              to="/kontribusi/tulis"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
            >
              <FiPlus size={18} />
              Tulis Artikel Sekarang
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {filteredArticles.map((article) => {
              const isEditable =
                article.status === "pending" || article.status === "rejected";

              return (
                <div
                  key={article.id}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 transition-all hover:border-slate-300 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    {/* Thumbnail */}
                    <div className="h-32 w-full sm:h-28 sm:w-44 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                      {article.thumbnail ? (
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-300">
                          <FiFileText size={28} />
                        </div>
                      )}
                    </div>

                    {/* Meta & Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <StatusBadge status={article.status} size="sm" />
                        <span className="text-xs text-slate-400">&bull;</span>
                        <span className="text-xs text-slate-500 font-medium">
                          {article.createdAt}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-slate-900 line-clamp-1">
                        {article.title}
                      </h2>

                      <p className="mt-1 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {getExcerpt(article.content)}
                      </p>

                      {/* Rejection note callout if rejected */}
                      {article.status === "rejected" && article.rejectionReason && (
                        <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50/70 p-3 flex gap-2.5 text-xs text-rose-800">
                          <FiAlertCircle className="shrink-0 text-rose-600 mt-0.5" size={15} />
                          <div>
                            <span className="font-semibold">Alasan Penolakan: </span>
                            <span>{article.rejectionReason}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {article.status === "approved" ? (
                        <Link
                          to={`/articles/${article.id}`}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 px-3.5 py-2 text-xs font-semibold text-teal-700 hover:bg-teal-100 transition-colors"
                        >
                          <FiEye size={14} />
                          Lihat Artikel
                        </Link>
                      ) : null}

                      {isEditable && (
                        <>
                          <button
                            onClick={() => navigate(`/kontribusi/edit/${article.id}`)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                            title="Edit artikel"
                          >
                            <FiEdit3 size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(article)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
                            title="Hapus artikel"
                          >
                            <FiTrash2 size={14} />
                            Hapus
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
    </div>
  );
}

export default MyArticlesPage;
