import React from "react";
import Forum from "../components/Forum";

function ForumPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Forum dan Sharing</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Selamat datang di forum diskusi kami, tempat Anda bisa berbagi cerita,
            bertanya, dan mendapatkan dukungan dalam perjalanan Anda untuk
            berhenti merokok. Mari kita saling membantu dan membangun
            komunitas yang lebih sehat!
          </p>
        </header>
        
        <div className="max-w-3xl mx-auto">
          <Forum />
        </div>
      </div>
    </div>
  );
}

export default ForumPage;
