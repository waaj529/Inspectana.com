/*
  # Create form data tables

  1. New Tables
    - `inspection_requests`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `street` (text)
      - `city` (text)
      - `state` (text)
      - `zip_code` (text)
      - `inspection_type` (text)
      - `insurance_company` (text)
      - `policy_number` (text, optional)
      - `agency_name` (text)
      - `agent_name` (text)
      - `agent_phone` (text)
      - `agent_email` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `interest_forms`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `company` (text)
      - `phone` (text)
      - `message` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read their own data
    - Add policies for service role to insert data
*/

-- Create inspection_requests table
CREATE TABLE IF NOT EXISTS inspection_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  inspection_type text NOT NULL,
  insurance_company text NOT NULL,
  policy_number text,
  agency_name text NOT NULL,
  agent_name text NOT NULL,
  agent_phone text NOT NULL,
  agent_email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create interest_forms table
CREATE TABLE IF NOT EXISTS interest_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  phone text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE inspection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE interest_forms ENABLE ROW LEVEL SECURITY;

-- Create policies for inspection_requests
CREATE POLICY "Allow public insert on inspection_requests"
  ON inspection_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read inspection_requests"
  ON inspection_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for interest_forms
CREATE POLICY "Allow public insert on interest_forms"
  ON interest_forms
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read interest_forms"
  ON interest_forms
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inspection_requests_email ON inspection_requests(email);
CREATE INDEX IF NOT EXISTS idx_inspection_requests_created_at ON inspection_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_interest_forms_email ON interest_forms(email);
CREATE INDEX IF NOT EXISTS idx_interest_forms_created_at ON interest_forms(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_inspection_requests_updated_at
    BEFORE UPDATE ON inspection_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interest_forms_updated_at
    BEFORE UPDATE ON interest_forms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();