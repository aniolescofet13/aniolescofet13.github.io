import type { ImageMetadata } from 'astro';

// Every image under src/assets, keyed by its path relative to that folder.
// Content files reference images as plain strings ("LapTime/P9 - Web Run.png");
// this turns the string back into an imported, optimisable asset.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{png,jpg,jpeg,webp,avif,gif}',
  { eager: true },
);

const byPath = new Map<string, ImageMetadata>(
  Object.entries(files).map(([k, v]) => [k.replace('/src/assets/', ''), v.default]),
);

export function resolveImage(path: string): ImageMetadata {
  const img = byPath.get(path);
  if (!img) {
    // fail the build rather than ship a hole in the page
    throw new Error(`Image not found in src/assets: "${path}"`);
  }
  return img;
}
