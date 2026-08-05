import React from "react";

function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Tentang Easy Breathe</h1>
        </header>

        <div className="mx-auto max-w-3xl space-y-12 text-lg leading-8 text-slate-700">
          <section className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Latar Belakang</h2>
            <p>
              Indonesia menghadapi masalah serius dengan tingginya prevalensi
              merokok, terutama di kalangan laki-laki dengan tingkat pendidikan dan
              ekonomi rendah yang tinggal di perkotaan. Dampak negatif dari merokok
              tidak hanya dirasakan secara individu, tetapi juga berdampak secara
              sosial. Meskipun berbagai upaya telah dilakukan untuk mengurangi angka
              perokok, masih terdapat kesenjangan dalam kesadaran akan risiko
              kesehatan yang ditimbulkan oleh rokok. Pola konsumsi rokok yang
              tinggi, usia mulai merokok yang semakin muda, serta pengaruh ekonomi
              yang signifikan terhadap keputusan merokok menjadi tantangan besar
              yang harus dihadapi.
            </p>
          </section>

          <section className="bg-teal-600 text-white rounded-3xl p-8 sm:p-10 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Misi Kami</h2>
            <p className="text-teal-50">
              Website Easy Breathe hadir untuk memberikan informasi dan sumber daya
              yang komprehensif dalam membantu masyarakat Indonesia berhenti
              merokok. Kami berkomitmen untuk meningkatkan kesadaran tentang risiko
              kesehatan dari merokok, menyediakan tes kecanduan nikotin, serta
              memberi dukungan melalui artikel, kalkulator penghematan, dan berbagai
              fitur lainnya.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
