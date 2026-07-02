import React from 'react';
import { TiltCard, Reveal } from './V2Interactive';

const facts = [
    { key: 'Name', value: 'Johnrey Mansilungan' },
    { key: 'Location', value: 'Philippines' },
    { key: 'Focus', value: 'Web Dev · Video Editing' },
    { key: 'Status', value: 'Open to work' },
    { key: 'Experience', value: '2+ years' },
    { key: 'Languages', value: 'JavaScript · Python · SQL' },
    { key: 'Interests', value: 'Film · AI · Design' },
];

const V2About = () => {
    return (
        <section id="v2-about" style={{
            padding: '110px 32px',
            borderTop: '1px solid var(--line)',
        }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
                {/* Section header */}
                <Reveal>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '56px' }}>
                        <span className="v2-eyebrow">01</span>
                        <span style={{ color: 'var(--line)' }}>/</span>
                        <span className="v2-eyebrow">About</span>
                    </div>
                </Reveal>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.3fr 0.7fr',
                    gap: '80px',
                    alignItems: 'start',
                }} className="v2-about-grid">
                    {/* Left: prose */}
                    <Reveal delay={0.1}>
                        <h2 style={{
                            fontSize: 'clamp(26px, 3.4vw, 42px)',
                            fontWeight: '700',
                            color: 'var(--ink)',
                            lineHeight: '1.2',
                            letterSpacing: '-0.02em',
                            margin: '0 0 28px 0',
                            maxWidth: '640px',
                        }}>
                            A developer and editor working at the
                            intersection of <span style={{ color: 'var(--ink-3)' }}>code and cinema.</span>
                        </h2>
                        <p style={{
                            fontSize: '17px',
                            color: 'var(--ink-2)',
                            lineHeight: '1.75',
                            marginBottom: '20px',
                            maxWidth: '600px',
                        }}>
                            I'm based in the Philippines, building full-stack applications by day
                            and crafting cinematic video content and AI-generated imagery on the side.
                            I care about clean storytelling — through both pixels and prose.
                        </p>
                        <p style={{
                            fontSize: '17px',
                            color: 'var(--ink-2)',
                            lineHeight: '1.75',
                            maxWidth: '600px',
                        }}>
                            Whether it's a Django REST API or a 4K cinematic cut, the goal is
                            always the same: intentional, professional, and precise.
                        </p>
                    </Reveal>

                    {/* Right: facts card in 3D tilt */}
                    <Reveal delay={0.2}>
                        <TiltCard max={6} sheen="rgba(255,255,255,0.4)" style={{ borderRadius: '18px' }}>
                            <div style={{
                                border: '1px solid var(--line)',
                                background: 'var(--surface)',
                                borderRadius: '18px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 44px -24px rgba(20,20,20,0.2)',
                            }}>
                                {facts.map(({ key, value }, i, arr) => (
                                    <div key={key} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline',
                                        gap: '16px',
                                        padding: '15px 20px',
                                        borderBottom: i < arr.length - 1 ? '1px solid var(--line-2)' : 'none',
                                    }}>
                                        <span style={{ fontSize: '13px', color: 'var(--ink-3)', flexShrink: 0 }}>{key}</span>
                                        <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)', textAlign: 'right' }}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </TiltCard>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default V2About;
