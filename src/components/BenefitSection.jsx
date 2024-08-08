import React from "react";
import benefits from "../data/benefits";
import BenefitCard from "./BenefitsCard";

function BenefitsSection() {
  return (
    <section className="benefits">
      <h2>Mengapa harus Berhenti Merokok?</h2>
      <div className="benefits-container">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} img={benefit.img} title={benefit.title} />
        ))}
      </div>
      <p>
        Temukan berbagai manfaat yang akan Anda rasakan setelah berhenti
        merokok. Dari peningkatan kesehatan hingga penghematan finansial,
        berhenti merokok adalah langkah penting menuju kehidupan yang lebih
        baik.
      </p>
    </section>
  );
}

export default BenefitsSection;
