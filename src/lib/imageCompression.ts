/**
 * Advanced Client-Side Saree & Product Image Compression Engine
 * Converts raw high-resolution saree photos (JPEG/PNG/HEIC) to optimized WebP
 * preserving fine metallic zari thread details while cutting file sizes by 75-90%.
 */

export interface CompressionResult {
  file: File;
  dataUrl: string;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  compressionRatioPercent: number;
  width: number;
  height: number;
  format: 'image/webp' | 'image/jpeg';
}

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0 (default 0.85 for visually lossless saree weave details)
  mimeType?: 'image/webp' | 'image/jpeg';
  filenamePrefix?: string;
}

/**
 * Compress an image file on client side using HTML5 Canvas API
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 1600,
    maxHeight = 2000,
    quality = 0.85,
    mimeType = 'image/webp',
    filenamePrefix = 'saree_opt_',
  } = options;

  const originalSizeBytes = file.size;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions respecting aspect ratio
        let { width, height } = img;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        // Draw onto HTML5 Canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get 2D canvas context'));
          return;
        }

        // High quality image smoothing for fine zari threads
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Export to WebP Data URL
        const dataUrl = canvas.toDataURL(mimeType, quality);

        // Convert Data URL to Blob / File
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas blob generation failed'));
              return;
            }

            const compressedSizeBytes = blob.size;
            const compressionRatioPercent = Math.max(
              0,
              Math.round(((originalSizeBytes - compressedSizeBytes) / originalSizeBytes) * 100)
            );

            const ext = mimeType === 'image/webp' ? 'webp' : 'jpg';
            const cleanName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
            const newFileName = `${filenamePrefix}${cleanName}_${Date.now()}.${ext}`;

            const compressedFile = new File([blob], newFileName, {
              type: mimeType,
              lastModified: Date.now(),
            });

            resolve({
              file: compressedFile,
              dataUrl,
              originalSizeBytes,
              compressedSizeBytes,
              compressionRatioPercent,
              width,
              height,
              format: mimeType,
            });
          },
          mimeType,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image into memory'));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read input file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Dual variant generator: Generates both a thumbnail (600px) and a full detail view (1600px)
 */
export async function generateDualSareeVariants(file: File): Promise<{
  hero: CompressionResult;
  thumbnail: CompressionResult;
}> {
  const [hero, thumbnail] = await Promise.all([
    compressImage(file, {
      maxWidth: 1600,
      maxHeight: 2000,
      quality: 0.86,
      filenamePrefix: 'hero_',
    }),
    compressImage(file, {
      maxWidth: 600,
      maxHeight: 800,
      quality: 0.80,
      filenamePrefix: 'thumb_',
    }),
  ]);

  return { hero, thumbnail };
}

/**
 * Format bytes to readable MB/KB string
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
