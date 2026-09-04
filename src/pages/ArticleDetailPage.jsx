import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getArticleById } from "../services/articles";
import { ArticleDetailSkeleton } from "../components/Skeletons";
import { useAuth } from "../contexts/AuthContext";
import StatusBadge from "../components/ui/StatusBadge";
import { FiArrowLeft, FiAlertCircle } from "react-icons/fi";

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(id);
        if (data) {
          // Check if article is approved or if user is owner/admin
          const isOwner = user?.uid && data.authorId === user.uid;
          if (data.status && data.status !== "approved" && !isOwner && !isAdmin) {
            setError("Artikel ini sedang dalam proses review dan belum dipublikasikan.");
          } else {
            setArticle(data);
          }
        } else {
          setError("Artikel tidak ditemukan.");
        }
      } catch (err) {
        console.error("Failed to fetch article:", err);
        setError("Gagal memuat artikel. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, user?.uid, isAdmin]);

  if (loading) {
    return <ArticleDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6">
        <div className="max-w-md mx-auto rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <FiAlertCircle size={24} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Akses Dibatasi</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{error}</p>
          <button
            onClick={() => navigate("/articles")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors"
          >
            <FiArrowLeft size={16} />
            Kembali ke Halaman Artikel
          </button>
        </div>
      </div>
    );
  }

  const { thumbnail, author, title, content, createdAt, status } = article;
  const isOwner = user?.uid && article.authorId === user.uid;
  const isPendingOrRejected = status && status !== "approved";
  const hasHtmlContent = /<[a-z][\s\S]*>/i.test(content || "");

  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="text-sm font-semibold leading-6 text-teal-600 hover:text-teal-700 flex items-center gap-1.5 transition-colors"
          >
            <FiArrowLeft size={16} /> Kembali
          </button>

          {isOwner && isPendingOrRejected && (
            <Link
              to={`/kontribusi/edit/${id}`}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Edit Artikel Ini
            </Link>
          )}
        </div>

        {/* Unapproved Preview Banner */}
        {isPendingOrRejected && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Pratinjau Artikel:
                </span>
                <StatusBadge status={status} size="sm" />
              </div>
              <p className="mt-1 text-xs text-amber-700">
                Artikel ini belum tayang untuk publik dan hanya dapat dilihat oleh Anda atau Admin.
              </p>
            </div>
          </div>
        )}

        <article>
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
              {title}
            </h1>
            <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
              <span className="font-semibold text-slate-900">{author}</span>
              <span>&bull;</span>
              <time dateTime={createdAt}>{createdAt}</time>
            </div>
          </header>

          {thumbnail && (
            <figure className="mb-12">
              <img 
                src={thumbnail} 
                alt={title} 
                className="aspect-video w-full rounded-2xl bg-slate-50 object-cover shadow-sm ring-1 ring-slate-200" 
              />
            </figure>
          )}

          <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed">
            {hasHtmlContent ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p className="whitespace-pre-line">{content}</p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export default ArticleDetail;
