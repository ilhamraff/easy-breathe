import React from "react";

const STATUS_CONFIG = {
  pending: {
    label: "Menunggu Review",
    containerClass: "bg-amber-50 text-amber-700 border-amber-200/80",
    dotClass: "bg-amber-500",
  },
  approved: {
    label: "Dipublikasikan",
    containerClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotClass: "bg-emerald-500",
  },
  rejected: {
    label: "Ditolak",
    containerClass: "bg-rose-50 text-rose-700 border-rose-200/80",
    dotClass: "bg-rose-500",
  },
};

/**
 * Reusable StatusBadge component for article approval lifecycle.
 * @param {Object} props
 * @param {'pending'|'approved'|'rejected'|string} props.status
 * @param {'sm'|'md'} [props.size='md']
 * @param {boolean} [props.showDot=true]
 * @param {string} [props.className='']
 */
export function StatusBadge({
  status,
  size = "md",
  showDot = true,
  className = "",
}) {
  const normalizedStatus = (status || "").toLowerCase();
  const config = STATUS_CONFIG[normalizedStatus] || {
    label: status || "Tidak Diketahui",
    containerClass: "bg-slate-100 text-slate-700 border-slate-200",
    dotClass: "bg-slate-400",
  };

  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-[11px] gap-1.5"
      : "px-2.5 py-1 text-xs gap-2";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${sizeClasses} ${config.containerClass} ${className}`}
    >
      {showDot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${config.dotClass}`}
          aria-hidden="true"
        />
      )}
      <span>{config.label}</span>
    </span>
  );
}

export default StatusBadge;
