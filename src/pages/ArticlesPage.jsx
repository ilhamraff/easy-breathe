import React, { useEffect, useState } from "react";
import { getPublicArticles } from "../services/articles";
import ArticlesList from "../components/ArticleList";
import { useSearchParams, Link } from "react-router-dom";
import ArticleSearch from "../components/ArticleSearch";
import { ArticleCardSkeleton } from "../components/Skeletons";
import { FiEdit3 } from "react-icons/fi";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesList = await getPublicArticles();
        setArticles(articlesList);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError("Gagal memuat artikel. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <header className="mx-auto max-w-2xl text-center mb-16">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Artikel Terbaru Kami</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Jelajahi artikel informatif kami untuk membantu Anda berhenti merokok
              dan menjalani hidup yang lebih sehat
            </p>
          </header>
          
          <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="articles-page">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Artikel Terbaru Kami</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Jelajahi artikel informatif kami untuk membantu Anda berhenti merokok
            dan menjalani hidup yang lebih sehat
          </p>
        </header>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-12">
          <div className="w-full sm:flex-1">
            <ArticleSearch keyword={keyword} keywordChange={onKeywordChangeHandler} />
          </div>
          <Link
            to="/kontribusi/tulis"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors shrink-0 w-full sm:w-auto"
          >
            <FiEdit3 size={16} />
            Tulis Artikel
          </Link>
        </div>
        
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <ArticlesList articles={filteredArticles} />
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
