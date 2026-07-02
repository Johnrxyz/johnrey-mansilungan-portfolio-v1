import React, { useRef, useEffect, useState } from 'react';

/* ── CUSTOM CURSOR ─────────────────────────────────────────────
   White dot + trailing ring, mix-blend-difference so it inverts
   whatever it passes over. Expands over interactive elements and
   shows a label when the target has data-cursor="LABEL".        */
export const V2Cursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const labelRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const s = { x: -100, y: -100, rx: -100, ry: -100, scale: 1, target: 1, down: false };
        let raf;
        let activeRect = null;

        const onMove = (e) => {
            s.x = e.clientX;
            s.y = e.clientY;

            const el = e.target instanceof Element
                ? e.target.closest('a, button, input, textarea, [role="button"], [data-cursor]')
                : null;
            
            const cursorTarget = el?.closest('[data-cursor]');
            const labelAttr = cursorTarget?.getAttribute('data-cursor') || '';
            let labelText = labelAttr;

            if (labelAttr === 'magnify') {
                labelText = cursorTarget.textContent.trim();
                s.isMagnifying = true;
            } else {
                s.isMagnifying = false;
            }

            if (cursorTarget && labelAttr) {
                activeRect = cursorTarget.getBoundingClientRect();
            } else {
                activeRect = null;
            }

            s.target = labelAttr ? 3.2 : el ? 2.2 : 1;

            if (ringRef.current && labelRef.current) {
                if (labelRef.current.textContent !== labelText) {
                    labelRef.current.textContent = labelText;
                }
                ringRef.current.classList.toggle('has-label', !!labelAttr);
                ringRef.current.classList.toggle('is-magnifying', s.isMagnifying);
            }
            if (dotRef.current) dotRef.current.style.opacity = '1';
            if (ringRef.current) ringRef.current.style.opacity = '1';
        };

        const onDown = () => { s.down = true; };
        const onUp = () => { s.down = false; };
        const onLeave = () => {
            if (dotRef.current) dotRef.current.style.opacity = '0';
            if (ringRef.current) ringRef.current.style.opacity = '0';
        };

        // Fired by any iframe's onMouseEnter — hides the custom cursor at the
        // boundary before the cross-origin embed takes over mouse events.
        const onIframeEnter = () => {
            if (dotRef.current) dotRef.current.style.opacity = '0';
            if (ringRef.current) ringRef.current.style.opacity = '0';
        };

        const loop = () => {
            s.rx += (s.x - s.rx) * 0.16;
            s.ry += (s.y - s.ry) * 0.16;
            const goal = s.target * (s.down ? 0.8 : 1);
            s.scale += (goal - s.scale) * 0.18;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0) translate(-50%, -50%) scale(${s.scale})`;
                
                if (labelRef.current) {
                    if (activeRect && s.isMagnifying) {
                        const cx = activeRect.left + activeRect.width / 2;
                        const cy = activeRect.top + activeRect.height / 2;
                        // The label lives inside the ring, which is scaled by s.scale,
                        // so divide the intended screen pan by the scale to keep the
                        // magnified word tracking the cursor without flinging off-lens.
                        const dx = s.rx - cx;
                        const dy = s.ry - cy;
                        const pan = 0.34 / s.scale;
                        labelRef.current.style.transform = `translate(${-dx * pan}px, ${-dy * pan}px)`;
                    } else if (activeRect && ringRef.current.classList.contains('has-label')) {
                        const cx = activeRect.left + activeRect.width / 2;
                        const cy = activeRect.top + activeRect.height / 2;
                        const dx = s.rx - cx;
                        const dy = s.ry - cy;
                        labelRef.current.style.transform = `translate(${-dx * 0.25}px, ${-dy * 0.25}px)`;
                    } else {
                        labelRef.current.style.transform = `translate(0px, 0px)`;
                    }
                }
            }
            raf = requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('v2:iframe-enter', onIframeEnter);
        document.documentElement.addEventListener('mouseleave', onLeave);
        raf = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('v2:iframe-enter', onIframeEnter);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div ref={ringRef} className="v2-cursor-ring" aria-hidden="true">
                <span ref={labelRef} className="v2-cursor-label" />
            </div>
            <div ref={dotRef} className="v2-cursor-dot" aria-hidden="true" />
        </>
    );
};

/* ── 3D PARTICLE STARFIELD ─────────────────────────────────────
   Fixed full-screen canvas. Points live in 3D space, drift toward
   the viewer (warp) and parallax against the mouse. Nearby points
   get connected with faint constellation lines.                  */
export const ParticleField = ({ rgb = '20,20,20' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let w = 0, h = 0, raf;
        const mouse = { x: 0.5, y: 0.5 };
        // Cursor in raw px + the "antigravity" repulsion field settings
        let mpx = -9999, mpy = -9999;
        const REPEL_R = 210, REPEL_MAX = 92;
        const count = Math.max(60, Math.min(150, Math.floor(window.innerWidth / 10)));
        const pts = Array.from({ length: count }, () => ({
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
            z: Math.random(),
            ox: 0, oy: 0, // eased repulsion offset from home
        }));

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        const onMouse = (e) => {
            mouse.x = e.clientX / w;
            mouse.y = e.clientY / h;
            mpx = e.clientX;
            mpy = e.clientY;
        };
        const onLeaveDoc = () => { mpx = -9999; mpy = -9999; };

        const proj = [];
        const LINK = 110;

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            const camX = (mouse.x - 0.5) * 90;
            const camY = (mouse.y - 0.5) * 90;
            proj.length = 0;

            for (const p of pts) {
                if (!reduced) {
                    p.z -= 0.0011;
                    if (p.z <= 0.03) {
                        p.z = 1;
                        p.x = Math.random() * 2 - 1;
                        p.y = Math.random() * 2 - 1;
                        p.ox = 0;
                        p.oy = 0;
                    }
                }
                const persp = 0.55 / p.z;
                const bx = (p.x * persp * 0.5 + 0.5) * w - camX * (1 - p.z);
                const by = (p.y * persp * 0.5 + 0.5) * h - camY * (1 - p.z);

                // ── ANTIGRAVITY: repel from the cursor, spring back home ──
                let energized = 0;
                const ddx = bx - mpx, ddy = by - mpy;
                const dist = Math.sqrt(ddx * ddx + ddy * ddy);
                let tx = 0, ty = 0;
                if (dist < REPEL_R && dist > 0.001) {
                    energized = 1 - dist / REPEL_R;
                    const force = energized * energized * REPEL_MAX;
                    tx = (ddx / dist) * force;
                    ty = (ddy / dist) * force;
                }
                p.ox += (tx - p.ox) * 0.14;
                p.oy += (ty - p.oy) * 0.14;

                const sx = bx + p.ox;
                const sy = by + p.oy;
                if (sx < -60 || sx > w + 60 || sy < -60 || sy > h + 60) continue;

                // Points near the cursor brighten + swell as they scatter
                const alpha = ((1 - p.z) * 0.32 + 0.04) * (1 + energized * 2.4);
                const radius = ((1 - p.z) * 1.5 + 0.35) * (1 + energized * 0.9);
                ctx.beginPath();
                ctx.arc(sx, sy, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb},${Math.min(alpha, 0.85)})`;
                ctx.fill();
                proj.push([sx, sy, energized]);
            }

            for (let i = 0; i < proj.length; i++) {
                for (let j = i + 1; j < proj.length; j++) {
                    const dx = proj[i][0] - proj[j][0];
                    const dy = proj[i][1] - proj[j][1];
                    const d2 = dx * dx + dy * dy;
                    if (d2 < LINK * LINK) {
                        // Constellation lines glow brighter near the cursor
                        const e = proj[i][2] > proj[j][2] ? proj[i][2] : proj[j][2];
                        const o = (1 - Math.sqrt(d2) / LINK) * (0.06 + e * 0.24);
                        ctx.strokeStyle = `rgba(${rgb},${o})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(proj[i][0], proj[i][1]);
                        ctx.lineTo(proj[j][0], proj[j][1]);
                        ctx.stroke();
                    }
                }
            }
            raf = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouse, { passive: true });
        document.documentElement.addEventListener('mouseleave', onLeaveDoc);
        raf = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouse);
            document.documentElement.removeEventListener('mouseleave', onLeaveDoc);
            cancelAnimationFrame(raf);
        };
    }, [rgb]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.7,
            }}
        />
    );
};

/* ── 3D TILT CARD ──────────────────────────────────────────────
   Perspective tilt that follows the mouse, plus a soft sheen that
   tracks the pointer. Degrades gracefully on touch.              */
export const TiltCard = ({ children, max = 7, scale = 1.01, glare = true, sheen = 'rgba(255,255,255,0.5)', style = {}, ...rest }) => {
    const ref = useRef(null);
    const glareRef = useRef(null);
    const frame = useRef(null);

    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) scale3d(${scale}, ${scale}, 1)`;
            if (glareRef.current) {
                glareRef.current.style.opacity = '1';
                glareRef.current.style.background =
                    `radial-gradient(circle at ${px * 100}% ${py * 100}%, ${sheen}, transparent 55%)`;
            }
        });
    };

    const onLeave = () => {
        cancelAnimationFrame(frame.current);
        if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
        if (glareRef.current) glareRef.current.style.opacity = '0';
    };

    useEffect(() => () => cancelAnimationFrame(frame.current), []);

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s ease-out',
                willChange: 'transform',
                ...style,
            }}
            {...rest}
        >
            {children}
            {glare && (
                <div
                    ref={glareRef}
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        opacity: 0,
                        transition: 'opacity 0.3s',
                        zIndex: 5,
                    }}
                />
            )}
        </div>
    );
};

/* ── MAGNETIC WRAPPER ──────────────────────────────────────────
   Children get pulled toward the cursor and spring back. Uses a
   manual rAF spring to stay dependency-light and warning-free.   */
export const Magnetic = ({ children, strength = 0.35 }) => {
    const ref = useRef(null);
    const state = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0, active: false });

    useEffect(() => {
        const s = state.current;
        const loop = () => {
            s.x += (s.tx - s.x) * 0.15;
            s.y += (s.ty - s.y) * 0.15;
            if (ref.current) {
                ref.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
            }
            if (Math.abs(s.tx - s.x) > 0.1 || Math.abs(s.ty - s.y) > 0.1 || s.active) {
                s.raf = requestAnimationFrame(loop);
            } else {
                s.raf = 0;
            }
        };
        s.kick = () => { if (!s.raf) s.raf = requestAnimationFrame(loop); };
        return () => cancelAnimationFrame(s.raf);
    }, []);

    const onMove = (e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const s = state.current;
        s.tx = (e.clientX - (r.left + r.width / 2)) * strength;
        s.ty = (e.clientY - (r.top + r.height / 2)) * strength;
        s.active = true;
        s.kick?.();
    };

    const onLeave = () => {
        const s = state.current;
        s.tx = 0;
        s.ty = 0;
        s.active = false;
        s.kick?.();
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ display: 'inline-block', willChange: 'transform' }}
        >
            {children}
        </div>
    );
};

/* ── SCROLL REVEAL ─────────────────────────────────────────────
   Sections rise and un-rotate out of the page in 3D on scroll.
   Native IntersectionObserver + CSS — no animation library.      */
export const Reveal = ({ children, delay = 0, style = {}, ...rest }) => {
    const ref = useRef(null);
    const [shown, setShown] = useState(
        () => typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
        const el = ref.current;
        if (!el || shown) return;
        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setShown(true);
                        io.disconnect();
                    }
                }
            },
            { rootMargin: '0px 0px -60px 0px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [shown]);

    const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

    return (
        <div
            ref={ref}
            style={{
                opacity: shown ? 1 : 0,
                transform: shown
                    ? 'perspective(900px) translateY(0) rotateX(0deg)'
                    : 'perspective(900px) translateY(42px) rotateX(10deg)',
                transition: `opacity 0.7s ${ease} ${delay}s, transform 0.7s ${ease} ${delay}s`,
                willChange: 'opacity, transform',
                ...style,
            }}
            {...rest}
        >
            {children}
        </div>
    );
};

/* ── TEXT SCRAMBLE ─────────────────────────────────────────────
   Decodes from random glyphs to the real text on hover.          */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#';

export const ScrambleText = ({ text, style = {}, ...rest }) => {
    const [display, setDisplay] = useState(text);
    const timer = useRef(null);

    const scramble = () => {
        let frame = 0;
        clearInterval(timer.current);
        timer.current = setInterval(() => {
            frame++;
            const revealed = Math.floor(frame / 2);
            setDisplay(
                text
                    .split('')
                    .map((c, i) => {
                        if (c === ' ') return ' ';
                        if (i < revealed) return c;
                        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                    })
                    .join('')
            );
            if (revealed >= text.length) {
                clearInterval(timer.current);
                setDisplay(text);
            }
        }, 28);
    };

    useEffect(() => () => clearInterval(timer.current), []);

    return (
        <span onMouseEnter={scramble} style={style} {...rest}>
            {display}
        </span>
    );
};

/* ── SCROLL PROGRESS BAR ───────────────────────────────────────*/
export const ScrollProgress = () => {
    const barRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            const d = document.documentElement;
            const p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight);
            if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div
            ref={barRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'var(--ink)',
                transformOrigin: 'left',
                transform: 'scaleX(0)',
                zIndex: 300,
            }}
        />
    );
};
