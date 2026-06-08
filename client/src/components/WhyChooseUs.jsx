import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
    const features = [
        'GPS-tracked deliveries',
        'Fully insured & vetted drivers',
        'Competitive pricing (from £1.10/mile)',
        '24/7 customer support'
    ];

    return (
        <section className="why-choose-us">
            <div className="why-container">
                <h2>Why Choose Us</h2>
                <ul className="features-list">
                    {features.map((feature, index) => (
                        <li key={index}>
                            <span className="checkbox-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <circle cx="12" cy="12" r="10" fill="#003087" />
                                    <path d="M9 12.5l2 2 4-4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span className="feature-text">{feature}</span>
                        </li>
                    ))}
                </ul>
                <div className="testimonial">
                    <p className="testimonial-text">
                        "Fast, professional, saved our day—thanks Indus Couriers!"
                    </p>
                    <span className="testimonial-author">— Sarah J.</span>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;