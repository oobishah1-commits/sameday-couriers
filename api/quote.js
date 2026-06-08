const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed. Use POST.' });
    }

    try {
        const { name, phone, email, postcode, deliveryPostcode, date, parcelType, additionalDetails } = req.body;

        console.log('📧 Quote request received:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', phone);

        // Validate required fields
        if (!name || !email || !phone || !postcode || !deliveryPostcode || !date || !parcelType) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // EMAIL 1: Send to Admin (you)
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: 'oobishah1@gmail.com',
            subject: 'New Quote Request - Sameday Indus Couriers',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #003087; border-bottom: 3px solid #003087; padding-bottom: 10px;">
              🆕 New Quote Request
            </h2>
            
            <div style="margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; width: 40%;">Customer Name</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Phone Number</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;">${phone}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Email Address</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Pickup Postcode</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;">${postcode}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Delivery Postcode</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;">${deliveryPostcode}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Delivery Date</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;">${date}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Parcel Type</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;"><strong>${parcelType}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; vertical-align: top;">Additional Details</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;">${additionalDetails || 'None provided'}</td>
                </tr>
              </table>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                📅 Received: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
              </p>
              <p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">
                This quote request was submitted from the Sameday Indus Couriers website.
              </p>
            </div>
          </div>
        </div>
      `
        };

        await transporter.sendMail(adminMailOptions);
        console.log('✅ Admin email sent to oobishah1@gmail.com');

        // EMAIL 2: Send Confirmation to Client
        const clientMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank You for Your Quote Request - Sameday Indus Couriers',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #003087; margin: 0; font-size: 28px;">Sameday Indus Couriers</h1>
              <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Fast. Reliable. Professional.</p>
            </div>

            <!-- Main Message -->
            <div style="background-color: #f8f9ff; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #003087; margin-top: 0; font-size: 24px;">Thank You for Contacting Us!</h2>
              <p style="color: #333; line-height: 1.6; font-size: 16px;">
                Dear <strong>${name}</strong>,
              </p>
              <p style="color: #333; line-height: 1.6; font-size: 16px;">
                We have received your quote request and appreciate you choosing Sameday Indus Couriers for your delivery needs.
              </p>
              <p style="color: #333; line-height: 1.6; font-size: 16px;">
                Our team will review your request and get back to you within <strong style="color: #003087; font-size: 18px;">1 hour</strong> with a competitive quote.
              </p>
            </div>

            <!-- Quote Summary -->
            <div style="background-color: #fff; border: 2px solid #003087; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #003087; margin-top: 0; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; font-size: 20px;">
                📋 Your Quote Summary
              </h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Pickup Location:</td>
                  <td style="padding: 8px 0; color: #333;">${postcode}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Delivery Location:</td>
                  <td style="padding: 8px 0; color: #333;">${deliveryPostcode}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Delivery Date:</td>
                  <td style="padding: 8px 0; color: #333;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Parcel Type:</td>
                  <td style="padding: 8px 0; color: #333;"><strong>${parcelType}</strong></td>
                </tr>
                ${additionalDetails ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600; vertical-align: top;">Additional Details:</td>
                  <td style="padding: 8px 0; color: #333;">${additionalDetails}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <!-- Contact Information -->
            <div style="background-color: #003087; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin-top: 0; color: white; font-size: 20px;">📞 Need Immediate Assistance?</h3>
              <p style="margin: 10px 0; font-size: 16px;">
                <strong>Phone:</strong> <a href="tel:+447561311211" style="color: white; text-decoration: none;">+44 7561 311211</a>
              </p>
              <p style="margin: 10px 0; font-size: 16px;">
                <strong>WhatsApp:</strong> <a href="https://wa.me/447561311211" style="color: white; text-decoration: none;">+44 7561 311211</a>
              </p>
              <p style="margin: 10px 0; font-size: 16px;">
                <strong>Email:</strong> <a href="mailto:oobishah1@gmail.com" style="color: white; text-decoration: none;">oobishah1@gmail.com</a>
              </p>
            </div>

            <!-- Why Choose Us -->
            <div style="padding: 20px 0;">
              <h3 style="color: #003087; margin-bottom: 15px; font-size: 20px;">✨ Why Choose Us?</h3>
              <ul style="color: #333; line-height: 1.8; padding-left: 20px;">
                <li>✅ GPS-tracked deliveries</li>
                <li>✅ Fully insured & vetted drivers</li>
                <li>✅ Competitive pricing from £1.10/mile</li>
                <li>✅ 24/7 customer support</li>
              </ul>
            </div>

            <!-- Footer -->
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
              <p style="color: #666; font-size: 14px; margin: 5px 0;">
                <strong>Same Day Indus Couriers Ltd.</strong>
              </p>
              <p style="color: #666; font-size: 12px; margin: 5px 0;">
                18 High Terrace 128, Birmingham, B17 9HL
              </p>
              <p style="color: #999; font-size: 11px; margin: 15px 0 5px 0;">
                This is an automated confirmation email. Please do not reply directly to this email.
              </p>
            </div>
          </div>
        </div>
      `
        };

        await transporter.sendMail(clientMailOptions);
        console.log('✅ Client confirmation email sent to:', email);

        return res.status(200).json({
            success: true,
            message: 'Quote request sent successfully! Check your email for confirmation.'
        });

    } catch (error) {
        console.error('❌ Error sending emails:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to send emails. Please try again.',
            error: error.message
        });
    }
}