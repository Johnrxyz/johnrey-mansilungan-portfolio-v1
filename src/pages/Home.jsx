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
        const scrollToId = location.state?.scrollTo;
        if (scrollToId) {
            const section = document.getElementById(scrollToId);
            if (section) {
                // Wait a bit for the page to render if needed
                setTimeout(() => {
                    section.scrollIntoView({ behavior: 'smooth' });
                }, 100);
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
