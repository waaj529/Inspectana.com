import React from 'react';
import { TrendUp, Clock, Shield, CurrencyDollar, CheckCircle, Target } from '@phosphor-icons/react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <TrendUp className="w-8 h-8 text-accent" />,
      title: "87% Cost Reduction",
      description: "Eliminate expensive manual inspections and reduce operational overhead while increasing inspection frequency and coverage.",
      metric: "Average annual savings: $2.4M"
    },
    {
      icon: <Clock className="w-8 h-8 text-accent" />,
      title: "10x Faster Processing",
      description: "Complete comprehensive inspections in hours instead of weeks with automated workflows and instant report generation.",
      metric: "Time to insight: <2 hours"
    },
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: "99.9% Accuracy Improvement",
      description: "AI-powered analysis delivers consistent, objective assessments that eliminate human error and subjective bias.",
      metric: "Detection accuracy: 99.9%"
    },
    {
      icon: <Target className="w-8 h-8 text-accent" />,
      title: "Unlimited Scalability",
      description: "Process thousands of inspections simultaneously without capacity constraints or quality degradation.",
      metric: "Concurrent inspections: 1000+"
    }
  ];

  const additionalBenefits = [
    "Seamless integration with existing insurance management systems",
    "Real-time inspection tracking and progress monitoring",
    "Comprehensive audit trails for regulatory compliance",
    "Automated quality assurance and validation processes",
    "Advanced analytics for risk assessment and pricing optimization",
    "24/7 platform availability with enterprise-grade support"
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6">
            Measurable Business Impact
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Insurance companies using Inspectana achieve significant operational improvements and cost savings 
            within months of implementation, transforming their inspection capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-neutral-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-6">
                <div className="bg-accent/10 p-4 rounded-lg flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-700 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 leading-relaxed">
                    {benefit.description}
                  </p>
                  <div className="bg-accent/5 rounded-lg p-3">
                    <p className="text-sm font-semibold text-accent">
                      {benefit.metric}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-neutral-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-700 mb-4">
              Platform Capabilities
            </h3>
            <p className="text-lg text-neutral-600">
              Beyond cost savings and efficiency gains, Inspectana delivers comprehensive value across your insurance operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {additionalBenefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-neutral-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-accent to-accent-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            ROI Calculator
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">6-12</div>
              <div className="text-accent-100">Months to ROI</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$2.4M</div>
              <div className="text-accent-100">Average Annual Savings</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">350%</div>
              <div className="text-accent-100">3-Year ROI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;