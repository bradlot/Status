import React, { createContext, useContext, useState, useEffect } from 'react';

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        // Auto remove after 3s
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div style={{
                position: 'fixed',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                zIndex: 100
            }}>
                {toasts.map(toast => (
                    <div key={toast.id} style={{
                        background: 'var(--card-bg)',
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${toast.type === 'error' ? 'var(--error-color)' : 'var(--success-color)'}`,
                        color: 'var(--text-primary)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        animation: 'fadeIn 0.3s ease-out',
                        minWidth: '300px',
                        justifyContent: 'center'
                    }}>
                        <span style={{ fontSize: '1.2rem' }}>
                            {toast.type === 'error' ? '✕' : toast.type === 'success' ? '✓' : 'ℹ'}
                        </span>
                        <span style={{ fontWeight: 500 }}>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
