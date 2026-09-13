import { createClient } from 'next-sanity'

import { sanityConfig } from './config'

export const sanityClient = createClient({
  ...sanityConfig,
  useCdn: false,
  perspective: 'published',
  stega: {
    enabled: process.env.ELH_PREVIEW_BUILD === 'true',
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://admin.elh.vn',
  },
})
