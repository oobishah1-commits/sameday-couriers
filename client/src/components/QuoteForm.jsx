import React, { useState } from 'react';
import axios from 'axios';
import './QuoteForm.css';
import { CONTACT_INFO, getCallLink, getWhatsAppLink } from '../config';

const QuoteForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        postcode: '',
        deliveryPostcode: '',
        date: '',
        parcelType: 'Small',
        additionalDetails: ''
    });

    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const parcelTypes = [
        {
            value: 'Small',
            label: 'Small',
            svg: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" />
                </svg>
            )
        },
        {
            value: 'Medium',
            label: 'Medium',
            svg: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
                    <path d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128h2.2z" />
                </svg>
            )
        },
        {
            value: 'Large',
            label: 'Large',
            svg: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
                    <path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 464a48 48 0 1 1 0-96 48 48 0 1 1 0 96zm368-48a48 48 0 1 1 -96 0 48 48 0 1 1 96 0z" />
                </svg>
            )
        }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('Sending...');

        // Use different URL for production vs development
        const API_URL = process.env.NODE_ENV === 'production'
            ? '/api/quote'
            : 'http://localhost:5000/api/quote';

        try {
            const response = await axios.post(API_URL, formData);

            if (response.data.success) {
                setStatus('✅ Quote request sent successfully! Check your email for confirmation.');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    postcode: '',
                    deliveryPostcode: '',
                    date: '',
                    parcelType: 'Small',
                    additionalDetails: ''
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('❌ Failed to send. Please try calling us directly.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCallClick = (e) => {
        e.preventDefault();
        window.location.href = getCallLink();
    };

    const handleWhatsAppClick = (e) => {
        e.preventDefault();
        const whatsappUrl = getWhatsAppLink('Hello, I would like to get a quote for courier services');
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className="quote-form" id="quote">
            <div className="quote-container">
                <h2>Get a Quote</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name *"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number *"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email *"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="postcode"
                            placeholder="Pickup Postcode *"
                            value={formData.postcode}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <input
                            type="text"
                            name="deliveryPostcode"
                            placeholder="Delivery Postcode *"
                            value={formData.deliveryPostcode}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="date"
                            placeholder="dd/mm/yyyy"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="parcel-types">
                        <label className="parcel-label">Parcel Type *</label>
                        <div className="parcel-options">
                            {parcelTypes.map((type) => (
                                <label
                                    key={type.value}
                                    className={`parcel-option ${formData.parcelType === type.value ? 'selected' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="parcelType"
                                        value={type.value}
                                        checked={formData.parcelType === type.value}
                                        onChange={handleChange}
                                    />
                                    <div className="parcel-content">
                                        <div className="parcel-icon-svg">
                                            {type.svg}
                                        </div>
                                        <span className="parcel-text">{type.label}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <textarea
                        name="additionalDetails"
                        placeholder="Additional Details (optional)"
                        value={formData.additionalDetails}
                        onChange={handleChange}
                        rows="4"
                    />

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Submit Quote'}
                    </button>

                    {status && (
                        <p className={`status-message ${status.includes('✅') ? 'success' : status.includes('❌') ? 'error' : ''}`}>
                            {status}
                        </p>
                    )}

                    <div className="contact-options">
                        <p>Or contact us directly:</p>
                        <div className="contact-buttons">
                            <button
                                type="button"
                                className="contact-btn"
                                onClick={handleCallClick}
                            >
                                📞 Call
                            </button>
                            <button
                                type="button"
                                className="contact-btn"
                                onClick={handleWhatsAppClick}
                            >
                                💬 WhatsApp
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default QuoteForm;