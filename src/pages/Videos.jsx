import React from 'react';
import VideoSection from '../components/portfolio/VideoSection';

const Videos = () => {
    const shortFormVideos = [
        { title: "Edit timeline for Jed in Tech @tiktok", description: "Clean and professional edit, focused on first 3s pacing.", videoId: "iMeSsNBRGI8" },
        { title: "Sample Edit", description: "Clean and professional edit, focused on first 3s pacing.", videoId: "MU-IzW6s_Zk" },
        { title: "Long-Form Before and After", description: "Before and after editing of a long-form video", videoId: "FWQvKx3kwaQ" },
    ];

    const longFormVideos = [
        { title: "Interview", description: "Full episode edit with multi-cam switching with minimal visuals for maximum impact retention.", videoId: "HdQS5y7MSgw" },
    ];

    const trailerVideos = [
        { title: "ALAS (2025) - Trailer", description: "VFX, Cinematic color grading, fast-paced editing, and sound design.", videoId: "HP6v-T78YvA" },
        { title: "KALOY - Music Video", description: "Cinematic color grading, fast-paced editing, music video", videoId: "agbqhbSVZYo" },
        { title: "ENCOMIENDA SYSTEM (2023) - Trailer", description: "Cinematic color grading, fast-paced editing, sound design, trailer", videoId: "z05GsBQIL8Y" },
    ];
    const shortFilms = [
        { title: "ROOM 7 (2026) - A Short Film", description: "Horror Thriller, VFX, Cinematic color grading, fast-paced editing, and sound design.", videoId: "e1hbmSWAFa0" },
        { title: "ALAS (2025) - Full Short Film", description: "VFX-filled, Cinematic color grading, fast-paced editing, and sound design.", videoId: "rhkhQFhyap0" },
        { title: "A VERY SPECIAL BUSINESS (2023)", description: "Cinematic color grading and sound design.", videoId: "8MeiCdjfaJI" },
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
                title="Short Films"
                description="Focused concept, relatable characters, a tight script, strong visual storytelling, effective sound/music, clean editing, and a powerful ending that delivers a clear theme and emotional impact."
                videos={shortFilms}
                type="grid"
            />

            <VideoSection
                title="Trailers & Promos"
                description="High-impact visuals for maximum engagement."
                videos={trailerVideos}
                type="grid"
            />

            <VideoSection
                title="Podcast & Long-Form"
                description="Narrative-driven edits for YouTube and platforms."
                videos={longFormVideos}
                type="grid"
            />
        </>
    );
};

export default Videos;
