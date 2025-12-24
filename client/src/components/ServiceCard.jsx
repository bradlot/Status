import React from 'react';
import Sparkline from './ui/Sparkline';

export default function ServiceCard({ service }) {
    const isUp = service.latest_status?.status === 'UP';
    const latency = service.latest_status?.latency || 0;
    const history = service.history || [];

    return (
        <div className="glass-panel" style={{
            padding: '1.5rem',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
        }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px -8px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>{service.name}</h3>
                    <a href={service.url} target="_blank" rel="noreferrer" style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        opacity: 0.8
                    }}>
                        {new URL(service.url).hostname}
                        <span style={{ fontSize: '0.7em' }}>↗</span>
                    </a>
                </div>
                <div className={`status-badge ${isUp ? 'status-up' : 'status-down'}`}>
                    <div className="dot" />
                    {isUp ? 'Operational' : 'Downtime'}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Latency</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600, fontFamily: 'monospace' }}>{latency}ms</span>
                </div>

                <div style={{ marginBottom: '4px' }}>
                    <Sparkline
                        data={history}
                        width={120}
                        height={40}
                        color={isUp ? 'var(--success-color)' : 'var(--error-color)'}
                    />
                </div>
            </div>
        </div>
    );
}
