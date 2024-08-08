import React from "react";

function BenefitCard({ img, title }) {
  return (
    <div className="benefit-card">
      <img src={img} alt={title} className="benefit-image" />
      <h3 className="benefit-title">{title}</h3>
    </div>
  );
}

export default BenefitCard;
