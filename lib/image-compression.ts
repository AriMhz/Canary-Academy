/**
 * Image Compression and WebP Conversion Utility
 * Automatically resizes and converts images to WebP format with high quality and low file size.
 * Prevents Vercel 413 "Payload Too Large" / "Section too large" errors.
 */

export interface CompressionOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  maxSizeBytes?: number
}

export interface CompressionResult {
  dataUrl: string
  format: 'webp' | 'jpeg'
  originalSizeKB: number
  compressedSizeKB: number
  savedPercent: number
  width: number
  height: number
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
}

/**
 * Calculates byte size of a base64 Data URL
 */
export function getBase64Size(dataUrl: string): number {
  if (!dataUrl) return 0
  const base64Index = dataUrl.indexOf(';base64,')
  if (base64Index === -1) {
    return dataUrl.length
  }
  const base64String = dataUrl.substring(base64Index + 8)
  const padding = (base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0)
  return Math.max(0, Math.round((base64String.length * 3) / 4 - padding))
}

/**
 * Compresses an image File, Blob, or base64 Data URL and converts it to WebP format.
 */
export async function compressImageToWebP(
  input: File | Blob | string,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.8,
    maxSizeBytes = 180 * 1024, // 180 KB target max
  } = options

  return new Promise((resolve, reject) => {
    let originalSize = 0
    let srcUrl = ''
    let isObjectUrl = false

    if (typeof input === 'string') {
      originalSize = getBase64Size(input)
      srcUrl = input
    } else if (input instanceof Blob || input instanceof File) {
      originalSize = input.size
      srcUrl = URL.createObjectURL(input)
      isObjectUrl = true
    } else {
      return reject(new Error('Invalid image input'))
    }

    const cleanup = () => {
      if (isObjectUrl && srcUrl) {
        URL.revokeObjectURL(srcUrl)
      }
    }

    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      try {
        let width = img.naturalWidth || img.width
        let height = img.naturalHeight || img.height

        // Calculate aspect-ratio scaling
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          cleanup()
          return reject(new Error('Could not create canvas 2D context'))
        }

        // Enable high-quality smoothing
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)

        // Try converting to image/webp
        let format: 'webp' | 'jpeg' = 'webp'
        let currentQuality = quality
        let dataUrl = canvas.toDataURL('image/webp', currentQuality)

        // Fallback for browsers that do not support WebP canvas export
        if (!dataUrl.startsWith('data:image/webp')) {
          format = 'jpeg'
          dataUrl = canvas.toDataURL('image/jpeg', currentQuality)
        }

        // Iteratively lower quality if still above maxSizeBytes
        let attempts = 0
        while (
          getBase64Size(dataUrl) > maxSizeBytes &&
          currentQuality > 0.4 &&
          attempts < 5
        ) {
          currentQuality = Math.max(0.35, currentQuality - 0.12)
          attempts++
          dataUrl = canvas.toDataURL(`image/${format}`, currentQuality)
        }

        const compressedSize = getBase64Size(dataUrl)
        const savedPercent =
          originalSize > 0
            ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
            : 0

        cleanup()
        resolve({
          dataUrl,
          format,
          originalSizeKB: Math.round(originalSize / 1024),
          compressedSizeKB: Math.round(compressedSize / 1024),
          savedPercent,
          width,
          height,
        })
      } catch (err) {
        cleanup()
        reject(err)
      }
    }

    img.onerror = (err) => {
      cleanup()
      reject(new Error('Failed to load image for compression'))
    }

    img.src = srcUrl
  })
}

/**
 * Optimizes an array of items (such as gallery images) by converting any
 * heavy or non-WebP base64 images into WebP.
 */
export async function optimizeImageList<T extends { image?: string }>(
  items: T[],
  options?: CompressionOptions
): Promise<{ items: T[]; optimizedCount: number }> {
  let optimizedCount = 0

  const updatedItems = await Promise.all(
    items.map(async (item) => {
      if (
        item.image &&
        item.image.startsWith('data:image/') &&
        (!item.image.startsWith('data:image/webp') || getBase64Size(item.image) > (options?.maxSizeBytes || 180 * 1024))
      ) {
        try {
          const res = await compressImageToWebP(item.image, options)
          optimizedCount++
          return { ...item, image: res.dataUrl }
        } catch (e) {
          console.warn('Failed to auto-optimize image:', e)
          return item
        }
      }
      return item
    })
  )

  return { items: updatedItems, optimizedCount }
}
