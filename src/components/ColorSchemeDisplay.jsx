import React from 'react';
import { Copy, Check } from 'lucide-react';

export function ColorSchemeDisplay({ colors }) {
    const [copiedAll, setCopiedAll] = React.useState(false);
    const [copiedIndex, setCopiedIndex] = React.useState(null);

    const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')

    const copyToClipboard = (color, index) => {
        const hex = rgbToHex(color[0], color[1], color[2]);
        navigator.clipboard.writeText(hex);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const copyAllColors = () => {
        const allHex = colors.map(color => rgbToHex(color[0], color[1], color[2])).join(', ');
        navigator.clipboard.writeText(allHex);
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
    };

    if (!colors || colors.length === 0) return null;

    return (
        <div>
            {/* Section header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-lg)',
            }}>
                <h2 style={{
                    fontSize: '0.75rem',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                }}>
                    Palette
                </h2>
                <button
                    onClick={copyAllColors}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-xs)',
                        padding: 'var(--space-xs) var(--space-sm)',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: 'var(--font-weight-normal)',
                        letterSpacing: '0.02em',
                        transition: 'var(--transition-quick)',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--border-hover)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    }}
                >
                    {copiedAll ? <Check size={12} /> : <Copy size={12} />}
                    {copiedAll ? 'Copied' : 'Copy all'}
                </button>
            </div>

            {/* Color swatches */}
            <div style={{
                display: 'flex',
                gap: 'var(--space-xs)',
            }}>
                {colors.map((color, index) => {
                    const hex = rgbToHex(color[0], color[1], color[2]);
                    const isLight = (color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114) > 186;

                    return (
                        <div
                            key={index}
                            onClick={() => copyToClipboard(color, index)}
                            style={{
                                flex: 1,
                                aspectRatio: '1',
                                backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'var(--transition-quick)',
                                overflow: 'hidden',
                            }}
                            title={hex}
                        >
                            {/* Hover overlay */}
                            <div
                                className="color-swatch-overlay"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(0,0,0,0.3)',
                                    opacity: 0,
                                    transition: 'var(--transition-quick)',
                                }}
                            >
                                {copiedIndex === index ? (
                                    <Check size={16} color="#fff" />
                                ) : (
                                    <Copy size={16} color="#fff" />
                                )}
                            </div>

                            {/* Hex label */}
                            <span style={{
                                position: 'absolute',
                                bottom: '4px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                fontSize: '0.5rem',
                                fontFamily: 'monospace',
                                color: isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)',
                                letterSpacing: '0',
                            }}>
                                {hex}
                            </span>
                        </div>
                    );
                })}
            </div>

            <style>
                {`
                    .color-swatch-overlay:hover {
                        opacity: 1 !important;
                    }
                    div:hover > .color-swatch-overlay {
                        opacity: 1 !important;
                    }
                `}
            </style>
        </div>
    );
}
