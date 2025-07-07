import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }
  
  Deno.serve(async (req) => {
    console.log('🚀 Edge function called with method:', req.method)
    
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      console.log('✅ Handling CORS preflight request')
      return new Response('ok', { headers: corsHeaders })
    }
  
    try {
      const requestBody = await req.text()
      console.log('📥 Raw request body:', requestBody)
      
      const { type, data } = JSON.parse(requestBody)
      console.log('📋 Parsed data:', { type, data })
      
      const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
      const NOTIFICATION_EMAIL = Deno.env.get('NOTIFICATION_EMAIL') || 'contact@inspectana.com'
      
      console.log('🔑 Environment check:', {
        hasResendKey: !!RESEND_API_KEY,
        resendKeyLength: RESEND_API_KEY ? RESEND_API_KEY.length : 0,
        notificationEmail: NOTIFICATION_EMAIL
      })
      
      if (!RESEND_API_KEY) {
        console.error('❌ RESEND_API_KEY is not set')
        throw new Error('RESEND_API_KEY is not set')
      }
  
      let emailContent = ''
      let subject = ''
  
      if (type === 'inspection_request') {
        subject = `🏠 New Inspection Request from ${data.full_name}`
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1B2E4F;">🏠 New Inspection Request Received</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #EC7846; margin-top: 0;">👤 Personal Information</h3>
              <p><strong>Name:</strong> ${data.full_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #EC7846; margin-top: 0;">📍 Property Address</h3>
              <p><strong>Street:</strong> ${data.street}</p>
              <p><strong>City:</strong> ${data.city}</p>
              <p><strong>State:</strong> ${data.state}</p>
              <p><strong>ZIP Code:</strong> ${data.zip_code}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #EC7846; margin-top: 0;">🔍 Inspection Details</h3>
              <p><strong>Inspection Type:</strong> ${data.inspection_type}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #EC7846; margin-top: 0;">🛡️ Insurance Information</h3>
              <p><strong>Insurance Company:</strong> ${data.insurance_company}</p>
              <p><strong>Policy Number:</strong> ${data.policy_number || 'Not provided'}</p>
              <p><strong>Agency Name:</strong> ${data.agency_name}</p>
              <p><strong>Agent Name:</strong> ${data.agent_name}</p>
              <p><strong>Agent Phone:</strong> <a href="tel:${data.agent_phone}">${data.agent_phone}</a></p>
              <p><strong>Agent Email:</strong> <a href="mailto:${data.agent_email}">${data.agent_email}</a></p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="color: #666; font-size: 14px;"><em>📅 This request was submitted on ${new Date().toLocaleString()}</em></p>
          </div>
        `
      } else if (type === 'interest_form') {
        subject = `💼 New Demo Request from ${data.first_name} ${data.last_name}`
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1B2E4F;">💼 New Demo Request Received</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #EC7846; margin-top: 0;">👤 Contact Information</h3>
              <p><strong>Name:</strong> ${data.first_name} ${data.last_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
              <p><strong>Company:</strong> ${data.company}</p>
            </div>
            
            ${data.message ? `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #EC7846; margin-top: 0;">💬 Message</h3>
              <p style="white-space: pre-wrap;">${data.message}</p>
            </div>
            ` : ''}
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="color: #666; font-size: 14px;"><em>📅 This request was submitted on ${new Date().toLocaleString()}</em></p>
          </div>
        `
      }
  
      console.log('📧 Preparing to send email:', { subject, to: NOTIFICATION_EMAIL })
  
      // Send email using Resend
      const emailPayload = {
        from: 'Inspectana <notifications@inspectana.com>',
        to: [NOTIFICATION_EMAIL],
        subject: subject,
        html: emailContent,
      }
  
      console.log('📤 Email payload:', emailPayload)
  
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      })
  
      console.log('📬 Resend API response status:', emailResponse.status)
      console.log('📬 Resend API response headers:', Object.fromEntries(emailResponse.headers.entries()))
  
      const responseText = await emailResponse.text()
      console.log('📬 Resend API response body:', responseText)
  
      if (!emailResponse.ok) {
        console.error('❌ Resend API error:', responseText)
        throw new Error(`Resend API error (${emailResponse.status}): ${responseText}`)
      }
  
      const emailResult = JSON.parse(responseText)
      console.log('✅ Email sent successfully:', emailResult)
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          emailId: emailResult.id,
          message: 'Email sent successfully'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    } catch (error) {
      if (error instanceof Error) {
        console.error('💥 Error in edge function:', error)
        console.error('💥 Error stack:', error.stack)
        
        return new Response(
          JSON.stringify({ 
            error: error.message,
            details: error.stack,
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
          },
        )
      }
      return new Response(
        JSON.stringify({ error: 'An unknown error occurred.' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        },
      )
    }
  })