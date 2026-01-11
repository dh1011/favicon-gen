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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                height: '600px',
                backgroundColor: 'var(--card-bg)', // assuming card-bg exists, or use white/dark fallback
                background: '#1e293b', // Fallback to a dark slate compatible with likely theme
                borderRadius: '1rem',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    position: 'relative',
                    flex: 1,
                    background: '#0f172a'
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

                <div style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    background: '#1e293b'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ color: '#fff', fontSize: '0.9rem' }}>Zoom</span>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(Number(e.target.value))}
                            style={{ flex: 1, cursor: 'pointer' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button
                            onClick={onCancel}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #475569',
                                background: 'transparent',
                                color: '#cbd5e1',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: 500,
                                transition: 'all 0.2s'
                            }}
                        >
                            <X size={18} />
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                background: '#38bdf8', /* sky-400 */
                                color: '#0f172a', /* slate-900 */
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: 600,
                                transition: 'all 0.2s'
                            }}
                        >
                            <Check size={18} />
                            Crop & Generate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
