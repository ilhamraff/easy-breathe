import React, { useState } from "react";

function CalculatorForm({ calculateSavings }) {
  const [pricePerPack, setPricePerPack] = useState("");
  const [cigarettesPerDay, setCigarettesPerDay] = useState("");
  const [daysQuit, setDaysQuit] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    calculateSavings(pricePerPack, cigarettesPerDay, daysQuit);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="">Harga rokok per bungkus (IDR): </label>
        <input
          type="number"
          value={pricePerPack}
          onChange={(event) => setPricePerPack(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">Jumlah rokok yang dihisap per hari: </label>
        <input
          type="number"
          value={cigarettesPerDay}
          onChange={(event) => setCigarettesPerDay(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">Jumlah hari sejak berhenti merokok: </label>
        <input
          type="number"
          value={daysQuit}
          onChange={(event) => setDaysQuit(event.target.value)}
        />
      </div>
      <button type="submit">Hitung Penghematan</button>
    </form>
  );
}

export default CalculatorForm;
