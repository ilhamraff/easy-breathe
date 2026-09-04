import React, { useState, useRef } from "react";
import {
  calculateAddiction,
  validateAnswers,
} from "../utils/addictionCalculator";
import { showErrorToast } from "../utils/toast";

const ALL_QUESTIONS = [
  "age",
  "gender",
  "education",
  "occupation",
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
];

const SCORED_QUESTIONS = ["q1", "q2", "q3", "q4", "q5", "q6"];

function RadioGroup({ name, label, options, value, onChange }) {
  return (
    <div className="mb-8 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-teal-200" id={name}>
      <p className="text-lg font-semibold text-slate-800 mb-4">{label}</p>
      <div className="space-y-3">
        {options.map((option) => (
          <label 
            key={option.id} 
            className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
              value === option.value 
                ? "border-teal-500 bg-teal-50" 
                : "border-slate-200 hover:border-teal-200 hover:bg-slate-50"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              id={option.id}
              checked={value === option.value}
              onChange={() => onChange(name, option.value)}
              className="w-5 h-5 text-teal-600 border-gray-300 focus:ring-teal-500"
            />
            <span className={`ml-3 text-base ${value === option.value ? "text-teal-900 font-medium" : "text-slate-700"}`}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function AddictionForm({ onCalculateAddiction }) {
  const [answers, setAnswers] = useState({});
  const formRef = useRef(null);

  const handleChange = (name, value) => {
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    const { allAnswered, firstUnanswered } = validateAnswers(
      answers,
      ALL_QUESTIONS
    );

    if (!allAnswered) {
      showErrorToast("Harap isi semua pertanyaan.");
      const element = document.getElementById(firstUnanswered);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const result = calculateAddiction(answers, SCORED_QUESTIONS);
    onCalculateAddiction(result);
  };

  const handleClear = () => {
    setAnswers({});
    onCalculateAddiction({ score: null, addictionLevel: "", progressClass: "", percentage: 0 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="max-w-3xl mx-auto">
      <RadioGroup
        name="age"
        label="1. Usia:"
        value={answers.age}
        onChange={handleChange}
        options={[
          { id: "under-18", value: "under-18", label: "Di bawah 18 tahun" },
          { id: "18-24", value: "18-24", label: "18-24 tahun" },
          { id: "25-34", value: "25-34", label: "25-34 tahun" },
          { id: "35-44", value: "35-44", label: "35-44 tahun" },
          { id: "45-54", value: "45-54", label: "45-54 tahun" },
          { id: "55-64", value: "55-64", label: "55-64 tahun" },
          { id: "65-above", value: "65-above", label: "65 tahun ke atas" },
        ]}
      />

      <RadioGroup
        name="gender"
        label="2. Jenis Kelamin:"
        value={answers.gender}
        onChange={handleChange}
        options={[
          { id: "male", value: "male", label: "Laki-laki" },
          { id: "female", value: "female", label: "Perempuan" },
        ]}
      />

      <RadioGroup
        name="education"
        label="3. Status Pendidikan:"
        value={answers.education}
        onChange={handleChange}
        options={[
          { id: "no-education", value: "no-education", label: "Tidak/belum sekolah" },
          { id: "elementary", value: "elementary", label: "SD/Sederajat" },
          { id: "junior-high", value: "junior-high", label: "SMP/Sederajat" },
          { id: "senior-high", value: "senior-high", label: "SMA/Sederajat" },
          { id: "diploma", value: "diploma", label: "Diploma" },
          { id: "bachelor", value: "bachelor", label: "Sarjana (S1)" },
          { id: "postgraduate", value: "postgraduate", label: "Pascasarjana (S2/S3)" },
        ]}
      />

      <RadioGroup
        name="occupation"
        label="4. Pekerjaan:"
        value={answers.occupation}
        onChange={handleChange}
        options={[
          { id: "student", value: "student", label: "Pelajar/Mahasiswa" },
          { id: "private", value: "private", label: "Pegawai Swasta" },
          { id: "government", value: "government", label: "Pegawai Negeri" },
          { id: "entrepreneur", value: "entrepreneur", label: "Wirausaha" },
          { id: "freelancer", value: "freelancer", label: "Pekerja Lepas/Freelancer" },
          { id: "unemployed", value: "unemployed", label: "Tidak bekerja" },
          { id: "others", value: "others", label: "Lainnya" },
        ]}
      />

      <RadioGroup
        name="q1"
        label="5. Berapa banyak Anda merokok dalam sehari?"
        value={answers.q1}
        onChange={handleChange}
        options={[
          { id: "less-10", value: "1", label: "kurang dari 10 batang/hari" },
          { id: "11-20", value: "2", label: "11-20 batang/hari" },
          { id: "21-30", value: "3", label: "21-30 batang/hari" },
          { id: "more-30", value: "4", label: "lebih dari 30 batang/hari" },
        ]}
      />

      <RadioGroup
        name="q2"
        label="6. Seberapa cepat Anda merokok setelah bangun tidur?"
        value={answers.q2}
        onChange={handleChange}
        options={[
          {
            id: "5-min",
            value: "3",
            label: "5 menit setelah bangun tidur",
          },
          {
            id: "6-30-min",
            value: "2",
            label: "6-30 menit setelah bangun tidur",
          },
          {
            id: "30-min",
            value: "1",
            label: "30 menit setelah bangun tidur",
          },
        ]}
      />

      <RadioGroup
        name="q3"
        label='7. Apakah Anda merasa kesulitan untuk tidak merokok di "no smoking area"?'
        value={answers.q3}
        onChange={handleChange}
        options={[
          { id: "yes-q3", value: "1", label: "Ya" },
          { id: "no-q3", value: "0", label: "Tidak" },
        ]}
      />

      <RadioGroup
        name="q4"
        label="8. Apakah Anda kesulitan untuk tidak merokok di pagi hari?"
        value={answers.q4}
        onChange={handleChange}
        options={[
          { id: "yes-q4", value: "1", label: "Ya" },
          { id: "no-q4", value: "0", label: "Tidak" },
        ]}
      />

      <RadioGroup
        name="q5"
        label="9. Apakah Anda lebih sering merokok saat bekerja/belajar daripada saat jam istirahat?"
        value={answers.q5}
        onChange={handleChange}
        options={[
          { id: "yes-q5", value: "1", label: "Ya" },
          { id: "no-q5", value: "0", label: "Tidak" },
        ]}
      />

      <RadioGroup
        name="q6"
        label="10. Apakah Anda masih merokok saat sakit?"
        value={answers.q6}
        onChange={handleChange}
        options={[
          { id: "yes-q6", value: "1", label: "Ya" },
          { id: "no-q6", value: "0", label: "Tidak" },
        ]}
      />

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <button 
          type="button" 
          onClick={handleCalculate}
          className="flex-1 rounded-xl bg-teal-600 px-6 py-4 text-base font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-colors"
        >
          Hitung Kecanduan
        </button>
        <button 
          type="button" 
          onClick={handleClear}
          className="flex-1 rounded-xl bg-rose-50 px-6 py-4 text-base font-semibold text-rose-600 shadow-sm ring-1 ring-inset ring-rose-200 hover:bg-rose-100 transition-colors"
        >
          Bersihkan Jawaban
        </button>
      </div>
    </form>
  );
}

export default AddictionForm;
