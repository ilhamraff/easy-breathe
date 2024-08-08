import React from "react";

function HeroSection({ onButtonClick }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Bebaskan Diri Anda dari
          <br /> Kecanduan Merokok
        </h1>
        <p className="hero-subtitle">
          Mulailah perjalanan Anda menuju kehidupan yang lebih sehat tanpa
          rokok.
        </p>
        <button className="hero-button" onClick={onButtonClick}>
          Mulai Sekarang
        </button>
      </div>
      <div className="hero-image">
        <img src="home.png" alt="" />
      </div>
    </section>
  );
}

export default HeroSection;
