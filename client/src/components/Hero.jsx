import React from 'react';
import './Hero.css';
import { getCallLink } from '../config';
import heroVan from '../assets/images/hero-van.jpg';

const Hero = () => {
    const scrollToQuote = () => {
        document.getElementById('quote').scrollIntoView({ behavior: 'smooth' });
    };

    const heroStyle = {
        background: `linear-gradient(rgba(0, 48, 135, 0.75), rgba(0, 48, 135, 0.75)), url(${heroVan}) center center/cover no-repeat`
    };

    return (
        <section className="hero" id="home" style={heroStyle}>
            <div className="hero-content-wrapper">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title animate-fade-in-up">
                            Fast. Reliable.
                        </h1>
                        <h1 className="hero-title hero-title-main animate-fade-in-up delay-1">
                            Sameday Indus Couriers
                        </h1>
                        <p className="hero-subtitle animate-fade-in-up delay-2">
                            Serving your delivery needs with professional courier services across UK
                        </p>
                        <div className="hero-buttons animate-fade-in-up delay-3">
                            <button className="btn btn-primary" onClick={scrollToQuote}>
                                Get a Quote
                            </button>
                            <a href={getCallLink()} className="btn btn-secondary">
                                📞 Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;