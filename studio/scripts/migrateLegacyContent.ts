import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'

import { getCliClient } from 'sanity/cli'
import ts from 'typescript'

type LegacyProduct = {
  title: string
  model?: string
  details: string[]
  imagePath: string
  brand: string
  categoryId: string
}

type LegacyArticle = {
  title: string
  excerpt: string
  imagePath: string
  featured: boolean
  categoryId: string
}

const apiVersion = '2025-02-19'
const client = getCliClient({ apiVersion })
const studioRoot = process.cwd()
const repositoryRoot = resolve(studioRoot, '..')
const dryRun = process.argv.includes('--dry-run')

const sourceFiles = {
  products: resolve(repositoryRoot, 'src/modules/ProductsPage/index.tsx'),
  technology: resolve(repositoryRoot, 'src/modules/HomePage/PoweredByTech.tsx'),
  news: resolve(repositoryRoot, 'src/modules/NewsNEventPage/ListNews.tsx'),
  featured: resolve(repositoryRoot, 'src/modules/FeaturedNewsPage/ListNews.tsx'),
}

function evaluateLiteral(node: ts.Expression): unknown {
  if (ts.isStringLiteralLike(node)) return node.text
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (node.kind === ts.SyntaxKind.NullKeyword) return null
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (ts.isArrayLiteralExpression(node))
    return node.elements.map((element) => evaluateLiteral(element as ts.Expression))
  if (ts.isObjectLiteralExpression(node)) {
    return Object.fromEntries(
      node.properties.flatMap((property) => {
        if (!ts.isPropertyAssignment(property)) return []
        const key =
          ts.isIdentifier(property.name) || ts.isStringLiteralLike(property.name) ? property.name.text : undefined
        return key ? [[key, evaluateLiteral(property.initializer)]] : []
      }),
    )
  }
  throw new Error(`Unsupported legacy data expression: ${ts.SyntaxKind[node.kind]}`)
}

function readArray(filePath: string, variableName: string): Array<Record<string, unknown>> {
  const source = ts.createSourceFile(
    filePath,
    readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  let result: Array<Record<string, unknown>> | undefined

  const visit = (node: ts.Node) => {
    if (
      !result &&
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === variableName &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      result = evaluateLiteral(node.initializer) as Array<Record<string, unknown>>
      return
    }
    ts.forEachChild(node, visit)
  }

  visit(source)
  if (!result) throw new Error(`Could not find array ${variableName} in ${filePath}`)
  return result
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80)
}

function asString(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function textBlock(text: string, key: string) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
  }
}

const baseProductData = readArray(sourceFiles.products, 'data')
const cutflexData = readArray(sourceFiles.technology, 'cutflex')
const tempcoData = readArray(sourceFiles.technology, 'tempco')
const meiheData = readArray(sourceFiles.technology, 'meihe')
const newsData = readArray(sourceFiles.news, 'data')
const featuredData = readArray(sourceFiles.featured, 'data')

const products: LegacyProduct[] = [
  ...baseProductData.map((item) => {
    const title = asString(item.name)
    const model = asString(item.model)
    return {
      title,
      model,
      details: model ? [`Mã sản phẩm / Model: ${model}`] : [],
      imagePath: asString(item.image),
      brand: title.toLowerCase().startsWith('lowara') ? 'Lowara' : 'GRACO',
      categoryId: 'category-pumps',
    }
  }),
  ...tempcoData.map((item) => ({
    title: asString(item.name),
    details: asStringArray(item.details),
    imagePath: asString(item.img),
    brand: 'Tempco',
    categoryId: 'category-instrumentation',
  })),
  ...cutflexData.map((item, index) => {
    const title = asString(item.title)
    return {
      title,
      details: asStringArray(item.info),
      imagePath: `/images/CutFlex/sp-web-elh-0${index + 1}.jpg`,
      brand: title.includes('SharkFlex') ? 'SharkFlex' : 'CutFlex',
      categoryId: 'category-abrasives',
    }
  }),
  ...meiheData.map((item) => ({
    title: asString(item.name),
    model: asString(item.model),
    details: asStringArray(item.details),
    imagePath: asString(item.img),
    brand: 'Meihe',
    categoryId: 'category-flowmeters',
  })),
]

const articles: LegacyArticle[] = [
  ...newsData.map((item, index) => ({
    title: asString(item.title),
    excerpt: asString(item.text),
    imagePath: `/images/news/news-${index + 1}.png`,
    featured: false,
    categoryId: 'category-news',
  })),
  ...featuredData.map((item, index) => ({
    title: asString(item.title),
    excerpt: 'Chứng nhận và tài liệu nổi bật của ELH.',
    imagePath: `/images/featured/featured-${index + 1}.png`,
    featured: true,
    categoryId: 'category-certificates',
  })),
]

const brands = ['Lowara', 'GRACO', 'Tempco', 'CutFlex', 'SharkFlex', 'Meihe'].map((name) => ({
  _id: `brand-${slugify(name)}`,
  _type: 'brand',
  name,
  slug: { _type: 'slug', current: slugify(name) },
}))

const categories = [
  { _id: 'category-pumps', title: 'Bơm và thiết bị công nghiệp', slug: 'bom-va-thiet-bi-cong-nghiep' },
  { _id: 'category-instrumentation', title: 'Thiết bị đo lường', slug: 'thiet-bi-do-luong' },
  { _id: 'category-abrasives', title: 'Đá cắt và vật tư tiêu hao', slug: 'da-cat-va-vat-tu-tieu-hao' },
  { _id: 'category-flowmeters', title: 'Lưu lượng kế', slug: 'luu-luong-ke' },
  { _id: 'category-news', title: 'Tin tức và tư vấn', slug: 'tin-tuc-va-tu-van' },
  { _id: 'category-certificates', title: 'Chứng nhận', slug: 'chung-nhan' },
].map((category) => ({
  _id: category._id,
  _type: 'category',
  title: category.title,
  slug: { _type: 'slug', current: category.slug },
}))

const uniqueImagePaths = [
  ...new Set([...products.map((item) => item.imagePath), ...articles.map((item) => item.imagePath)]),
]
const missingImages = uniqueImagePaths.filter(
  (webPath) => !existsSync(resolve(repositoryRoot, 'public', webPath.replace(/^\//, ''))),
)

console.log(
  JSON.stringify(
    {
      mode: dryRun ? 'dry-run' : 'import',
      products: products.length,
      articles: articles.length,
      brands: brands.length,
      categories: categories.length,
      uniqueImages: uniqueImagePaths.length,
      missingImages,
    },
    null,
    2,
  ),
)

if (missingImages.length) throw new Error('Migration stopped because one or more source images are missing.')
if (dryRun) process.exit(0)

const assetIds = new Map<string, string>()

async function getOrUploadImage(webPath: string) {
  const cached = assetIds.get(webPath)
  if (cached) return cached

  const sourceId = `elh-legacy:${webPath}`
  const existingId = await client.fetch<string | null>(
    '*[_type == "sanity.imageAsset" && source.id == $sourceId][0]._id',
    { sourceId },
  )
  if (existingId) {
    assetIds.set(webPath, existingId)
    console.log(`reuse ${webPath}`)
    return existingId
  }

  const absolutePath = resolve(repositoryRoot, 'public', webPath.replace(/^\//, ''))
  const asset = await client.assets.upload('image', createReadStream(absolutePath), {
    filename: basename(absolutePath),
    source: { id: sourceId, name: 'ELH legacy website', url: `https://elh.vn${webPath}` },
  })
  assetIds.set(webPath, asset._id)
  console.log(`upload ${webPath}`)
  return asset._id
}

async function createIfMissing(document: { _id: string; _type: string; [key: string]: unknown }) {
  const result = await client.createIfNotExists(document)
  console.log(`document ${result._id}`)
}

async function run() {
  for (const brand of brands) await createIfMissing(brand)
  for (const category of categories) await createIfMissing(category)

  for (const [index, product] of products.entries()) {
    const group =
      index < baseProductData.length
        ? 'core'
        : index < baseProductData.length + tempcoData.length
          ? 'tempco'
          : index < baseProductData.length + tempcoData.length + cutflexData.length
            ? 'cutflex'
            : 'meihe'
    const uniquePart = product.model || `${product.title}-${index + 1}`
    const assetId = await getOrUploadImage(product.imagePath)
    const shortDescription = product.details.join(' ').slice(0, 320)

    await createIfMissing({
      _id: `drafts.legacy-product-${group}-${slugify(uniquePart)}`,
      _type: 'product',
      title: product.title,
      slug: { _type: 'slug', current: slugify(`${product.brand}-${uniquePart}`) },
      model: product.model || undefined,
      shortDescription: shortDescription || undefined,
      description: product.details.map((detail, detailIndex) => textBlock(detail, `detail-${detailIndex + 1}`)),
      mainImage: {
        _type: 'imageWithAlt',
        image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
        alt: product.title.slice(0, 160),
      },
      brand: { _type: 'reference', _ref: `brand-${slugify(product.brand)}` },
      categories: [{ _key: 'legacy-category', _type: 'reference', _ref: product.categoryId }],
      featured: false,
      archived: false,
      seo: {
        _type: 'seo',
        metaTitle: product.title.slice(0, 60),
        metaDescription: shortDescription.slice(0, 160) || undefined,
        noIndex: false,
      },
    })
  }

  for (const [index, article] of articles.entries()) {
    const group = article.featured ? 'featured' : 'news'
    const number = String(index + 1).padStart(2, '0')
    const assetId = await getOrUploadImage(article.imagePath)

    await createIfMissing({
      _id: `drafts.legacy-article-${group}-${number}`,
      _type: 'article',
      title: article.title,
      slug: { _type: 'slug', current: `${slugify(article.title)}-${number}`.slice(0, 96) },
      excerpt: article.excerpt.slice(0, 320),
      coverImage: {
        _type: 'imageWithAlt',
        image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
        alt: article.title.slice(0, 160),
      },
      body: [textBlock(article.excerpt, 'legacy-summary')],
      category: { _type: 'reference', _ref: article.categoryId },
      authorName: 'ELH',
      featured: article.featured,
      seo: {
        _type: 'seo',
        metaTitle: article.title.slice(0, 60),
        metaDescription: article.excerpt.slice(0, 160),
        noIndex: false,
      },
    })
  }

  console.log(`Migration complete: ${products.length} draft products, ${articles.length} draft articles.`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
