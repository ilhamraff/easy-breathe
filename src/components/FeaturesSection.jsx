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
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Jelajahi Fitur Kami</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Temukan alat bantu yang kami sediakan untuk membantu Anda berhenti merokok. Mulai dari tes kecanduan nikotin hingga kalkulator penghematan, kami siap mendampingi Anda.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            
            {/* Feature 1 */}
            <div className="flex flex-col bg-slate-50 rounded-3xl p-8 ring-1 ring-slate-200 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mb-6 h-48 overflow-hidden rounded-2xl bg-white flex items-center justify-center p-4">
                <img src="images/addiction.png" alt="Tes Kecanduan Nikotin" className="h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold leading-7 text-slate-900 mb-2">Tes Kecanduan Nikotin</h3>
              <p className="text-sm leading-6 text-slate-600 mb-6 flex-1">
                Ketahui tingkat kecanduan Anda dengan menjawab beberapa pertanyaan sederhana.
              </p>
              <button 
                onClick={goToTest}
                className="mt-auto w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-colors"
              >
                Mulai Tes
              </button>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col bg-slate-50 rounded-3xl p-8 ring-1 ring-slate-200 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mb-6 h-48 overflow-hidden rounded-2xl bg-white flex items-center justify-center p-4">
                <img src="images/calculator.png" alt="Kalkulator Penghematan" className="h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold leading-7 text-slate-900 mb-2">Kalkulator Penghematan</h3>
              <p className="text-sm leading-6 text-slate-600 mb-6 flex-1">
                Hitung berapa banyak uang yang bisa Anda hemat jika Anda berhenti merokok hari ini.
              </p>
              <button 
                onClick={goToCalculator}
                className="mt-auto w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-colors"
              >
                Gunakan Kalkulator
              </button>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col bg-slate-50 rounded-3xl p-8 ring-1 ring-slate-200 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mb-6 h-48 overflow-hidden rounded-2xl bg-white flex items-center justify-center p-4">
                <img src="images/forum.png" alt="Forum Diskusi" className="h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold leading-7 text-slate-900 mb-2">Forum Diskusi</h3>
              <p className="text-sm leading-6 text-slate-600 mb-6 flex-1">
                Bergabunglah dengan komunitas yang saling mendukung dalam perjalanan berhenti merokok.
              </p>
              <button 
                onClick={goToForum}
                className="mt-auto w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-colors"
              >
                Masuk Forum
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
