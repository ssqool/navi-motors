import type { RouterConfig } from '@nuxt/schema'
import { headerScrollOffset } from '~/utils/headerScrollOffset'

export default {
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: headerScrollOffset(),
      }
    }

    return { top: 0, left: 0 }
  },
} satisfies RouterConfig
