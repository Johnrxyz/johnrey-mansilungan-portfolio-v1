import React from 'react';
import VideoCard from './VideoCard';

const VideoSection = ({ title, description, videos, type = 'grid' }) => {
    return (
        <section className="py-12 md:py-20 border-b border-gray-100 dark:border-dark-border last:border-0">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-slate-600 dark:text-neutral-400 max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>

                <div className={`grid gap-6 md:gap-8 ${type === 'shorts'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
                    }`}>
                    {videos.map((video, index) => (
                        <VideoCard
                            key={index}
                            {...video}
                            aspectRatio={type === 'shorts' ? '9/16' : '16/9'}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
