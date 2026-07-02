import React, { useState, useEffect } from 'react';
import { V2Cursor, ParticleField, ScrollProgress, ScrambleText } from './V2Interactive';

const MoonIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

const SunIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4" />
    </svg>
);

const V2Layout = ({ children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('v2Theme');
            if (saved === 'dark' || saved === 'light') return saved;
        }
        return 'light';
    });

    const isDark = theme === 'dark';

    useEffect(() => {
        localStorage.setItem('v2Theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

    const navLinks = [
        { label: 'about', href: '#v2-about' },
        { label: 'videos', href: '#v2-videos' },
        { label: 'web dev', href: '#v2-websites' },
        { label: 'stack', href: '#v2-stack' },
        { label: 'contact', href: '#v2-contact' },
    ];

    const scrollTo = (href) => {
        setMobileMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const themeBtnStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        borderRadius: '999px',
        border: '1px solid var(--line)',
        background: 'var(--surface)',
        color: 'var(--ink)',
        cursor: 'pointer',
        transition: 'border-color 0.15s, transform 0.15s',
    };

    return (
        <div className={`v2-root${isDark ? ' v2-dark' : ''}`} style={{
            background: 'var(--bg)',
            color: 'var(--ink)',
            minHeight: '100vh',
            fontFamily: '"Inter", system-ui, sans-serif',
            position: 'relative',
        }}>
            {/* Immersive layers */}
            <ScrollProgress />
            <V2Cursor />
            <ParticleField rgb={isDark ? '235,235,235' : '20,20,20'} />

            {/* ── FLOATING CENTERED GLASS NAV ── */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                display: 'flex',
                justifyContent: 'center',
                padding: '16px 16px 0',
                pointerEvents: 'none',
            }}>
                <header className="v2-navbar" style={{
                    pointerEvents: 'auto',
                    width: '100%',
                    maxWidth: '1120px',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    alignItems: 'center',
                    gap: '12px',
                    height: '58px',
                    padding: '0 10px 0 20px',
                    borderRadius: '18px',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(18px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(18px) saturate(180%)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: 'var(--glass-shadow), inset 0 1px 0 var(--glass-hi)',
                }}>
                    {/* LEFT: wordmark */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{
                            justifySelf: 'start',
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <span style={{
                            width: '9px',
                            height: '9px',
                            borderRadius: '50%',
                            background: 'var(--ink)',
                            display: 'inline-block',
                        }} className="v2-blink-dot" />
                        <span style={{
                            fontSize: '15px',
                            fontWeight: '700',
                            color: 'var(--ink)',
                            letterSpacing: '-0.01em',
                        }}>
                            <ScrambleText text="Rye" />
                        </span>
                    </button>

                    {/* CENTER: nav links */}
                    <nav style={{ justifySelf: 'center', display: 'flex', gap: '2px', alignItems: 'center' }}
                        className="v2-desktop-nav">
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => scrollTo(link.href)}
                                data-cursor="go"
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: 'var(--ink-2)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '8px 14px',
                                    transition: 'color 0.15s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-2)'}
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>

                    {/* RIGHT: actions */}
                    <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {/* Theme toggle — always visible */}
                        <button
                            onClick={toggleTheme}
                            data-cursor="theme"
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            title={isDark ? 'Light mode' : 'Dark mode'}
                            style={themeBtnStyle}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--ink)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </button>

                        {/* Let's talk — desktop only */}
                        <a
                            href="mailto:mansilungan.johnrey.dll@gmail.com"
                            data-cursor="mail"
                            className="v2-desktop-nav"
                            style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: 'var(--bg)',
                                background: 'var(--ink)',
                                borderRadius: '999px',
                                padding: '9px 18px',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'opacity 0.15s',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.82'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            Let's talk ↗
                        </a>

                        {/* Mobile menu button */}
                        <button
                            className="v2-mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            style={{
                                background: 'none',
                                border: '1px solid var(--line)',
                                borderRadius: '10px',
                                color: 'var(--ink)',
                                fontSize: '13px',
                                fontWeight: '600',
                                padding: '8px 14px',
                                cursor: 'pointer',
                                alignItems: 'center',
                            }}
                        >
                            {mobileMenuOpen ? 'Close' : 'Menu'}
                        </button>
                    </div>
                </header>
            </div>

            {/* Mobile Nav Dropdown — floating glass panel under the nav */}
            {mobileMenuOpen && (
                <div style={{
                    position: 'sticky',
                    top: '82px',
                    zIndex: 99,
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '0 16px',
                    pointerEvents: 'none',
                }}>
                    <div style={{
                        pointerEvents: 'auto',
                        width: '100%',
                        maxWidth: '1120px',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(18px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(18px) saturate(180%)',
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--glass-shadow), inset 0 1px 0 var(--glass-hi)',
                        borderRadius: '18px',
                        padding: '10px 20px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                    }}>
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => scrollTo(link.href)}
                                style={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    color: 'var(--ink)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    padding: '10px 0',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ── PAGE CONTENT ── */}
            <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
        </div>
    );
};

export default V2Layout;
