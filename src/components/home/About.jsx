import React from 'react';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import resume from '../../assets/Johnrey_Mansilungan_Resume.pdf';

const About = () => {
    const mainBio = "I’m a video editor with years of experience working on short films, trailers, YouTube content, and social media videos. I also have experience in web development.";
    const subBio = "I focus on clean storytelling, strong pacing, and edits that feel intentional and professional. My goal is to help creators and brands communicate clearly without the clutter.";

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 }
        }
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 15, stiffness: 100 }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="py-20 bg-neutral-50 dark:bg-dark-card/50 overflow-hidden">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                {/* Section Title */}
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8"
                >
                    About Me
                </motion.h2>

                <div className="space-y-8">
                    {/* Main Bio: Animated word-by-word */}
                    <motion.p
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-2xl md:text-4xl font-small leading-relaxed text-slate-900 dark:text-neutral-200 flex flex-wrap justify-center gap-x-[0.25em]"
                    >
                        {mainBio.split(" ").map((word, i) => (
                            <motion.span key={i} variants={wordVariants} className="inline-block">
                                {word}
                            </motion.span>
                        ))}
                    </motion.p>

                    {/* Sub Bio: Animated word-by-word */}
                    <motion.p
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-xl text-slate-600 dark:text-neutral-400 mb-10 flex flex-wrap justify-center gap-x-[0.3em]"
                    >
                        {subBio.split(" ").map((word, i) => (
                            <motion.span key={i} variants={wordVariants} className="inline-block">
                                {word}
                            </motion.span>
                        ))}
                    </motion.p>
                </div>

                {/* Download Button */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mt-12"
                >
                    <a
                        href={resume}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="primary">See / Download Resume</Button>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default About;