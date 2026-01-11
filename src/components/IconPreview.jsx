import React from 'react';
import { Download } from 'lucide-react';

export function IconPreview({ icons, onDownload }) {
    if (!icons || icons.length === 0) return null;

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
            }}>
                <h2 style={{ fontSize: '1.5rem' }}>Preview</h2>
                <button
                    onClick={onDownload}
                    style={{
                        background: 'var(--accent-primary)',
                        color: 'var(--bg-primary)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: 'var(--shadow-lg)',
                        transition: 'transform 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <Download size={20} />
                    Download All
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '1.5rem'
            }}>
                {icons.map((icon) => (
                    <div key={icon.name} style={{
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        transition: 'border-color 0.2s',
                    }}>
                        <img
                            src={icon.url}
                            alt={icon.name}
                            style={{
                                width: icon.width > 64 ? 64 : icon.width,
                                height: icon.width > 64 ? 64 : icon.height,
                                objectFit: 'contain',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                            }}
                        />
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', wordBreak: 'break-all' }}>
                                {icon.width}x{icon.height}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                {icon.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
            </style>
        </div>
    );
}
