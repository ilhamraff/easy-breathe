import React from "react";
import { Button } from "./ui/Button";

function HeroSection({ onButtonClick }) {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-32 lg:pt-36">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80d0c7] to-[#008080] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Bebaskan Diri Anda dari <span className="text-teal-600">Kecanduan Merokok</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Mulailah perjalanan Anda menuju kehidupan yang lebih sehat tanpa rokok. Kami menyediakan alat, dukungan, dan komunitas untuk membantu Anda.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" onClick={onButtonClick}>
              Mulai Sekarang
            </Button>
          </div>
        </div>
        
        {/* <div className="mt-16 flow-root sm:mt-24">
          <div className="relative -m-2 rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <img
              src="home.png"
              alt="Ilustrasi gaya hidup sehat tanpa rokok"
              className="rounded-md shadow-2xl ring-1 ring-slate-900/10 w-full object-cover md:h-[600px]"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default HeroSection;
