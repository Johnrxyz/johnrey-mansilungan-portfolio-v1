import React from 'react';

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

    return (
        <section className="py-20 md:py-32 relative">
            {/* <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-slate-200 dark:bg-dark-card rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div> */}

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Services</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {services.map((service, index) => (
                        <div
                            key={index}
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
