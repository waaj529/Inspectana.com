import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaperPlaneTilt, User, Envelope, Buildings, Phone, ChatCircle, Drone, Sparkle, Lightning, Target, CheckCircle, ArrowRight, Star } from '@phosphor-icons/react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

const InterestForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call and email notification
    try {
      // In a real application, you would send this data to your backend
      console.log('Form submitted:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to thank you page
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error - in production, show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-accent/20 to-primary-700/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-primary-700/10 to-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-accent/15 to-primary-700/15 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-accent/10 to-primary-700/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-accent/20">
            <Sparkle className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-sm font-semibold text-primary-700">Transform Your Business Today</span>
            <Sparkle className="w-5 h-5 text-accent animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-700 mb-6 leading-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary-700">Transform</span> Your Inspections?
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Join forward-thinking insurance companies revolutionizing their inspection processes with Inspectana's 
            intelligent drone platform and AI-powered analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Benefits & Info */}
          <div className="animate-slide-up space-y-8">
            {/* Main Value Proposition */}
            <div className="bg-gradient-to-br from-white to-neutral-50 rounded-3xl p-8 shadow-xl border border-neutral-200/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary-700 to-accent"></div>
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-accent to-accent-600 p-4 rounded-2xl shadow-lg flex-shrink-0">
                  <Drone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary-700 mb-4">
                    Next-Generation Insurance Technology
                  </h3>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                    Experience the future of insurance inspections with AI-powered analysis, 
                    automated workflows, and real-time insights that transform how you process claims and assess risk.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-accent fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-neutral-600">Trusted by leading insurers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200/50 hover:border-accent/30">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-3 rounded-xl mb-4 group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-300">
                  <ChatCircle className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-bold text-primary-700 mb-2 text-lg">Free Platform Demo</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">See the complete Inspectana platform in action with real inspection data and comprehensive feature demonstrations.</p>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200/50 hover:border-accent/30">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-3 rounded-xl mb-4 group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-300">
                  <Lightning className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-bold text-primary-700 mb-2 text-lg">Custom Integration</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">Seamless integration with your existing insurance management systems and workflow processes.</p>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200/50 hover:border-accent/30">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-3 rounded-xl mb-4 group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-300">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-bold text-primary-700 mb-2 text-lg">Implementation Support</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">Complete implementation support with training, onboarding, and ongoing technical assistance.</p>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200/50 hover:border-accent/30">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-3 rounded-xl mb-4 group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-300">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-bold text-primary-700 mb-2 text-lg">ROI Analysis</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">Detailed ROI analysis and business case development for your specific operational requirements.</p>
              </div>
            </div>

            {/* Company Info - Fixed Alignment */}
            <div className="bg-gradient-to-r from-primary-700 to-primary-600 rounded-3xl p-8 text-white relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/30 rounded-full blur-xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header with icon and title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-1">Innovative Technology Company</h4>
                    <p className="text-primary-100 text-sm">Cape Coral, Florida • Founded 2025</p>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-primary-100 leading-relaxed mb-8 text-base">
                  We're focused on delivering cutting-edge insurance technology with personalized service 
                  and rapid innovation. Building the future of insurance inspections, one platform at a time.
                </p>
                
                {/* Stats Grid - Properly aligned */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">24h</div>
                    <div className="text-xs text-primary-200 font-medium">Response Time</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">100%</div>
                    <div className="text-xs text-primary-200 font-medium">Custom Solutions</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">2025</div>
                    <div className="text-xs text-primary-200 font-medium">Next-Gen Tech</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-neutral-200/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-primary-700 to-accent"></div>
              
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-accent/10 to-primary-700/10 rounded-full px-4 py-2 mb-4">
                  <Sparkle className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-primary-700">Get Started Today</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary-700 mb-2">
                  Request Your Inspection Demo
                </h3>
                <p className="text-neutral-600">
                  Transform your inspection workflow in just 30 minutes
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-primary-700 mb-3">
                      <User className="w-4 h-4 inline mr-2" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 bg-neutral-50/50 hover:bg-white ${
                        errors.firstName ? 'border-red-300' : 'border-neutral-200'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-2">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-primary-700 mb-3">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 bg-neutral-50/50 hover:bg-white ${
                        errors.lastName ? 'border-red-300' : 'border-neutral-200'
                      }`}
                      placeholder="Smith"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-2">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-primary-700 mb-3">
                    <Envelope className="w-4 h-4 inline mr-2" />
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 bg-neutral-50/50 hover:bg-white ${
                      errors.email ? 'border-red-300' : 'border-neutral-200'
                    }`}
                    placeholder="john.smith@insurance.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-primary-700 mb-3">
                    <Buildings className="w-4 h-4 inline mr-2" />
                    Insurance Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 bg-neutral-50/50 hover:bg-white ${
                      errors.company ? 'border-red-300' : 'border-neutral-200'
                    }`}
                    placeholder="Your Insurance Company"
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-2">{errors.company}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-primary-700 mb-3">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 bg-neutral-50/50 hover:bg-white ${
                      errors.phone ? 'border-red-300' : 'border-neutral-200'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-primary-700 mb-3">
                    <ChatCircle className="w-4 h-4 inline mr-2" />
                    Tell us about your inspection challenges (optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 resize-none bg-neutral-50/50 hover:bg-white"
                    placeholder="Current inspection volume, processing challenges, integration requirements, or specific use cases..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-accent to-accent-600 text-white py-5 px-8 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:from-accent-600 hover:to-accent-700 transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      Get My Inspection Demo
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="text-center pt-4">
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    By submitting this form, you agree to receive communications from Inspectana. 
                    <br />We respect your privacy and will never share your information.
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-green-600">Secure & confidential</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterestForm;