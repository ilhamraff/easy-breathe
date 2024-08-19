import React, { useRef } from "react";
import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitSection";
import FeaturesSection from "../components/FeaturesSection";
import ArticleSection from "../components/ArticlesSection";

function HomePage() {
  const benefitsRef = useRef(null);

  const scrollToBenefits = () => {
    benefitsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-page">
      <HeroSection onButtonClick={scrollToBenefits} />
      <div ref={benefitsRef}>
        <BenefitsSection />
      </div>
      <FeaturesSection />
      <ArticleSection />
    </div>
  );
}

export default HomePage;
