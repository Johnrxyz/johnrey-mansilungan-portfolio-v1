import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import aaronImg from '../../assets/aaron.png';
import meImg from '../../assets/me.png';
import aslImg from '../../assets/asl.png';

const websites = [
    {
        title: "Artist/Architecture Portfolio",
        image: aaronImg
    },
    {
        title: "My Portfolio Website",
        image: meImg
    },
    {
        title: "Armor Sin Limites (E-Commerce)",
        image: aslImg
    }
];

const Showreel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % websites.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 bg-neutral-50 dark:bg-dark-card/50 ">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:flex-row-reverse">

                    {/* Content */}
                    <div className="flex flex-col gap-6 text-center lg:text-left lg:order-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Website Developed
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-neutral-300">
                            Beyond video editing, I build clean, performant websites using modern technologies.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Link to="/websites">
                                <Button variant="primary" className="w-full sm:w-auto">View Websites Worked</Button>
                            </Link>
                            <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                                <Button variant="secondary" className="w-full sm:w-auto">Contact Me</Button>
                            </button>
                        </div>
                    </div>

                    {/* Carousel */}
                    <div className="w-full lg:order-1">
                        <div
                            onClick={() => navigate('/websites')}
                            className="aspect-video bg-neutral-100 dark:bg-dark-bg overflow-hidden shadow-2xl ring-1 ring-slate-900/10 relative cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
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
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient Overlay for title readability */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

                                    <div className="absolute bottom-6 left-6 right-6">
                                        <p className="text-white font-bold text-lg md:text-xl drop-shadow-md">
                                            {site.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Showreel;
