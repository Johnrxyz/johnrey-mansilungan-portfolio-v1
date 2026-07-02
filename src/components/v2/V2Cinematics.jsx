import React, { useState } from 'react';
import { TiltCard, Reveal } from './V2Interactive';

const cinematics = [
    {
        id: 'c01',
        src: '/cinematic_eye.png',
        title: 'Animatronic Eye',
        caption: 'AI render · close-up',
        meta: { Lens: '85mm', Aperture: 'f/1.4', Format: 'RAW + AI' },
        size: 'tall',
    },
    {
        id: 'c02',
        src: '/cinematic_alley.png',
        title: 'Neo-Kyoto Street',
        caption: 'Cinematic · environment',
        meta: { Lens: '24mm', Aperture: 'f/2.8', Format: 'AI-generated' },
        size: 'wide',
    },
    {
        id: 'c03',
        src: '/cinematic_robot.png',
        title: 'Hybrid Portrait',
        caption: 'Animatronics · realism',
        meta: { Lens: '50mm', Aperture: 'f/1.8', Format: 'AI + Photo' },
        size: 'tall',
    },
    {
        id: 'c04',
        src: '/cinematic_crew.png',
        title: 'Production Set',
        caption: 'Behind the scenes',
        meta: { Lens: '35mm', Aperture: 'f/2.0', Format: 'Documentary' },
        size: 'wide',
    },
];

const GalleryCard = ({ item, index }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <TiltCard
            max={7}
            scale={1.015}
            sheen="rgba(255,255,255,0.25)"
            data-cursor="view"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid var(--line)',
                background: 'var(--surface)',
                cursor: 'pointer',
                boxShadow: hovered
                    ? '0 30px 60px -24px rgba(20,20,20,0.35)'
                    : '0 14px 34px -26px rgba(20,20,20,0.2)',
                transition: 'box-shadow 0.3s ease',
                gridColumn: item.size === 'wide' ? 'span 2' : 'span 1',
            }}
            className="v2-filmstrip-card"
        >
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                    src={item.src}
                    alt={item.title}
                    style={{
                        width: '100%',
                        height: item.size === 'wide' ? '300px' : '360px',
                        objectFit: 'cover',
                        display: 'block',
                        filter: hovered
                            ? 'grayscale(1) contrast(1.08) brightness(1.02)'
                            : 'grayscale(1) contrast(1.02)',
                        transition: 'filter 0.4s ease, transform 0.5s ease',
                        transform: hovered ? 'scale(1.05)' : 'scale(1)',
                    }}
                />

                {/* Index badge */}
                <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#fff',
                    background: 'rgba(20,20,20,0.5)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: '999px',
                    padding: '4px 11px',
                    letterSpacing: '0.04em',
                }}>
                    {String(index + 1).padStart(2, '0')}
                </div>

                {/* Hover metadata overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.1) 55%, transparent 100%)',
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '22px',
                }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '10px' }}>
                        {item.title}
                    </div>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {Object.entries(item.meta).map(([k, v]) => (
                            <div key={k}>
                                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{k}</div>
                                <div style={{ fontSize: '13px', color: '#fff', fontWeight: '500' }}>{v}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Caption bar */}
            <div style={{
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)' }}>{item.title}</span>
                <span style={{ fontSize: '13px', color: 'var(--ink-3)' }}>{item.caption}</span>
            </div>
        </TiltCard>
    );
};

const V2Cinematics = () => {
    return (
        <section id="v2-cinematics" style={{
            padding: '110px 32px',
            borderTop: '1px solid var(--line)',
        }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
                <Reveal>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '20px' }}>
                        <span className="v2-eyebrow">03</span>
                        <span style={{ color: 'var(--line)' }}>/</span>
                        <span className="v2-eyebrow">Visuals</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '24px',
                        flexWrap: 'wrap',
                        marginBottom: '56px',
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
                            AI-generated & cinematic imagery
                        </h2>
                        <p style={{
                            fontSize: '15px',
                            color: 'var(--ink-2)',
                            margin: 0,
                            maxWidth: '320px',
                        }}>
                            Realism, animatronics, and behind-the-scenes aesthetics.
                            <span style={{ color: 'var(--ink-3)' }}> Hover to inspect.</span>
                        </p>
                    </div>
                </Reveal>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    perspective: '1400px',
                }}
                    className="v2-filmstrip-grid">
                    {cinematics.map((item, i) => (
                        <Reveal key={item.id} delay={i * 0.08}>
                            <GalleryCard item={item} index={i} />
                        </Reveal>
                    ))}
                </div>

                <div style={{
                    marginTop: '28px',
                    fontSize: '13px',
                    color: 'var(--ink-3)',
                    display: 'flex',
                    gap: '18px',
                    flexWrap: 'wrap',
                }}>
                    <span>All images AI-generated</span>
                    <span style={{ color: 'var(--line)' }}>·</span>
                    <span>Midjourney, Stable Diffusion, Runway ML</span>
                    <span style={{ color: 'var(--line)' }}>·</span>
                    <span>Style: cinematic realism</span>
                </div>
            </div>
        </section>
    );
};

export default V2Cinematics;
