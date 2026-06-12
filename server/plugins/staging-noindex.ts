import { getRequestHost } from 'h3'
import { isStagingHost } from '~/utils/isStagingHost'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('site-config:init', ({ event, siteConfig }) => {
    if (!event) return

    const host = getRequestHost(event, { xForwardedHost: true })
    if (!isStagingHost(host)) return

    siteConfig.push({
      indexable: false,
      _context: 'navi-motors:staging-host',
    })
  })
})
