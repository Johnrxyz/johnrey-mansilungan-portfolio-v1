import React, { useState } from 'react';
import { TiltCard, Reveal } from './V2Interactive';
import aaronImg from '../../assets/aaron.png';
import meImg from '../../assets/me.png';
import aslImg from '../../assets/asl.png';
import trainingImg from '../../assets/trainingHub.png';

/* ── WEBSITE DATA ───────────────────────────────────────────────────── */
const websites = [
    {
        index: '01',
        title: 'AI Training Hub',
        client: 'stbusinessconsulting',
        status: 'Live',
        description:
            'A training hub for employees for easier onboarding and compliance training. Integrates curated AI-generated video modules with role-based access routing and a structured dashboard interface.',
        techStack: ['React', 'Vite', 'Supabase', 'Vercel'],
        link: 'https://caringhandllctraininghub.vercel.app/',
        image: trainingImg,
    },
    {
        index: '02',
        title: 'Artist Portfolio',
        client: 'Aaron Ocaya',
        status: 'Live',
        description:
            'A minimalist portfolio built for an architecture student and artist — focusing on clean visual hierarchy, seamless image galleries, and a backend CMS for easy content updates.',
        techStack: ['React', 'Tailwind CSS', 'Vite', 'Django REST', 'Cloudinary'],
        link: 'https://aaronocaya.netlify.app/',
        image: aaronImg,
    },
    {
        index: '03',
        title: 'My Portfolio',
        client: 'Personal',
        status: 'Live',
        description:
            'This very portfolio — designed as a minimal, performant showcase balancing web development and video editing work, with a v1 / v2 design toggle and cinematic editorial aesthetics.',
        techStack: ['React', 'Tailwind CSS', 'Vite'],
        link: 'https://notrye.netlify.app/',
        image: meImg,
    },
    {
        index: '04',
        title: 'Armor Sin Limites',
        client: 'Clothing Brand',
        status: 'In Progress',
        description:
            'A full e-commerce platform for a clothing brand — handling product listings, order management, payment processing, email notifications, and cloud-hosted media.',
        techStack: ['React', 'Tailwind CSS', 'Vite', 'Django REST', 'Cloudinary', 'PayMongo', 'PostgreSQL', 'Brevo', 'Railway'],
        link: '#',
        image: aslImg,
    },
];

/* ── WEBSITE CARD ───────────────────────────────────────────────────── */
const WebsiteCard = ({ site }) => {
    const [hovered, setHovered] = useState(false);
    const isInProgress = site.status === 'In Progress';
    const isExternal = site.link !== '#';

    const cardContent = (
        <TiltCard
            max={4}
            scale={1.008}
            sheen="rgba(255,255,255,0.38)"
            data-cursor={isExternal ? 'open' : 'wip'}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                border: '1px solid var(--line)',
                background: 'var(--surface)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: hovered
                    ? '0 28px 52px -22px rgba(20,20,20,0.3)'
                    : '0 12px 30px -22px rgba(20,20,20,0.16)',
                transition: 'box-shadow 0.3s ease',
            }}
        >
            {/* Screenshot */}
            <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                overflow: 'hidden',
                background: '#0a0a0a',
            }}>
                <img
                    src={site.image}
                    alt={site.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        filter: hovered
                            ? 'grayscale(0.2) contrast(1.05) brightness(1.02)'
                            : 'grayscale(0.6) contrast(1.02)',
                        transform: hovered ? 'scale(1.045)' : 'scale(1)',
                        transition: 'filter 0.45s ease, transform 0.5s ease',
                    }}
                />

                {/* Index badge */}
                <div style={{
                    position: 'absolute',
                    top: '13px',
                    left: '15px',
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#fff',
                    background: 'rgba(20,20,20,0.55)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: '999px',
                    padding: '4px 11px',
                    letterSpacing: '0.06em',
                }}>
                    {site.index}
                </div>

                {/* Status pill */}
                <div style={{
                    position: 'absolute',
                    top: '13px',
                    right: '15px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: isInProgress ? '#fff' : '#fff',
                    background: isInProgress ? 'rgba(20,20,20,0.65)' : 'rgba(20,20,20,0.55)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: '999px',
                    padding: '4px 11px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                }}>
                    <span style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: isInProgress ? '#f59e0b' : '#22c55e',
                        display: 'inline-block',
                    }} />
                    {site.status}
                </div>

                {/* Hover gradient overlay with external link cue */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.08) 60%, transparent 100%)',
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '18px',
                }}>
                    {isExternal && (
                        <span style={{
                            fontSize: '13px',
                            fontWeight: '700',
                            color: '#fff',
                            letterSpacing: '0.04em',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}>
                            Visit site ↗
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '24px 26px 26px' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '10px',
                }}>
                    <div>
                        <h3 style={{
                            fontSize: '19px',
                            fontWeight: '700',
                            color: 'var(--ink)',
                            margin: '0 0 3px 0',
                            letterSpacing: '-0.015em',
                            transition: 'color 0.15s',
                        }}>
                            {site.title}
                        </h3>
                        <div style={{ fontSize: '13px', color: 'var(--ink-3)' }}>
                            {site.client}
                        </div>
                    </div>
                    {isExternal && (
                        <span style={{
                            fontSize: '16px',
                            color: hovered ? 'var(--ink)' : 'var(--ink-3)',
                            transition: 'color 0.2s',
                            flexShrink: 0,
                        }}>↗</span>
                    )}
                </div>

                <p style={{
                    fontSize: '14px',
                    color: 'var(--ink-2)',
                    lineHeight: '1.65',
                    margin: '0 0 18px 0',
                }}>
                    {site.description}
                </p>

                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {site.techStack.map((tech) => (
                        <span key={tech} style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            color: 'var(--ink-2)',
                            background: 'var(--bg)',
                            border: '1px solid var(--line)',
                            borderRadius: '999px',
                            padding: '4px 11px',
                            letterSpacing: '0.02em',
                        }}>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </TiltCard>
    );

    return isExternal ? (
        <a href={site.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
            {cardContent}
        </a>
    ) : (
        <div>{cardContent}</div>
    );
};

/* ── SECTION ────────────────────────────────────────────────────────── */
const V2Websites = () => {
    return (
        <section id="v2-websites" style={{
            padding: '110px 32px',
            borderTop: '1px solid var(--line)',
        }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto' }}>

                {/* Section header */}
                <Reveal>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '20px' }}>
                        <span className="v2-eyebrow">03</span>
                        <span style={{ color: 'var(--line)' }}>/</span>
                        <span className="v2-eyebrow">Web Dev</span>
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
                            maxWidth: '580px',
                            lineHeight: '1.05',
                        }}>
                            Web development projects
                        </h2>
                        <p style={{
                            fontSize: '15px',
                            color: 'var(--ink-2)',
                            margin: 0,
                            maxWidth: '300px',
                        }}>
                            Clean, performant, and user-focused websites.
                            <span style={{ color: 'var(--ink-3)' }}> Click to visit.</span>
                        </p>
                    </div>
                </Reveal>

                {/* 2-column grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '24px',
                    }}
                    className="v2-websites-grid"
                >
                    {websites.map((site, i) => (
                        <Reveal key={site.index} delay={i * 0.08}>
                            <WebsiteCard site={site} />
                        </Reveal>
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
                    <span>All projects built from scratch</span>
                    <span style={{ color: 'var(--line)' }}>·</span>
                    <span>Stack: React · Django · Supabase · PostgreSQL · Cloudinary</span>
                </div>
            </div>
        </section>
    );
};

export default V2Websites;
