import React, { useState } from "react";
import AddictionForm from "../components/FormAddiction";
import { ToastContainer } from "react-toastify";

function AddictionTestPage() {
  const [score, setScore] = useState(null);
  const [addictionLevel, setAddictionLevel] = useState("");
  const [progressClass, setProgressClass] = useState("");
  const [percentage, setPercentage] = useState(0);

  const handleCalculateAddiction = (result) => {
    setScore(result.score);
    setAddictionLevel(result.addictionLevel);
    setProgressClass(result.progressClass);
    setPercentage(result.percentage);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tes Tingkat Kecanduan Nikotin
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Jawab beberapa pertanyaan di bawah ini dengan jujur untuk mengetahui seberapa jauh tingkat ketergantungan Anda terhadap nikotin.
          </p>
        </div>

        <AddictionForm onCalculateAddiction={handleCalculateAddiction} />
        
        {score !== null && (
          <div className="mt-12 bg-white rounded-3xl p-8 sm:p-12 shadow-sm ring-1 ring-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Hasil Tes Anda</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <div className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-teal-100 bg-teal-50">
                <span className="text-4xl font-bold text-teal-600">{score}</span>
                <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider mt-1">Skor</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{addictionLevel}</h3>
                <p className="text-slate-600">
                  {addictionLevel === "Ketergantungan rendah" && "Tingkat kecanduan Anda tergolong rendah. Namun, tetap perhatikan kebiasaan merokok Anda dan pertimbangkan untuk mengurangi konsumsi nikotin."}
                  {addictionLevel === "Ketergantungan rendah sampai sedang" && "Anda berada pada tingkat kecanduan rendah hingga sedang. Ini adalah waktu yang baik untuk mulai memikirkan langkah-langkah untuk berhenti merokok."}
                  {addictionLevel === "Ketergantungan sedang" && "Tingkat kecanduan Anda sedang. Disarankan untuk mencari dukungan dan menggunakan metode yang lebih efektif untuk berhenti merokok."}
                  {addictionLevel === "Ketergantungan tinggi" && "Tingkat kecanduan Anda tergolong tinggi. Ini mungkin saatnya untuk mencari bantuan profesional dan mengevaluasi berbagai metode untuk berhenti merokok."}
                </p>
              </div>
            </div>

            {percentage > 0 && (
              <div className="mt-8">
                <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                  <span>Tingkat Ketergantungan</span>
                  <span>{percentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                      percentage < 33 ? "bg-teal-400" : percentage < 66 ? "bg-amber-400" : "bg-rose-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddictionTestPage;
