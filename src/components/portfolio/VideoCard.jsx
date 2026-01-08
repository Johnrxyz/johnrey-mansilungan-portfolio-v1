import React from 'react';

const VideoCard = ({ title, description, videoId, aspectRatio = '16/9' }) => {


    return (
        <div className="flex flex-col gap-3 group">
            {/* Video Container */}
            <div
                className={`relative w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-dark-bg shadow-md ring-1 ring-slate-900/5 dark:ring-white/10 ${aspectRatio === '9/16' ? 'aspect-[9/16]' : 'aspect-video'
                    }`}
            >
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Content */}
            <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white leading-tight">
                    {title}
                </h3>
                {description && (
                    <p className="text-sm text-slate-500 dark:text-neutral-400 line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default VideoCard;
