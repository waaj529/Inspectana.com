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
  
    // Helper function to generate CSV data
    const generateCSVData = (formData: any, formType: string) => {
      if (formType === 'inspection_request' || formType === 'inspection_request_detailed') {
        return [
          ['Field', 'Value'],
          ['Submission Type', formType === 'inspection_request_detailed' ? 'Detailed Inspection Request' : 'Quick Inspection Request'],
          ['Full Name', formData.full_name || ''],
          ['Email', formData.email || ''],
          ['Phone', formData.phone || ''],
          ['Street Address', formData.street || ''],
          ['City', formData.city || ''],
          ['State', formData.state || ''],
          ['ZIP Code', formData.zip_code || ''],
          ['Inspection Type', formData.inspection_type || ''],
          ['Insurance Company', formData.insurance_company || ''],
          ['Policy Number', formData.policy_number || 'Not provided'],
          ['Agency Name', formData.agency_name || ''],
          ['Agent Name', formData.agent_name || ''],
          ['Agent Phone', formData.agent_phone || ''],
          ['Agent Email', formData.agent_email || ''],
          ['Submitted Date', new Date().toLocaleString()],
          ['Record ID', formData.id || 'Generated on submission']
        ].map(row => row.join(',')).join('\n')
      } else {
        return [
          ['Field', 'Value'],
          ['Submission Type', 'Demo Request'],
          ['First Name', formData.first_name || ''],
          ['Last Name', formData.last_name || ''],
          ['Email', formData.email || ''],
          ['Company', formData.company || ''],
          ['Phone', formData.phone || ''],
          ['Message', formData.message || 'No message provided'],
          ['Submitted Date', new Date().toLocaleString()],
          ['Record ID', formData.id || 'Generated on submission']
        ].map(row => row.join(',')).join('\n')
      }
    }
  
      let emailContent = ''
      let subject = ''
    let csvData = ''

    if (type === 'inspection_request' || type === 'inspection_request_detailed') {
      const isDetailed = type === 'inspection_request_detailed'
      subject = `🏠 New ${isDetailed ? 'Detailed ' : ''}Inspection Request from ${data.full_name}`
      csvData = generateCSVData(data, type)
      
        emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Inspection Request</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 700px; margin: 0 auto; background-color: #ffffff;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1B2E4F 0%, #EC7846 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                🏠 New ${isDetailed ? 'Detailed ' : ''}Inspection Request
              </h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">
                Inspectana Platform Notification
              </p>
            </div>

            <!-- Summary Card -->
            <div style="padding: 30px; border-bottom: 1px solid #e9ecef;">
              <div style="background: #f8f9fa; border-left: 4px solid #EC7846; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="color: #1B2E4F; margin: 0 0 10px 0; font-size: 20px;">📋 Request Summary</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                  <div>
                    <strong style="color: #EC7846;">Client:</strong> ${data.full_name}<br>
                    <strong style="color: #EC7846;">Type:</strong> ${data.inspection_type}
                  </div>
                  <div>
                    <strong style="color: #EC7846;">Location:</strong> ${data.city}, ${data.state}<br>
                    <strong style="color: #EC7846;">Submitted:</strong> ${new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Information -->
            <div style="padding: 30px; border-bottom: 1px solid #e9ecef;">
              <h3 style="color: #1B2E4F; margin: 0 0 20px 0; font-size: 18px; display: flex; align-items: center;">
                👤 Contact Information
              </h3>
              <div style="background: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="background: #f8f9fa;">
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057; width: 30%;">Full Name</td>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; color: #212529;">${data.full_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057;">Email</td>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef;"><a href="mailto:${data.email}" style="color: #EC7846; text-decoration: none;">${data.email}</a></td>
                  </tr>
                  <tr style="background: #f8f9fa;">
                    <td style="padding: 12px 20px; font-weight: 600; color: #495057;">Phone</td>
                    <td style="padding: 12px 20px;"><a href="tel:${data.phone}" style="color: #EC7846; text-decoration: none;">${data.phone}</a></td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- Property Address -->
            <div style="padding: 30px; border-bottom: 1px solid #e9ecef;">
              <h3 style="color: #1B2E4F; margin: 0 0 20px 0; font-size: 18px; display: flex; align-items: center;">
                📍 Property Address
              </h3>
              <div style="background: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px;">
                <div style="font-size: 16px; line-height: 1.6; color: #212529;">
                  <strong>${data.street}</strong><br>
                  ${data.city}, ${data.state} ${data.zip_code}
                </div>
                <div style="margin-top: 15px;">
                  <a href="https://maps.google.com/?q=${encodeURIComponent(data.street + ', ' + data.city + ', ' + data.state + ' ' + data.zip_code)}" 
                     style="display: inline-block; background: #EC7846; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 14px;">
                    📍 View on Google Maps
                  </a>
                </div>
              </div>
            </div>

            <!-- Inspection Details -->
            <div style="padding: 30px; border-bottom: 1px solid #e9ecef;">
              <h3 style="color: #1B2E4F; margin: 0 0 20px 0; font-size: 18px; display: flex; align-items: center;">
                🔍 Inspection Details
              </h3>
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px;">
                <div style="font-size: 18px; font-weight: 600; color: #856404; margin-bottom: 10px;">
                  ${data.inspection_type}
                </div>
                <div style="font-size: 14px; color: #856404;">
                  ${isDetailed ? 'Submitted via detailed 3-step form' : 'Submitted via quick request form'}
                </div>
              </div>
            </div>

            <!-- Insurance Information -->
            <div style="padding: 30px; border-bottom: 1px solid #e9ecef;">
              <h3 style="color: #1B2E4F; margin: 0 0 20px 0; font-size: 18px; display: flex; align-items: center;">
                🛡️ Insurance Information
              </h3>
              <div style="background: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="background: #f8f9fa;">
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057; width: 30%;">Insurance Company</td>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; color: #212529;">${data.insurance_company}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057;">Policy Number</td>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; color: #212529;">${data.policy_number || '<em style="color: #6c757d;">Not provided</em>'}</td>
                  </tr>
                  <tr style="background: #f8f9fa;">
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057;">Agency Name</td>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; color: #212529;">${data.agency_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057;">Agent Name</td>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; color: #212529;">${data.agent_name}</td>
                  </tr>
                  <tr style="background: #f8f9fa;">
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057;">Agent Phone</td>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef;"><a href="tel:${data.agent_phone}" style="color: #EC7846; text-decoration: none;">${data.agent_phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 20px; font-weight: 600; color: #495057;">Agent Email</td>
                    <td style="padding: 12px 20px;"><a href="mailto:${data.agent_email}" style="color: #EC7846; text-decoration: none;">${data.agent_email}</a></td>
                  </tr>
                </table>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="padding: 30px; text-align: center; background: #f8f9fa; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px;">
                📅 <strong>Submitted:</strong> ${new Date().toLocaleString()} | 
                🆔 <strong>Request ID:</strong> ${data.id || 'Generated on submission'}
              </p>
              <p style="margin: 0; color: #6c757d; font-size: 12px;">
                This notification was automatically generated by the Inspectana platform.<br>
                For support, contact: <a href="mailto:support@inspectana.com" style="color: #EC7846;">support@inspectana.com</a>
              </p>
            </div>
            
          </div>
        </body>
        </html>
        `
      } else if (type === 'interest_form') {
      subject = `💼 New Demo Request from ${data.first_name} ${data.last_name} at ${data.company}`
      csvData = generateCSVData(data, type)
      
        emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Demo Request</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 700px; margin: 0 auto; background-color: #ffffff;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1B2E4F 0%, #EC7846 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                💼 New Demo Request
              </h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">
                Inspectana Platform Notification
              </p>
            </div>

            <!-- Summary Card -->
            <div style="padding: 30px; border-bottom: 1px solid #e9ecef;">
              <div style="background: #f8f9fa; border-left: 4px solid #EC7846; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="color: #1B2E4F; margin: 0 0 10px 0; font-size: 20px;">📋 Demo Request Summary</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                  <div>
                    <strong style="color: #EC7846;">Contact:</strong> ${data.first_name} ${data.last_name}<br>
                    <strong style="color: #EC7846;">Company:</strong> ${data.company}
                  </div>
                  <div>
                    <strong style="color: #EC7846;">Email:</strong> ${data.email}<br>
                    <strong style="color: #EC7846;">Submitted:</strong> ${new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Information -->
            <div style="padding: 30px; border-bottom: 1px solid #e9ecef;">
              <h3 style="color: #1B2E4F; margin: 0 0 20px 0; font-size: 18px; display: flex; align-items: center;">
                👤 Contact Information
              </h3>
              <div style="background: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="background: #f8f9fa;">
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057; width: 30%;">Full Name</td>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; color: #212529;">${data.first_name} ${data.last_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057;">Email</td>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef;"><a href="mailto:${data.email}" style="color: #EC7846; text-decoration: none;">${data.email}</a></td>
                  </tr>
                  <tr style="background: #f8f9fa;">
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057;">Phone</td>
                    <td style="padding: 12px 20px; border-bottom: 1px solid #e9ecef;"><a href="tel:${data.phone}" style="color: #EC7846; text-decoration: none;">${data.phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 20px; font-weight: 600; color: #495057;">Company</td>
                    <td style="padding: 12px 20px; color: #212529;">${data.company}</td>
                  </tr>
                </table>
              </div>
            </div>
            
            ${data.message ? `
            <!-- Message -->
            <div style="padding: 30px; border-bottom: 1px solid #e9ecef;">
              <h3 style="color: #1B2E4F; margin: 0 0 20px 0; font-size: 18px; display: flex; align-items: center;">
                💬 Message
              </h3>
              <div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px;">
                <p style="margin: 0; color: #495057; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
            </div>
            ` : ''}
            
            <!-- Footer -->
            <div style="padding: 30px; text-align: center; background: #f8f9fa; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px;">
                📅 <strong>Submitted:</strong> ${new Date().toLocaleString()} | 
                🆔 <strong>Request ID:</strong> ${data.id || 'Generated on submission'}
              </p>
              <p style="margin: 0; color: #6c757d; font-size: 12px;">
                This notification was automatically generated by the Inspectana platform.<br>
                For support, contact: <a href="mailto:support@inspectana.com" style="color: #EC7846;">support@inspectana.com</a>
              </p>
            </div>

          </div>
        </body>
        </html>
        `
      }
  
      console.log('📧 Preparing to send email:', { subject, to: NOTIFICATION_EMAIL })
  
      // Send email using Resend
      const emailPayload = {
      from: 'Inspectana Notifications <notifications@inspectana.com>',
        to: [NOTIFICATION_EMAIL],
        subject: subject,
        html: emailContent,
        attachments: [
          {
            filename: `${type}_${data.id || Date.now()}.csv`,
            content: csvData,
          },
        ],
      }
  
    console.log('📤 Email payload prepared')
  
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      })
  
      console.log('📬 Resend API response status:', emailResponse.status)
  
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
        message: 'Professional email sent with CSV export data'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    } catch (error) {
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
  })