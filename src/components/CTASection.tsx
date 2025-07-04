import React, { useState } from 'react';
import { ArrowRight, Envelope, CheckCircle, Sparkle } from '@phosphor-icons/react';
import InspectionRequestModal from './InspectionRequestModal';

const CTASection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToForm = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkle className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Transform Your Business Today</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              Ready to Revolutionize Your Insurance Inspections?
            </h2>
            <p className="text-xl text-primary-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the growing number of insurance companies that have transformed their inspection processes 
              with Inspectana's intelligent drone platform and AI-powered analysis.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-accent/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Free Platform Demo</h3>
              <p className="text-primary-100">Experience the complete Inspectana platform with real inspection data and comprehensive features.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-accent/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Integration</h3>
              <p className="text-primary-100">Seamless integration with your existing insurance management systems and workflows.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-accent/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ROI Analysis</h3>
              <p className="text-primary-100">Detailed business case and ROI analysis for your specific operational requirements.</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  Get Started in Minutes
                </h3>
                <p className="text-lg text-primary-100 mb-8">
                  Don't let outdated inspection methods hold back your operations. 
                  Take the first step towards transformation with our intelligent platform.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    Request Inspection
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <a
                    href="mailto:contact@inspectana.com"
                    className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Envelope className="w-5 h-5" />
                    Email Us
                  </a>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="text-center mb-6">
                  <Envelope className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Contact Information</h4>
                  <p className="text-primary-200 text-sm">We're here to help you transform your inspection process</p>
                </div>
                
                <div className="text-center">
                  <p className="text-primary-100 font-medium text-lg mb-2">contact@inspectana.com</p>
                  <p className="text-primary-200">For all inquiries, demos, and platform support</p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                  <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Response within 24 hours</span>
                  </div>
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

export default CTASection;