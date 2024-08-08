import React, { useState } from "react";
import CalculatorForm from "../components/CalculatorForm";

function CalculatorPage() {
  const [savings, setSavings] = useState(null);

  function calculateSavings(pricePerPack, cigarettesPerDay, daysQuit) {
    const dailyCost = (pricePerPack / 20) * cigarettesPerDay;
    const totalSavings = dailyCost * daysQuit;
    setSavings(totalSavings.toFixed(2));
  }

  return (
    <section className="calculator-page">
      <h1>Kalkulator Penghematan Rokok</h1>
      <p>
        Berhenti merokok tidak hanya meningkatkan kesehatan Anda, tetapi juga
        berdampak positif pada keuangan Anda. Gunakan kalkulator ini untuk
        mengetahui berapa banyak uang yang telah Anda hemat sejak berhenti
        merokok.
      </p>
      <CalculatorForm calculateSavings={calculateSavings} />
      {savings !== null && (
        <div className="calculator-result">
          <h2>Hasil Penghematan: </h2>
          <p>Anda telah menghemat IDR {savings} sejak berhenti merokok!</p>
        </div>
      )}
    </section>
  );
}

export default CalculatorPage;
