import React from 'react';
import './Footer.css';
import { CONTACT_INFO, getCallLink, getWhatsAppLink, getEmailLink } from '../config';

let logo;
try {
    logo = require('../assets/images/logo.png');
} catch (e) {
    logo = null;
}

const Footer = () => {
    const handleWhatsAppClick = (e) => {
        e.preventDefault();
        window.open(getWhatsAppLink(), '_blank', 'noopener,noreferrer');
    };

    const handleCallClick = (e) => {
        e.preventDefault();
        window.location.href = getCallLink();
    };

    const handleEmailClick = (e) => {
        e.preventDefault();
        window.location.href = getEmailLink();
    };

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section footer-company">
                    {logo ? (
                        <img src={logo} alt="Logo" className="footer-logo" />
                    ) : (
                        <div className="footer-text-logo">
                            <h2>SAMEDAY</h2>
                            <p>Indus Couriers</p>
                        </div>
                    )}
                    <p className="company-name"><strong>{CONTACT_INFO.companyName}</strong></p>
                    <p>{CONTACT_INFO.address.line1}</p>
                    <p>{CONTACT_INFO.address.city}</p>
                    <p>{CONTACT_INFO.address.postcode}</p>
                </div>

                <div className="footer-section footer-quick-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#quote">Get Quote</a></li>
                    </ul>
                </div>

                <div className="footer-section footer-contact">
                    <h3>Contact Us</h3>
                    <div className="footer-contact-links">
                        <a
                            href={getCallLink()}
                            className="footer-link"
                            onClick={handleCallClick}
                        >
                            📞 {CONTACT_INFO.phoneDisplay}
                        </a>
                        <a
                            href="#whatsapp"
                            className="footer-link"
                            onClick={handleWhatsAppClick}
                        >
                            💬 WhatsApp
                        </a>
                        <a
                            href={getEmailLink()}
                            className="footer-link"
                            onClick={handleEmailClick}
                        >
                            ✉️ {CONTACT_INFO.email}
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 {CONTACT_INFO.companyName} All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;