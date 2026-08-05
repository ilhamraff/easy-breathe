import React from "react";
import ArticleCard from "./ArticleCard";

function ArticlesList({ articles }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} id={article.id} article={article} />
      ))}
    </div>
  );
}

export default ArticlesList;
