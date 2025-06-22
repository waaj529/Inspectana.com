import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaperPlaneTilt, User, Envelope, Buildings, Phone, ChatCircle, Drone, Sparkle, Lightning, Target, CheckCircle } from '@phosphor-icons/react';

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
    <section id="contact" className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="animate-slide-up relative">
            {/* Background gradient decoration */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary-700/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary-700/10 to-accent/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-br from-accent to-accent-600 p-4 rounded-2xl shadow-lg">
                  <Drone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-700">
                    Ready to Transform Your Inspections?
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <Sparkle className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Next-generation technology</span>
                  </div>
                </div>
              </div>
              
              <p className="text-xl text-neutral-600 mb-10 leading-relaxed">
                Join forward-thinking organizations that are revolutionizing their infrastructure management 
                with Inspectana's intelligent drone inspection platform.
              </p>

              <div className="space-y-6 mb-10">
                <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/60 transition-all duration-300">
                  <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-3 rounded-xl group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-300">
                    <ChatCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-700 mb-2 text-lg">Free Consultation</h3>
                    <p className="text-neutral-600">Get expert advice tailored to your specific inspection challenges and operational requirements.</p>
                  </div>
                </div>
                
                <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/60 transition-all duration-300">
                  <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-3 rounded-xl group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-300">
                    <Lightning className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-700 mb-2 text-lg">Live Demo</h3>
                    <p className="text-neutral-600">See Inspectana in action with real infrastructure data and interactive demonstrations.</p>
                  </div>
                </div>
                
                <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/60 transition-all duration-300">
                  <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-3 rounded-xl group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-300">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-700 mb-2 text-lg">Custom Solution Design</h3>
                    <p className="text-neutral-600">Receive a personalized implementation plan designed specifically for your organization's needs.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-white to-neutral-50 rounded-2xl p-6 shadow-sm border border-accent/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary-700"></div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-2 rounded-lg flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      <strong className="text-primary-700 text-base">Innovative startup</strong> focused on delivering 
                      cutting-edge drone inspection technology with personalized service and rapid innovation. 
                      We're building the future of infrastructure management.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats section */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-white/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary-700">24h</div>
                  <div className="text-xs text-neutral-600">Response Time</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary-700">100%</div>
                  <div className="text-xs text-neutral-600">Custom Solutions</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary-700">2025</div>
                  <div className="text-xs text-neutral-600">Next-Gen Tech</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-primary-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${
                      errors.firstName ? 'border-red-300' : 'border-neutral-300'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-primary-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${
                      errors.lastName ? 'border-red-300' : 'border-neutral-300'
                    }`}
                    placeholder="Smith"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                  <Envelope className="w-4 h-4 inline mr-2" />
                  Business Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${
                    errors.email ? 'border-red-300' : 'border-neutral-300'
                  }`}
                  placeholder="john.smith@company.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-primary-700 mb-2">
                  <Buildings className="w-4 h-4 inline mr-2" />
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${
                    errors.company ? 'border-red-300' : 'border-neutral-300'
                  }`}
                  placeholder="Your Company"
                />
                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${
                    errors.phone ? 'border-red-300' : 'border-neutral-300'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-2">
                  <ChatCircle className="w-4 h-4 inline mr-2" />
                  Tell us about your inspection challenges (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none"
                  placeholder="Describe your current inspection processes, challenges, or specific requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-accent text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-accent-600 transform hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Contact Us
                    <PaperPlaneTilt className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-xs text-neutral-500 text-center">
                By submitting this form, you agree to receive communications from Inspectana. 
                We respect your privacy and will never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterestForm;