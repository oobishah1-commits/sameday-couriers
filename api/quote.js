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

        console.log('📧 Quote received from:', email);

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

        // Send to client
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank You - Sameday Indus Couriers',
            html: `
        <h2>Thank You ${name}!</h2>
        <p>We'll contact you within 1 hour.</p>
        <p>Phone: +44 7561 311211</p>
      `
        });

        console.log('✅ Emails sent successfully');

        return res.status(200).json({
            success: true,
            message: 'Quote sent successfully!'
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}