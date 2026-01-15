import React, { useCallback, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

export function ImageUploader({ onImageUpload, isGenerating }) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, [onImageUpload]);

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type.startsWith('image/')) {
            onImageUpload(file);
        }
    };

    return (
        <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{
                border: `1px solid ${isDragging ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                background: isDragging ? 'var(--accent-subtle)' : 'transparent',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-xl) var(--space-lg)',
                textAlign: 'center',
                transition: 'var(--transition-smooth)',
                cursor: 'pointer',
                position: 'relative',
            }}
        >
            <input
                type="file"
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleChange}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                }}
                disabled={isGenerating}
            />

            <div style={{ pointerEvents: 'none' }}>
                {isGenerating ? (
                    <Loader2
                        size={24}
                        style={{
                            color: 'var(--accent-primary)',
                            animation: 'spin 1.5s linear infinite',
                            marginBottom: 'var(--space-md)'
                        }}
                    />
                ) : (
                    <Upload
                        size={24}
                        strokeWidth={1.5}
                        style={{
                            color: 'var(--text-muted)',
                            marginBottom: 'var(--space-md)'
                        }}
                    />
                )}
                <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 'var(--font-weight-light)',
                    marginBottom: 'var(--space-xs)',
                }}>
                    {isGenerating ? 'Creating icons...' : 'Drop image here'}
                </p>
                {!isGenerating && (
                    <p style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        fontWeight: 'var(--font-weight-light)',
                    }}>
                        PNG, JPG, or SVG
                    </p>
                )}
            </div>
        </div>
    );
}
