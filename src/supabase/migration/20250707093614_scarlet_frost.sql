/*
  # Add Email Notification Triggers

  1. Database Functions
    - `notify_inspection_request()` - Triggers email for new inspection requests
    - `notify_interest_form()` - Triggers email for new interest form submissions

  2. Triggers
    - Automatically call edge function when new records are inserted
    - Send notification emails via Resend API

  3. Security
    - Functions execute with proper permissions
    - Edge function handles email delivery
*/

-- Create function to notify about new inspection requests
CREATE OR REPLACE FUNCTION notify_inspection_request()
RETURNS TRIGGER AS $$
DECLARE
  request_url text;
  payload json;
BEGIN
  -- Get the Supabase URL from environment or use default
  request_url := current_setting('app.supabase_url', true);
  IF request_url IS NULL THEN
    request_url := 'https://your-project.supabase.co';
  END IF;
  
  -- Prepare the payload
  payload := json_build_object(
    'type', 'inspection_request',
    'data', row_to_json(NEW)
  );

  -- Call the edge function asynchronously
  PERFORM
    net.http_post(
      url := request_url || '/functions/v1/send-notification-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key', true)
      ),
      body := payload::jsonb
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to notify about new interest forms
CREATE OR REPLACE FUNCTION notify_interest_form()
RETURNS TRIGGER AS $$
DECLARE
  request_url text;
  payload json;
BEGIN
  -- Get the Supabase URL from environment or use default
  request_url := current_setting('app.supabase_url', true);
  IF request_url IS NULL THEN
    request_url := 'https://your-project.supabase.co';
  END IF;
  
  -- Prepare the payload
  payload := json_build_object(
    'type', 'interest_form',
    'data', row_to_json(NEW)
  );

  -- Call the edge function asynchronously
  PERFORM
    net.http_post(
      url := request_url || '/functions/v1/send-notification-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key', true)
      ),
      body := payload::jsonb
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
DROP TRIGGER IF EXISTS trigger_notify_inspection_request ON inspection_requests;
CREATE TRIGGER trigger_notify_inspection_request
  AFTER INSERT ON inspection_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_inspection_request();

DROP TRIGGER IF EXISTS trigger_notify_interest_form ON interest_forms;
CREATE TRIGGER trigger_notify_interest_form
  AFTER INSERT ON interest_forms
  FOR EACH ROW
  EXECUTE FUNCTION notify_interest_form();