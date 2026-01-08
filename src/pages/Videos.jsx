import React from 'react';
import VideoSection from '../components/portfolio/VideoSection';

const Videos = () => {
    const shortFormVideos = [
        { title: "Sample Edit", description: "Clean and professional edit, focused on first 3s pacing.", videoId: "MU-IzW6s_Zk" },
    ];

    const longFormVideos = [
        { title: "Interview", description: "Full episode edit with multi-cam switching with minimal visuals for maximum impact retention.", videoId: "HdQS5y7MSgw" },
    ];

    const trailerVideos = [
        { title: "ALAS", description: "Cinematic color grading, fast-paced editing, and sound design.", videoId: "HP6v-T78YvA" },
    ];
    const shortFilms = [
        { title: "A VERY SPECIAL BUSINESS", description: "Cinematic color grading and sound design.", videoId: "8MeiCdjfaJI" },
    ];

    return (
        <>
            <div className="pt-20 pb-10 bg-neutral-50 dark:bg-dark-card/20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Portfolio
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-neutral-400">
                        A selection of my best work across different formats.
                    </p>
                </div>
            </div>

            <VideoSection
                title="Short-Form Content"
                description="Reels, TikToks, and Shorts designed for mobile retention."
                videos={shortFormVideos}
                type="shorts"
            />

            <VideoSection
                title="Podcast & Long-Form"
                description="Narrative-driven edits for YouTube and platforms."
                videos={longFormVideos}
                type="grid"
            />

            <VideoSection
                title="Trailers & Promos"
                description="High-impact visuals for maximum engagement."
                videos={trailerVideos}
                type="grid"
            />
            <VideoSection
                title="Short Films"
                description="Short films."
                videos={shortFilms}
                type="grid"
            />
        </>
    );
};

export default Videos;
