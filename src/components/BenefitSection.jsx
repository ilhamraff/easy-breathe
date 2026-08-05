import React from "react";
import benefits from "../data/benefits";
import BenefitCard from "./BenefitsCard";

function BenefitsSection() {
  return (
    <section className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Mengapa Harus Berhenti Merokok?</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Temukan berbagai manfaat yang akan Anda rasakan setelah berhenti merokok. Dari peningkatan kesehatan hingga penghematan finansial, berhenti merokok adalah langkah penting menuju kehidupan yang lebih baik.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} img={benefit.img} title={benefit.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
