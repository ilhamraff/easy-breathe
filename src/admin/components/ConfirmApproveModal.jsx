import React from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";

function ConfirmApproveModal({
  isOpen,
  articleTitle,
  authorName,
  onConfirm,
  onCancel,
  loading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={!loading ? onCancel : undefined}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all">
        <button
          onClick={onCancel}
          disabled={loading}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
        >
          <FiX size={18} />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <FiCheckCircle size={24} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Konfirmasi Persetujuan Artikel
            </h3>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              Apakah Anda yakin ingin menyetujui artikel{" "}
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
            <p className="mt-2 text-xs text-slate-500">
              Artikel ini akan langsung dipublikasikan dan dapat dibaca oleh seluruh pengunjung website.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? "Menyetujui..." : "Ya, Setujui & Publikasikan"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmApproveModal;
