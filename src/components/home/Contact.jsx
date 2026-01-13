import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Contact = () => {
    const headingText = "Let's Work Together";
    const subText = "Open to freelance projects and collaborations.";

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 15, stiffness: 100 }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="contact" className="py-20 md:py-28 min-h-[70vh] flex items-center">
            <div className="container mx-auto px-4 max-w-3xl text-center">

                {/* Animated Heading */}
                <motion.h2
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 flex flex-wrap justify-center gap-x-[0.3em]"
                >
                    {headingText.split(" ").map((word, i) => (
                        <motion.span key={i} variants={wordVariants} className="inline-block">
                            {word}
                        </motion.span>
                    ))}
                </motion.h2>

                {/* Animated Subtext */}
                <motion.p
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-xl text-slate-600 dark:text-neutral-400 mb-10 flex flex-wrap justify-center gap-x-[0.35em]"
                >
                    {subText.split(" ").map((word, i) => (
                        <motion.span key={i} variants={wordVariants} className="inline-block">
                            {word}
                        </motion.span>
                    ))}
                </motion.p>

                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="inline-flex flex-col items-center gap-6"
                >
                    {/* The Email Address */}
                    <a
                        href="mailto:mansilungan.johnrey.dll@gmail.com"
                        className="text-lg sm:text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all md:break-normal"
                    >
                        mansilungan.johnrey.dll@gmail.com
                    </a>

                    {/* Social Links */}
                    <div className="flex gap-4 mt-4">
                        <a href="https://www.instagram.com/rye.drp/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Instagram</a>
                        <span className="text-slate-300 dark:text-neutral-700">•</span>
                        <a href="https://www.facebook.com/whoscutt1ngonions" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Facebook</a>
                    </div>

                    {/* Final CTA Button */}
                    <div className="mt-8">
                        <a href="mailto:mansilungan.johnrey.dll@gmail.com">
                            <Button variant="primary" className="px-10 py-4 text-lg">Send me an Email</Button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;