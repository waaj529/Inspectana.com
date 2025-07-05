import React from 'react';
import { Envelope, MapPin, Shield, Rocket, Clock } from '@phosphor-icons/react';
import OptimizedImage from './OptimizedImage';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <OptimizedImage 
                src="/PNG.png" 
                alt="Inspectana Logo" 
                className="h-8 w-auto"
                loading="lazy"
              />
            </div>
            <p className="text-primary-200 mb-8 max-w-md text-lg leading-relaxed">
              Advanced drone inspection software for insurance companies. AI-powered analysis for 
              4 Point Inspections, Wind Mitigations, Roof Inspections, and Post Claim Inspections.
            </p>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="bg-primary-700/50 rounded-lg p-4 mb-2">
                  <Shield className="w-6 h-6 text-accent mx-auto" />
                </div>
                <p className="text-xs text-primary-300">Enterprise Grade</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-700/50 rounded-lg p-4 mb-2">
                  <Rocket className="w-6 h-6 text-accent mx-auto" />
                </div>
                <p className="text-xs text-primary-300">AI-Powered</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-700/50 rounded-lg p-4 mb-2">
                  <Clock className="w-6 h-6 text-accent mx-auto" />
                </div>
                <p className="text-xs text-primary-300">24/7 Support</p>
              </div>
            </div>
          </div>

          {/* Platform Features */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Platform Features</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => scrollToSection('solution')}
                  className="text-primary-200 hover:text-accent transition-colors duration-200 flex items-center group text-left"
                >
                  <span className="w-1 h-1 bg-accent rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  AI-Powered Analysis
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('solution')}
                  className="text-primary-200 hover:text-accent transition-colors duration-200 flex items-center group text-left"
                >
                  <span className="w-1 h-1 bg-accent rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Automated Reporting
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('solution')}
                  className="text-primary-200 hover:text-accent transition-colors duration-200 flex items-center group text-left"
                >
                  <span className="w-1 h-1 bg-accent rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  System Integration
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('solution')}
                  className="text-primary-200 hover:text-accent transition-colors duration-200 flex items-center group text-left"
                >
                  <span className="w-1 h-1 bg-accent rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Real-time Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-2 rounded-lg flex-shrink-0">
                  <Envelope className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Email</p>
                  <a href="mailto:contact@inspectana.com" className="text-primary-200 hover:text-accent transition-colors">
                    contact@inspectana.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-2 rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Headquarters</p>
                  <p className="text-primary-200">Cape Coral, Florida</p>
                  <p className="text-primary-200">United States</p>
                </div>
              </div>

              <div className="bg-primary-700/30 rounded-lg p-4 border border-primary-600/30">
                <p className="text-sm text-primary-200 mb-1">Response Time</p>
                <p className="text-accent font-semibold">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-primary-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <p className="text-primary-300 text-sm">
                © 2025 Inspectana. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-xs text-primary-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => scrollToSection('contact')}
                className="text-primary-300 hover:text-accent text-sm transition-colors duration-200 font-medium"
              >
                Get Demo
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-primary-300 hover:text-accent text-sm transition-colors duration-200 font-medium"
              >
                View Benefits
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-primary-300 hover:text-accent text-sm transition-colors duration-200 font-medium"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;