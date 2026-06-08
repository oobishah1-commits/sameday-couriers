const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

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

    // Email to admin
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
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #003087; margin: 0; font-size: 28px;">Sameday Indus Couriers</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Fast. Reliable. Professional.</p>
          </div>
          <div style="background-color: #f8f9ff; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #003087; margin-top: 0;">Thank You for Contacting Us!</h2>
            <p style="color: #333; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
            <p style="color: #333; line-height: 1.6;">
              We have received your quote request and appreciate you choosing Sameday Indus Couriers.
            </p>
            <p style="color: #333; line-height: 1.6;">
              Our team will review your request and get back to you within <strong style="color: #003087;">1 hour</strong>.
            </p>
          </div>
          <div style="background-color: #003087; color: white; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: white;">Contact Us:</h3>
            <p style="margin: 10px 0;">📞 +44 7561 311211</p>
            <p style="margin: 10px 0;">✉️ oobishah1@gmail.com</p>
          </div>
        </div>
      </div>
    `
    };

    try {
        await transporter.sendMail(adminMailOptions);
        console.log('Admin email sent');

        await transporter.sendMail(clientMailOptions);
        console.log('Client email sent');

        return res.status(200).json({
            success: true,
            message: 'Quote request sent successfully!'
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to send quote request.',
            error: error.message
        });
    }
};