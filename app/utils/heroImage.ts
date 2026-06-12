/** Build responsive WebP srcset for hero JPG paths in public/images/gallery/ */
export function heroWebpSrcSet(jpgSrc: string): string | undefined {
  if (!/\.jpe?g$/i.test(jpgSrc)) return undefined

  const base = jpgSrc.replace(/\.jpe?g$/i, '')
  return `${base}-640.webp 640w, ${base}-900.webp 900w, ${base}.webp 1024w`
}

export function heroWebpSrc(jpgSrc: string): string | undefined {
  if (!/\.jpe?g$/i.test(jpgSrc)) return undefined
  return jpgSrc.replace(/\.jpe?g$/i, '-900.webp')
}
