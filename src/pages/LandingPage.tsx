import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import BenefitsSection from '../components/BenefitsSection';
import InterestForm from '../components/InterestForm';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <InterestForm />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;