import React from 'react';

const About = () => {
    return (
        <section className="py-20 bg-neutral-50 dark:bg-dark-card/50">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-2xl md:text-1xl font-bold text-slate-900 dark:text-white mb-8">About Me</h2>

                <div className="space-y-8">
                    <p className="text-2xl md:text-4xl font-medium leading-relaxed text-slate-900 dark:text-neutral-200">
                        I’m a video editor with years of experience working on short films, trailers, YouTube content, and social media videos.
                    </p>
                    <p className="text-xl text-slate-600 dark:text-neutral-400 mb-10">
                        I focus on clean storytelling, strong pacing, and edits that feel intentional and professional. My goal is to help creators and brands communicate clearly without the clutter.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
