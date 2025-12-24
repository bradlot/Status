import React, { useState } from 'react';
import { useToast } from './ui/Toast';

export default function AddServiceForm({ onServiceAdded }) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, url })
            });
            if (res.ok) {
                onServiceAdded();
                setName('');
                setUrl('');
                addToast('Service monitored successfully', 'success');
            } else {
                addToast('Failed to add service', 'error');
            }
        } catch (err) {
            console.error(err);
            addToast('Network error', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel" style={{
            marginTop: '2rem',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            animation: 'fadeIn 0.3s ease-out'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Add New Service</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Service Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(0,0,0,0.2)',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
                <input
                    type="url"
                    placeholder="https://api.example.com"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    required
                    style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(0,0,0,0.2)',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
                <button type="submit" style={{
                    padding: '0.75rem 1.5rem',
                    background: 'var(--success-color)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}>
                    Monitor
                </button>
            </div>
        </form>
    );
}
