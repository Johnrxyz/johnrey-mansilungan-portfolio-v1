import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion
import Button from '../ui/Button';
import aaronImg from '../../assets/aaron.png';
import meImg from '../../assets/me.png';
import aslImg from '../../assets/asl.png';

const websites = [
    { title: "Artist/Architecture Portfolio", image: aaronImg },
    { title: "My Portfolio Website", image: meImg },
    { title: "Armor Sin Limites (E-Commerce)", image: aslImg }
];

const Showreel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    // Text splitting logic
    const titleText = "Web Developer";
    const descText = "Beyond video editing, I build clean, performant websites using modern technologies.";

    const titleWords = titleText.split(" ");
    const descWords = descText.split(" ");

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const wordTransition = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 15, stiffness: 100 }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % websites.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 md:py-32 bg-neutral-50 dark:bg-dark-card/50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* CONTENT - Top on mobile, Right on Desktop */}
                    <div className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left order-1 lg:order-2">

                        {/* Animated Title */}
                        <motion.h2
                            variants={container}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight flex flex-wrap justify-center lg:justify-start gap-x-[0.3em]"
                        >
                            {titleWords.map((word, index) => (
                                <motion.span key={index} variants={wordTransition} className="inline-block">
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h2>

                        {/* Animated Description */}
                        <motion.p
                            variants={container}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-lg text-slate-600 dark:text-neutral-300 flex flex-wrap justify-center lg:justify-start gap-x-[0.35em]"
                        >
                            {descWords.map((word, index) => (
                                <motion.span key={index} variants={wordTransition} className="inline-block">
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Link to="/websites">
                                <Button variant="primary" className="w-full sm:w-auto">View Projects</Button>
                            </Link>
                            {/* Fixed button onClick to avoid nested buttons */}
                            <Button
                                variant="secondary"
                                className="w-full sm:w-auto"
                                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                            >
                                Contact Me
                            </Button>
                        </div>
                    </div>

                    {/* CAROUSEL - Bottom on mobile, Left on Desktop */}
                    <div className="lg:col-span-7 w-full order-2 lg:order-1">
                        <div
                            onClick={() => navigate('/websites')}
                            className="aspect-video bg-neutral-100 dark:bg-dark-bg overflow-hidden shadow-2xl ring-1 ring-slate-900/10 relative cursor-pointer group hover:scale-[1.01] transition-transform duration-500"
                            title="Click to view all websites"
                        >
                            {websites.map((site, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                        }`}
                                >
                                    <img
                                        src={site.image}
                                        alt={site.title}
                                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <p className="text-white font-bold text-xl md:text-2xl drop-shadow-md">
                                            {site.title}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* Pagination Dots */}
                            <div className="absolute top-4 right-4 z-20 flex gap-2">
                                {websites.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-4' : 'bg-white/40'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Showreel;