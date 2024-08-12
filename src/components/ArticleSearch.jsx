import React from "react";

function ArticleSearch({ keyword, keywordChange }) {
  return (
    <div className="article-search">
      <input
        type="text"
        placeholder="Cari Artikel ..."
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </div>
  );
}

export default ArticleSearch;
