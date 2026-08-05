import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById } from "../services/articles";
import { ArticleDetailSkeleton } from "../components/Skeletons";

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(id);
        if (data) {
          setArticle(data);
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
  }, [id]);

  if (loading) {
    return <ArticleDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="article-detail">
        <p>{error}</p>
        <button onClick={() => navigate("/articles")}>
          Kembali ke Artikel
        </button>
      </div>
    );
  }

  const { thumbnail, author, title, content, createdAt } = article;

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <button 
          onClick={() => navigate("/articles")}
          className="mb-8 text-sm font-semibold leading-6 text-teal-600 hover:text-teal-500 flex items-center gap-1 transition-colors"
        >
          <span aria-hidden="true">&larr;</span> Kembali ke Artikel
        </button>

        <article>
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
              {title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <span className="font-medium text-slate-900">{author}</span>
              <span>&bull;</span>
              <time dateTime={createdAt}>{createdAt}</time>
            </div>
          </header>

          <figure className="mb-14">
            <img 
              src={thumbnail} 
              alt={title} 
              className="aspect-video w-full rounded-2xl bg-slate-50 object-cover shadow-sm ring-1 ring-slate-200" 
            />
          </figure>

          <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed">
            {/* If content is just a string, we map it to paragraphs or just render it. If it contains HTML, we should dangerouslySetInnerHTML, but let's assume it's just text for now based on previous code */}
            <p className="whitespace-pre-line">{content}</p>
          </div>
        </article>
      </div>
    </div>
  );
}

export default ArticleDetail;
