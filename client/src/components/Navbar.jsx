import React from 'react';
import './Navbar.css';
import { CONTACT_INFO, getWhatsAppLink, getCallLink } from '../config';

// Try to import logo, use text logo as fallback
let logo;
try {
    logo = require('../assets/images/logo.png');
} catch (e) {
    logo = null;
}

const Navbar = () => {
    return (
        <>
            <div className="top-bar">
                <div className="container top-bar-content">
                    <div className="contact-info">
                        <a href={getCallLink()} className="top-link">
                            📞 {CONTACT_INFO.phoneDisplay}
                        </a>
                        <a
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="top-link"
                        >
                            💬 WhatsApp
                        </a>
                    </div>
                </div>
            </div>
            <nav className="navbar">
                <div className="container nav-content">
                    <div className="logo">
                        {logo ? (
                            <img src={logo} alt="Sameday Indus Couriers" />
                        ) : (
                            <div className="text-logo">
                                <h2>SAMEDAY</h2>
                                <p>Indus Couriers</p>
                            </div>
                        )}
                    </div>
                    <ul className="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#quote">Get Quote</a></li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;