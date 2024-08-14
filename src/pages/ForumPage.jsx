import React from "react";
import LoadingAnimation from "../components/Loading";

function ForumPage() {
  return (
    <div className="forum-page">
      <header className="forum-header">
        <h1>Forum dan Sharing</h1>
        <p>
          Selamat datang di forum diskusi kami, tempat Anda bisa berbagi cerita,
          bertanya, dan mendapatkan dukungan dalam perjalanan Anda untuk
          berhenti merokok. Jangan ragu untuk membuat postingan baru atau
          membalas diskusi yang ada. Mari kita saling membantu dan membangun
          komunitas yang lebih sehat!
        </p>
      </header>
      <section className="forum-content">
        <div className="forum-spinner-container">
          <LoadingAnimation />
        </div>
        <h2>Segera Hadir</h2>
      </section>
    </div>
  );
}

export default ForumPage;
