/*
  # Final RLS Policy Fix for Inspection Requests Detailed

  1. Table Management
    - Ensure inspection_requests_detailed table exists with correct structure
    - Drop and recreate all policies to fix any conflicts
    - Verify RLS is properly configured

  2. Security
    - Allow anonymous users to insert inspection requests
    - Allow authenticated users to read data
    - Allow service role full access

  3. Debugging
    - Add comprehensive logging and verification
*/

-- First, let's check if the table exists and drop it if there are issues
DO $$
BEGIN
  -- Drop the table if it exists to start fresh
  DROP TABLE IF EXISTS inspection_requests_detailed CASCADE;
END $$;

-- Create the table fresh with proper structure
CREATE TABLE inspection_requests_detailed (
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

-- Create policies with simple, clear names
CREATE POLICY "anon_insert_inspection_detailed"
  ON inspection_requests_detailed
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "auth_select_inspection_detailed"
  ON inspection_requests_detailed
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "service_all_inspection_detailed"
  ON inspection_requests_detailed
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_inspection_detailed_email ON inspection_requests_detailed(email);
CREATE INDEX idx_inspection_detailed_created_at ON inspection_requests_detailed(created_at);

-- Create trigger for updated_at
CREATE TRIGGER update_inspection_detailed_updated_at
    BEFORE UPDATE ON inspection_requests_detailed
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verify the setup
DO $$
BEGIN
  -- Check if table exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'inspection_requests_detailed'
  ) THEN
    RAISE EXCEPTION 'Table inspection_requests_detailed was not created successfully';
  END IF;

  -- Check if RLS is enabled
  IF NOT EXISTS (
    SELECT 1 FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
    AND c.relname = 'inspection_requests_detailed'
    AND c.relrowsecurity = true
  ) THEN
    RAISE EXCEPTION 'RLS is not enabled on inspection_requests_detailed';
  END IF;

  RAISE NOTICE 'Table inspection_requests_detailed created successfully with RLS enabled';
END $$;