/** Vercel staging / preview hostnames — must not be indexed (see server/plugins/staging-noindex.ts). */
export function isStagingHost(host: string): boolean {
  const hostname = host.toLowerCase().split(':')[0] ?? host
  return hostname.endsWith('.vercel.app')
}

export function hostnameFromOrigin(origin: string): string {
  try {
    return new URL(origin).hostname
  }
  catch {
    return ''
  }
}
