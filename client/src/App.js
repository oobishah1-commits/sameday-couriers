import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import QuoteForm from './components/QuoteForm';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Hero />
            <Services />
            <div className="quote-why-section">
                <WhyChooseUs />
                <QuoteForm />
            </div>
            <AboutUs />
            <Footer />
        </div>
    );
}

export default App;