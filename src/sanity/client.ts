import { createClient } from '@sanity/client'

import { sanityConfig } from './config'

export const sanityClient = createClient({
  ...sanityConfig,
  useCdn: false,
  perspective: 'published',
})
