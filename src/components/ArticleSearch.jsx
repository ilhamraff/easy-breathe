import React from "react";

import { FiSearch } from "react-icons/fi";

function ArticleSearch({ keyword, keywordChange }) {
  return (
    <div className="relative max-w-xl mx-auto">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <FiSearch className="h-5 w-5 text-slate-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        placeholder="Cari Artikel ..."
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
        className="block w-full rounded-2xl border-0 py-4 pl-12 pr-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 transition-shadow bg-white hover:ring-slate-300"
      />
    </div>
  );
}

export default ArticleSearch;
