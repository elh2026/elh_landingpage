import { defineEnableDraftMode } from 'next-sanity/draft-mode'

import { sanityClient } from '@/sanity/client'

const token = process.env.SANITY_API_READ_TOKEN

const handler = token
  ? defineEnableDraftMode({ client: sanityClient.withConfig({ token }) }).GET
  : async () => new Response('Preview is not configured', { status: 503 })

export const GET = handler
