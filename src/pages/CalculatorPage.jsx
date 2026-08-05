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
    <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Kalkulator Penghematan Rokok
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Berhenti merokok tidak hanya meningkatkan kesehatan Anda, tetapi juga berdampak positif pada keuangan Anda. Gunakan kalkulator ini untuk mengetahui berapa banyak uang yang telah Anda hemat.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm ring-1 ring-slate-200">
          <CalculatorForm calculateSavings={calculateSavings} />
          
          {savings !== null && (
            <div className="mt-10 p-8 bg-teal-50 rounded-2xl border border-teal-100 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-800 mb-2">
                Hasil Penghematan Anda
              </h2>
              <div className="text-4xl font-bold text-teal-600">
                Rp {new Intl.NumberFormat("id-ID").format(savings)}
              </div>
              <p className="mt-2 text-sm text-teal-700">
                Anda telah menghemat jumlah ini sejak berhenti merokok!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalculatorPage;
