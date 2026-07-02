import React from 'react';

const V2Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer style={{
            borderTop: '1px solid var(--line)',
            padding: '36px 32px',
            position: 'relative',
            zIndex: 1,
        }}>
            <div style={{
                maxWidth: '1180px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ink)' }} className="v2-blink-dot" />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)' }}>
                        Johnrey Mansilungan
                    </span>
                    <span style={{ fontSize: '14px', color: 'var(--ink-3)' }}>© {year}</span>
                </div>

                <div style={{ fontSize: '13px', color: 'var(--ink-3)', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <span>Designed & built with React</span>
                    <span style={{ color: 'var(--line)' }}>·</span>
                    <span>Available for freelance</span>
                </div>
            </div>
        </footer>
    );
};

export default V2Footer;
