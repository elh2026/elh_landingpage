import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-09-12' }).withConfig({ perspective: 'raw' })

type LegacyDocument = {
  _id: string
  _type: 'product' | 'article'
  mainImage?: unknown
  coverImage?: unknown
}

async function run() {
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
  console.log('Legacy documents are verified and ready for controlled publishing.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
