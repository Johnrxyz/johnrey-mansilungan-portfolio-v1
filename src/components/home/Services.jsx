import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
    const services = [
        {
            title: "Short-Form Content",
            description: "Reels, Shorts, and TikToks designed to hook viewers instantly."
        },
        {
            title: "YouTube Long-Form Editing",
            description: "Engaging storytelling, consistent pacing, and retention-focused editing."
        },
        {
            title: "Podcast Editing & Repurposing",
            description: "Full episode editing, audio cleanup, and creating clips for social media."
        },
        {
            title: "Trailer & Promotional Editing",
            description: "High-impact cuts for product launches, events, and teasers."
        },
        {
            title: "Short Film Editing",
            description: "Editing short films for maximum impact and engagement."
        },
        {
            title: "Website Development",
            description: "Building clean, performant websites using modern technologies."
        },
        {
            title: "Social Media Management",
            description: "Creating and managing social media content for maximum engagement."
        },
    ];

    // 1. Logic for Title Animation
    const titleText = "Services";
    const titleWords = titleText.split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 12, stiffness: 100 }
        }
    };

    // 2. Logic for Card Animation (Staggered Entrance)
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1, // Staggers the cards based on their index
                duration: 0.05,
                ease: "easeOut"
            }
        })
    };

    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* ANIMATED HEADING */}
                <div className="mb-16 text-center">
                    <motion.h2
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 flex justify-center gap-x-[0.3em]"
                    >
                        {titleWords.map((word, index) => (
                            <motion.span key={index} variants={wordVariants} className="inline-block">
                                {word}
                            </motion.span>
                        ))}
                    </motion.h2>
                    <div className="w-20 h-1.5 bg-slate-900 dark:bg-white mx-auto rounded-full mt-2" />
                </div>

                {/* ANIMATED SERVICES GRID */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            custom={index} // Pass index for stagger
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="p-8 rounded-2xl transition-all duration-300 group
                                bg-neutral-50/40 backdrop-blur-md border border-slate-200/50 shadow-sm
                                hover:shadow-xl hover:bg-white/60
                                dark:bg-dark-card/40 dark:backdrop-blur-lg dark:border-white/10
                                dark:hover:bg-dark-card/60"
                        >
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-slate-600 dark:group-hover:text-neutral-300 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 dark:text-neutral-400 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;