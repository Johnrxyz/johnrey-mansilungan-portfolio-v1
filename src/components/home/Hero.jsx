import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Hero = () => {
    return (
        <section className="py-20 md:py-45 h-[90vh]">
            {/* Increased max-width to 7xl */}
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Changed to a 5-column grid for finer control */}
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">

                    {/* Text Content: takes 2/5 columns */}
                    <div className="lg:col-span-2 flex flex-col gap-6 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Video Editor for <span className="text-slate-600 dark:text-neutral-400">Social Media & YouTube</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-neutral-300">
                            Clean, engaging edits designed for clarity and retention.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Link to="/videos">
                                <Button variant="primary" className="w-full sm:w-auto">View Videos</Button>
                            </Link>
                            <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                                <Button variant="secondary" className="w-full sm:w-auto">Contact Me</Button>
                            </button>
                        </div>
                    </div>

                    {/* Video Placeholder: takes 3/5 columns (Bigger) */}
                    <div className="lg:col-span-3 w-full">
                        {/* <div className="mb-3 text-sm font-semibold tracking-wider uppercase text-slate-500 dark:text-neutral-500 text-center lg:text-left">
                            Showreel
                        </div> */}
                        <div className="aspect-video bg-neutral-100 dark:bg-dark-bg  overflow-hidden shadow-2xl ring-1 ring-slate-900/10 relative">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube-nocookie.com/embed/3ZG7vpgos7Q"
                                title="YouTube video player"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
