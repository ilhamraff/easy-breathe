import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import ArticlesList from "./ArticleList";
import { Link } from "react-router-dom";

function ArticleSection() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articlesCollection = collection(db, "articles");
      const articlesSnapshot = await getDocs(articlesCollection);
      const articlesList = articlesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setArticles(articlesList.slice(0, 3));
    };

    fetchArticles();
  }, []);

  return (
    <section className="home-page__articles">
      <header className="home-page__articles-header">
        <h2>Jelajahi Artikel</h2>
        <p>
          Temukan berbagai artikel bermanfaat yang dapat membantu Anda berhenti
          merokok dan menjaga kesehatan Anda.
        </p>
      </header>
      <ArticlesList articles={articles} />
      <div className="home-page__articles-footer">
        <Link to="/articles" className="btn">
          Lihat Semua Artikel
        </Link>
      </div>
    </section>
  );
}

export default ArticleSection;
