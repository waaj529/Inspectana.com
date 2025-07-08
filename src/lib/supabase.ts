import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Environment Check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  url: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'MISSING',
  key: supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'MISSING'
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface InspectionRequest {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  inspection_type: string;
  insurance_company: string;
  policy_number?: string;
  agency_name: string;
  agent_name: string;
  agent_phone: string;
  agent_email: string;
  created_at?: string;
  updated_at?: string;
}

export interface InspectionRequestDetailed {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  inspection_type: string;
  insurance_company: string;
  policy_number?: string;
  agency_name: string;
  agent_name: string;
  agent_phone: string;
  agent_email: string;
  created_at?: string;
  updated_at?: string;
}

export interface InterestForm {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  phone: string;
  message?: string;
  created_at?: string;
  updated_at?: string;
}

// Database service functions
export const dbService = {
  // Insert inspection request
  async createInspectionRequest(data: Omit<InspectionRequest, 'id' | 'created_at' | 'updated_at'>) {
    console.log('Attempting to create inspection request:', data);
    
    const { data: result, error } = await supabase
      .from('inspection_requests')
      .insert([data])
      .select()
      .single();

    console.log('Supabase response:', { result, error });

    if (error) {
      console.error('Error creating inspection request:', error);
      
      // Check if it's a duplicate email error
      if (error.code === '23505' && error.message.includes('inspection_requests_email_unique')) {
        throw new Error('An inspection request with this email address has already been submitted. Please contact us directly if you need to update your request.');
      }
      
      throw error;
    }

    // Send notification email after successful database insert
    this.sendNotificationEmail('inspection_request', result).catch(emailError => {
      console.error('Error sending notification email:', emailError);
      // Don't throw here - we don't want email failures to break form submission
    });
    
    return result;
  },

  // Insert detailed inspection request (3-step modal)
  async createInspectionRequestDetailed(data: Omit<InspectionRequestDetailed, 'id' | 'created_at' | 'updated_at'>) {
    console.log('Attempting to create detailed inspection request:', data);
    
    const { data: result, error } = await supabase
      .from('inspection_requests_detailed')
      .insert([data])
      .select()
      .single();

    console.log('Supabase response:', { result, error });

    if (error) {
      console.error('Error creating detailed inspection request:', error);
      
      // Check if it's a duplicate email error
      if (error.code === '23505' && error.message.includes('inspection_requests_detailed_email_unique')) {
        throw new Error('An inspection request with this email address has already been submitted. Please contact us directly if you need to update your request.');
      }
      
      throw error;
    }

    // Send notification email after successful database insert
    this.sendNotificationEmail('inspection_request_detailed', result).catch(emailError => {
      console.error('Error sending notification email:', emailError);
      // Don't throw here - we don't want email failures to break form submission
    });
    
    return result;
  },

  // Insert interest form
  async createInterestForm(data: Omit<InterestForm, 'id' | 'created_at' | 'updated_at'>) {
    console.log('Attempting to create interest form:', data);
    
    const { data: result, error } = await supabase
      .from('interest_forms')
      .insert([data])
      .select()
      .single();

    console.log('Supabase response:', { result, error });

    if (error) {
      console.error('Error creating interest form:', error);
      
      // Check if it's a duplicate email error
      if (error.code === '23505' && error.message.includes('interest_forms_email_unique')) {
        throw new Error('A demo request with this email address has already been submitted. Please contact us directly if you need to update your request.');
      }
      
      throw error;
    }

    // Send notification email after successful database insert
    this.sendNotificationEmail('interest_form', result).catch(emailError => {
      console.error('Error sending notification email:', emailError);
      // Don't throw here - we don't want email failures to break form submission
    });
    
    return result;
  },

  // Send notification email via edge function
  async sendNotificationEmail(type: 'inspection_request' | 'inspection_request_detailed' | 'interest_form', data: any) {
    console.log('🚀 Calling edge function with:', { type, data });
    
    const { data: result, error } = await supabase.functions.invoke('send-notification-email', {
      body: { type, data }
    });

    console.log('📧 Edge function response:', { result, error });

    if (error) {
      console.error('Error calling email function:', error);
      throw error;
    }

    return result;
  },
  // Get all inspection requests (for admin use)
  async getInspectionRequests() {
    const { data, error } = await supabase
      .from('inspection_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching inspection requests:', error);
      throw error;
    }

    return data;
  },

  // Get all detailed inspection requests (for admin use)
  async getInspectionRequestsDetailed() {
    const { data, error } = await supabase
      .from('inspection_requests_detailed')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching detailed inspection requests:', error);
      throw error;
    }

    return data;
  },

  // Get all interest forms (for admin use)
  async getInterestForms() {
    const { data, error } = await supabase
      .from('interest_forms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching interest forms:', error);
      throw error;
    }

    return data;
  }
};