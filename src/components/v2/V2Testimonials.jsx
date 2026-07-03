import React, { useState } from 'react';
import { TiltCard, Reveal } from './V2Interactive';

const testimonials = [
    {
        name: 'Gerphil Flores-Libanan',
        role: '2015 Asia\'s Got Talent 2nd Runner-up · Vocal Coach',
        projectType: 'Video Editing',
        link: 'https://www.facebook.com/gerphilgeraldine',
        text: 'I had a wonderful experience working with Johnrey. He is very professional, creative, and easy to work with. He consistently delivered high-quality edits, with great attention to detail that truly elevated the content. His reliability and positive attitude made the collaboration smooth and enjoyable. Highly recommended for anyone looking for a skilled and dedicated video editor! 😊',
    },
    {
        name: 'Aaron Ocaya',
        role: 'Artist · Architecture Student',
        projectType: 'Website Portfolio',
        link: 'https://aaronocaya.netlify.app/',
        text: 'Yung Gawa ni johnrey ay napaka ganda Madaling intindihin yung website na ginawa nya para sa aking Business na Art\'s and craft, nagustohan korin yung phone version nung website at yung pc Napaka linaw nung mga pictures, overall presentation napaka Angas 👌🏻😌',
        translation: 'Johnrey\'s work is extremely beautiful. The website he created for my Arts and Crafts business is easy to understand. I also loved the phone and PC versions of the website. The pictures are very clear — overall presentation is very cool.',
    },
];

/* ── Chevron icon used in the translation toggle ── */
const ChevronDown = ({ flipped }) => (
    <svg
        width="12" height="12" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
        style={{
            transition: 'transform 0.22s ease',
            transform: flipped ? 'rotate(180deg)' : 'rotate(0deg)',
            display: 'inline-block',
            flexShrink: 0,
        }}
    >
        <path d="M6 9l6 6 6-6" />
    </svg>
);

/* ── External link icon ── */
const ExternalLink = () => (
    <svg width="10" height="10" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ opacity: 0.7, flexShrink: 0 }}
    >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const TestimonialCard = ({ item, index }) => {
    const [showTranslation, setShowTranslation] = useState(false);

    return (
        <Reveal delay={index * 0.12}>
            <TiltCard
                max={4}
                scale={1.006}
                sheen="rgba(255,255,255,0.22)"
                style={{ borderRadius: '20px', height: '100%' }}
            >
                <div style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: '20px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    height: '100%',
                    boxSizing: 'border-box',
                    boxShadow: '0 16px 40px -24px rgba(20,20,20,0.18)',
                }}>

                    {/* Top row: quote mark + project type badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        {/* Decorative open-quote */}
                        <span style={{
                            fontSize: '52px',
                            lineHeight: 1,
                            fontFamily: 'Georgia, serif',
                            color: 'var(--line)',
                            userSelect: 'none',
                            marginTop: '-8px',
                        }}>"</span>

                        {/* Project type chip — links to source */}
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontSize: '11px',
                                fontWeight: '700',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                color: 'var(--ink-2)',
                                background: 'var(--line-2)',
                                border: '1px solid var(--line)',
                                borderRadius: '999px',
                                padding: '5px 12px',
                                textDecoration: 'none',
                                transition: 'border-color 0.15s, color 0.15s',
                                flexShrink: 0,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--ink-3)';
                                e.currentTarget.style.color = 'var(--ink)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--line)';
                                e.currentTarget.style.color = 'var(--ink-2)';
                            }}
                        >
                            {item.projectType}
                            <ExternalLink />
                        </a>
                    </div>

                    {/* Quote text */}
                    <p style={{
                        fontSize: '15.5px',
                        lineHeight: '1.7',
                        color: 'var(--ink-2)',
                        fontStyle: 'italic',
                        margin: 0,
                        flex: 1,
                    }}>
                        {item.text}
                    </p>

                    {/* Translation toggle */}
                    {item.translation && (
                        <div>
                            <button
                                onClick={() => setShowTranslation(v => !v)}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'var(--ink-3)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'color 0.15s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-3)'}
                            >
                                {showTranslation ? 'Hide translation' : 'See translation'}
                                <ChevronDown flipped={showTranslation} />
                            </button>

                            {showTranslation && (
                                <p style={{
                                    marginTop: '10px',
                                    fontSize: '13.5px',
                                    lineHeight: '1.65',
                                    color: 'var(--ink-2)',
                                    background: 'var(--line-2)',
                                    border: '1px solid var(--line)',
                                    borderRadius: '12px',
                                    padding: '12px 16px',
                                    fontStyle: 'italic',
                                }}>
                                    {item.translation}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Divider + author */}
                    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
                        <div style={{
                            fontSize: '15px',
                            fontWeight: '700',
                            color: 'var(--ink)',
                            letterSpacing: '-0.01em',
                            marginBottom: '3px',
                        }}>
                            {item.name}
                        </div>
                        <div style={{
                            fontSize: '13px',
                            color: 'var(--ink-3)',
                            lineHeight: '1.4',
                        }}>
                            {item.role}
                        </div>
                    </div>
                </div>
            </TiltCard>
        </Reveal>
    );
};

const V2Testimonials = () => (
    <section id="v2-testimonials" style={{
        padding: '110px 32px',
        borderTop: '1px solid var(--line)',
    }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>

            {/* Section eyebrow */}
            <Reveal>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '20px' }}>
                    <span className="v2-eyebrow">05</span>
                    <span style={{ color: 'var(--line)' }}>/</span>
                    <span className="v2-eyebrow">Testimonials</span>
                </div>
            </Reveal>

            {/* Heading */}
            <Reveal delay={0.05}>
                <div style={{ marginBottom: '56px' }}>
                    <h2 style={{
                        fontSize: 'clamp(34px, 5.2vw, 66px)',
                        fontWeight: '800',
                        color: 'var(--ink)',
                        margin: '0 0 14px',
                        lineHeight: '1.02',
                        letterSpacing: '-0.03em',
                    }}>
                        What clients say
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: 'var(--ink-2)',
                        lineHeight: '1.65',
                        maxWidth: '480px',
                        margin: 0,
                    }}>
                        Real words from real people who trusted me with their projects.
                    </p>
                </div>
            </Reveal>

            {/* Cards grid */}
            <div
                className="v2-testimonials-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '24px',
                    alignItems: 'stretch',
                }}
            >
                {testimonials.map((item, i) => (
                    <TestimonialCard key={item.name} item={item} index={i} />
                ))}
            </div>
        </div>
    </section>
);

export default V2Testimonials;
