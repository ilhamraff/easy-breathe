import React, { useState, useEffect, useCallback } from "react";
import {
  FiClock,
  FiCheck,
  FiX,
  FiUser,
  FiCalendar,
  FiFileText,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import {
  getPendingArticles,
  approveArticle,
  rejectArticle,
} from "@/services/articles";
import RejectArticleModal from "@/admin/components/RejectArticleModal";
import ConfirmApproveModal from "@/admin/components/ConfirmApproveModal";
import StatusBadge from "@/components/ui/StatusBadge";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import { stripHtml } from "@/utils/text";
import { ToastContainer } from "react-toastify";

function PendingArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approveTarget, setApproveTarget] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [expandedArticleId, setExpandedArticleId] = useState(null);

  const fetchPending = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPendingArticles();
      setArticles(data);
    } catch (error) {
      console.error("Failed to load pending articles:", error);
      showErrorToast("Gagal memuat artikel yang menunggu persetujuan.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  function handleApproveClick(article) {
    setApproveTarget(article);
  }

  async function handleApproveConfirm() {
    if (!approveTarget) return;
    setActionLoading(true);
    try {
      await approveArticle(approveTarget.id);
      showSuccessToast(`Artikel "${approveTarget.title}" berhasil disetujui & dipublikasikan.`);
      setApproveTarget(null);
      fetchPending();
    } catch (error) {
      console.error("Failed to approve article:", error);
      showErrorToast("Gagal menyetujui artikel.");
    } finally {
      setActionLoading(false);
    }
  }

  function handleRejectClick(article) {
    setRejectTarget(article);
  }

  async function handleRejectConfirm(reason) {
    if (!rejectTarget) return;
    setActionLoading(true);
    try {
      await rejectArticle(rejectTarget.id, reason);
      showSuccessToast(`Artikel "${rejectTarget.title}" ditolak.`);
      setRejectTarget(null);
      fetchPending();
    } catch (error) {
      console.error("Failed to reject article:", error);
      showErrorToast("Gagal menolak artikel.");
    } finally {
      setActionLoading(false);
    }
  }

  function toggleExpand(id) {
    setExpandedArticleId((prev) => (prev === id ? null : id));
  }

  function getSnippet(html, maxLen = 160) {
    if (!html) return "";
    const text = stripHtml(html);
    return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-60 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-2 h-4 w-96 animate-pulse rounded-md bg-slate-200" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">
              Menunggu Persetujuan
            </h1>
            <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200">
              {articles.length} Menunggu
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Tinjau artikel yang dikirimkan oleh pengguna sebelum ditayangkan ke publik.
          </p>
        </div>
      </div>

      {/* Articles List */}
      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-20 px-4 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <FiCheck size={28} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">
            Semua Artikel Telah Ditinjau
          </h3>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Tidak ada artikel baru yang menunggu persetujuan saat ini. Artikel kontribusi pengguna yang baru akan muncul di sini.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => {
            const isExpanded = expandedArticleId === article.id;

            return (
              <div
                key={article.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    {/* Thumbnail */}
                    <div className="h-36 w-full sm:h-32 sm:w-48 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                      {article.thumbnail ? (
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-300">
                          <FiFileText size={32} />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <StatusBadge status="pending" size="sm" />
                        <span className="text-slate-300">&bull;</span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <FiUser size={13} className="text-slate-400" />
                          <span>{article.author}</span>
                        </div>
                        <span className="text-slate-300">&bull;</span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <FiCalendar size={13} className="text-slate-400" />
                          <span>{article.createdAt}</span>
                        </div>
                      </div>

                      <h2 className="text-lg font-bold text-slate-900">
                        {article.title}
                      </h2>

                      {/* Excerpt or Full Content */}
                      {!isExpanded ? (
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                          {getSnippet(article.content)}
                        </p>
                      ) : (
                        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                            Pratinjau Isi Konten:
                          </h4>
                          <div
                            className="prose prose-sm max-w-none text-slate-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                          />
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleExpand(article.id)}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-teal-600 hover:text-teal-700"
                      >
                        {isExpanded ? (
                          <>
                            Sembunyikan isi <FiChevronUp size={14} />
                          </>
                        ) : (
                          <>
                            Baca isi lengkap artikel <FiChevronDown size={14} />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col items-center justify-end gap-2.5 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <button
                        onClick={() => handleApproveClick(article)}
                        disabled={actionLoading}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors disabled:opacity-50 active:scale-[0.98]"
                      >
                        <FiCheck size={16} />
                        Setujui
                      </button>
                      <button
                        onClick={() => handleRejectClick(article)}
                        disabled={actionLoading}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors disabled:opacity-50 active:scale-[0.98]"
                      >
                        <FiX size={16} />
                        Tolak
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirm Approve Modal */}
      <ConfirmApproveModal
        isOpen={!!approveTarget}
        articleTitle={approveTarget?.title || ""}
        authorName={approveTarget?.author || ""}
        onConfirm={handleApproveConfirm}
        onCancel={() => setApproveTarget(null)}
        loading={actionLoading}
      />

      {/* Confirm Reject Modal */}
      <RejectArticleModal
        isOpen={!!rejectTarget}
        articleTitle={rejectTarget?.title || ""}
        authorName={rejectTarget?.author || ""}
        onConfirm={handleRejectConfirm}
        onCancel={() => setRejectTarget(null)}
        loading={actionLoading}
      />

      <ToastContainer />
    </div>
  );
}

export default PendingArticles;
