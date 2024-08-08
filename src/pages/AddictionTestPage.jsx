import React, { useState } from "react";
import AddictionForm from "../components/FormAddiction";

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
    <section className="addiction-page">
      <h2>Tes Kecanduan</h2>
      <AddictionForm onCalculateAddiction={handleCalculateAddiction} />
      <div className="result-container">
        <h2>Hasil Kecanduan:</h2>
        <p>Skor Anda: {score !== null ? score : "-"}</p>
        <p>{addictionLevel}</p>
        {percentage > 0 && (
          <div className="progress-container">
            <div
              className={`progress-bar ${progressClass}`}
              style={{ width: `${percentage}%` }}
            >
              {percentage.toFixed(2)}%
            </div>
          </div>
        )}
        <p>
          <strong>Penjelasan: </strong>
          {addictionLevel === "Ketergantungan rendah" &&
            "Tingkat kecanduan Anda tergolong rendah. Namun, tetap perhatikan kebiasaan merokok Anda dan pertimbangkan untuk mengurangi konsumsi nikotin."}
          {addictionLevel === "Ketergantungan rendah sampai sedang" &&
            "Anda berada pada tingkat kecanduan rendah hingga sedang. Ini adalah waktu yang baik untuk mulai memikirkan langkah-langkah untuk berhenti merokok."}
          {addictionLevel === "Ketergantungan sedang" &&
            "Tingkat kecanduan Anda sedang. Disarankan untuk mencari dukungan dan menggunakan metode yang lebih efektif untuk berhenti merokok."}
          {addictionLevel === "Ketergantungan tinggi" &&
            "Tingkat kecanduan Anda tergolong tinggi. Ini mungkin saatnya untuk mencari bantuan profesional dan mengevaluasi berbagai metode untuk berhenti merokok."}
        </p>
      </div>
    </section>
  );
}

export default AddictionTestPage;
