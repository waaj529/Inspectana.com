import React from 'react';
import { Drone, Brain, ChartBar, FileText, Target, Shield } from '@phosphor-icons/react';

const SolutionSection: React.FC = () => {
  const features = [
    {
      icon: <Drone className="w-10 h-10 text-accent" />,
      title: "Automated Drone Operations",
      description: "Intelligent flight planning and autonomous data collection for 4 Point, Wind Mitigation, Roof, and Post Claim inspections with minimal human intervention."
    },
    {
      icon: <Brain className="w-10 h-10 text-accent" />,
      title: "AI-Powered Analysis",
      description: "Machine learning algorithms automatically detect damage, assess conditions, and generate accurate measurements with consistent, objective results."
    },
    {
      icon: <ChartBar className="w-10 h-10 text-accent" />,
      title: "Real-Time Dashboards",
      description: "Comprehensive analytics platform with live inspection tracking, performance metrics, and business intelligence for operational optimization."
    },
    {
      icon: <FileText className="w-10 h-10 text-accent" />,
      title: "Automated Reporting",
      description: "Generate standardized inspection reports instantly with photos, measurements, and recommendations that meet insurance industry requirements."
    },
    {
      icon: <Target className="w-10 h-10 text-accent" />,
      title: "Multi-Sensor Integration",
      description: "Combine visual, thermal, and LiDAR data for comprehensive property assessment with enhanced accuracy and detailed documentation."
    },
    {
      icon: <Shield className="w-10 h-10 text-accent" />,
      title: "Enterprise Security",
      description: "Bank-level encryption, secure cloud storage, and compliance with insurance industry regulations and data protection standards."
    }
  ];

  return (
    <section id="solution" className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6">
            The Inspectana Platform
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our comprehensive software platform transforms insurance inspections with intelligent automation, 
            AI-powered analysis, and seamless integration into your existing workflow systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-700 mb-4">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary-700 to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Streamlined Workflow Integration
          </h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 rounded-lg p-6">
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Deploy</h4>
              <p className="text-sm text-primary-100">Automated drone deployment and data collection</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Analyze</h4>
              <p className="text-sm text-primary-100">AI-powered analysis and damage detection</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Generate</h4>
              <p className="text-sm text-primary-100">Automated report generation and validation</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Integrate</h4>
              <p className="text-sm text-primary-100">Seamless integration with existing systems</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;