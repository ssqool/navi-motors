import sharp from 'sharp'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const galleryDir = fileURLToPath(new URL('../public/images/gallery/', import.meta.url))
const widths = [640, 900, 1024]

const jpgs = readdirSync(galleryDir).filter((name) => /\.jpe?g$/i.test(name))

for (const file of jpgs) {
  const src = join(galleryDir, file)
  const base = src.replace(/\.jpe?g$/i, '')

  for (const width of widths) {
    const suffix = width === 1024 ? '' : `-${width}`
    const out = `${base}${suffix}.webp`
    await sharp(src)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out)
    console.log(`${file} → ${out.split('/').pop()} (${statSync(out).size} bytes)`)
  }
}
