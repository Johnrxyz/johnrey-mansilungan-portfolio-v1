import React, { useState } from 'react';
import { TiltCard, Reveal } from './V2Interactive';

/* ── STACK DATA with Simple Icons CDN URLs ─────────────────────────────
   Format: https://cdn.simpleicons.org/{slug}/{hex-color}
   Using --ink (#141414) so they stay monochrome on the cream background. */
const stackData = {
    frontend: [
        { name: 'React', icon: 'https://cdn.simpleicons.org/react/141414' },
        { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/141414' },
        { name: 'TailwindCSS', icon: 'https://cdn.simpleicons.org/tailwindcss/141414' },
        { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite/141414' },
        { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/141414' },
    ],
    backend: [
        { name: 'Django', icon: 'https://cdn.simpleicons.org/django/141414' },
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python/141414' },
        { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/141414' },
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/141414' },
        { name: 'REST APIs', icon: null },
    ],
    tools: [
        { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/141414' },
        { name: 'DaVinci Resolve', icon: 'https://cdn.simpleicons.org/davinciresolve/141414' },
        { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/141414' },
        { name: 'HeyGen', icon: null },
    ],
};

const tabMeta = {
    all: 'All',
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools & Creative',
};

/* ── ICON CARD ─────────────────────────────────────────────────────────
   Shows the SVG icon from Simple Icons CDN.
   Items without an icon slug show styled initials instead.
   On hover: card flips to dark bg, icon inverts to white.             */
const TechIcon = ({ name, icon }) => {
    const [hovered, setHovered] = useState(false);

    // Two-letter initials fallback (e.g. "REST APIs" → "RA", "HeyGen" → "HG")
    const initials = name
        .split(/[\s/]/)
        .map((w) => w[0] || '')
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '20px 12px',
                border: '1px solid',
                borderColor: hovered ? 'transparent' : 'var(--line)',
                borderRadius: '14px',
                background: hovered ? 'var(--ink)' : 'var(--surface)',
                boxShadow: hovered
                    ? '0 12px 28px -12px rgba(20,20,20,0.3)'
                    : '0 2px 8px -4px rgba(20,20,20,0.08)',
                transition: 'background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
                cursor: 'default',
                minHeight: '90px',
            }}
        >
            {icon ? (
                <img
                    src={icon}
                    alt={name}
                    style={{
                        width: '28px',
                        height: '28px',
                        objectFit: 'contain',
                        filter: hovered ? 'var(--icon-filter-hover)' : 'var(--icon-filter-base)',
                        transition: 'filter 0.22s ease',
                        flexShrink: 0,
                    }}
                />
            ) : (
                <span style={{
                    width: '28px',
                    height: '28px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '800',
                    color: hovered ? 'var(--bg)' : 'var(--ink)',
                    transition: 'color 0.22s ease',
                    letterSpacing: '-0.02em',
                    flexShrink: 0,
                }}>
                    {initials}
                </span>
            )}
            <span style={{
                fontSize: '11px',
                fontWeight: '600',
                color: hovered ? 'rgba(255,255,255,0.82)' : 'var(--ink-2)',
                transition: 'color 0.22s ease',
                textAlign: 'center',
                lineHeight: '1.25',
                letterSpacing: '0.01em',
                maxWidth: '72px',
            }}>
                {name}
            </span>
        </div>
    );
};

/* ── SECTION ───────────────────────────────────────────────────────── */
const V2Stack = () => {
    const [activeTab, setActiveTab] = useState('all');

    // Deduplicated flat list of all items across every category
    const allItems = Object.values(stackData).flat().filter(
        (item, idx, arr) => arr.findIndex((x) => x.name === item.name) === idx
    );

    const activeItems = activeTab === 'all' ? allItems : stackData[activeTab];

    return (
        <section id="v2-stack" style={{
            padding: '110px 32px',
            borderTop: '1px solid var(--line)',
        }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
                <Reveal>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '20px' }}>
                        <span className="v2-eyebrow">04</span>
                        <span style={{ color: 'var(--line)' }}>/</span>
                        <span className="v2-eyebrow">Stack</span>
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(30px, 4.4vw, 52px)',
                        fontWeight: '800',
                        color: 'var(--ink)',
                        margin: '0 0 56px 0',
                        letterSpacing: '-0.03em',
                    }}>
                        Technologies I work with
                    </h2>
                </Reveal>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: '64px', alignItems: 'start' }}
                    className="v2-stack-grid">

                    {/* LEFT: tabs + icon grid */}
                    <Reveal delay={0.1}>
                        {/* Tab switcher — All first, then per-category */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
                            {Object.keys(tabMeta).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    data-cursor="tab"
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: activeTab === cat ? 'var(--bg)' : 'var(--ink-2)',
                                        background: activeTab === cat ? 'var(--ink)' : 'transparent',
                                        border: '1px solid',
                                        borderColor: activeTab === cat ? 'var(--ink)' : 'var(--line)',
                                        borderRadius: '999px',
                                        padding: '9px 18px',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    {tabMeta[cat]}
                                </button>
                            ))}
                        </div>

                        {/* Icon grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
                            gap: '10px',
                        }}>
                            {activeItems.map((skill) => (
                                <TechIcon key={skill.name} {...skill} />
                            ))}
                        </div>
                    </Reveal>

                    {/* RIGHT: statement card in 3D tilt */}
                    <Reveal delay={0.2}>
                        <TiltCard max={6} sheen="rgba(255,255,255,0.4)" style={{ borderRadius: '20px' }}>
                            <div style={{
                                border: '1px solid var(--line)',
                                background: 'var(--surface)',
                                borderRadius: '20px',
                                padding: '36px',
                                boxShadow: '0 22px 46px -26px rgba(20,20,20,0.22)',
                            }}>
                                <div style={{
                                    fontSize: '40px',
                                    fontWeight: '800',
                                    color: 'var(--ink)',
                                    lineHeight: '1',
                                    marginBottom: '18px',
                                    letterSpacing: '-0.02em',
                                }}>"</div>
                                <p style={{
                                    fontSize: '19px',
                                    fontWeight: '500',
                                    color: 'var(--ink)',
                                    lineHeight: '1.55',
                                    margin: '0 0 28px 0',
                                }}>
                                    I like tools that get out of the way — a tight stack I know
                                    deeply beats a long list I've touched once.
                                </p>
                                <div style={{ borderTop: '1px solid var(--line-2)', paddingTop: '24px' }}>
                                    <div className="v2-eyebrow" style={{ marginBottom: '14px' }}>Daily drivers</div>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        {['DaVinci Resolve', 'React', 'Django', 'Supabase', 'Figma'].map((t) => (
                                            <span key={t} style={{
                                                fontSize: '13px',
                                                fontWeight: '500',
                                                color: 'var(--ink-2)',
                                                background: 'var(--bg)',
                                                border: '1px solid var(--line)',
                                                borderRadius: '999px',
                                                padding: '6px 13px',
                                            }}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default V2Stack;
