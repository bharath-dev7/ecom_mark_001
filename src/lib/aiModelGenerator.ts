import { compressImage, CompressionResult } from '@/lib/imageCompression';

export interface AIModelGenOptions {
  sareeName?: string;
  fabric: string;
  color: string;
  occasion?: string;
  modelStyle: 'royal-bride' | 'festive-classic' | 'modern-chic' | 'heritage-temple';
  backdrop: 'haveli' | 'gold-studio' | 'palace-arch' | 'temple-pillars';
  pose: 'full-standing' | 'side-pallu' | 'seated-portrait';
  customSeed?: number;
}

export const MODEL_STYLE_OPTIONS = [
  { id: 'royal-bride', label: '👑 Royal Indian Bride (Opulent Zari & Jewelry)' },
  { id: 'festive-classic', label: '🥻 Festive Classic (Elegant Traditional Grace)' },
  { id: 'modern-chic', label: '✨ Modern Minimalist (High-Fashion Editorial)' },
  { id: 'heritage-temple', label: '🛕 Temple Heritage (Authentic Handloom Vibe)' },
];

export const BACKDROP_OPTIONS = [
  { id: 'haveli', label: '🏛️ Heritage Haveli Courtyard' },
  { id: 'gold-studio', label: '🌟 Warm Luxury Gold Studio' },
  { id: 'palace-arch', label: '🏰 Royal Palace Carved Archway' },
  { id: 'temple-pillars', label: '🛕 Ancient Stone Pillars' },
];

export const POSE_OPTIONS = [
  { id: 'full-standing', label: '💃 Full Length Standing Drape' },
  { id: 'side-pallu', label: '✨ Side Angle (Pallu Zari Focus)' },
  { id: 'seated-portrait', label: '👑 Seated Royal Portrait' },
];

/**
 * Constructs an optimized AI fashion prompt for sarees
 */
export function buildSareePrompt(options: AIModelGenOptions): string {
  const { fabric, color, modelStyle, backdrop, pose } = options;

  let styleDesc = 'graceful Indian woman model wearing a luxury royal saree';
  if (modelStyle === 'royal-bride') {
    styleDesc = 'stunning royal Indian bride with intricate gold temple jewelry and heavy kohl eyes, wearing a royal wedding saree';
  } else if (modelStyle === 'festive-classic') {
    styleDesc = 'beautiful Indian woman smiling gracefully, wearing a festive handloom saree';
  } else if (modelStyle === 'modern-chic') {
    styleDesc = 'chic fashion-forward Indian model in a minimalist high-fashion vogue portrait, wearing a sleek silk saree';
  } else if (modelStyle === 'heritage-temple') {
    styleDesc = 'authentic traditional South Indian lady wearing a pure heritage handloom saree';
  }

  let poseDesc = 'draped in full standing pose showcasing the intricate zari pallu and pleats';
  if (pose === 'side-pallu') {
    poseDesc = 'in a side pose emphasizing the rich golden zari pallu flowing over her shoulder';
  } else if (pose === 'seated-portrait') {
    poseDesc = 'seated gracefully in a royal chair showing the gorgeous saree fabric texture';
  }

  let backdropDesc = 'in a luxurious maroon and gold heritage haveli background';
  if (backdrop === 'gold-studio') {
    backdropDesc = 'against a warm golden glowing minimalist studio backdrop';
  } else if (backdrop === 'palace-arch') {
    backdropDesc = 'framed by an ancient carved marble palace archway with soft warm sunlight';
  } else if (backdrop === 'temple-pillars') {
    backdropDesc = 'standing near ancient hand-carved temple stone pillars';
  }

  return `High fashion professional studio photography of a ${styleDesc} in rich ${color} shade with golden zari weaving, made of genuine ${fabric} fabric, ${poseDesc}, ${backdropDesc}, ultra photorealistic, 8k resolution, cinematic lighting, sharp detail on saree embroidery, vogue cover quality.`;
}

/**
 * Generate a free AI model image using Pollinations/Free AI inference engine
 * and automatically compress to WebP format.
 */
export async function generateAIModelImage(
  options: AIModelGenOptions
): Promise<CompressionResult> {
  const prompt = buildSareePrompt(options);
  const seed = options.customSeed || Math.floor(Math.random() * 1000000);
  const width = 1200;
  const height = 1600;

  // 1. Build Free AI Pollinations Image URL
  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true`;

  try {
    // 2. Fetch the generated AI image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`AI generation service responded with status ${response.status}`);
    }

    const blob = await response.blob();
    const fileName = `ai_model_${options.fabric.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.jpg`;
    const file = new File([blob], fileName, { type: blob.type || 'image/jpeg' });

    // 3. Automatically compress generated image to WebP using our compressor engine
    const compressed = await compressImage(file, {
      maxWidth: 1400,
      maxHeight: 1800,
      quality: 0.85,
      mimeType: 'image/webp',
      filenamePrefix: 'ai_saree_model_',
    });

    return compressed;
  } catch (err) {
    console.error('Error generating AI model image:', err);
    throw new Error('Failed to generate AI model image. Please try clicking Generate again.');
  }
}
