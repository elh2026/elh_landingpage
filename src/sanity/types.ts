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
  section?: 'news' | 'recruitment'
  featured?: boolean
  category?: { title: string; slug: string }
  tags?: Array<{ title: string; socialHashtag?: string }>
}

export interface CmsService {
  _id: string
  title: string
  slug: string
  summary?: string
  body?: PortableTextBlock[]
  mainImage?: SanityImageWithAlt
  ctaLabel?: string
  featured?: boolean
}

export interface CmsHeroSlide {
  _key: string
  title?: string
  description?: string
  image?: SanityImageWithAlt
  ctaLabel?: string
  ctaHref?: string
}

export interface CmsHomePage {
  _id: string
  heroSlides?: CmsHeroSlide[]
  introTitle?: string
  introText?: string
  introLogo?: SanityImageWithAlt
  introImages?: SanityImageWithAlt[]
  productsTitle?: string
  servicesTitle?: string
  articlesTitle?: string
  contactTitle?: string
  featuredServices?: CmsService[]
}

export interface CmsAboutPage {
  _id: string
  heroTitle?: string
  heroImage?: SanityImageWithAlt
  title?: string
  lead?: string
  body?: PortableTextBlock[]
  gallery?: SanityImageWithAlt[]
  capabilities?: Array<{ _key: string; title: string; description?: string }>
}

export interface CmsServicesPage {
  _id: string
  heroTitle?: string
  heroImage?: SanityImageWithAlt
  title?: string
  intro?: string
  services?: CmsService[]
}

export interface CmsContactPage {
  _id: string
  heroTitle?: string
  heroImage?: SanityImageWithAlt
  formTitle?: string
  formDescription?: string
  mapEmbedUrl?: string
  brandsTitle?: string
  brands?: Array<{ _id: string; name: string; logo?: SanityImageWithAlt; website?: string }>
}

export interface CmsSiteSettings {
  _id: string
  companyName?: string
  contactEmail?: string
  salesEmail?: string
  contactPhone?: string
  address?: string
  mapsUrl?: string
  facebookUrl?: string
  youtubeUrl?: string
  topTags?: string[]
  salesPolicies?: string[]
  copyrightText?: string
}

export interface CmsArticle extends CmsArticleSummary {
  body: PortableTextBlock[]
  seo?: SeoFields
}
