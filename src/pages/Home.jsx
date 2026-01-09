import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/home/Hero';
import Showreel from '../components/home/Showreel';
import Services from '../components/home/Services';
import About from '../components/home/About';
import Contact from '../components/home/Contact';

import Testimonials from '../components/home/Testimonials';

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.scrollTo === 'contact') {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                // Clear state
                navigate('/', { replace: true, state: {} });
            }
        }
    }, [location, navigate]);

    return (
        <>
            <Hero />
            <Showreel />
            <Services />
            <Testimonials />
            <About />
            <Contact />
        </>
    );
};

export default Home;
