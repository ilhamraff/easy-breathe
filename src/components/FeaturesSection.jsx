import React from "react";
import { useNavigate } from "react-router-dom";

function FeaturesSection() {
  const navigate = useNavigate();

  const goToTest = () => {
    navigate("/addiction-test");
  };

  const goToCalculator = () => {
    navigate("/calculator-savings");
  };

  const goToForum = () => {
    navigate("/forum");
  };

  return (
    <section className="features">
      <h2 className="features-title">Jelajahi Fitur Kami</h2>
      <p className="features-description">
        Temukan alat bantu yang kami sediakan untuk membantu Anda berhenti
        merokok. Lakukan tes kecanduan nikotin untuk mengetahui tingkat
        kecanduan Anda, gunakan kalkulator kami untuk melihat berapa banyak yang
        bisa Anda hemat dengan berhenti merokok, dan bergabunglah dalam forum
        diskusi untuk mendapatkan dukungan dari komunitas.
      </p>
      <div className="features-container">
        <div className="feature">
          <img src="images/addiction.png" alt="Tes Kecanduan Nikotin" />
          <h3>Tes Kecanduan Nikotin</h3>
          <button onClick={goToTest}>Mulai Tes</button>
        </div>
        <div className="feature">
          <img src="images/calculator.png" alt="Kalkulator Penghematan" />
          <h3>Kalkulator Penghematan</h3>
          <button onClick={goToCalculator}>Gunakan Kalkulator</button>
        </div>
        <div className="feature">
          <img src="images/forum.png" alt="Forum Diskusi" />
          <h3>Forum Diskusi</h3>
          <button onClick={goToForum}>Masuk Forum</button>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
