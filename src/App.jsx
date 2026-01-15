import { useState, useRef } from 'react'
import { ImageUploader } from './components/ImageUploader'
import { IconPreview } from './components/IconPreview'
import { ImageCropper } from './components/ImageCropper'
import { ColorSchemeDisplay } from './components/ColorSchemeDisplay'
import { generateFavicons, downloadZip } from './utils/generator'
import ColorThief from 'colorthief'
import './index.css'

function App() {
  const [icons, setIcons] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [colorScheme, setColorScheme] = useState(null)

  const handleImageSelect = (file) => {
    // Create a URL for the file to be used in the cropper
    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(imageUrl)
    // Reset previous results
    setIcons(null)
    setColorScheme(null)
  }

  const handleCropComplete = async (croppedBlob) => {
    // User confirmed crop, proceed to generation
    setSelectedImage(null) // Close cropper

    // Proceed with generation using the cropped blob
    setIsGenerating(true)
    try {
      // Extract colors
      const img = new Image();
      const imageUrl = URL.createObjectURL(croppedBlob);
      img.src = imageUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, 5);
        setColorScheme(palette);
      } catch (err) {
        console.error("Failed to extract colors:", err);
      }

      await new Promise(resolve => setTimeout(resolve, 800))
      const generated = await generateFavicons(croppedBlob)
      setIcons(generated)
    } catch (error) {
      console.error("Failed to generate icons:", error)
      alert("Something went wrong while generating icons.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCropCancel = () => {
    setSelectedImage(null)
  }

  const handleDownload = () => {
    if (icons) {
      downloadZip(icons)
    }
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '3rem'
    }}>
      <header style={{ textAlign: 'center', marginTop: '2rem' }}>
        <img
          src="/android-chrome-192x192.png"
          alt="Favicon Generator Logo"
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 1.5rem',
            borderRadius: '1.5rem',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)'
          }}
        />
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          background: 'linear-gradient(to right, var(--accent-primary), #818cf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
          letterSpacing: '-0.02em'
        }}>
          Favicon Generator
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Instantly generate pixel-perfect favicons and app icons for your next project. All completely browser-based.
        </p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <section>
          {/* Changed onImageUpload to handleImageSelect to trigger crop flow first */}
          <ImageUploader onImageUpload={handleImageSelect} isGenerating={isGenerating} />
        </section>

        {colorScheme && (
          <section>
            <ColorSchemeDisplay colors={colorScheme} />
          </section>
        )}

        {icons && (
          <section>
            <IconPreview icons={icons} onDownload={handleDownload} />
          </section>
        )}
      </main>

      {/* Render Cropper Modal if an image is selected */}
      {selectedImage && (
        <ImageCropper
          image={selectedImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}

      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: 'var(--text-secondary)',
        borderTop: '1px solid var(--glass-border)',
        marginTop: '2rem'
      }}>
        <p>© {new Date().getFullYear()} Favicon Generator. Built with React & Vite.</p>
      </footer>
    </div>
  )
}

export default App
