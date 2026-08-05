import React, { useEffect, useState } from "react";
import { getRecentArticles } from "../services/articles";
import ArticlesList from "./ArticleList";
import { Link } from "react-router-dom";

function ArticleSection() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesList = await getRecentArticles(3);
        setArticles(articlesList);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError("Gagal memuat artikel.");
      }
    };

    fetchArticles();
  }, []);

  if (error) {
    return (
      <section className="home-page__articles">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Jelajahi Artikel</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Temukan berbagai artikel bermanfaat yang dapat membantu Anda berhenti merokok dan menjaga kesehatan Anda.
          </p>
        </div>
        
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <ArticlesList articles={articles} />
        </div>
        
        <div className="mt-16 flex justify-center">
          <Link 
            to="/articles" 
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-teal-600 shadow-sm ring-1 ring-inset ring-teal-200 hover:bg-teal-50 transition-colors"
          >
            Lihat Semua Artikel &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ArticleSection;
