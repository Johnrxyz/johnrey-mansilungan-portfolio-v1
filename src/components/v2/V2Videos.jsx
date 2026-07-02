import React, { useState } from 'react';
import { TiltCard, Reveal } from './V2Interactive';

/* ── VIDEO DATA ─────────────────────────────────────────────────────── */
const allVideos = {
    longForm: {
        label: 'Podcast & Long-Form',
        tag: 'YouTube · Retention',
        videos: [
            {
                title: 'AI Talking Head',
                description: 'AI generated talking head video using HeyGen, enhanced in DaVinci Resolve.',
                videoId: 'GhEgwK9jgmw',
                aspect: '16/9',
            },
            {
                title: 'Talking Head',
                description: 'A minimalist talking head video tailored for maximum retention.',
                videoId: '0A7GG8Rj-kY',
                aspect: '16/9',
            },
            {
                title: 'Interview',
                description: 'Full episode edit with multi-cam switching, minimal visuals for maximum retention.',
                videoId: 'HdQS5y7MSgw',
                aspect: '16/9',
            },
        ],
    },
    shortForm: {
        label: 'Short-Form Content',
        tag: 'Reels · TikTok · Shorts',
        videos: [
            { title: "AI Short Form AD", description: "Clean and professional edit, focused on first 3s pacing.", videoId: "-dad6b2Kx1Y" },
            {
                title: 'Edit timeline for Jed in Tech @tiktok',
                description: 'Clean and professional edit, focused on first 3s pacing.',
                videoId: 'iMeSsNBRGI8',
                aspect: '9/16',
            },
            {
                title: 'Sample Edit',
                description: 'Clean and professional edit, focused on first 3s pacing.',
                videoId: 'MU-IzW6s_Zk',
                aspect: '9/16',
            },
            {
                title: 'Long-Form Before and After',
                description: 'Before and after editing of a long-form video.',
                videoId: 'FWQvKx3kwaQ',
                aspect: '9/16',
            },
        ],
    },
    shortFilms: {
        label: 'Short Films',
        tag: 'Narrative · Drama · Horror',
        videos: [
            {
                title: 'ROOM 7 (2026)',
                description: 'Horror Thriller — VFX, cinematic color grading, fast-paced editing, and sound design.',
                videoId: 'e1hbmSWAFa0',
                aspect: '16/9',
            },
            {
                title: 'ALAS (2025) — Full Short Film',
                description: 'VFX-filled, cinematic color grading, fast-paced editing, and sound design.',
                videoId: 'rhkhQFhyap0',
                aspect: '16/9',
            },
            {
                title: 'Ang Himala sa Lourdes (2026)',
                description: 'A drama short film about faith and miracles.',
                videoId: 'kBtLkwVDHz0',
                aspect: '16/9',
            },
        ],
    },
    trailers: {
        label: 'Trailers & Promos',
        tag: 'Cinematic · High-Impact',
        videos: [
            {
                title: 'ALAS (2025) — Trailer',
                description: 'VFX, cinematic color grading, fast-paced editing, and sound design.',
                videoId: 'HP6v-T78YvA',
                aspect: '16/9',
            },
            {
                title: 'KALOY — Music Video',
                description: 'Cinematic color grading, fast-paced editing, music video.',
                videoId: 'agbqhbSVZYo',
                aspect: '16/9',
            },
            {
                title: 'ENCOMIENDA SYSTEM (2023) — Trailer',
                description: 'Cinematic color grading, fast-paced editing, sound design.',
                videoId: 'z05GsBQIL8Y',
                aspect: '16/9',
            },
        ],
    },
};

const TAB_KEYS = ['longForm', 'shortForm', 'shortFilms', 'trailers'];

/* ── VIDEO EMBED CARD ───────────────────────────────────────────────── */
const V2VideoCard = ({ video, isShort, index }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Reveal delay={index * 0.07}>
            <div
                data-cursor="play"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    border: '1px solid var(--line)',
                    background: 'var(--surface)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: hovered
                        ? '0 28px 56px -24px rgba(20,20,20,0.32)'
                        : '0 12px 32px -24px rgba(20,20,20,0.18)',
                    transition: 'box-shadow 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Iframe embed */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        paddingTop: isShort ? '177.78%' : '56.25%',
                        background: '#0a0a0a',
                        overflow: 'hidden',
                    }}
                >
                    <iframe
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            display: 'block',
                        }}
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        title={video.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onMouseEnter={() =>
                            window.dispatchEvent(new Event('v2:iframe-enter'))
                        }
                    />
                    {/* Index badge */}
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '14px',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#fff',
                        background: 'rgba(20,20,20,0.55)',
                        backdropFilter: 'blur(6px)',
                        borderRadius: '999px',
                        padding: '4px 10px',
                        letterSpacing: '0.06em',
                        pointerEvents: 'none',
                        zIndex: 2,
                    }}>
                        {String(index + 1).padStart(2, '0')}
                    </div>
                </div>

                {/* Caption bar */}
                <div style={{ padding: '18px 20px' }}>
                    <div style={{
                        fontSize: '15px',
                        fontWeight: '700',
                        color: 'var(--ink)',
                        marginBottom: '5px',
                        letterSpacing: '-0.01em',
                        lineHeight: '1.3',
                    }}>
                        {video.title}
                    </div>
                    <div style={{
                        fontSize: '13px',
                        color: 'var(--ink-3)',
                        lineHeight: '1.5',
                    }}>
                        {video.description}
                    </div>
                </div>
            </div>
        </Reveal>
    );
};

/* ── SECTION ────────────────────────────────────────────────────────── */
const V2Videos = () => {
    const [activeTab, setActiveTab] = useState('longForm');
    const active = allVideos[activeTab];
    const isShort = activeTab === 'shortForm';

    return (
        <section id="v2-videos" style={{
            padding: '110px 32px',
            borderTop: '1px solid var(--line)',
        }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto' }}>

                {/* Section header */}
                <Reveal>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '20px' }}>
                        <span className="v2-eyebrow">02</span>
                        <span style={{ color: 'var(--line)' }}>/</span>
                        <span className="v2-eyebrow">Videos</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '24px',
                        flexWrap: 'wrap',
                        marginBottom: '40px',
                    }}>
                        <h2 style={{
                            fontSize: 'clamp(30px, 4.4vw, 52px)',
                            fontWeight: '800',
                            color: 'var(--ink)',
                            margin: 0,
                            letterSpacing: '-0.03em',
                            maxWidth: '620px',
                            lineHeight: '1.05',
                        }}>
                            Video editing &amp; production
                        </h2>
                        <p style={{
                            fontSize: '15px',
                            color: 'var(--ink-2)',
                            margin: 0,
                            maxWidth: '300px',
                        }}>
                            From short-form reels to cinematic short films.
                            {/* <span style={{ color: 'var(--ink-3)' }}> Hover to explore.</span> */}
                        </p>
                    </div>

                    {/* Filter tabs */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                        marginBottom: '48px',
                    }}>
                        {TAB_KEYS.map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                data-cursor="tab"
                                style={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    color: activeTab === key ? 'var(--bg)' : 'var(--ink-2)',
                                    background: activeTab === key ? 'var(--ink)' : 'transparent',
                                    border: '1px solid',
                                    borderColor: activeTab === key ? 'var(--ink)' : 'var(--line)',
                                    borderRadius: '999px',
                                    padding: '8px 17px',
                                    cursor: 'pointer',
                                    transition: 'all 0.18s',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '7px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {allVideos[key].label}
                                {activeTab === key && (
                                    <span style={{
                                        fontSize: '10px',
                                        fontWeight: '700',
                                        background: 'rgba(255,255,255,0.18)',
                                        borderRadius: '999px',
                                        padding: '2px 7px',
                                        letterSpacing: '0.05em',
                                    }}>
                                        {allVideos[key].videos.length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </Reveal>

                {/* Active tab meta */}
                <Reveal>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '28px',
                    }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                            {active.tag}
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
                    </div>
                </Reveal>

                {/* Video grid */}
                <div
                    key={activeTab}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isShort
                            ? 'repeat(auto-fill, minmax(220px, 1fr))'
                            : 'repeat(auto-fill, minmax(340px, 1fr))',
                        gap: '20px',
                        alignItems: 'start',
                    }}
                    className="v2-video-grid"
                >
                    {active.videos.map((video, i) => (
                        <V2VideoCard
                            key={video.videoId}
                            video={video}
                            isShort={isShort}
                            index={i}
                        />
                    ))}
                </div>

                {/* Footer note */}
                <div style={{
                    marginTop: '32px',
                    fontSize: '13px',
                    color: 'var(--ink-3)',
                    display: 'flex',
                    gap: '16px',
                    flexWrap: 'wrap',
                }}>

                    <span style={{ color: 'var(--line)' }}>·</span>
                    <span>Tools: DaVinci Resolve · HeyGen</span>
                </div>
            </div>
        </section>
    );
};

export default V2Videos;
