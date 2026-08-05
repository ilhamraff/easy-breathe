import React from "react";
import { Link } from "react-router-dom";

function ArticleCard({ article, id }) {
  const { thumbnail, title, content } = article;

  return (
    <article className="relative flex flex-col items-start justify-between bg-white rounded-3xl overflow-hidden ring-1 ring-slate-200 transition-all hover:shadow-lg hover:-translate-y-1 group">
      <div className="w-full relative aspect-video sm:aspect-2/1 lg:aspect-3/2 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 w-full">
        <div className="flex-1">
          <h3 className="mt-3 text-xl font-semibold leading-7 text-slate-900 group-hover:text-teal-600 line-clamp-2">
            <Link to={`/articles/${id}`}>
              <span className="absolute inset-0" />
              {title}
            </Link>
          </h3>
          <p className="mt-4 text-sm leading-6 text-slate-600 line-clamp-3">
            {content}
          </p>
        </div>
        <div className="mt-6 flex items-center">
          <Link to={`/articles/${id}`} className="text-sm font-semibold leading-6 text-teal-600 hover:text-teal-500 z-10 flex items-center gap-1">
            Baca Selengkapnya <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
