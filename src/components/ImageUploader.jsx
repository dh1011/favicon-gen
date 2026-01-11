import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

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
                border: `2px dashed ${isDragging ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                background: isDragging ? 'rgba(56, 189, 248, 0.1)' : 'var(--glass-bg)',
                borderRadius: 'var(--radius-lg)',
                padding: '4rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
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
                    <Loader2 size={48} style={{ color: 'var(--accent-primary)', animation: 'spin 1s linear infinite' }} />
                ) : (
                    <Upload size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
                )}
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {isGenerating ? 'Generating Icons...' : 'Drag & Drop or Click to Upload'}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Supports PNG, JPG, SVG. Recommended 512x512px.
                </p>
            </div>

            <style>
                {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
}
