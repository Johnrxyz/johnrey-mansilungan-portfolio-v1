import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
    const [openTranslations, setOpenTranslations] = useState({});

    const toggleTranslation = (index) => {
        setOpenTranslations(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const testimonials = [
        {
            name: "Aaron Ocaya",
            role: "Artist/Architecture Student",
            projectType: "Website Portfolio",
            text: "Yung Gawa ni johnrey ay napaka ganda Madaling intindihin yung website na ginawa nya para sa aking Business na Art's and craft, nagustohan korin yung phone version nung website at yung pc Napaka linaw nung mga pictures, overall presentation napaka Angas 👌🏻😌",
            translation: "Johnrey's work is extremely beautiful. The website he created for my Arts and Crafts business is easy to understand. I also loved the phone and PC versions. The pictures are very clear, overall presentation is very cool."
        },
        {
            name: "Anton",
            role: "Armor Sin Limites Founder",
            projectType: "E-Commerce Website",
            text: "Solid work"
        },
    ];

    // Animation Configs
    const titleText = "Client Testimonials";
    const descText = "What creators and brands say about working with me.";

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

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" }
        })
    };

    return (
        <section className="py-20 mb-15">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* ANIMATED HEADER */}
                <div className="mb-12 text-center">
                    <motion.h2
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 flex justify-center gap-x-[0.3em]"
                    >
                        {titleText.split(" ").map((word, i) => (
                            <motion.span key={i} variants={wordVariants} className="inline-block">{word}</motion.span>
                        ))}
                    </motion.h2>
                    <motion.p
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto flex flex-wrap justify-center gap-x-[0.3em]"
                    >
                        {descText.split(" ").map((word, i) => (
                            <motion.span key={i} variants={wordVariants} className="inline-block">{word}</motion.span>
                        ))}
                    </motion.p>
                </div>

                {/* ANIMATED TESTIMONIALS GRID */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="p-8 rounded-2xl bg-neutral-50 dark:bg-dark-card border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-4xl text-blue-500/30 font-serif leading-none">“</div>
                                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                                        {item.projectType}
                                    </span>
                                </div>
                                <p className="text-slate-700 dark:text-neutral-300 italic leading-relaxed mb-4">
                                    {item.text}
                                </p>

                                {/* ANIMATED TRANSLATION */}
                                {item.translation && (
                                    <div className="mb-6">
                                        <button
                                            onClick={() => toggleTranslation(index)}
                                            className="text-xs font-semibold text-slate-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors focus:outline-none"
                                        >
                                            {openTranslations[index] ? 'Hide translation' : 'See translation'}
                                            <motion.svg
                                                animate={{ rotate: openTranslations[index] ? 180 : 0 }}
                                                className="w-3 h-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </motion.svg>
                                        </button>

                                        <AnimatePresence>
                                            {openTranslations[index] && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-sm text-slate-600 dark:text-neutral-400 bg-slate-100 dark:bg-black/20 p-3 rounded-lg italic mt-2">
                                                        {item.translation}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>

                            <div>
                                {!item.translation && <div className="mb-6"></div>}
                                <div className="h-px w-12 bg-slate-200 dark:bg-white/10 mb-4"></div>
                                <h4 className="font-bold text-slate-900 dark:text-white">
                                    {item.name}
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-neutral-500">
                                    {item.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;