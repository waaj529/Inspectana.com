import React from 'react';
import { Drone, Brain, ChartBar, FileText, Target, Shield } from '@phosphor-icons/react';

const SolutionSection: React.FC = () => {
  const features = [
    {
      icon: <Drone className="w-10 h-10 text-accent" />,
      title: "Autonomous Drone Operations",
      description: "Pre-programmed flight paths with intelligent obstacle avoidance and real-time adaptation to environmental conditions."
    },
    {
      icon: <Brain className="w-10 h-10 text-accent" />,
      title: "AI-Powered Analysis",
      description: "Machine learning algorithms automatically detect anomalies, assess damage severity, and predict maintenance needs."
    },
    {
      icon: <ChartBar className="w-10 h-10 text-accent" />,
      title: "Real-Time Dashboards",
      description: "Live monitoring and instant alerts with comprehensive analytics and trend visualization for informed decision-making."
    },
    {
      icon: <FileText className="w-10 h-10 text-accent" />,
      title: "Automated Reporting",
      description: "Generate detailed inspection reports with photos, measurements, and recommendations in minutes, not days."
    },
    {
      icon: <Target className="w-10 h-10 text-accent" />,
      title: "Multi-Sensor Integration",
      description: "Combine visual, thermal, and LiDAR data for comprehensive infrastructure assessment and documentation."
    },
    {
      icon: <Shield className="w-10 h-10 text-accent" />,
      title: "Professional Grade Security",
      description: "Advanced encryption, secure data storage, and compliance with industry regulations and standards."
    }
  ];

  return (
    <section id="solution" className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6">
            The Inspectana Solution
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our comprehensive drone inspection platform combines cutting-edge hardware with intelligent software 
            to deliver faster, safer, and more accurate infrastructure assessments.
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
            Complete Workflow Integration
          </h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 rounded-lg p-6">
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Plan</h4>
              <p className="text-sm text-primary-100">Define inspection routes and parameters</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Execute</h4>
              <p className="text-sm text-primary-100">Automated drone data collection</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Analyze</h4>
              <p className="text-sm text-primary-100">AI-powered data processing</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Report</h4>
              <p className="text-sm text-primary-100">Actionable insights and recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;