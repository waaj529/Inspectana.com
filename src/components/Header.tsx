import React, { useState, useEffect, useRef, useCallback } from 'react';
import { List, X } from '@phosphor-icons/react';
import InspectionRequestModal from './InspectionRequestModal';
import OptimizedImage from './OptimizedImage';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const controlHeader = useCallback(() => {
      const currentScrollY = window.scrollY;
      
      // Show header when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide header when scrolling down, show when scrolling up
    else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false); // Close mobile menu when hiding header
    } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      
    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(controlHeader);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controlHeader]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
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
              <a href="/" aria-label="Inspectana Home">
                <OptimizedImage 
                  src="/Inspectana Web Logo.png" 
                  alt="Inspectana Logo" 
                  className="h-8 w-auto"
                  priority={true}
                />
              </a>
            </div>
            
            {/* Centered Navigation */}
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8" aria-label="Main navigation">
              <a
                href="#problem"
                onClick={(e) => handleNavClick(e, 'problem')}
                className="text-neutral-600 hover:text-primary-700 transition-colors duration-200"
                aria-label="Navigate to the Challenge section"
              >
                Challenge
              </a>
              <a
                href="#solution"
                onClick={(e) => handleNavClick(e, 'solution')}
                className="text-neutral-600 hover:text-primary-700 transition-colors duration-200"
                aria-label="Navigate to the Platform section"
              >
                Platform
              </a>
              <a
                href="#benefits"
                onClick={(e) => handleNavClick(e, 'benefits')}
                className="text-neutral-600 hover:text-primary-700 transition-colors duration-200"
                aria-label="Navigate to the Benefits section"
              >
                Benefits
              </a>
            </nav>

            {/* CTA Button on the right */}
            <div className="hidden md:block">
              <button
                onClick={handleGetStarted}
                className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-600 transition-colors duration-200"
                aria-label="Request an inspection demo"
              >
                Request Inspection
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-neutral-600 hover:text-primary-700"
                aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm border-t">
                <a
                  href="#problem"
                  onClick={(e) => handleNavClick(e, 'problem')}
                  className="text-neutral-600 hover:text-primary-700 block px-3 py-2 w-full text-left"
                  aria-label="Navigate to the Challenge section"
                >
                  Challenge
                </a>
                <a
                  href="#solution"
                  onClick={(e) => handleNavClick(e, 'solution')}
                  className="text-neutral-600 hover:text-primary-700 block px-3 py-2 w-full text-left"
                  aria-label="Navigate to the Platform section"
                >
                  Platform
                </a>
                <a
                  href="#benefits"
                  onClick={(e) => handleNavClick(e, 'benefits')}
                  className="text-neutral-600 hover:text-primary-700 block px-3 py-2 w-full text-left"
                  aria-label="Navigate to the Benefits section"
                >
                  Benefits
                </a>
                <button
                  onClick={handleGetStarted}
                  className="bg-accent text-white block px-3 py-2 rounded-lg hover:bg-accent-600 transition-colors duration-200 w-full text-left"
                  aria-label="Request an inspection demo"
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