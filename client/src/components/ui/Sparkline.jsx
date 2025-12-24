import React from 'react';

export default function Sparkline({ data, height = 40, width = 120, color = '#6366f1' }) {
    if (!data || data.length < 2) return null;

    // Data format: [{ latency: 120, status: 'UP' }, ...]
    // We will plot latency.

    const max = Math.max(...data.map(d => d.latency));
    const min = 0; // Always start at 0 for latency
    const range = max - min || 1;
    const step = width / (data.length - 1);

    const points = data.map((d, i) => {
        const x = i * step;
        const y = height - ((d.latency - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} style={{ overflow: 'visible' }}>
            {/* Line */}
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Area under curve (optional) */}
            <polyline
                points={`${points} ${width},${height} 0,${height}`}
                fill={color}
                fillOpacity="0.1"
            />
        </svg>
    );
}
