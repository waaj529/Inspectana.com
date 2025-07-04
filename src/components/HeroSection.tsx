import React, { useState } from 'react';
import { ArrowRight, Shield, Lightning } from '@phosphor-icons/react';
import InspectionRequestModal from './InspectionRequestModal';

const HeroSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToForm = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="pt-16 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        ></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/85 via-primary-600/75 to-primary-500/85"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="flex justify-center items-center">
            <div className="animate-slide-up text-center max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block mb-2">Automate. Analyze.</span>
                <span className="text-accent text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                  Inspect Smarter
                </span>
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Revolutionize your inspection workflow with cutting-edge drone technology. Streamline 4 Point Inspections, Wind Mitigations, Roof Inspections, and Post-Claim Inspections with high-resolution imagery and detailed reporting for faster, more accurate results.

              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Request Inspection
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-700 transition-all duration-300"
                >
                  View Platform
                </button>
              </div>
              <div className="flex items-center gap-6 text-sm text-primary-100 justify-center">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Enterprise Grade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lightning className="w-4 h-4" />
                  <span>AI-Powered Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InspectionRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default HeroSection;