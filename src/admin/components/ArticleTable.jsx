import React from "react";
import { FiEdit2, FiTrash2, FiImage } from "react-icons/fi";
import StatusBadge from "@/components/ui/StatusBadge";

function ArticleTable({ articles, onEdit, onDelete }) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-16">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <FiImage className="text-slate-400" size={24} />
        </div>
        <p className="text-sm font-medium text-slate-500">Belum ada artikel</p>
        <p className="mt-1 text-xs text-slate-400">
          Tidak ada artikel yang cocok dengan kriteria filter saat ini.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-5 py-3.5 font-medium text-slate-500">
                Thumbnail
              </th>
              <th className="px-5 py-3.5 font-medium text-slate-500">Judul</th>
              <th className="px-5 py-3.5 font-medium text-slate-500">Status</th>
              <th className="hidden px-5 py-3.5 font-medium text-slate-500 md:table-cell">
                Penulis
              </th>
              <th className="hidden px-5 py-3.5 font-medium text-slate-500 sm:table-cell">
                Tanggal
              </th>
              <th className="px-5 py-3.5 text-right font-medium text-slate-500">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {articles.map((article) => (
              <tr
                key={article.id}
                className="transition-colors hover:bg-slate-50/60"
              >
                <td className="px-5 py-3">
                  {article.thumbnail ? (
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="h-12 w-12 rounded-lg object-cover border border-slate-100"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                      <FiImage className="text-slate-300" size={18} />
                    </div>
                  )}
                </td>
                <td className="px-5 py-3">
                  <p className="font-medium text-slate-900 line-clamp-1">
                    {article.title}
                  </p>
                  {article.status === "rejected" && article.rejectionReason && (
                    <p className="mt-0.5 text-xs text-rose-600 line-clamp-1">
                      Alasan: {article.rejectionReason}
                    </p>
                  )}
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={article.status || "approved"} size="sm" />
                </td>
                <td className="hidden px-5 py-3 text-slate-600 md:table-cell">
                  {article.author}
                </td>
                <td className="hidden px-5 py-3 text-slate-500 sm:table-cell">
                  {article.createdAt}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onEdit(article.id)}
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-teal-50 hover:text-teal-600"
                      title="Edit artikel"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(article)}
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      title="Hapus artikel"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ArticleTable;
