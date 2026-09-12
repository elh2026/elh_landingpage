import { sanityClient } from './client'
import type { CmsArticle, CmsArticleSummary, CmsProduct, CmsProductSummary } from './types'

const imageProjection = `{
  image {asset, crop, hotspot},
  alt,
  caption
}`

const productSummaryProjection = `{
  _id,
  title,
  "slug": slug.current,
  model,
  sku,
  shortDescription,
  mainImage ${imageProjection},
  "brand": brand->{name, "slug": slug.current},
  "categories": categories[]->{title, "slug": slug.current},
  "tags": tags[]->{title, socialHashtag}
}`

const articleSummaryProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage ${imageProjection},
  authorName,
  publishedAt,
  "category": category->{title, "slug": slug.current},
  "tags": tags[]->{title, socialHashtag}
}`

async function safeFetch<T>(query: string, params: Record<string, string> = {}, fallback: T): Promise<T> {
  try {
    return await sanityClient.fetch<T>(query, params)
  } catch (error) {
    console.error('Sanity published-content query failed', error)
    return fallback
  }
}

export const getPublishedProducts = () =>
  safeFetch<CmsProductSummary[]>(
    `*[_type == "product" && archived != true] | order(featured desc, _updatedAt desc) ${productSummaryProjection}`,
    {},
    [],
  )

export const getPublishedProductSlugs = () =>
  safeFetch<string[]>(`*[_type == "product" && archived != true && defined(slug.current)].slug.current`, {}, [])

export const getPublishedProduct = (slug: string) =>
  safeFetch<CmsProduct | null>(
    `*[_type == "product" && slug.current == $slug && archived != true][0] {
      _id,
      title,
      "slug": slug.current,
      model,
      sku,
      shortDescription,
      description,
      specifications,
      mainImage ${imageProjection},
      gallery[] ${imageProjection},
      downloads[]{_key, title, "url": file.asset->url},
      "brand": brand->{name, "slug": slug.current},
      "categories": categories[]->{title, "slug": slug.current},
      "tags": tags[]->{title, socialHashtag},
      "relatedProducts": relatedProducts[]->${productSummaryProjection},
      seo {
        metaTitle,
        metaDescription,
        canonicalUrl,
        noIndex,
        openGraphImage ${imageProjection}
      }
    }`,
    { slug },
    null,
  )

export const getPublishedArticles = () =>
  safeFetch<CmsArticleSummary[]>(
    `*[_type == "article"] | order(featured desc, publishedAt desc, _updatedAt desc) ${articleSummaryProjection}`,
    {},
    [],
  )

export const getFeaturedArticles = () =>
  safeFetch<CmsArticleSummary[]>(
    `*[_type == "article" && featured == true] | order(publishedAt desc, _updatedAt desc) ${articleSummaryProjection}`,
    {},
    [],
  )

export const getPublishedArticleSlugs = () =>
  safeFetch<string[]>(`*[_type == "article" && defined(slug.current)].slug.current`, {}, [])

export const getPublishedArticle = (slug: string) =>
  safeFetch<CmsArticle | null>(
    `*[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      coverImage ${imageProjection},
      body,
      authorName,
      publishedAt,
      "category": category->{title, "slug": slug.current},
      "tags": tags[]->{title, socialHashtag},
      seo {
        metaTitle,
        metaDescription,
        canonicalUrl,
        noIndex,
        openGraphImage ${imageProjection}
      }
    }`,
    { slug },
    null,
  )
