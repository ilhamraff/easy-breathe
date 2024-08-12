import React from "react";
import ArticleCard from "./ArticleCard";

function ArticlesList({ articles }) {
  return (
    <div className="articles-list">
      {articles.map((article) => (
        <ArticleCard key={article.id} id={article.id} article={article} />
      ))}
    </div>
  );
}

export default ArticlesList;
