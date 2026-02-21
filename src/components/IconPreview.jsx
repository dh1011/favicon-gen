import React from 'react';
import { Download } from 'lucide-react';

export function IconPreview({ icons, mobileIcons, firefoxIcons, onDownload, onDownloadMobile, onDownloadFirefox }) {
    if (!icons || icons.length === 0) return null;

    return (
        <div>
            {/* Section header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-lg)',
                flexWrap: 'wrap',
                gap: 'var(--space-sm)',
            }}>
                <h2 style={{
                    fontSize: '0.75rem',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                }}>
                    Generated Icons
                </h2>
                <div style={{
                    display: 'flex',
                    gap: 'var(--space-xs)',
                }}>
                    <button
                        onClick={onDownload}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-xs)',
                            padding: 'var(--space-xs) var(--space-sm)',
                            background: 'transparent',
                            color: 'var(--accent-primary)',
                            border: '1px solid var(--accent-primary)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            fontWeight: 'var(--font-weight-medium)',
                            letterSpacing: '0.05em',
                            transition: 'var(--transition-quick)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'var(--accent-subtle)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        <Download size={14} strokeWidth={1.5} />
                        Web Icons (6)
                    </button>
                    {mobileIcons && (
                        <button
                            onClick={onDownloadMobile}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-xs)',
                                padding: 'var(--space-xs) var(--space-sm)',
                                background: 'transparent',
                                color: 'var(--accent-primary)',
                                border: '1px solid var(--accent-primary)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.75rem',
                                fontWeight: 'var(--font-weight-medium)',
                                letterSpacing: '0.05em',
                                transition: 'var(--transition-quick)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'var(--accent-subtle)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <Download size={14} strokeWidth={1.5} />
                            Mobile Icons (5)
                        </button>
                    )}
                    {firefoxIcons && (
                        <button
                            onClick={onDownloadFirefox}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-xs)',
                                padding: 'var(--space-xs) var(--space-sm)',
                                background: 'transparent',
                                color: 'var(--accent-primary)',
                                border: '1px solid var(--accent-primary)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.75rem',
                                fontWeight: 'var(--font-weight-medium)',
                                letterSpacing: '0.05em',
                                transition: 'var(--transition-quick)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'var(--accent-subtle)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <Download size={14} strokeWidth={1.5} />
                            Firefox Icons (6)
                        </button>
                    )}
                </div>
            </div>

            {/* Icon grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: 'var(--space-sm)',
            }}>
                {icons.map((icon) => (
                    <div key={icon.name} style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        padding: 'var(--space-md)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 'var(--space-sm)',
                        transition: 'var(--transition-quick)',
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <img
                                src={icon.url}
                                alt={icon.name}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: '0.75rem',
                                fontWeight: 'var(--font-weight-medium)',
                                color: 'var(--text-primary)',
                                marginBottom: '2px',
                            }}>
                                {icon.width}×{icon.height}
                            </div>
                            <div style={{
                                fontSize: '0.625rem',
                                color: 'var(--text-muted)',
                                fontWeight: 'var(--font-weight-light)',
                            }}>
                                {icon.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
