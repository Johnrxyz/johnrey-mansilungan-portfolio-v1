import React, { useEffect, useCallback, useState } from 'react';
import { TiltCard, Magnetic, Reveal } from './V2Interactive';

const EMAIL = 'mansilungan.johnrey.dll@gmail.com';

const socials = [
    { label: 'Instagram', href: 'https://www.instagram.com/rye.drp/', handle: '@rye.drp' },
    { label: 'Facebook', href: 'https://www.facebook.com/whoscutt1ngonions', handle: 'Johnrey Mansilungan' },
    { label: 'YouTube', href: 'https://www.youtube.com/@ryevisualsyt', handle: '@ryevisualsyt' },
    { label: 'Email', href: `mailto:${EMAIL}`, handle: EMAIL },
];

const V2Contact = () => {
    const [copied, setCopied] = useState(false);

    const copyEmail = useCallback(() => {
        navigator.clipboard.writeText(EMAIL).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        });
    }, []);

    // Keyboard shortcut: Alt+C
    useEffect(() => {
        const handler = (e) => {
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                copyEmail();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [copyEmail]);

    return (
        <section id="v2-contact" style={{
            padding: '110px 32px',
            borderTop: '1px solid var(--line)',
        }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
                <Reveal>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '20px' }}>
                        <span className="v2-eyebrow">07</span>
                        <span style={{ color: 'var(--line)' }}>/</span>
                        <span className="v2-eyebrow">Contact</span>
                    </div>
                </Reveal>

                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '72px', alignItems: 'start' }}
                    className="v2-contact-grid">
                    {/* LEFT: CTA */}
                    <Reveal delay={0.1}>
                        <h2 style={{
                            fontSize: 'clamp(34px, 5.2vw, 66px)',
                            fontWeight: '800',
                            color: 'var(--ink)',
                            margin: '0 0 24px 0',
                            lineHeight: '1.02',
                            letterSpacing: '-0.03em',
                        }}>
                            Let's build<br />
                            <span style={{ color: 'var(--ink-3)' }}>something.</span>
                        </h2>

                        <p style={{
                            fontSize: '18px',
                            color: 'var(--ink-2)',
                            lineHeight: '1.65',
                            marginBottom: '36px',
                            maxWidth: '440px',
                        }}>
                            Whether you need a full-stack web app, a cinematic video edit, or
                            AI-generated visual content — I'd love to hear about it.
                        </p>

                        {/* Email copy card in 3D tilt */}
                        <TiltCard max={5} sheen="rgba(255,255,255,0.4)" style={{ borderRadius: '18px', maxWidth: '480px' }}>
                            <button
                                onClick={copyEmail}
                                data-cursor="copy"
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    border: '1px solid var(--line)',
                                    background: 'var(--surface)',
                                    borderRadius: '18px',
                                    padding: '22px 24px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '16px',
                                    boxShadow: '0 18px 40px -26px rgba(20,20,20,0.22)',
                                }}
                            >
                                <div>
                                    <div className="v2-eyebrow" style={{ marginBottom: '6px' }}>
                                        {copied ? 'Copied to clipboard' : 'Email'}
                                    </div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: 'var(--ink)',
                                        wordBreak: 'break-all',
                                    }}>{EMAIL}</div>
                                </div>
                                <span style={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    color: 'var(--ink-2)',
                                    border: '1px solid var(--line)',
                                    borderRadius: '999px',
                                    padding: '7px 14px',
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0,
                                }}>{copied ? '✓' : 'Copy'}</span>
                            </button>
                        </TiltCard>

                        <div style={{ marginTop: '20px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                            <Magnetic>
                                <a
                                    href={`mailto:${EMAIL}`}
                                    data-cursor="mail"
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        padding: '13px 24px',
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
                                    Send an email ↗
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
                                        padding: '13px 24px',
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
                    </Reveal>

                    {/* RIGHT: socials */}
                    <Reveal delay={0.2}>
                        <div className="v2-eyebrow" style={{ marginBottom: '18px' }}>Elsewhere</div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {socials.map(({ label, href, handle }, i) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={label !== 'Email' ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    data-cursor="open"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '16px',
                                        padding: '20px 4px',
                                        borderTop: '1px solid var(--line)',
                                        borderBottom: i === socials.length - 1 ? '1px solid var(--line)' : 'none',
                                        textDecoration: 'none',
                                        transition: 'padding 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.paddingLeft = '18px';
                                        e.currentTarget.querySelector('.social-label').style.color = 'var(--ink-3)';
                                        e.currentTarget.querySelector('.social-arrow').style.transform = 'translate(4px,-4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.paddingLeft = '4px';
                                        e.currentTarget.querySelector('.social-label').style.color = 'var(--ink)';
                                        e.currentTarget.querySelector('.social-arrow').style.transform = 'translate(0,0)';
                                    }}
                                >
                                    <span className="social-label" style={{
                                        fontSize: 'clamp(20px, 2.4vw, 28px)',
                                        fontWeight: '700',
                                        color: 'var(--ink)',
                                        letterSpacing: '-0.02em',
                                        transition: 'color 0.15s',
                                    }}>{label}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <span style={{ fontSize: '14px', color: 'var(--ink-3)' }} className="v2-social-handle">{handle}</span>
                                        <span className="social-arrow" style={{
                                            fontSize: '20px',
                                            color: 'var(--ink)',
                                            transition: 'transform 0.2s ease',
                                            display: 'inline-block',
                                        }}>↗</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default V2Contact;
