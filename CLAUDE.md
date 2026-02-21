# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite web application that generates favicon packages and mobile app icons from uploaded images. Users upload an image, crop it to square dimensions, and the app generates multiple favicon sizes (16x16, 32x32, 180x180, 192x192, 512x512), mobile app icons (1024x1024, 2048x2048, plus favicon), and Firefox-specific icons (16x16, 32x32, 48x48, 64x64, 128x128) plus a color palette extraction feature using ColorThief.

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (runs on http://localhost:5173 by default)
npm run dev

# Build for production (outputs to ./dist)
npm run build

# Preview production build
npm run preview

# Lint codebase
npm run lint
```

## Docker Commands

```bash
# Build and run with docker-compose (serves on http://localhost:1111)
docker-compose up

# Build only
docker build -t favicon-gen .

# Run pre-built image
docker run -p 1111:80 favicon-gen
```

The Dockerfile uses a multi-stage build: Node 18 Alpine for building, Nginx Alpine for serving the static build.

## Architecture

### Application Flow

1. **ImageUploader** → User selects image file
2. **ImageCropper** → Modal opens with react-easy-crop for square cropping
3. **App.handleCropComplete** → Processes cropped image:
   - Extracts color palette using ColorThief
   - Generates web favicons via `generateFavicons()`
   - Generates mobile app icons via `generateMobileIcons()`
   - Generates Firefox icons via `generateFirefoxIcons()` (all in parallel)
4. **ColorSchemeDisplay** → Shows extracted color palette
5. **IconPreview** → Displays generated icons with three download buttons
6. **downloadZip()** / **downloadMobileZip()** / **downloadFirefoxZip()** → Packages icons into separate ZIP files using JSZip

### Key Components

- **App.jsx**: Main orchestrator managing state flow (selectedImage → cropping → generation → preview). Manages web, mobile, and Firefox icon states.
- **ImageCropper.jsx**: Wraps react-easy-crop, handles rotation/zoom, calls `getCroppedImg()` from canvasUtils
- **ColorSchemeDisplay.jsx**: Displays color palette as visual swatches
- **IconPreview.jsx**: Grid preview of generated web icons with three download buttons (web, mobile, and Firefox)
- **ImageUploader.jsx**: Drag-and-drop + file picker interface

### Utilities

- **generator.js**:
  - `generateFavicons()`: Creates 5 standard favicon sizes from cropped image using canvas
  - `generateMobileIcons()`: Creates 4 mobile app icon sizes (icon.png, adaptive-icon.png, splash-icon.png, favicon-32x32.png)
  - `generateFirefoxIcons()`: Creates 5 Firefox-specific icon sizes (16, 32, 48, 64, 128px)
  - `downloadZip()`: Bundles web icons into favicons.zip, includes favicon.ico (copy of 32x32 PNG)
  - `downloadMobileZip()`: Bundles mobile icons into mobile-icons.zip, includes favicon.ico (copy of 32x32 PNG)
  - `downloadFirefoxZip()`: Bundles Firefox icons into firefox-icons.zip, includes favicon.ico (copy of 32x32 PNG)

- **canvasUtils.js**:
  - `getCroppedImg()`: Handles canvas-based image cropping with rotation/flip support
  - `createImage()`: Promise wrapper for Image loading
  - `getRotatedSize()`: Calculates bounding box for rotated images

### Design System

The app uses a minimal "zen" aesthetic with CSS custom properties for spacing, colors, and typography. All styling is inline within components rather than separate CSS modules.

## Key Technical Details

- **Image Processing**: All done client-side using HTML5 Canvas API
- **Color Extraction**: ColorThief library analyzes cropped image for 5-color palette
- **Icon Sizes**:
  - **Web Icons** (6 files in favicons.zip):
    - favicon-16x16.png, favicon-32x32.png
    - apple-touch-icon.png (180x180)
    - android-chrome-192x192.png, android-chrome-512x512.png
    - favicon.ico (alias of 32x32 PNG)
  - **Mobile App Icons** (5 files in mobile-icons.zip):
    - icon.png (1024x1024) - Standard app icon for React Native/Expo
    - adaptive-icon.png (1024x1024) - Android adaptive icon
    - splash-icon.png (2048x2048) - Splash screen icon
    - favicon-32x32.png (32x32)
    - favicon.ico (alias of 32x32 PNG)
  - **Firefox Icons** (6 files in firefox-icons.zip):
    - firefox-16x16.png (16x16) - Tab bar
    - firefox-32x32.png (32x32) - Tab bar (high-DPI)
    - firefox-48x48.png (48x48) - Bookmarks toolbar
    - firefox-64x64.png (64x64) - Windows taskbar shortcut
    - firefox-128x128.png (128x128) - Mozilla applications
    - favicon.ico (alias of 32x32 PNG)
- **Quality**: Canvas uses `imageSmoothingQuality: 'high'` for resizing
- **Export Format**: All icons are PNG; .ico file is a renamed PNG (works in modern browsers)
- **Performance**: Web, mobile, and Firefox icons are generated in parallel using Promise.all() for optimal speed

## Code Style

- ESLint configured with React Hooks and React Refresh plugins
- Unused vars allowed if they match pattern `^[A-Z_]` (constants/types)
- React 19 with functional components and hooks only
