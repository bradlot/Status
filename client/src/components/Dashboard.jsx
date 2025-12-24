import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import AddServiceForm from './AddServiceForm';
import ThemeCustomizer from './ThemeCustomizer';
import Skeleton from './ui/Skeleton';
import { useToast } from './ui/Toast';

export default function Dashboard() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const { addToast } = useToast();

    const fetchServices = async (silent = false) => {
        try {
            const res = await fetch('http://localhost:3001/api/services');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setServices(data);
            if (error) setError(null); // Clear error if successful
        } catch (error) {
            console.error('Failed to fetch services', error);
            if (!silent && !error) {
                // Only show toast if we transition from success to error state to avoid spam
                setError(true);
                addToast('Connection to server lost', 'error');
            }
        } finally {
            if (!silent) setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
        const interval = setInterval(() => fetchServices(true), 5000); // Poll more frequently for smoother charts
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container">
            <header className="header animate-fade-in">
                <div>
                    <h1 className="title">Status</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Real-time service monitoring.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'var(--accent-color)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius)',
                        fontWeight: 600,
                        fontSize: '1rem',
                        boxShadow: '0 4px 12px var(--accent-glow)'
                    }}>
                    {showAddForm ? 'Close' : 'Add Service'}
                </button>
            </header>

            {showAddForm && (
                <div style={{ marginBottom: '3rem' }}>
                    <AddServiceForm onServiceAdded={() => {
                        fetchServices(true);
                        setShowAddForm(false);
                    }} />
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '2rem'
            }}>
                {loading ? (
                    // Skeleton Loading State
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="glass-panel" style={{ height: '200px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <Skeleton width="120px" height="24px" style={{ marginBottom: '0.5rem' }} />
                                    <Skeleton width="180px" height="16px" />
                                </div>
                                <Skeleton width="80px" height="28px" style={{ borderRadius: '99px' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                                <div>
                                    <Skeleton width="60px" height="12px" style={{ marginBottom: '0.5rem' }} />
                                    <Skeleton width="80px" height="32px" />
                                </div>
                                <Skeleton width="120px" height="40px" />
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        {services.map((service, index) => (
                            <div key={service.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                                <ServiceCard service={service} />
                            </div>
                        ))}
                    </>
                )}

                {!loading && services.length === 0 && !showAddForm && (
                    <div className="glass-panel" style={{
                        gridColumn: '1/-1',
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        padding: '4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{ fontSize: '3rem', opacity: 0.5 }}>📡</div>
                        <h3>No services monitored</h3>
                        <p>Add a service above to start tracking uptime.</p>
                    </div>
                )}
            </div>

            <ThemeCustomizer />
        </div>
    );
}
