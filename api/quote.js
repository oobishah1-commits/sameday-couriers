const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, phone, email, postcode, deliveryPostcode, date, parcelType, additionalDetails } = req.body;

        console.log('📧 Environment variables check:');
        console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
        console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
        console.log('📧 Received quote from:', email);

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            return res.status(500).json({
                success: false,
                message: 'Server configuration error - missing email credentials'
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Send to admin
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'oobishah1@gmail.com',
            subject: 'New Quote Request - Sameday Indus Couriers',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #003087;">New Quote Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Pickup Postcode:</strong> ${postcode}</p>
          <p><strong>Delivery Postcode:</strong> ${deliveryPostcode}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Parcel Type:</strong> ${parcelType}</p>
          <p><strong>Additional Details:</strong> ${additionalDetails || 'None'}</p>
        </div>
      `
        });

        console.log('✅ Admin email sent successfully');

        // Send to client
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank You for Your Quote Request - Sameday Indus Couriers',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #003087;">Thank You for Contacting Us!</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>We have received your quote request and will get back to you within 1 hour.</p>
          <p><strong>Contact:</strong> +44 7561 311211</p>
          <p><strong>Email:</strong> oobishah1@gmail.com</p>
        </div>
      `
        });

        console.log('✅ Client email sent successfully');

        return res.status(200).json({
            success: true,
            message: 'Quote request sent successfully!'
        });

    } catch (error) {
        console.error('❌ Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to send email',
            error: error.message
        });
    }
};