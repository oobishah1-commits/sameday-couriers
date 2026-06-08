const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
    res.send('Sameday Couriers API is running!');
});

// Quote submission route
app.post('/api/quote', async (req, res) => {
    const {
        name,
        phone,
        email,
        postcode,
        deliveryPostcode,
        date,
        parcelType,
        additionalDetails
    } = req.body;

    console.log('Quote request received:', req.body);

    // Email configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email to admin (you)
    const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: 'oobishah1@gmail.com',
        subject: 'New Quote Request - Sameday Indus Couriers',
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
          <h2 style="color: #003087; border-bottom: 3px solid #003087; padding-bottom: 10px;">
            New Quote Request
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Pickup Postcode:</strong> ${postcode}</p>
            <p style="margin: 10px 0;"><strong>Delivery Postcode:</strong> ${deliveryPostcode}</p>
            <p style="margin: 10px 0;"><strong>Date:</strong> ${date}</p>
            <p style="margin: 10px 0;"><strong>Parcel Type:</strong> ${parcelType}</p>
            <p style="margin: 10px 0;"><strong>Additional Details:</strong> ${additionalDetails || 'None'}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">
              This quote request was submitted from the Sameday Indus Couriers website.
            </p>
          </div>
        </div>
      </div>
    `
    };

    // Confirmation email to client
    const clientMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank You for Your Quote Request - Sameday Indus Couriers',
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          
          <!-- Header with Logo -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #003087; margin: 0; font-size: 28px;">Sameday Indus Couriers</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Fast. Reliable. Professional.</p>
          </div>

          <!-- Main Content -->
          <div style="background-color: #f8f9ff; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #003087; margin-top: 0;">Thank You for Contacting Us!</h2>
            <p style="color: #333; line-height: 1.6; font-size: 16px;">
              Dear <strong>${name}</strong>,
            </p>
            <p style="color: #333; line-height: 1.6; font-size: 16px;">
              We have received your quote request and appreciate you choosing Sameday Indus Couriers for your delivery needs.
            </p>
            <p style="color: #333; line-height: 1.6; font-size: 16px;">
              Our team will review your request and get back to you within <strong style="color: #003087;">1 hour</strong> with a competitive quote.
            </p>
          </div>

          <!-- Quote Summary -->
          <div style="background-color: #fff; border: 2px solid #003087; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #003087; margin-top: 0; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
              Your Quote Details
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Pickup Postcode:</td>
                <td style="padding: 8px 0; color: #333;">${postcode}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Delivery Postcode:</td>
                <td style="padding: 8px 0; color: #333;">${deliveryPostcode}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Date:</td>
                <td style="padding: 8px 0; color: #333;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Parcel Type:</td>
                <td style="padding: 8px 0; color: #333;">${parcelType}</td>
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
            <h3 style="margin-top: 0; color: white;">Need Immediate Assistance?</h3>
            <p style="margin: 10px 0;">
              📞 <strong>Phone:</strong> <a href="tel:+447561311211" style="color: white; text-decoration: none;">+44 7561 311211</a>
            </p>
            <p style="margin: 10px 0;">
              💬 <strong>WhatsApp:</strong> <a href="https://wa.me/447561311211" style="color: white; text-decoration: none;">+44 7561 311211</a>
            </p>
            <p style="margin: 10px 0;">
              ✉️ <strong>Email:</strong> <a href="mailto:oobishah1@gmail.com" style="color: white; text-decoration: none;">oobishah1@gmail.com</a>
            </p>
          </div>

          <!-- Why Choose Us -->
          <div style="padding: 20px 0;">
            <h3 style="color: #003087; margin-bottom: 15px;">Why Choose Us?</h3>
            <ul style="color: #333; line-height: 1.8; padding-left: 20px;">
              <li>✓ GPS-tracked deliveries</li>
              <li>✓ Fully insured & vetted drivers</li>
              <li>✓ Competitive pricing from £1.10/mile</li>
              <li>✓ 24/7 customer support</li>
            </ul>
          </div>

          <!-- Footer -->
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 5px 0;">
              Same Day Indus Couriers Ltd.
            </p>
            <p style="color: #666; font-size: 12px; margin: 5px 0;">
              18 High Terrace 128, Birmingham, B17 9HL
            </p>
            <p style="color: #666; font-size: 12px; margin: 15px 0 5px 0;">
              This is an automated confirmation email. Please do not reply directly to this email.
            </p>
          </div>
        </div>
      </div>
    `
    };

    try {
        // Send email to admin
        await transporter.sendMail(adminMailOptions);
        console.log('✅ Admin notification email sent to oobishah1@gmail.com');

        // Send confirmation email to client
        await transporter.sendMail(clientMailOptions);
        console.log(`✅ Confirmation email sent to client: ${email}`);

        res.status(200).json({
            success: true,
            message: 'Quote request sent successfully! Check your email for confirmation.'
        });
    } catch (error) {
        console.error('❌ Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send quote request. Please try again.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});