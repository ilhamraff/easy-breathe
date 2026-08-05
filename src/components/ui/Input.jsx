import React, { forwardRef } from "react";

export const Input = forwardRef(({ 
  label, 
  error, 
  className = "", 
  containerClassName = "",
  id,
  ...props 
}, ref) => {
  const inputId = id || Math.random().toString(36).substring(2, 9);
  
  return (
    <div className={`w-full flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`
          flex h-11 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 
          text-sm text-slate-900 placeholder:text-slate-400
          transition-colors
          focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500
          disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
});

Input.displayName = "Input";
