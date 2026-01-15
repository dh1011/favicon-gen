import React from 'react';
import { Copy, Check } from 'lucide-react';

export function ColorSchemeDisplay({ colors }) {
    const [copiedAll, setCopiedAll] = React.useState(false);
    const [copiedIndex, setCopiedIndex] = React.useState(null);

    const copyToClipboard = (color, index) => {
        // Convert RGB array to Hex
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

    const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')

    if (!colors || colors.length === 0) return null;

    return (
        <div style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    margin: 0
                }}>
                    Color Palette
                </h2>
                <button
                    onClick={copyAllColors}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'var(--accent-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s',
                        opacity: copiedAll ? 0.9 : 1
                    }}
                >
                    {copiedAll ? <Check size={16} /> : <Copy size={16} />}
                    {copiedAll ? 'Copied!' : 'Copy All'}
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '1rem'
            }}>
                {colors.map((color, index) => {
                    const hex = rgbToHex(color[0], color[1], color[2]);
                    const isLight = (color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114) > 186;

                    return (
                        <div
                            key={index}
                            onClick={() => copyToClipboard(color, index)}
                            style={{
                                backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                                height: '100px',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s',
                                ':hover': { transform: 'scale(1.05)' }
                            }}
                            className="color-swatch"
                        >
                            <div style={{
                                opacity: 0,
                                transition: 'opacity 0.2s',
                                color: isLight ? '#000' : '#fff'
                            }} className="copy-overlay">
                                {copiedIndex === index ? <Check size={24} /> : <Copy size={24} />}
                            </div>
                            <span style={{
                                position: 'absolute',
                                bottom: '0.5rem',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'rgba(0,0,0,0.5)',
                                color: '#fff',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontFamily: 'monospace'
                            }}>
                                {hex}
                            </span>
                        </div>
                    );
                })}
            </div>
            <style>
                {`
          .color-swatch:hover .copy-overlay {
            opacity: 1 !important;
          }
        `}
            </style>
        </div>
    );
}
