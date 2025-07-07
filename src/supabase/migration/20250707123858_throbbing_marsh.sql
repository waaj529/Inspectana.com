/*
  # Fix RLS Policies for Form Submissions

  1. Security Updates
    - Ensure anonymous users can insert data
    - Fix any policy conflicts
    - Add proper debugging

  2. Policy Updates
    - Allow anonymous inserts for both tables
    - Ensure authenticated users can read data
*/

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Allow public insert on inspection_requests" ON inspection_requests;
DROP POLICY IF EXISTS "Allow authenticated users to read inspection_requests" ON inspection_requests;
DROP POLICY IF EXISTS "Allow public insert on interest_forms" ON interest_forms;
DROP POLICY IF EXISTS "Allow authenticated users to read interest_forms" ON interest_forms;

-- Recreate policies for inspection_requests
CREATE POLICY "Enable insert for anonymous users on inspection_requests"
  ON inspection_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users on inspection_requests"
  ON inspection_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable read for service role on inspection_requests"
  ON inspection_requests
  FOR ALL
  TO service_role
  USING (true);

-- Recreate policies for interest_forms
CREATE POLICY "Enable insert for anonymous users on interest_forms"
  ON interest_forms
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users on interest_forms"
  ON interest_forms
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable read for service role on interest_forms"
  ON interest_forms
  FOR ALL
  TO service_role
  USING (true);

-- Verify RLS is enabled
ALTER TABLE inspection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE interest_forms ENABLE ROW LEVEL SECURITY;