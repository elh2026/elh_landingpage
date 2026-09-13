import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-09-12' }).withConfig({ perspective: 'raw' })

type LegacyDocument = {
  _id: string
  _type: 'product' | 'article'
  mainImage?: unknown
  coverImage?: unknown
  section?: string
  [key: string]: unknown
}
type Hook = { id: string; name: string; url: string; isDisabled: boolean }

async function run() {
  const hooks = await client.request<Hook[]>({ method: 'GET', url: '/hooks/projects/cm9sdebg' })
  const rebuildHook = hooks.find((hook) => hook.name === 'Cloudflare production rebuild')
  if (!rebuildHook) throw new Error('Cloudflare production rebuild webhook was not found.')

  const drafts = await client.fetch<LegacyDocument[]>(
    `*[_id in path("drafts.legacy-**") && _type in ["product", "article"]]`,
    {},
    { perspective: 'raw' },
  )
  const products = drafts.filter((document) => document._type === 'product')
  const articles = drafts.filter((document) => document._type === 'article')
  if (products.length !== 47 || articles.length !== 18) {
    throw new Error(`Expected 47 products and 18 articles, found ${products.length} and ${articles.length}.`)
  }
  if (drafts.some((document) => !(document._type === 'product' ? document.mainImage : document.coverImage))) {
    throw new Error('One or more legacy documents have no image.')
  }
  const hookWasEnabled = !rebuildHook.isDisabled
  if (hookWasEnabled) {
    await client.request({
      method: 'PATCH',
      url: `/hooks/projects/cm9sdebg/${rebuildHook.id}`,
      body: { isDisabledByUser: true },
    })
  }

  try {
    for (const document of drafts) {
      const publishedId = document._id.replace(/^drafts\./, '')
      const published: Record<string, unknown> & { _id: string; _type: 'product' | 'article' } = {
        ...document,
        _id: publishedId,
      }
      delete published._rev
      delete published._createdAt
      delete published._updatedAt
      if (document._type === 'article' && !published.section) published.section = 'news'
      await client.transaction().createOrReplace(published).delete(document._id).commit()
    }
  } finally {
    if (hookWasEnabled) {
      await client.request({
        method: 'PATCH',
        url: `/hooks/projects/cm9sdebg/${rebuildHook.id}`,
        body: { isDisabledByUser: false },
      })
    }
  }

  const response = await fetch(rebuildHook.url, { method: 'POST' })
  if (!response.ok) throw new Error(`Cloudflare rebuild hook returned HTTP ${response.status}.`)
  console.log(`Published ${products.length} products and ${articles.length} articles; requested one production rebuild.`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
