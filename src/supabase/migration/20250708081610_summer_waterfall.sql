/*
  # Create separate inspection requests table

  1. New Tables
    - `inspection_requests_detailed`
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

  2. Security
    - Enable RLS on table
    - Add policies for anonymous users to insert data
    - Add policies for authenticated users to read data
    - Add policies for service role to manage data
*/

-- Create inspection_requests_detailed table for 3-step modal
CREATE TABLE IF NOT EXISTS inspection_requests_detailed (
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

-- Enable Row Level Security
ALTER TABLE inspection_requests_detailed ENABLE ROW LEVEL SECURITY;

-- Create policies for inspection_requests_detailed
CREATE POLICY "Enable insert for anonymous users on inspection_requests_detailed"
  ON inspection_requests_detailed
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users on inspection_requests_detailed"
  ON inspection_requests_detailed
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable read for service role on inspection_requests_detailed"
  ON inspection_requests_detailed
  FOR ALL
  TO service_role
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inspection_requests_detailed_email ON inspection_requests_detailed(email);
CREATE INDEX IF NOT EXISTS idx_inspection_requests_detailed_created_at ON inspection_requests_detailed(created_at);

-- Create trigger for updated_at
CREATE TRIGGER update_inspection_requests_detailed_updated_at
    BEFORE UPDATE ON inspection_requests_detailed
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();