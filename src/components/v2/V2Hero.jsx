import React, { useState, useEffect, useRef } from 'react';
import { TiltCard, Magnetic, Reveal, ScrambleText } from './V2Interactive';
import mePhoto from '../../assets/me.png';

// Typewriter effect
const useTypewriter = (phrases, speed = 90) => {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = phrases[phraseIndex];
        let timeout;

        if (!deleting && charIndex < current.length) {
            timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
        } else if (!deleting && charIndex === current.length) {
            timeout = setTimeout(() => setDeleting(true), 1900);
        } else if (deleting && charIndex > 0) {
            timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
        } else if (deleting && charIndex === 0) {
            timeout = setTimeout(() => {
                setDeleting(false);
                setPhraseIndex((p) => (p + 1) % phrases.length);
            }, speed);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, deleting, phraseIndex, phrases, speed]);

    return phrases[phraseIndex].slice(0, charIndex);
};

// Mouse-parallax wrapper: shifts a block subtly in 3D against the cursor
const ParallaxDepth = ({ children, intensity = 1 }) => {
    const ref = useRef(null);
    const frame = useRef(null);

    useEffect(() => {
        const onMove = (e) => {
            cancelAnimationFrame(frame.current);
            frame.current = requestAnimationFrame(() => {
                if (!ref.current) return;
                const px = e.clientX / window.innerWidth - 0.5;
                const py = e.clientY / window.innerHeight - 0.5;
                ref.current.style.transform =
                    `perspective(1000px) rotateY(${px * 2.4 * intensity}deg) rotateX(${-py * 2.4 * intensity}deg) translate3d(${px * -6 * intensity}px, ${py * -6 * intensity}px, 0)`;
            });
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(frame.current);
        };
    }, [intensity]);

    return (
        <div ref={ref} style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
            {children}
        </div>
    );
};

const V2Hero = () => {
    const role = useTypewriter(['Web Developer', 'Video Editor', 'AI Specialist', 'Automation Specialist']);

    return (
        <section id="v2-hero" style={{ padding: '96px 32px 80px', maxWidth: '1180px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '72px', alignItems: 'center' }}
                className="v2-hero-grid">

                {/* LEFT: Identity */}
                <ParallaxDepth>
                    <Reveal>
                        {/* Availability pill */}
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            border: '1px solid var(--line)',
                            background: 'var(--surface)',
                            borderRadius: '999px',
                            padding: '6px 14px',
                            marginBottom: '28px',
                        }}>
                            <span className="v2-blink-dot" style={{
                                width: '7px', height: '7px', borderRadius: '50%',
                                background: 'var(--ink)', display: 'inline-block',
                            }} />
                            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ink-2)', letterSpacing: '0.02em' }}>
                                Available for freelance
                            </span>
                        </div>

                        {/* Name */}
                        <h1 style={{
                            fontSize: 'clamp(40px, 7vw, 82px)',
                            fontWeight: '800',
                            color: 'var(--ink)',
                            margin: '0 0 20px 0',
                            lineHeight: '0.98',
                            letterSpacing: '-0.035em',
                        }}>
                            <ScrambleText text="Johnrey" /><br />
                            <span style={{ color: 'var(--ink-3)' }}><ScrambleText text="Mansilungan" /></span>
                        </h1>

                        {/* Typewriter Role */}
                        <div style={{
                            fontSize: 'clamp(17px, 2.4vw, 22px)',
                            color: 'var(--ink)',
                            marginBottom: '28px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '500',
                        }}>
                            {role}
                            <span className="v2-caret-blink" style={{
                                display: 'inline-block',
                                width: '2px',
                                height: '22px',
                                background: 'var(--ink)',
                                marginLeft: '4px',
                            }} />
                        </div>

                        {/* Bio */}
                        <p style={{
                            fontSize: '17px',
                            color: 'var(--ink-2)',
                            lineHeight: '1.65',
                            marginBottom: '40px',
                            maxWidth: '480px',
                        }}>
                            I build full-stack web applications and craft cinematic visual
                            content — writing clean code and shaping camera angles, often in
                            the same afternoon.
                        </p>

                        {/* CTAs — magnetic */}
                        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <Magnetic>
                                <a
                                    href="#v2-videos"
                                    onClick={(e) => { e.preventDefault(); document.querySelector('#v2-videos')?.scrollIntoView({ behavior: 'smooth' }); }}
                                    data-cursor="magnify"
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        padding: '14px 26px',
                                        background: 'var(--ink)',
                                        color: 'var(--bg)',
                                        borderRadius: '999px',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        transition: 'opacity 0.15s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.82'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                >
                                    View work
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a
                                    href="/Johnrey_Mansilungan_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cursor="open"
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        padding: '14px 26px',
                                        background: 'var(--surface)',
                                        color: 'var(--ink)',
                                        border: '1px solid var(--line)',
                                        borderRadius: '999px',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        transition: 'border-color 0.15s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--ink)'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
                                >
                                    Résumé ↓
                                </a>
                            </Magnetic>
                        </div>

                        {/* Stats */}
                        <div style={{
                            marginTop: '56px',
                            display: 'flex',
                            gap: '48px',
                            flexWrap: 'wrap',
                        }}>
                            {[
                                { label: 'Projects shipped', value: '10+' },
                                { label: 'Years experience', value: '2+' },
                                { label: 'Tech stacks', value: '8+' },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <div style={{
                                        fontSize: '34px',
                                        fontWeight: '700',
                                        color: 'var(--ink)',
                                        letterSpacing: '-0.02em',
                                    }}>{value}</div>
                                    <div style={{
                                        fontSize: '13px',
                                        color: 'var(--ink-3)',
                                        marginTop: '2px',
                                    }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </ParallaxDepth>

                {/* RIGHT: Showreel embed */}
                <Reveal delay={0.15}>
                    <div style={{ borderRadius: '20px' }}>
                        <div style={{
                            position: 'relative',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            border: '1px solid var(--line)',
                            boxShadow: '0 30px 60px -20px rgba(20,20,20,0.28)',
                            background: '#0a0a0a',
                        }}>
                            {/* 16:9 iframe */}
                            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                                <iframe
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                        display: 'block',
                                    }}
                                    src="https://www.youtube-nocookie.com/embed/3ZG7vpgos7Q"
                                    title="Video Editing Showreel 2024–2025"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    onMouseEnter={() =>
                                        window.dispatchEvent(new Event('v2:iframe-enter'))
                                    }
                                />
                            </div>
                            {/* Floating caption chip */}
                            <div style={{
                                position: 'absolute',
                                left: '12px',
                                bottom: '12px',
                                right: '12px',
                                background: 'rgba(20,20,20,0.72)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '12px',
                                padding: '10px 14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                border: '1px solid rgba(255,255,255,0.1)',
                                pointerEvents: 'none',
                            }}>
                                <div>
                                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>
                                        Showreel
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '1px' }}>
                                        2024 – 2025
                                    </div>
                                </div>
                                <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>▶</span>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Scroll cue */}
            <div style={{
                marginTop: '72px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
            }}>
                <span style={{ fontSize: '12px', color: 'var(--ink-3)', letterSpacing: '0.04em' }}>Scroll to explore</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
            </div>
        </section>
    );
};

export default V2Hero;
