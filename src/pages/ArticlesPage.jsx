import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import ArticlesList from "../components/ArticleList";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);

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

  return (
    <div className="articles-page">
      <header className="articles-page__header">
        <h1>Artikel Terbaru Kami</h1>
        <p>
          Jelajahi artikel informatif kami untuk membantu Anda berhenti merokok
          dan menjalani hidup yang lebih sehat
        </p>
      </header>
      <ArticlesList articles={articles} />
    </div>
  );
};

export default ArticlesPage;
