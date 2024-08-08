import Swal from "sweetalert2";

const TesHandler = {
  async hitungKecanduan() {
    const questions = [
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
    let allAnswered = true;
    let firstUnanswered = null;

    questions.forEach((question) => {
      if (!document.querySelector(`input[name="${question}"]:checked`)) {
        allAnswered = false;
        if (!firstUnanswered) {
          firstUnanswered = question;
        }
      }
    });

    if (!allAnswered) {
      Swal.fire({
        title: "Harap isi semua pertanyaan.",
        text: "Silakan lengkapi semua pertanyaan yang belum dijawab.",
        icon: "warning",
      }).then(() => {
        document
          .querySelector(`input[name="${firstUnanswered}"]`)
          .scrollIntoView();
        document.querySelector(`input[name="${firstUnanswered}"]`).focus();
      });
      return {};
    }

    let skor = 0;
    questions.forEach((question) => {
      skor += parseInt(
        document.querySelector(`input[name="${question}"]:checked`).value
      );
    });

    let tingkatKecanduan = "";
    if (skor <= 2) {
      tingkatKecanduan = "Ketergantungan rendah";
    } else if (skor <= 4) {
      tingkatKecanduan = "Ketergantungan rendah sampai sedang";
    } else if (skor <= 7) {
      tingkatKecanduan = "Ketergantungan sedang";
    } else {
      tingkatKecanduan = "Ketergantungan tinggi";
    }

    const persentase = (skor / 11) * 100;

    let barClass = "";
    if (skor <= 2) {
      barClass = "low";
    } else if (skor <= 4) {
      barClass = "medium";
    } else if (skor <= 7) {
      barClass = "medium";
    } else {
      barClass = "high";
    }

    return {
      score: skor,
      addictionLevel: tingkatKecanduan,
      progressClass: barClass,
      percentage: persentase,
    };
  },

  clearForm() {
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.checked = false;
    });
  },
};

export default TesHandler;
