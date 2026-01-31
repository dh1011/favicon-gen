# Favicon Generator

A web application that generates complete favicon packages and mobile app icons from uploaded images. Built with React and Vite for fast, client-side image processing.

## Features

- **Drag & Drop Image Upload** - Simple interface for selecting images
- **Smart Cropping** - Interactive cropper with zoom and rotation controls
- **Comprehensive Icon Generation**:
  - Web Favicons: 16×16, 32×32, 180×180, 192×192, 512×512
  - Mobile App Icons: 1024×1024 (standard & adaptive), 2048×2048 (splash)
- **Color Palette Extraction** - Automatically extracts 5-color scheme from your image
- **One-Click Download** - Get all icons packaged in ZIP files
- **100% Client-Side** - All processing happens in your browser, no uploads needed

## Setup

### Prerequisites

- Node.js 18+ (for npm setup)
- Docker & Docker Compose (for Docker setup)

### Option 1: Local Development with npm

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd favicon-gen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to [http://localhost:5173](http://localhost:5173)

### Option 2: Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd favicon-gen
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up
   ```

3. **Open in browser**

   Navigate to [http://localhost:1111](http://localhost:1111)

Alternatively, you can build and run the Docker image manually:

```bash
# Build the image
docker build -t favicon-gen .

# Run the container
docker run -p 1111:80 favicon-gen
```

## Usage

1. **Upload an Image** - Drag and drop or click to select an image file
2. **Crop to Square** - Use the interactive cropper to select the area you want
   - Zoom in/out with the slider
   - Rotate if needed
   - Click "Confirm" when ready
3. **View Results** - See your generated icons and extracted color palette
4. **Download Icons**:
   - Click "Download Web Icons" for `favicons.zip` (6 favicon files)
   - Click "Download Mobile Icons" for `mobile-icons.zip` (5 app icon files)

## Generated Files

### Web Icons Package (favicons.zip)
- `favicon-16x16.png` - Browser tab icon
- `favicon-32x32.png` - Browser tab icon
- `apple-touch-icon.png` (180×180) - iOS home screen
- `android-chrome-192x192.png` - Android home screen
- `android-chrome-512x512.png` - Android splash screen
- `favicon.ico` - Legacy browser support

### Mobile App Icons Package (mobile-icons.zip)
- `icon.png` (1024×1024) - Standard app icon for React Native/Expo
- `adaptive-icon.png` (1024×1024) - Android adaptive icon
- `splash-icon.png` (2048×2048) - Splash screen icon
- `favicon-32x32.png` (32×32) - Web favicon
- `favicon.ico` - Legacy browser support

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **react-easy-crop** - Interactive image cropping
- **ColorThief** - Color palette extraction
- **JSZip** - ZIP file generation
- **Canvas API** - Client-side image processing

## Project Structure

```
favicon-gen/
├── src/
│   ├── components/
│   │   ├── ImageUploader.jsx    # Drag-drop interface
│   │   ├── ImageCropper.jsx     # Crop modal
│   │   ├── IconPreview.jsx      # Generated icons display
│   │   └── ColorSchemeDisplay.jsx # Color palette
│   ├── utils/
│   │   ├── generator.js         # Icon generation & ZIP download
│   │   └── canvasUtils.js       # Canvas helpers
│   └── App.jsx                  # Main application
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## License

MIT
