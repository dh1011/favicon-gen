import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check } from 'lucide-react';
import getCroppedImg from '../utils/canvasUtils';

export function ImageCropper({ image, onCropComplete, onCancel }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = useCallback((crop) => {
        setCrop(crop);
    }, []);

    const onZoomChange = useCallback((zoom) => {
        setZoom(zoom);
    }, []);

    const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleConfirm = async () => {
        try {
            const croppedImageBlob = await getCroppedImg(image, croppedAreaPixels);
            onCropComplete(croppedImageBlob);
        } catch (e) {
            console.error(e);
            alert("Something went wrong with cropping");
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-lg)',
        }}>
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '500px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
            }}>
                {/* Crop area */}
                <div style={{
                    position: 'relative',
                    height: '400px',
                    background: 'var(--bg-primary)',
                }}>
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={onCropChange}
                        onCropComplete={onCropCompleteCallback}
                        onZoomChange={onZoomChange}
                    />
                </div>

                {/* Controls */}
                <div style={{
                    padding: 'var(--space-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-md)',
                }}>
                    {/* Zoom slider */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-sm)'
                    }}>
                        <span style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.75rem',
                            fontWeight: 'var(--font-weight-light)',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            minWidth: '40px',
                        }}>
                            Zoom
                        </span>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-label="Zoom"
                            onChange={(e) => setZoom(Number(e.target.value))}
                            style={{
                                flex: 1,
                                cursor: 'pointer',
                                accentColor: 'var(--accent-primary)',
                            }}
                        />
                    </div>

                    {/* Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: 'var(--space-sm)',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            onClick={onCancel}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-xs)',
                                padding: 'var(--space-xs) var(--space-sm)',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--border-subtle)',
                                background: 'transparent',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: 'var(--font-weight-normal)',
                                transition: 'var(--transition-quick)',
                            }}
                        >
                            <X size={16} strokeWidth={1.5} />
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-xs)',
                                padding: 'var(--space-xs) var(--space-sm)',
                                borderRadius: 'var(--radius-sm)',
                                background: 'var(--accent-primary)',
                                color: 'var(--bg-primary)',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: 'var(--font-weight-medium)',
                                transition: 'var(--transition-quick)',
                            }}
                        >
                            <Check size={16} strokeWidth={1.5} />
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
