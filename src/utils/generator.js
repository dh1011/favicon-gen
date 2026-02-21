import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const sizes = [
    { name: 'favicon-16x16.png', width: 16, height: 16 },
    { name: 'favicon-32x32.png', width: 32, height: 32 },
    { name: 'apple-touch-icon.png', width: 180, height: 180 },
    { name: 'android-chrome-192x192.png', width: 192, height: 192 },
    { name: 'android-chrome-512x512.png', width: 512, height: 512 },
];

const mobileSizes = [
    { name: 'icon.png', width: 1024, height: 1024 },
    { name: 'adaptive-icon.png', width: 1024, height: 1024 },
    { name: 'splash-icon.png', width: 2048, height: 2048 },
    { name: 'favicon-32x32.png', width: 32, height: 32 }, // For favicon.ico
];

const firefoxSizes = [
    { name: 'firefox-16x16.png', width: 16, height: 16 },
    { name: 'firefox-32x32.png', width: 32, height: 32 },
    { name: 'firefox-48x48.png', width: 48, height: 48 },
    { name: 'firefox-64x64.png', width: 64, height: 64 },
    { name: 'firefox-128x128.png', width: 128, height: 128 },
];

export async function generateFavicons(imageFile) {
    const image = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Load image
    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = URL.createObjectURL(imageFile);
    });

    const generatedImages = [];

    for (const size of sizes) {
        canvas.width = size.width;
        canvas.height = size.height;

        // Better quality resizing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, size.width, size.height);

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        generatedImages.push({
            name: size.name,
            blob: blob,
            url: URL.createObjectURL(blob),
            width: size.width,
            height: size.height
        });
    }

    return generatedImages;
}

export async function generateMobileIcons(imageFile) {
    const image = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Load image
    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = URL.createObjectURL(imageFile);
    });

    const generatedImages = [];

    for (const size of mobileSizes) {
        canvas.width = size.width;
        canvas.height = size.height;

        // Better quality resizing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, size.width, size.height);

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        generatedImages.push({
            name: size.name,
            blob: blob,
            url: URL.createObjectURL(blob),
            width: size.width,
            height: size.height
        });
    }

    return generatedImages;
}

export async function downloadZip(generatedImages) {
    const zip = new JSZip();
    generatedImages.forEach(img => {
        zip.file(img.name, img.blob);
    });

    // Add a simple favicon.ico (copy of 32x32 for simplicity, this works in most modern browsers)
    // Converting to real ICO format is more complex, but a renamed PNG mostly works or we can add a simple header later.
    const icoImage = generatedImages.find(img => img.width === 32);
    if (icoImage) {
        zip.file("favicon.ico", icoImage.blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "favicons.zip");
}

export async function downloadMobileZip(generatedImages) {
    const zip = new JSZip();
    generatedImages.forEach(img => {
        zip.file(img.name, img.blob);
    });

    // Add favicon.ico (copy of 32x32 PNG)
    const icoImage = generatedImages.find(img => img.width === 32);
    if (icoImage) {
        zip.file("favicon.ico", icoImage.blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "mobile-icons.zip");
}

export async function generateFirefoxIcons(imageFile) {
    const image = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Load image
    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = URL.createObjectURL(imageFile);
    });

    const generatedImages = [];

    for (const size of firefoxSizes) {
        canvas.width = size.width;
        canvas.height = size.height;

        // Better quality resizing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, size.width, size.height);

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        generatedImages.push({
            name: size.name,
            blob: blob,
            url: URL.createObjectURL(blob),
            width: size.width,
            height: size.height
        });
    }

    return generatedImages;
}

export async function downloadFirefoxZip(generatedImages) {
    const zip = new JSZip();
    generatedImages.forEach(img => {
        zip.file(img.name, img.blob);
    });

    // Add favicon.ico (copy of 32x32 PNG)
    const icoImage = generatedImages.find(img => img.width === 32);
    if (icoImage) {
        zip.file("favicon.ico", icoImage.blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "firefox-icons.zip");
}
