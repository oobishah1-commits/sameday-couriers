const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, phone, email, postcode, deliveryPostcode, date, parcelType, additionalDetails } = req.body;

    console.log('📧 Quote request received:', { name, email, phone });

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Admin email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'oobishah1@gmail.com',
            subject: 'New Quote Request - Sameday Indus Couriers',
            html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pickup:</strong> ${postcode}</p>
        <p><strong>Delivery:</strong> ${deliveryPostcode}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Parcel Type:</strong> ${parcelType}</p>
        <p><strong>Details:</strong> ${additionalDetails || 'None'}</p>
      `
        });

        console.log('✅ Admin email sent');

        // Client email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank You - Sameday Indus Couriers',
            html: `
        <h2>Thank You for Your Quote Request!</h2>
        <p>Dear ${name},</p>
        <p>We'll get back to you within 1 hour.</p>
        <p>Contact: +44 7561 311211</p>
      `
        });

        console.log('✅ Client email sent');

        return res.status(200).json({ success: true, message: 'Quote sent!' });

    } catch (error) {
        console.error('❌ Email error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to send email',
            error: error.message
        });
    }
};