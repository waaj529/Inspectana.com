import React, { useState, useEffect } from 'react';
import { List, X } from '@phosphor-icons/react';
import InspectionRequestModal from './InspectionRequestModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide header when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false); // Close mobile menu when hiding header
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleGetStarted = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`bg-white/95 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/Inspectana Web Logo.png" 
                alt="Inspectana Logo" 
                className="h-8 w-auto"
              />
            </div>
            
            {/* Centered Navigation */}
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
              <button
                onClick={() => scrollToSection('problem')}
                className="text-neutral-600 hover:text-primary-700 transition-colors duration-200"
              >
                Challenge
              </button>
              <button
                onClick={() => scrollToSection('solution')}
                className="text-neutral-600 hover:text-primary-700 transition-colors duration-200"
              >
                Platform
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-neutral-600 hover:text-primary-700 transition-colors duration-200"
              >
                Benefits
              </button>
            </nav>

            {/* CTA Button on the right */}
            <div className="hidden md:block">
              <button
                onClick={handleGetStarted}
                className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-600 transition-colors duration-200"
              >
                Request Inspection
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-neutral-600 hover:text-primary-700"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm border-t">
                <button
                  onClick={() => scrollToSection('problem')}
                  className="text-neutral-600 hover:text-primary-700 block px-3 py-2 w-full text-left"
                >
                  Challenge
                </button>
                <button
                  onClick={() => scrollToSection('solution')}
                  className="text-neutral-600 hover:text-primary-700 block px-3 py-2 w-full text-left"
                >
                  Platform
                </button>
                <button
                  onClick={() => scrollToSection('benefits')}
                  className="text-neutral-600 hover:text-primary-700 block px-3 py-2 w-full text-left"
                >
                  Benefits
                </button>
                <button
                  onClick={handleGetStarted}
                  className="bg-accent text-white block px-3 py-2 rounded-lg hover:bg-accent-600 transition-colors duration-200 w-full text-left"
                >
                  Request Inspection
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <InspectionRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Header;