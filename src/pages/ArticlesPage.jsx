import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import ArticlesList from "../components/ArticleList";
import { useSearchParams } from "react-router-dom";
import ArticleSearch from "../components/ArticleSearch";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  useEffect(() => {
    const fetchArticles = async () => {
      const articlesCollection = collection(db, "articles");
      const articlesSnapshot = await getDocs(articlesCollection);
      const articlesList = articlesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articlesList);
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

  return (
    <div className="articles-page">
      <header className="articles-page__header">
        <h1>Artikel Terbaru Kami</h1>
        <p>
          Jelajahi artikel informatif kami untuk membantu Anda berhenti merokok
          dan menjalani hidup yang lebih sehat
        </p>
      </header>
      <ArticleSearch keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <ArticlesList articles={filteredArticles} />
    </div>
  );
};

export default ArticlesPage;
