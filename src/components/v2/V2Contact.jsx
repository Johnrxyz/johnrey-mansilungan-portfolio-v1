import React, { useEffect, useCallback, useState } from 'react';
import { Magnetic, Reveal } from './V2Interactive';

const EMAIL = 'mansilungan.johnrey.dll@gmail.com';
const ENDPOINT = '/.netlify/functions/send-contact';

const socials = [
    { label: 'Instagram', href: 'https://www.instagram.com/rye.drp/', handle: '@rye.drp' },
    { label: 'Facebook', href: 'https://www.facebook.com/whoscutt1ngonions', handle: 'Johnrey Mansilungan' },
    { label: 'YouTube', href: 'https://www.youtube.com/@ryevisualsyt', handle: '@ryevisualsyt' },
    { label: 'Email', href: `mailto:${EMAIL}`, handle: EMAIL },
];

const fieldBase = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'var(--surface)',
    color: 'var(--ink)',
    border: '1px solid var(--line)',
    borderRadius: '12px',
    padding: '13px 15px',
    fontSize: '15px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
};

const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--ink-2)',
    letterSpacing: '0.02em',
    marginBottom: '7px',
};

const onFocus = (e) => {
    e.currentTarget.style.borderColor = 'var(--ink)';
    e.currentTarget.style.boxShadow = '0 0 0 3px var(--lens-tint)';
};
const onBlur = (e) => {
    e.currentTarget.style.borderColor = 'var(--line)';
    e.currentTarget.style.boxShadow = 'none';
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const V2Contact = () => {
    const [copied, setCopied] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '', company: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [error, setError] = useState('');

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

    const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setError('');

        const name = form.name.trim();
        const email = form.email.trim();
        const message = form.message.trim();

        if (!name) return setError('Please enter your name.');
        if (!emailRe.test(email)) return setError('Please enter a valid email address.');
        if (message.length < 10) return setError('Please add a little more detail (10+ characters).');

        setStatus('sending');
        try {
            const res = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ name, email, message, company: form.company }),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                setStatus('success');
            } else {
                setStatus('error');
                setError(data.error || 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('error');
            setError('Network error — please email me directly instead.');
        }
    };

    const reset = () => {
        setForm({ name: '', email: '', message: '', company: '' });
        setStatus('idle');
        setError('');
    };

    const sending = status === 'sending';

    return (
        <section id="v2-contact" style={{
            padding: '110px 32px',
            borderTop: '1px solid var(--line)',
        }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
                <Reveal>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '20px' }}>
                        <span className="v2-eyebrow">06</span>
                        <span style={{ color: 'var(--line)' }}>/</span>
                        <span className="v2-eyebrow">Contact</span>
                    </div>
                </Reveal>

                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '72px', alignItems: 'start' }}
                    className="v2-contact-grid">
                    {/* LEFT: heading + form */}
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
                            marginBottom: '32px',
                            maxWidth: '460px',
                        }}>
                            Hiring, freelance, or just curious — send a note and it lands
                            straight in my inbox. I usually reply within a day.
                        </p>

                        {/* Form card */}
                        <div style={{
                            border: '1px solid var(--line)',
                            background: 'var(--surface)',
                            borderRadius: '20px',
                            padding: '26px',
                            maxWidth: '520px',
                            boxShadow: '0 22px 46px -30px rgba(20,20,20,0.28)',
                        }}>
                            {status === 'success' ? (
                                <div style={{ textAlign: 'center', padding: '24px 8px' }}>
                                    <div style={{
                                        width: '52px', height: '52px', margin: '0 auto 18px',
                                        borderRadius: '999px', background: 'var(--ink)', color: 'var(--bg)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '24px',
                                    }}>✓</div>
                                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--ink)', margin: '0 0 8px' }}>
                                        Message sent
                                    </h3>
                                    <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.6', margin: '0 0 20px' }}>
                                        Thanks, {form.name.trim().split(' ')[0] || 'there'} — it's on its way.
                                        I'll get back to you shortly.
                                    </p>
                                    <button
                                        onClick={reset}
                                        data-cursor="go"
                                        style={{
                                            fontSize: '14px', fontWeight: '600', color: 'var(--ink)',
                                            background: 'none', border: '1px solid var(--line)',
                                            borderRadius: '999px', padding: '9px 18px', cursor: 'pointer',
                                        }}
                                    >
                                        Send another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={submit} noValidate>
                                    {/* Honeypot — hidden from humans */}
                                    <input
                                        type="text"
                                        name="company"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={form.company}
                                        onChange={update('company')}
                                        aria-hidden="true"
                                        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                                    />

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}
                                        className="v2-form-row">
                                        <div>
                                            <label htmlFor="cf-name" style={labelStyle}>Name</label>
                                            <input
                                                id="cf-name" type="text" value={form.name}
                                                onChange={update('name')} onFocus={onFocus} onBlur={onBlur}
                                                placeholder="Jane Doe" autoComplete="name"
                                                disabled={sending} style={fieldBase}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="cf-email" style={labelStyle}>Email</label>
                                            <input
                                                id="cf-email" type="email" value={form.email}
                                                onChange={update('email')} onFocus={onFocus} onBlur={onBlur}
                                                placeholder="jane@company.com" autoComplete="email"
                                                disabled={sending} style={fieldBase}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '18px' }}>
                                        <label htmlFor="cf-message" style={labelStyle}>Message</label>
                                        <textarea
                                            id="cf-message" value={form.message}
                                            onChange={update('message')} onFocus={onFocus} onBlur={onBlur}
                                            placeholder="Tell me about the role, project, or idea…"
                                            rows={5} disabled={sending}
                                            style={{ ...fieldBase, resize: 'vertical', minHeight: '120px', lineHeight: '1.5' }}
                                        />
                                    </div>

                                    {error && (
                                        <div role="alert" style={{
                                            fontSize: '13px', color: 'var(--ink)', fontWeight: '500',
                                            background: 'var(--lens-tint)', border: '1px solid var(--line)',
                                            borderRadius: '10px', padding: '10px 14px', marginBottom: '16px',
                                        }}>
                                            {error}
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                        <button
                                            type="submit"
                                            disabled={sending}
                                            data-cursor="mail"
                                            style={{
                                                fontSize: '15px', fontWeight: '600',
                                                padding: '13px 26px',
                                                background: 'var(--ink)', color: 'var(--bg)',
                                                border: 'none', borderRadius: '999px',
                                                cursor: sending ? 'default' : 'pointer',
                                                opacity: sending ? 0.7 : 1,
                                                transition: 'opacity 0.15s',
                                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                            }}
                                        >
                                            {sending ? (
                                                <>
                                                    <span className="v2-spin" style={{
                                                        width: '14px', height: '14px', borderRadius: '999px',
                                                        border: '2px solid var(--bg)', borderTopColor: 'transparent',
                                                        display: 'inline-block',
                                                    }} />
                                                    Sending…
                                                </>
                                            ) : 'Send message ↗'}
                                        </button>
                                        <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
                                            Straight to my inbox — no spam.
                                        </span>
                                    </div>
                                </form>
                            )}
                        </div>
                    </Reveal>

                    {/* RIGHT: socials + resume + copy email */}
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
                                        padding: '18px 4px',
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
                                        fontSize: 'clamp(19px, 2.2vw, 26px)',
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

                        {/* Secondary: copy email + resume */}
                        <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <button
                                onClick={copyEmail}
                                data-cursor="copy"
                                style={{
                                    fontSize: '14px', fontWeight: '600',
                                    color: 'var(--ink)', background: 'var(--surface)',
                                    border: '1px solid var(--line)', borderRadius: '999px',
                                    padding: '11px 20px', cursor: 'pointer',
                                    transition: 'border-color 0.15s',
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--ink)'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
                            >
                                {copied ? '✓ Copied' : 'Copy email'}
                            </button>
                            <Magnetic>
                                <a
                                    href="/Johnrey_Mansilungan_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cursor="open"
                                    style={{
                                        fontSize: '14px', fontWeight: '600',
                                        padding: '11px 20px',
                                        background: 'var(--ink)', color: 'var(--bg)',
                                        borderRadius: '999px', textDecoration: 'none',
                                        display: 'inline-block', transition: 'opacity 0.15s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.82'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                >
                                    Résumé ↓
                                </a>
                            </Magnetic>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default V2Contact;
