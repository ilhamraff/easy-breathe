import React from "react";
import TesHandler from "../utils/addictionHandler";

function AddictionForm({ onCalculateAddiction }) {
  const handleCalculate = async () => {
    const result = await TesHandler.hitungKecanduan();
    if (result && result.score !== undefined) {
      onCalculateAddiction(result);
    }
  };

  return (
    <form>
      <p>1. Usia:</p>
      <div>
        <input type="radio" name="age" value="0" id="under-18" />
        <label htmlFor="under-18">Di bawah 18 tahun</label>
      </div>
      <div>
        <input type="radio" name="age" value="0" id="18-24" />
        <label htmlFor="18-24">18-24 tahun</label>
      </div>
      <div>
        <input type="radio" name="age" value="0" id="25-34" />
        <label htmlFor="25-34">25-34 tahun</label>
      </div>
      <div>
        <input type="radio" name="age" value="0" id="35-44" />
        <label htmlFor="35-44">35-44 tahun</label>
      </div>
      <div>
        <input type="radio" name="age" value="0" id="45-54" />
        <label htmlFor="45-54">45-54 tahun</label>
      </div>
      <div>
        <input type="radio" name="age" value="0" id="55-64" />
        <label htmlFor="55-64">55-64 tahun</label>
      </div>
      <div>
        <input type="radio" name="age" value="0" id="65-above" />
        <label htmlFor="65-above">65 tahun ke atas</label>
      </div>

      <p>2. Jenis Kelamin:</p>
      <div>
        <input type="radio" name="gender" value="0" id="male" />
        <label htmlFor="male">Laki-laki</label>
      </div>
      <div>
        <input type="radio" name="gender" value="0" id="female" />
        <label htmlFor="female">Perempuan</label>
      </div>

      <p>3. Status Pendidikan:</p>
      <div>
        <input type="radio" name="education" value="0" id="no-education" />
        <label htmlFor="no-education">Tidak/belum sekolah</label>
      </div>
      <div>
        <input type="radio" name="education" value="0" id="elementary" />
        <label htmlFor="elementary">SD/Sederajat</label>
      </div>
      <div>
        <input type="radio" name="education" value="0" id="junior-high" />
        <label htmlFor="junior-high">SMP/Sederajat</label>
      </div>
      <div>
        <input type="radio" name="education" value="0" id="senior-high" />
        <label htmlFor="senior-high">SMA/Sederajat</label>
      </div>
      <div>
        <input type="radio" name="education" value="0" id="diploma" />
        <label htmlFor="diploma">Diploma</label>
      </div>
      <div>
        <input type="radio" name="education" value="0" id="bachelor" />
        <label htmlFor="bachelor">Sarjana (S1)</label>
      </div>
      <div>
        <input type="radio" name="education" value="0" id="postgraduate" />
        <label htmlFor="postgraduate">Pascasarjana (S2/S3)</label>
      </div>

      <p>4. Pekerjaan:</p>
      <div>
        <input type="radio" name="occupation" value="0" id="student" />
        <label htmlFor="student">Pelajar/Mahasiswa</label>
      </div>
      <div>
        <input type="radio" name="occupation" value="0" id="private" />
        <label htmlFor="private">Pegawai Swasta</label>
      </div>
      <div>
        <input type="radio" name="occupation" value="0" id="government" />
        <label htmlFor="government">Pegawai Negeri</label>
      </div>
      <div>
        <input type="radio" name="occupation" value="0" id="entrepreneur" />
        <label htmlFor="entrepreneur">Wirausaha</label>
      </div>
      <div>
        <input type="radio" name="occupation" value="0" id="freelancer" />
        <label htmlFor="freelancer">Pekerja Lepas/Freelancer</label>
      </div>
      <div>
        <input type="radio" name="occupation" value="0" id="unemployed" />
        <label htmlFor="unemployed">Tidak bekerja</label>
      </div>
      <div>
        <input type="radio" name="occupation" value="0" id="others" />
        <label htmlFor="others">Lainnya</label>
      </div>

      <p>5. Berapa banyak Anda merokok dalam sehari?</p>
      <div>
        <input type="radio" name="q1" value="1" id="less-10" />
        <label htmlFor="less-10">kurang dari 10 batang/hari</label>
      </div>
      <div>
        <input type="radio" name="q1" value="2" id="11-20" />
        <label htmlFor="11-20">11-20 batang/hari</label>
      </div>
      <div>
        <input type="radio" name="q1" value="3" id="21-30" />
        <label htmlFor="21-30">21-30 batang/hari</label>
      </div>
      <div>
        <input type="radio" name="q1" value="4" id="more-30" />
        <label htmlFor="more-30">lebih dari 30 batang/hari</label>
      </div>

      <p>6. Seberapa cepat Anda merokok setelah bangun tidur?</p>
      <div>
        <input type="radio" name="q2" value="3" id="5-min" />
        <label htmlFor="5-min">5 menit setelah bangun tidur</label>
      </div>
      <div>
        <input type="radio" name="q2" value="2" id="6-30-min" />
        <label htmlFor="6-30-min">6-30 menit setelah bangun tidur</label>
      </div>
      <div>
        <input type="radio" name="q2" value="1" id="30-min" />
        <label htmlFor="30-min">30 menit setelah bangun tidur</label>
      </div>

      <p>
        7. Apakah Anda merasa kesulitan untuk tidak merokok di “no smoking
        area”?
      </p>
      <div>
        <input type="radio" name="q3" value="1" id="yes-q3" />
        <label htmlFor="yes-q3">Ya</label>
      </div>
      <div>
        <input type="radio" name="q3" value="0" id="no-q3" />
        <label htmlFor="no-q3">Tidak</label>
      </div>

      <p>8. Apakah Anda kesulitan untuk tidak merokok di pagi hari?</p>
      <div>
        <input type="radio" name="q4" value="1" id="yes-q4" />
        <label htmlFor="yes-q4">Ya</label>
      </div>
      <div>
        <input type="radio" name="q4" value="0" id="no-q4" />
        <label htmlFor="no-q4">Tidak</label>
      </div>

      <p>
        9. Apakah Anda lebih sering merokok saat bekerja/belajar daripada saat
        jam istirahat?
      </p>
      <div>
        <input type="radio" name="q5" value="1" id="yes-q5" />
        <label htmlFor="yes-q5">Ya</label>
      </div>
      <div>
        <input type="radio" name="q5" value="0" id="no-q5" />
        <label htmlFor="no-q5">Tidak</label>
      </div>

      <p>10. Apakah Anda masih merokok saat sakit?</p>
      <div>
        <input type="radio" name="q6" value="1" id="yes-q6" />
        <label htmlFor="yes-q6">Ya</label>
      </div>
      <div>
        <input type="radio" name="q6" value="0" id="no-q6" />
        <label htmlFor="no-q6">Tidak</label>
      </div>

      <div className="button-group">
        <button type="button" className="hitung" onClick={handleCalculate}>
          Hitung Kecanduan
        </button>
        <button type="button" className="clear" onClick={TesHandler.clearForm}>
          Bersihkan Jawaban
        </button>
      </div>
    </form>
  );
}

export default AddictionForm;
