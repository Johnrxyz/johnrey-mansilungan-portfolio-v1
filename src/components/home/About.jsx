import React from 'react';
import resume from '../../assets/Johnrey_Mansilungan_Resume.pdf';

const About = () => {
    return (
        <section className="py-20 bg-neutral-50 dark:bg-dark-card/50">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-2xl md:text-1xl font-bold text-slate-900 dark:text-white mb-8">About Me</h2>

                <div className="space-y-8">
                    <p className="text-2xl md:text-4xl font-small leading-relaxed text-slate-900 dark:text-neutral-200">
                        I’m a video editor with years of experience working on short films, trailers, YouTube content, and social media videos.
                        I also have experience in web development.
                    </p>
                    <p className="text-xl text-slate-600 dark:text-neutral-400 mb-10">
                        I focus on clean storytelling, strong pacing, and edits that feel intentional and professional. My goal is to help creators and brands communicate clearly without the clutter.
                    </p>
                </div>

                <div className="mt-8">
                    <a
                        href={resume}
                        download="Johnrey_Mansilungan_Resume.pdf"
                        className="inline-block px-8 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-neutral-200 transition-colors duration-300"
                    >
                        Download Resume
                    </a>
                </div>
            </div>
        </section>
    );
};

export default About;
