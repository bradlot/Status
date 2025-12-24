import React, { useState, useEffect } from 'react';

export default function ThemeCustomizer() {
    const [isOpen, setIsOpen] = useState(false);
    const [colors, setColors] = useState({
        bg: '#050608',
        accent: '#6366f1'
    });

    useEffect(() => {
        // Load current
        const style = getComputedStyle(document.documentElement);
        setColors({
            bg: style.getPropertyValue('--bg-color').trim(),
            accent: style.getPropertyValue('--accent-color').trim()
        });
    }, [isOpen]);

    const updateTheme = (key, value) => {
        document.documentElement.style.setProperty(key, value);
        if (key === '--accent-color') {
            // Also update glow
            // Simple hex to rgba approximation or just let it slide for now.
            // Ideally we would split RGB vars.
        }
        setColors(prev => ({ ...prev, [key === '--bg-color' ? 'bg' : 'accent']: value }));
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="glass-panel"
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    padding: '0.75rem',
                    borderRadius: '50%',
                    color: 'var(--text-primary)',
                    zIndex: 50,
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                }}
            >
                🎨
            </button>
        );
    }

    return (
        <div className="glass-panel" style={{
            position: 'fixed',
            bottom: '5rem',
            right: '2rem',
            padding: '1.5rem',
            zIndex: 50,
            width: '280px',
            animation: 'fadeIn 0.2s ease-out'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                <h4 style={{ fontWeight: 600 }}>Theme</h4>
                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '1.25rem' }}>✕</button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Background</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="color"
                        value={colors.bg}
                        onChange={(e) => updateTheme('--bg-color', e.target.value)}
                        style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '50%', overflow: 'hidden', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '0.875rem', fontFamily: 'monospace', alignSelf: 'center' }}>{colors.bg}</span>
                </div>
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Accent</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="color"
                        value={colors.accent}
                        onChange={(e) => updateTheme('--accent-color', e.target.value)}
                        style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '50%', overflow: 'hidden', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '0.875rem', fontFamily: 'monospace', alignSelf: 'center' }}>{colors.accent}</span>
                </div>
            </div>
        </div>
    );
}
