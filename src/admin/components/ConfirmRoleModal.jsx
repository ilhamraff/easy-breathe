import React from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";

function ConfirmRoleModal({ isOpen, user, newRole, onConfirm, onCancel, loading }) {
  if (!isOpen || !user) return null;

  const isPromoting = newRole === "admin";
  const displayName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={!loading ? onCancel : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onCancel}
          disabled={loading}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
        >
          <FiX size={18} />
        </button>

        {/* Icon */}
        <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${isPromoting ? "bg-teal-50" : "bg-amber-50"}`}>
          <FiAlertTriangle className={isPromoting ? "text-teal-500" : "text-amber-500"} size={28} />
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            {isPromoting ? "Jadikan Admin" : "Cabut Hak Admin"}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Apakah Anda yakin ingin {isPromoting ? "menjadikan" : "mencabut hak admin dari"}{" "}
            <span className="font-medium text-slate-900">"{displayName}"</span>
            {isPromoting
              ? "? User ini akan memiliki akses penuh ke panel admin."
              : "? User ini tidak akan bisa mengakses panel admin lagi."}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50 ${
              isPromoting
                ? "bg-teal-600 hover:bg-teal-700"
                : "bg-amber-500 hover:bg-amber-600"
            }`}
          >
            {loading ? "Memproses..." : isPromoting ? "Jadikan Admin" : "Cabut Admin"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmRoleModal;
