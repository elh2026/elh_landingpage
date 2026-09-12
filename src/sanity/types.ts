import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImageWithAlt {
  image: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    crop?: Record<string, number>
    hotspot?: Record<string, number>
  }
  alt: string
  caption?: string
}

export interface SeoFields {
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  openGraphImage?: SanityImageWithAlt
  noIndex?: boolean
}

export interface CmsProductSummary {
  _id: string
  title: string
  slug: string
  model?: string
  sku?: string
  shortDescription?: string
  mainImage: SanityImageWithAlt
  brand?: { name: string; slug: string }
  categories?: Array<{ title: string; slug: string }>
  tags?: Array<{ title: string; socialHashtag?: string }>
}

export interface CmsProduct extends CmsProductSummary {
  description?: PortableTextBlock[]
  specifications?: Array<{ _key: string; label: string; value: string }>
  gallery?: SanityImageWithAlt[]
  downloads?: Array<{ _key: string; title: string; url: string }>
  relatedProducts?: CmsProductSummary[]
  seo?: SeoFields
}

export interface CmsArticleSummary {
  _id: string
  title: string
  slug: string
  excerpt?: string
  coverImage: SanityImageWithAlt
  authorName?: string
  publishedAt?: string
  category?: { title: string; slug: string }
  tags?: Array<{ title: string; socialHashtag?: string }>
}

export interface CmsArticle extends CmsArticleSummary {
  body: PortableTextBlock[]
  seo?: SeoFields
}
