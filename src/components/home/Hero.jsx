import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Hero = () => {
    // Text splitting logic
    const headingText = "Video Editor for Social Media & YouTube";
    const headingWords = headingText.split(" ");

    const sentenceText = "Clean, engaging edits designed for clarity and retention.";
    const sentenceWords = sentenceText.split(" ");

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

    return (
        <section className="py-20 md:py-45 h-[90vh]">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">

                    <div className="lg:col-span-2 flex flex-col gap-6 text-center lg:text-left">

                        {/* Animated Heading */}
                        <motion.h1
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl md:text-5xl lg:text-7xl 
                                        font-bold tracking-tighter text-slate-900 
                                        dark:text-white leading-[0.6] flex flex-wrap 
                                    justify-center lg:justify-start dark:text-shadow-[0_-15px_15px_rgba(0,0,0,0.4)]">
                            {headingWords.map((word, index) => {
                                // Check if the word belongs to the fancy section
                                const isHighlighted = ["Social", "Media", "&", "YouTube"].includes(word.replace(/[^a-zA-Z&]/g, ''));

                                return (
                                    <motion.span
                                        key={index}
                                        variants={wordTransition}
                                        className={`inline-block py-1 ${isHighlighted
                                            ? 'text-slate-600 dark:text-neutral-400 font-fancy italic tracking-normal lowercase'
                                            : 'font-bold'
                                            }`}
                                    >
                                        {word}
                                    </motion.span>
                                );
                            })}
                        </motion.h1>

                        {/* Animated Paragraph */}
                        <motion.p
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            className="text-lg md:text-xl text-slate-600 dark:text-neutral-300 flex flex-wrap justify-center lg:justify-start gap-x-[0.35em]"
                        >
                            {sentenceWords.map((word, index) => (
                                <motion.span
                                    key={index}
                                    variants={wordTransition}
                                    className="inline-block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Link to="/videos">
                                <Button variant="primary" className="w-full sm:w-auto">View Videos</Button>
                            </Link>
                            <Button
                                variant="secondary"
                                className="w-full sm:w-auto"
                                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                            >
                                Contact Me
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-3 w-full">
                        <div className="aspect-video bg-neutral-100 dark:bg-dark-bg overflow-hidden shadow-2xl ring-1 ring-slate-900/10 relative">
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