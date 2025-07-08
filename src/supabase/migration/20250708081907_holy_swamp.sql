/*
  # Fix RLS policies for inspection_requests_detailed table

  1. Security Updates
    - Fix RLS policies to allow anonymous inserts
    - Ensure proper policy names and permissions
    - Add debugging for policy issues

  2. Policy Updates
    - Allow anonymous users to insert data
    - Ensure authenticated users can read data
    - Service role has full access
*/

-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Enable insert for anonymous users on inspection_requests_detailed" ON inspection_requests_detailed;
DROP POLICY IF EXISTS "Enable read for authenticated users on inspection_requests_detailed" ON inspection_requests_detailed;
DROP POLICY IF EXISTS "Enable read for service role on inspection_requests_detailed" ON inspection_requests_detailed;

-- Disable RLS temporarily to recreate policies
ALTER TABLE inspection_requests_detailed DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE inspection_requests_detailed ENABLE ROW LEVEL SECURITY;

-- Create new policies with corrected names and permissions
CREATE POLICY "Enable insert for anonymous users on inspection_requests_detail"
  ON inspection_requests_detailed
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users on inspection_requests_deta"
  ON inspection_requests_detailed
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable read for service role on inspection_requests_detailed"
  ON inspection_requests_detailed
  FOR ALL
  TO service_role
  USING (true);

-- Verify the table exists and has correct structure
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'inspection_requests_detailed') THEN
    RAISE EXCEPTION 'Table inspection_requests_detailed does not exist';
  END IF;
END $$;