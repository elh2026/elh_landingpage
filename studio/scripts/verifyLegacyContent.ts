import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2025-02-19' }).withConfig({ perspective: 'raw' })

async function run() {
  const documents = await client.fetch<Array<{ _id: string; _type: string; imageAssetId?: string; title?: string }>>(
    `*[]{
      _id,
      _type,
      title,
      "imageAssetId": coalesce(mainImage.image.asset->_id, coverImage.image.asset->_id)
    }`,
    {},
    { perspective: 'raw' },
  )

  const products = documents.filter(
    (document) => document._type === 'product' && document._id.startsWith('drafts.legacy-product-'),
  )
  const articles = documents.filter(
    (document) => document._type === 'article' && document._id.startsWith('drafts.legacy-article-'),
  )
  const migratedDocuments = [...products, ...articles]
  const missingImageReferences = migratedDocuments.filter((document) => !document.imageAssetId)
  const imageAssets = documents.filter((document) => document._type === 'sanity.imageAsset').length
  const brands = await client.fetch<number>('count(*[_type == "brand"])')
  const categories = await client.fetch<number>('count(*[_type == "category"])')

  console.log(
    JSON.stringify(
      {
        products: products.length,
        articles: articles.length,
        imageAssets,
        brands,
        categories,
        missingImageReferences: missingImageReferences.map((document) => document._id),
      },
      null,
      2,
    ),
  )

  if (products.length !== 47 || articles.length !== 18 || imageAssets !== 64 || missingImageReferences.length) {
    throw new Error('Legacy migration verification failed.')
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
