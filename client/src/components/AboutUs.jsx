import React from 'react';
import './AboutUs.css';
import aboutImage from '../assets/images/about-van.jpg';

const AboutUs = () => {
    return (
        <section className="about-us">
            <div className="container about-content">
                <div className="about-text">
                    <h2>About Us</h2>
                    <p>
                        Indus Couriers is a trusted same-day delivery specialist with local roots and
                        nationwide reach. Fast, timely, reliable delivery.
                    </p>
                    <p>
                        We've been serving businesses and individuals across the UK with fast,
                        reliable courier services. Our team of experienced drivers and modern fleet
                        ensure your packages arrive on time, every time.
                    </p>
                    <p>
                        With GPS tracking, full insurance, and 24/7 customer support, you can trust us
                        with your most important deliveries.
                    </p>
                </div>
                <div className="about-image">
                    <img
                        src={aboutImage}
                        alt="Sameday Indus Couriers Delivery Van"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutUs;