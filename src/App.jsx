import { useState } from 'react'
import { ImageUploader } from './components/ImageUploader'
import { IconPreview } from './components/IconPreview'
import { ImageCropper } from './components/ImageCropper'
import { ColorSchemeDisplay } from './components/ColorSchemeDisplay'
import { generateFavicons, generateMobileIcons, generateFirefoxIcons, downloadZip, downloadMobileZip, downloadFirefoxZip } from './utils/generator'
import ColorThief from 'colorthief'
import './index.css'

function App() {
  const [icons, setIcons] = useState(null)
  const [mobileIcons, setMobileIcons] = useState(null)
  const [firefoxIcons, setFirefoxIcons] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [colorScheme, setColorScheme] = useState(null)

  const handleImageSelect = (file) => {
    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(imageUrl)
    setIcons(null)
    setMobileIcons(null)
    setFirefoxIcons(null)
    setColorScheme(null)
  }

  const handleCropComplete = async (croppedBlob) => {
    setSelectedImage(null)
    setIsGenerating(true)

    try {
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
      const [webGenerated, mobileGenerated, firefoxGenerated] = await Promise.all([
        generateFavicons(croppedBlob),
        generateMobileIcons(croppedBlob),
        generateFirefoxIcons(croppedBlob)
      ])
      setIcons(webGenerated)
      setMobileIcons(mobileGenerated)
      setFirefoxIcons(firefoxGenerated)
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

  const handleDownloadMobile = () => {
    if (mobileIcons) {
      downloadMobileZip(mobileIcons)
    }
  }

  const handleDownloadFirefox = () => {
    if (firefoxIcons) {
      downloadFirefoxZip(firefoxIcons)
    }
  }

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: 'var(--space-lg)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header - minimal and centered */}
      <header style={{
        textAlign: 'center',
        padding: 'var(--space-xl) 0',
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 'var(--font-weight-light)',
          color: 'var(--text-primary)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-sm)',
        }}>
          Favicon
        </h1>
        <div className="zen-divider"></div>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
          fontWeight: 'var(--font-weight-light)',
          maxWidth: '400px',
          margin: '0 auto',
        }}>
          Generate icons for your project
        </p>
      </header>

      {/* Main content */}
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xl)',
        flex: 1,
      }}>
        <section>
          <ImageUploader onImageUpload={handleImageSelect} isGenerating={isGenerating} />
        </section>

        {colorScheme && (
          <section style={{ animation: 'fadeIn 0.6s ease' }}>
            <ColorSchemeDisplay colors={colorScheme} />
          </section>
        )}

        {icons && (
          <section style={{ animation: 'fadeIn 0.6s ease' }}>
            <IconPreview
              icons={icons}
              mobileIcons={mobileIcons}
              firefoxIcons={firefoxIcons}
              onDownload={handleDownload}
              onDownloadMobile={handleDownloadMobile}
              onDownloadFirefox={handleDownloadFirefox}
            />
          </section>
        )}
      </main>

      {/* Cropper Modal */}
      {selectedImage && (
        <ImageCropper
          image={selectedImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}

      {/* Footer - subtle */}
      <footer style={{
        textAlign: 'center',
        padding: 'var(--space-xl) 0 var(--space-lg)',
        marginTop: 'auto',
      }}>
        <div className="zen-divider"></div>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          fontWeight: 'var(--font-weight-light)',
          letterSpacing: '0.05em',
        }}>
          Crafted with simplicity
        </p>
      </footer>
    </div>
  )
}

export default App
