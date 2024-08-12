import React from "react";
import { Link } from "react-router-dom";

function ArticleCard({ article, id }) {
  const { thumbnail, title, content } = article;

  return (
    <div className="article-card">
      <img src={thumbnail} alt={title} className="article-thumbnail" />
      <div className="article-content">
        <h3>{title}</h3>
        <p>{content.slice(0, 100)}...</p>
        <Link to={`/articles/${id}`}>Baca Selengkapnya</Link>
      </div>
    </div>
  );
}

export default ArticleCard;
