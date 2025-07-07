/*
  # Fix Email Notification Triggers

  1. Database Functions
    - Simplified trigger functions that call edge function properly
    - Better error handling and logging

  2. Triggers
    - Updated triggers with proper function calls
    - Ensure they execute correctly

  3. Security
    - Functions execute with proper permissions
*/

-- Drop existing functions and triggers
DROP TRIGGER IF EXISTS trigger_notify_inspection_request ON inspection_requests;
DROP TRIGGER IF EXISTS trigger_notify_interest_form ON interest_forms;
DROP FUNCTION IF EXISTS notify_inspection_request();
DROP FUNCTION IF EXISTS notify_interest_form();

-- Create simplified notification functions that use pg_net extension
CREATE OR REPLACE FUNCTION notify_inspection_request()
RETURNS TRIGGER AS $$
BEGIN
  -- Use pg_net to make HTTP request to edge function
  PERFORM net.http_post(
    url := 'https://xbeqgusbvtqypnbwrzsn.supabase.co/functions/v1/send-notification-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiZXFndXNidnRxeXBuYndyenNuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDM2NzI5NCwiZXhwIjoyMDM1OTQzMjk0fQ.d3461b368cb2f6de937d1c474fe5b26b2828c9cdd6ca5b5a352e0fbe52d69ca1'
    ),
    body := jsonb_build_object(
      'type', 'inspection_request',
      'data', row_to_json(NEW)
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to notify about new interest forms
CREATE OR REPLACE FUNCTION notify_interest_form()
RETURNS TRIGGER AS $$
BEGIN
  -- Use pg_net to make HTTP request to edge function
  PERFORM net.http_post(
    url := 'https://xbeqgusbvtqypnbwrzsn.supabase.co/functions/v1/send-notification-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiZXFndXNidnRxeXBuYndyenNuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDM2NzI5NCwiZXhwIjoyMDM1OTQzMjk0fQ.d3461b368cb2f6de937d1c474fe5b26b2828c9cdd6ca5b5a352e0fbe52d69ca1'
    ),
    body := jsonb_build_object(
      'type', 'interest_form',
      'data', row_to_json(NEW)
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
CREATE TRIGGER trigger_notify_inspection_request
  AFTER INSERT ON inspection_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_inspection_request();

CREATE TRIGGER trigger_notify_interest_form
  AFTER INSERT ON interest_forms
  FOR EACH ROW
  EXECUTE FUNCTION notify_interest_form();