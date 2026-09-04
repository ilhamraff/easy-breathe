import React, { useState, useEffect } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

function RejectArticleModal({
  isOpen,
  articleTitle,
  authorName,
  onConfirm,
  onCancel,
  loading,
}) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (isOpen) {
      setReason("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(reason);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={!loading ? onCancel : undefined}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all">
        <button
          onClick={onCancel}
          disabled={loading}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
        >
          <FiX size={18} />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <FiAlertTriangle size={22} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Konfirmasi Penolakan Artikel
            </h3>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              Apakah Anda yakin ingin menolak artikel{" "}
              <span className="font-semibold text-slate-900">
                "{articleTitle}"
              </span>
              {authorName ? (
                <>
                  {" "}oleh <span className="font-semibold text-slate-900">{authorName}</span>
                </>
              ) : null}
              ?
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="rejection-reason"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
            >
              Alasan Penolakan (Opsional)
            </label>
            <textarea
              id="rejection-reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Contoh: Format penulisan belum rapi, atau informasi memerlukan sumber yang valid..."
              className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
            <p className="mt-1 text-xs text-slate-400">
              Alasan ini akan dikirimkan kepada penulis agar mereka dapat memperbaikinya.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 transition-colors disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? "Menolak..." : "Ya, Tolak Artikel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RejectArticleModal;
