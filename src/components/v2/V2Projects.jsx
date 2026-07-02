import React, { useState } from 'react';
import { TiltCard, Reveal } from './V2Interactive';

const projects = [
    {
        index: '01',
        title: 'ST Business Consulting',
        status: 'Deployed',
        type: 'Web Portal Development',
        description:
            'A client-facing web portal integrating a structured AI training video library. Employees access curated on-demand learning content with role-based routing and a clean dashboard interface.',
        highlights: [
            'Role-based access and navigation routing',
            'Integrated AI-generated training video modules',
            'Responsive portal with structured content hierarchy',
            'Custom video player with progress tracking UI',
        ],
        tags: ['React', 'Web Portal', 'AI/ML', 'Video Integration', 'REST API'],
        metrics: [
            { label: 'Components', value: '24+' },
            { label: 'Video modules', value: '12' },
            { label: 'User roles', value: '3' },
        ],
    },
    {
        index: '02',
        title: 'Caring Hands LLC',
        status: 'Live',
        type: 'Admin Dashboard & Backend',
        description:
            'A full-stack admin dashboard featuring real-time metric tracking, caregiver scheduling, and a Supabase-powered PostgreSQL backend, handling sensitive medical scheduling data with auth guards and row-level security.',
        highlights: [
            'Real-time metric tracking with Chart.js',
            'Supabase backend with row-level security (RLS)',
            'Caregiver scheduling and availability system',
            'JWT-based authentication with protected routes',
        ],
        tags: ['React', 'Supabase', 'PostgreSQL', 'Admin Dashboard', 'Chart.js', 'JWT Auth'],
        metrics: [
            { label: 'DB tables', value: '9' },
            { label: 'Metrics tracked', value: '15+' },
            { label: 'Auth layers', value: '2' },
        ],
    },
    {
        index: '03',
        title: 'Task Management System',
        status: 'Case study',
        type: 'Full-Stack Architecture',
        description:
            'A full-stack task management application built with a Django REST Framework backend and a React SPA frontend. Features workspace-based task boards, real-time status updates via WebSocket, and a drag-and-drop kanban interface.',
        highlights: [
            'Django REST Framework API with token auth',
            'React SPA with drag-and-drop Kanban board',
            'WebSocket real-time task status updates',
            'Multi-workspace and multi-user support',
        ],
        tags: ['React', 'Django', 'Python', 'PostgreSQL', 'TypeScript', 'REST API'],
        metrics: [
            { label: 'API endpoints', value: '18' },
            { label: 'Models', value: '7' },
            { label: 'WS channels', value: '4' },
        ],
    },
];

const ProjectCard = ({ project }) => {
    const [expanded, setExpanded] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <TiltCard
            max={3}
            scale={1.004}
            sheen="rgba(255,255,255,0.4)"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                border: '1px solid var(--line)',
                background: 'var(--surface)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: hovered
                    ? '0 26px 50px -26px rgba(20,20,20,0.28)'
                    : '0 12px 30px -24px rgba(20,20,20,0.16)',
                transition: 'box-shadow 0.3s ease',
            }}
        >
            <div style={{ padding: '32px 34px' }}>
                {/* Header row */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    marginBottom: '18px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink-3)' }}>{project.index}</span>
                        <div>
                            <h3 style={{
                                fontSize: 'clamp(20px, 2.4vw, 28px)',
                                fontWeight: '700',
                                color: 'var(--ink)',
                                margin: '0 0 4px 0',
                                letterSpacing: '-0.02em',
                            }}>{project.title}</h3>
                            <span style={{ fontSize: '14px', color: 'var(--ink-2)' }}>{project.type}</span>
                        </div>
                    </div>

                    {/* Status pill */}
                    <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--ink-2)',
                        border: '1px solid var(--line)',
                        borderRadius: '999px',
                        padding: '5px 12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ink)' }} />
                        {project.status}
                    </span>
                </div>

                {/* Description */}
                <p style={{
                    fontSize: '16px',
                    color: 'var(--ink-2)',
                    lineHeight: '1.7',
                    margin: '0 0 26px 0',
                    maxWidth: '760px',
                }}>
                    {project.description}
                </p>

                {/* Metrics */}
                <div style={{
                    display: 'flex',
                    gap: '40px',
                    flexWrap: 'wrap',
                    paddingBottom: '24px',
                    borderBottom: '1px solid var(--line-2)',
                    marginBottom: '22px',
                }}>
                    {project.metrics.map((m) => (
                        <div key={m.label}>
                            <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--ink)', letterSpacing: '-0.02em' }}>{m.value}</div>
                            <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '1px' }}>{m.label}</div>
                        </div>
                    ))}
                </div>

                {/* Highlights */}
                <div style={{
                    display: 'grid',
                    gridTemplateRows: expanded ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.35s ease',
                }}>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ paddingBottom: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {project.highlights.map((h, i) => (
                                <div key={i} style={{
                                    fontSize: '15px',
                                    color: 'var(--ink-2)',
                                    display: 'flex',
                                    gap: '12px',
                                    alignItems: 'flex-start',
                                    lineHeight: '1.5',
                                }}>
                                    <span style={{ color: 'var(--ink)', flexShrink: 0 }}>—</span>
                                    <span>{h}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer: tags + toggle */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    flexWrap: 'wrap',
                }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {project.tags.map((tag) => (
                            <span key={tag} style={{
                                fontSize: '12px',
                                fontWeight: '500',
                                color: 'var(--ink-2)',
                                background: 'var(--bg)',
                                border: '1px solid var(--line)',
                                borderRadius: '999px',
                                padding: '5px 12px',
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={() => setExpanded(!expanded)}
                        data-cursor={expanded ? 'less' : 'more'}
                        style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'var(--ink)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 0',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {expanded ? 'Show less' : 'View highlights'}
                        <span style={{
                            display: 'inline-block',
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.3s',
                        }}>↓</span>
                    </button>
                </div>
            </div>
        </TiltCard>
    );
};

const V2Projects = () => {
    return (
        <section id="v2-projects" style={{
            padding: '110px 32px',
            borderTop: '1px solid var(--line)',
        }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
                <Reveal>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '20px' }}>
                        <span className="v2-eyebrow">02</span>
                        <span style={{ color: 'var(--line)' }}>/</span>
                        <span className="v2-eyebrow">Work</span>
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(30px, 4.4vw, 52px)',
                        fontWeight: '800',
                        color: 'var(--ink)',
                        margin: '0 0 56px 0',
                        letterSpacing: '-0.03em',
                    }}>
                        Selected projects
                    </h2>
                </Reveal>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    {projects.map((project, i) => (
                        <Reveal key={project.index} delay={i * 0.08}>
                            <ProjectCard project={project} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default V2Projects;
