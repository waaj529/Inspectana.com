import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, CheckCircle, User, MapPin, FileText, Shield, Phone, Envelope, Building, Hash, Warning } from '@phosphor-icons/react';

interface FormData {
  // Step 1 - Personal Information
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Step 2 - Inspection Details
  inspectionType: string;
  
  // Step 3 - Insurance Information
  insuranceCompany: string;
  policyNumber: string;
  agencyName: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
}

interface FormErrors {
  [key: string]: string;
}

interface InspectionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InspectionRequestModal: React.FC<InspectionRequestModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    inspectionType: '',
    insuranceCompany: '',
    policyNumber: '',
    agencyName: '',
    agentName: '',
    agentPhone: '',
    agentEmail: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const totalSteps = 3;
  const inspectionTypes = [
    '4 Point Inspection',
    'Wind Mitigation',
    'Roof Inspection',
    'Post Claim Inspection'
  ];

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setIsSubmitted(false);
      setErrors({});
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open and handle viewport adjustments
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Handle iOS Safari viewport height issues
      const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      setVH();
      window.addEventListener('resize', setVH);
      window.addEventListener('orientationchange', setVH);
      
      return () => {
        window.removeEventListener('resize', setVH);
        window.removeEventListener('orientationchange', setVH);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Phone number formatting function
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Don't format if empty
    if (!phoneNumber) return '';
    
    // Format based on length
    if (phoneNumber.length <= 3) {
      return `(${phoneNumber}`;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  // Clean phone number for validation (remove formatting)
  const cleanPhoneNumber = (phone: string): string => {
    return phone.replace(/\D/g, '');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = cleanPhoneNumber(phone);
    return cleanPhone.length === 10;
  };

  const validateZipCode = (zipCode: string): boolean => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
      if (!formData.street.trim()) newErrors.street = 'Street address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = 'ZIP code is required';
      } else if (!validateZipCode(formData.zipCode)) {
        newErrors.zipCode = 'Please enter a valid ZIP code';
      }
    }

    if (step === 2) {
      if (!formData.inspectionType) newErrors.inspectionType = 'Please select an inspection type';
    }

    if (step === 3) {
      if (!formData.insuranceCompany.trim()) newErrors.insuranceCompany = 'Insurance company is required';
      // Policy number is now optional - no validation required
      if (!formData.agencyName.trim()) newErrors.agencyName = 'Agency name is required';
      if (!formData.agentName.trim()) newErrors.agentName = 'Agent name is required';
      if (!formData.agentPhone.trim()) {
        newErrors.agentPhone = 'Agent phone is required';
      } else if (!validatePhone(formData.agentPhone)) {
        newErrors.agentPhone = 'Please enter a valid 10-digit phone number';
      }
      if (!formData.agentEmail.trim()) {
        newErrors.agentEmail = 'Agent email is required';
      } else if (!validateEmail(formData.agentEmail)) {
        newErrors.agentEmail = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    // Apply phone formatting for phone number fields
    if (field === 'phone' || field === 'agentPhone') {
      const formattedValue = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [field]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Clean phone numbers before submitting
      const submissionData = {
        ...formData,
        phone: cleanPhoneNumber(formData.phone),
        agentPhone: cleanPhoneNumber(formData.agentPhone)
      };
      
      // Simulate API call
      console.log('Submitting inspection request:', submissionData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset form after close animation
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          street: '',
          city: '',
          state: '',
          zipCode: '',
          inspectionType: '',
          insuranceCompany: '',
          policyNumber: '',
          agencyName: '',
          agentName: '',
          agentPhone: '',
          agentEmail: ''
        });
        setCurrentStep(1);
        setIsSubmitted(false);
        setErrors({});
      }, 300);
    }
  };

  // Handle button press states for mobile feedback
  const handleButtonPress = (action: () => void) => {
    setIsButtonPressed(true);
    setTimeout(() => setIsButtonPressed(false), 150);
    action();
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-fade-in">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-primary-700 mb-4">Request Submitted!</h3>
          <p className="text-neutral-600 mb-8 leading-relaxed">
            Thank you for your inspection request. We'll contact you within 24 hours to schedule your inspection.
          </p>
          <button
            onClick={handleClose}
            className="bg-accent text-white px-8 py-3 rounded-xl font-semibold hover:bg-accent-600 transition-colors duration-200 min-h-[44px] min-w-[44px]"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col animate-fade-in"
        style={{ 
          maxHeight: 'calc(var(--vh, 1vh) * 95)',
          height: 'auto'
        }}
      >
        {/* Header with rounded top corners */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white p-4 sm:p-6 relative flex-shrink-0 rounded-t-2xl sm:rounded-t-3xl">
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          
          <h2 className="text-xl sm:text-2xl font-bold mb-4 pr-12">Request Inspection</h2>
          
          {/* Fixed Progress Indicator */}
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step, index) => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step < currentStep 
                    ? 'bg-accent text-white' 
                    : step === currentStep 
                    ? 'bg-white text-primary-700' 
                    : 'bg-white/20 text-white/60'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {index < 2 && (
                  <div className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                    step < currentStep ? 'bg-accent' : 'bg-white/20'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-primary-100 text-sm">
              Step {currentStep} of {totalSteps}: {
                currentStep === 1 ? 'Personal Information' :
                currentStep === 2 ? 'Inspection Details' :
                'Insurance Information'
              }
            </p>
          </div>
        </div>

        {/* Form Content - Now with proper flex layout */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 pb-24 sm:pb-32">
            {/* Step 1 - Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-6 animate-slide-up">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <User className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-primary-700">Personal Information</h3>
                    <p className="text-neutral-600 text-sm">Please provide your contact details</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-primary-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base ${
                      errors.fullName ? 'border-red-300' : 'border-neutral-200'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <Warning className="w-4 h-4" />
                      {errors.fullName}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-primary-700 mb-2">
                      <Envelope className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base ${
                        errors.email ? 'border-red-300' : 'border-neutral-200'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <Warning className="w-4 h-4" />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-primary-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base ${
                        errors.phone ? 'border-red-300' : 'border-neutral-200'
                      }`}
                      placeholder="(555) 123-4567"
                      maxLength={14}
                    />
                    {errors.phone && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <Warning className="w-4 h-4" />
                        {errors.phone}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="street" className="block text-sm font-semibold text-primary-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="street"
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base ${
                      errors.street ? 'border-red-300' : 'border-neutral-200'
                    }`}
                    placeholder="123 Main Street"
                  />
                  {errors.street && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <Warning className="w-4 h-4" />
                      {errors.street}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="city" className="block text-sm font-semibold text-primary-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base ${
                        errors.city ? 'border-red-300' : 'border-neutral-200'
                      }`}
                      placeholder="City"
                    />
                    {errors.city && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <Warning className="w-4 h-4" />
                        {errors.city}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-semibold text-primary-700 mb-2">
                      State *
                    </label>
                    <select
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base ${
                        errors.state ? 'border-red-300' : 'border-neutral-200'
                      }`}
                    >
                      <option value="">State</option>
                      {usStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    {errors.state && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <Warning className="w-4 h-4" />
                        {errors.state}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-semibold text-primary-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base ${
                        errors.zipCode ? 'border-red-300' : 'border-neutral-200'
                      }`}
                      placeholder="12345"
                    />
                    {errors.zipCode && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <Warning className="w-4 h-4" />
                        {errors.zipCode}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 - Inspection Details */}
            {currentStep === 2 && (
              <div className="space-y-4 sm:space-y-6 animate-slide-up">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-primary-700">Inspection Details</h3>
                    <p className="text-neutral-600 text-sm">Select the type of inspection you need</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="inspectionType" className="block text-sm font-semibold text-primary-700 mb-2">
                    Inspection Type *
                  </label>
                  <select
                    id="inspectionType"
                    value={formData.inspectionType}
                    onChange={(e) => handleInputChange('inspectionType', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base ${
                      errors.inspectionType ? 'border-red-300' : 'border-neutral-200'
                    }`}
                  >
                    <option value="">Select an inspection type</option>
                    {inspectionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.inspectionType && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <Warning className="w-4 h-4" />
                      {errors.inspectionType}
                    </div>
                  )}
                </div>

                {/* Inspection Type Descriptions */}
                <div className="bg-neutral-50 rounded-xl p-4 sm:p-6">
                  <h4 className="font-semibold text-primary-700 mb-4">Inspection Types Explained:</h4>
                  <div className="space-y-3 text-sm text-neutral-600">
                    <div>
                      <span className="font-medium text-primary-700">4 Point Inspection:</span> Comprehensive assessment of electrical, plumbing, HVAC, and roofing systems.
                    </div>
                    <div>
                      <span className="font-medium text-primary-700">Wind Mitigation:</span> Evaluation of features that help protect your home from wind damage.
                    </div>
                    <div>
                      <span className="font-medium text-primary-700">Roof Inspection:</span> Detailed examination of roof condition, materials, and potential issues.
                    </div>
                    <div>
                      <span className="font-medium text-primary-700">Post Claim Inspection:</span> Assessment following an insurance claim to document damage and repairs.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 - Insurance Information */}
            {currentStep === 3 && (
              <div className="space-y-4 sm:space-y-6 animate-slide-up">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-primary-700">Insurance Information</h3>
                    <p className="text-neutral-600 text-sm">Provide your insurance details for coordination</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="insuranceCompany" className="block text-sm font-semibold text-primary-700 mb-2">
                      <Building className="w-4 h-4 inline mr-2" />
                      Insurance Company *
                    </label>
                    <input
                      type="text"
                      id="insuranceCompany"
                      value={formData.insuranceCompany}
                      onChange={(e) => handleInputChange('insuranceCompany', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base ${
                        errors.insuranceCompany ? 'border-red-300' : 'border-neutral-200'
                      }`}
                      placeholder="State Farm, Allstate, etc."
                    />
                    {errors.insuranceCompany && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <Warning className="w-4 h-4" />
                        {errors.insuranceCompany}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="policyNumber" className="block text-sm font-semibold text-primary-700 mb-2">
                      <Hash className="w-4 h-4 inline mr-2" />
                      Policy Number <span className="text-neutral-500 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="policyNumber"
                      value={formData.policyNumber}
                      onChange={(e) => handleInputChange('policyNumber', e.target.value)}
                      className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base"
                      placeholder="Policy number (if available)"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="agencyName" className="block text-sm font-semibold text-primary-700 mb-2">
                    Insurance Agency Name *
                  </label>
                  <input
                    type="text"
                    id="agencyName"
                    value={formData.agencyName}
                    onChange={(e) => handleInputChange('agencyName', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base ${
                      errors.agencyName ? 'border-red-300' : 'border-neutral-200'
                    }`}
                    placeholder="Agency name"
                  />
                  {errors.agencyName && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <Warning className="w-4 h-4" />
                      {errors.agencyName}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="agentName" className="block text-sm font-semibold text-primary-700 mb-2">
                    Agent's Full Name *
                  </label>
                  <input
                    type="text"
                    id="agentName"
                    value={formData.agentName}
                    onChange={(e) => handleInputChange('agentName', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base ${
                      errors.agentName ? 'border-red-300' : 'border-neutral-200'
                    }`}
                    placeholder="Agent's full name"
                  />
                  {errors.agentName && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <Warning className="w-4 h-4" />
                      {errors.agentName}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="agentPhone" className="block text-sm font-semibold text-primary-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Agent's Phone *
                    </label>
                    <input
                      type="tel"
                      id="agentPhone"
                      value={formData.agentPhone}
                      onChange={(e) => handleInputChange('agentPhone', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base ${
                        errors.agentPhone ? 'border-red-300' : 'border-neutral-200'
                      }`}
                      placeholder="(555) 123-4567"
                      maxLength={14}
                    />
                    {errors.agentPhone && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <Warning className="w-4 h-4" />
                        {errors.agentPhone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="agentEmail" className="block text-sm font-semibold text-primary-700 mb-2">
                      <Envelope className="w-4 h-4 inline mr-2" />
                      Agent's Email *
                    </label>
                    <input
                      type="email"
                      id="agentEmail"
                      value={formData.agentEmail}
                      onChange={(e) => handleInputChange('agentEmail', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 text-base ${
                        errors.agentEmail ? 'border-red-300' : 'border-neutral-200'
                      }`}
                      placeholder="agent@agency.com"
                    />
                    {errors.agentEmail && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <Warning className="w-4 h-4" />
                        {errors.agentEmail}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Footer Navigation */}
        <div className="bg-gradient-to-r from-neutral-50 to-white border-t border-neutral-200 px-4 sm:px-6 py-6 flex justify-between items-center rounded-b-2xl sm:rounded-b-3xl shadow-lg">
          {/* Previous Button */}
          <button
            onClick={() => handleButtonPress(handlePrevious)}
            disabled={currentStep === 1 || isSubmitting}
            className={`
              group flex items-center justify-center gap-3 px-6 py-4 
              text-neutral-600 hover:text-primary-700 active:text-primary-800
              transition-all duration-300 
              disabled:opacity-40 disabled:cursor-not-allowed
              min-h-[52px] min-w-[52px]
              rounded-xl hover:bg-neutral-100 active:bg-neutral-200
              font-semibold text-base
              border-2 border-transparent hover:border-neutral-200
              ${isButtonPressed && currentStep > 1 ? 'scale-95 bg-neutral-200' : ''}
              ${currentStep === 1 ? 'invisible' : 'visible'}
            `}
            aria-label="Go to previous step"
          >
            <ArrowLeft className="w-5 h-5 flex-shrink-0 group-hover:transform group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Enhanced Step Indicator - Removed text, kept only dots */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    step === currentStep 
                      ? 'bg-accent w-8 shadow-lg' 
                      : step < currentStep 
                      ? 'bg-accent/70 w-6' 
                      : 'bg-neutral-300 w-4'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Next/Submit Button */}
          {currentStep < totalSteps ? (
            <button
              onClick={() => handleButtonPress(handleNext)}
              disabled={isSubmitting}
              className={`
                group flex items-center justify-center gap-3 
                bg-gradient-to-r from-accent to-accent-600 
                hover:from-accent-600 hover:to-accent-700 
                active:from-accent-700 active:to-accent-800
                text-white px-8 py-4 
                rounded-xl font-bold text-base
                transition-all duration-300 
                disabled:opacity-50 disabled:cursor-not-allowed
                min-h-[52px] min-w-[52px]
                shadow-lg hover:shadow-xl active:shadow-md
                transform hover:scale-105 active:scale-95
                border-2 border-accent-600 hover:border-accent-700
                ${isButtonPressed ? 'scale-95' : ''}
              `}
              style={{
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
              aria-label="Continue to next step"
            >
              <span className="hidden sm:inline">Continue</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:transform group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          ) : (
            <button
              onClick={() => handleButtonPress(handleSubmit)}
              disabled={isSubmitting}
              className={`
                group flex items-center justify-center gap-3 
                bg-gradient-to-r from-green-600 to-green-700 
                hover:from-green-700 hover:to-green-800 
                active:from-green-800 active:to-green-900
                text-white px-8 py-4 
                rounded-xl font-bold text-base
                transition-all duration-300 
                disabled:opacity-50 disabled:cursor-not-allowed
                min-h-[52px] min-w-[52px]
                shadow-lg hover:shadow-xl active:shadow-md
                transform hover:scale-105 active:scale-95
                border-2 border-green-700 hover:border-green-800
                ${isButtonPressed ? 'scale-95' : ''}
                ${isSubmitting ? 'cursor-wait' : ''}
              `}
              style={{
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
              aria-label="Submit inspection request"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white flex-shrink-0"></div>
                  <span className="hidden sm:inline">Submitting...</span>
                  <span className="sm:hidden">Sending...</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Submit Request</span>
                  <span className="sm:hidden">Submit</span>
                  <CheckCircle className="w-5 h-5 flex-shrink-0 group-hover:transform group-hover:scale-110 transition-transform duration-200" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspectionRequestModal;