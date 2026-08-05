import React from "react";

function BenefitCard({ img, title }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-teal-100 group">
      <div className="h-16 w-16 mb-6 flex items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover:scale-110 transition-transform duration-300">
        <img src={img} alt={title} className="w-10 h-10 object-contain" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 text-center">{title}</h3>
    </div>
  );
}

export default BenefitCard;
