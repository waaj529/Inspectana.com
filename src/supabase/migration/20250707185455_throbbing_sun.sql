/*
  # Remove problematic database triggers

  1. Changes
    - Remove database triggers that depend on pg_net extension
    - Clean up trigger functions
    - Keep RLS policies intact
    - Email notifications will be handled client-side instead

  2. Security
    - Maintain existing RLS policies
    - Keep table structure unchanged
*/

-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS trigger_notify_inspection_request ON inspection_requests;
DROP TRIGGER IF EXISTS trigger_notify_interest_form ON interest_forms;
DROP FUNCTION IF EXISTS notify_inspection_request();
DROP FUNCTION IF EXISTS notify_interest_form();

-- Note: Email notifications will now be handled directly from the client
-- This avoids dependency on pg_net extension which may not be available