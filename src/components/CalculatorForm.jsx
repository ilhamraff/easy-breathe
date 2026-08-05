import React, { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

function CalculatorForm({ calculateSavings }) {
  const [pricePerPack, setPricePerPack] = useState("");
  const [cigarettesPerDay, setCigarettesPerDay] = useState("");
  const [daysQuit, setDaysQuit] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    calculateSavings(pricePerPack, cigarettesPerDay, daysQuit);
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-6">
      <Input
        id="pricePerPack"
        type="number"
        label="Harga rokok per bungkus (IDR)"
        placeholder="Contoh: 25000"
        value={pricePerPack}
        onChange={(event) => setPricePerPack(event.target.value)}
        min="0"
        required
      />
      <Input
        id="cigarettesPerDay"
        type="number"
        label="Jumlah rokok yang dihisap per hari"
        placeholder="Contoh: 12"
        value={cigarettesPerDay}
        onChange={(event) => setCigarettesPerDay(event.target.value)}
        min="0"
        required
      />
      <Input
        id="daysQuit"
        type="number"
        label="Jumlah hari sejak berhenti merokok"
        placeholder="Contoh: 30"
        value={daysQuit}
        onChange={(event) => setDaysQuit(event.target.value)}
        min="0"
        required
      />
      <Button type="submit" className="w-full mt-4">Hitung Penghematan</Button>
    </form>
  );
}

export default CalculatorForm;
