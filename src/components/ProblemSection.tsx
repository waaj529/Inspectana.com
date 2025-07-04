import React from 'react';
import { Warning, Clock, CurrencyDollar, Users, TrendDown } from '@phosphor-icons/react';

const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: <Clock className="w-8 h-8 text-accent" />,
      title: "Manual Processing Bottlenecks",
      description: "Traditional inspection workflows require extensive manual review, data entry, and report generation, creating delays in claim processing and customer service."
    },
    {
      icon: <CurrencyDollar className="w-8 h-8 text-accent" />,
      title: "High Operational Costs",
      description: "Manual inspections involve travel expenses, inspector fees, and administrative overhead that significantly impact operational efficiency and profitability."
    },
    {
      icon: <Warning className="w-8 h-8 text-accent" />,
      title: "Inconsistent Data Quality",
      description: "Human-dependent inspections result in variable data quality, subjective assessments, and incomplete documentation that affects underwriting accuracy."
    },
    {
      icon: <TrendDown className="w-8 h-8 text-accent" />,
      title: "Limited Scalability",
      description: "Traditional inspection methods cannot scale efficiently with growing policy volumes, creating capacity constraints and service delays."
    }
  ];

  return (
    <section id="problem" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6">
            The Insurance Inspection Challenge
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Insurance companies face mounting pressure to process inspections faster while maintaining accuracy and controlling costs. 
            Traditional methods are failing to meet modern demands for efficiency and scalability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-neutral-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm flex-shrink-0">
                  {problem.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-700 mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-accent/10 to-primary-700/5 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-12 h-12 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-primary-700 mb-4">
            Industry Impact
          </h3>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Insurance companies spend up to <span className="font-bold text-accent">40% of their operational budget</span> on 
            inefficient inspection processes, while customer satisfaction suffers from delays and inconsistent service delivery.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;