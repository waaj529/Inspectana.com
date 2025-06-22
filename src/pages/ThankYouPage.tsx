import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Envelope, Calendar } from '@phosphor-icons/react';

const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce-gentle" />
            <h1 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Thank You for Your Interest!
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              We've received your information and are excited to show you how Inspectana can transform your inspection processes.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-primary-700 mb-4">What happens next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <Envelope className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary-700">Email Confirmation</p>
                  <p className="text-sm text-neutral-600">You'll receive a confirmation email within the next few minutes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary-700">Personal Demo</p>
                  <p className="text-sm text-neutral-600">Our team will contact you within 24 hours to schedule a personalized demonstration.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-neutral-600">
              Have questions in the meantime? Contact us directly at{' '}
              <a href="mailto:contact@inspectana.com" className="text-accent hover:text-accent-600 font-medium">
                contact@inspectana.com
              </a>
            </p>
            
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;