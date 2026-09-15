import { draftMode } from 'next/headers'
import { sanityClient } from './client'
import type {
  CmsAboutPage,
  CmsArticle,
  CmsArticleSummary,
  CmsContactPage,
  CmsHomePage,
  CmsProduct,
  CmsProductSummary,
  CmsServicesPage,
  CmsSiteSettings,
} from './types'

const imageProjection = `{image {asset, crop, hotspot}, alt, caption}`
const productSummaryProjection = `{_id,title,"slug":slug.current,model,sku,shortDescription,mainImage ${imageProjection},"brand":brand->{name,"slug":slug.current},"categories":categories[]->{title,"slug":slug.current},"tags":tags[]->{title,socialHashtag}}`
const articleSummaryProjection = `{_id,title,"slug":slug.current,excerpt,coverImage ${imageProjection},authorName,publishedAt,section,featured,"category":category->{title,"slug":slug.current},"tags":tags[]->{title,socialHashtag}}`
const serviceProjection = `{_id,title,"slug":slug.current,summary,body,mainImage ${imageProjection},ctaLabel,featured}`

async function safeFetch<T>(query: string, params: Record<string, string> = {}, fallback: T): Promise<T> {
  try {
    const previewBuild = process.env.ELH_PREVIEW_BUILD === 'true'
    const isDraft = previewBuild ? (await draftMode()).isEnabled : false
    return await sanityClient
      .withConfig({
        useCdn: !isDraft,
        token: isDraft ? process.env.SANITY_API_READ_TOKEN : undefined,
        perspective: isDraft ? 'drafts' : 'published',
        stega: { enabled: isDraft, studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://admin.elh.vn' },
      })
      .fetch<T>(query, params)
  } catch (error) {
    console.error('Sanity content query failed', error)
    return fallback
  }
}

export const getPublishedProducts = () =>
  safeFetch<CmsProductSummary[]>(
    `*[_type == "product" && archived != true] | order(featured desc,_updatedAt desc) ${productSummaryProjection}`,
    {},
    [],
  )
export const getPublishedProductSlugs = () =>
  safeFetch<string[]>(`*[_type == "product" && archived != true && defined(slug.current)].slug.current`, {}, [])
export const getPublishedProduct = (slug: string) =>
  safeFetch<CmsProduct | null>(
    `*[_type == "product" && slug.current == $slug && archived != true][0]{_id,title,"slug":slug.current,model,sku,shortDescription,description,specifications,mainImage ${imageProjection},gallery[] ${imageProjection},downloads[]{_key,title,"url":file.asset->url},"brand":brand->{name,"slug":slug.current},"categories":categories[]->{title,"slug":slug.current},"tags":tags[]->{title,socialHashtag},"relatedProducts":relatedProducts[]->${productSummaryProjection},seo{metaTitle,metaDescription,canonicalUrl,noIndex,openGraphImage ${imageProjection}}}`,
    { slug },
    null,
  )

export const getPublishedArticles = () =>
  safeFetch<CmsArticleSummary[]>(
    `*[_type == "article" && coalesce(section,"news") == "news" && coalesce(featured,false) != true] | order(publishedAt desc,_updatedAt desc) ${articleSummaryProjection}`,
    {},
    [],
  )
export const getFeaturedArticles = () =>
  safeFetch<CmsArticleSummary[]>(
    `*[_type == "article" && featured == true && coalesce(section,"news") == "news"] | order(publishedAt desc,_updatedAt desc) ${articleSummaryProjection}`,
    {},
    [],
  )
export const getRecruitmentArticles = () =>
  safeFetch<CmsArticleSummary[]>(
    `*[_type == "article" && section == "recruitment"] | order(publishedAt desc,_updatedAt desc) ${articleSummaryProjection}`,
    {},
    [],
  )
export const getPublishedArticleSlugs = () =>
  safeFetch<string[]>(`*[_type == "article" && defined(slug.current)].slug.current`, {}, [])
export const getPublishedArticle = (slug: string) =>
  safeFetch<CmsArticle | null>(
    `*[_type == "article" && slug.current == $slug][0]{_id,title,"slug":slug.current,excerpt,coverImage ${imageProjection},body,authorName,publishedAt,section,featured,"category":category->{title,"slug":slug.current},"tags":tags[]->{title,socialHashtag},seo{metaTitle,metaDescription,canonicalUrl,noIndex,openGraphImage ${imageProjection}}}`,
    { slug },
    null,
  )

export const getSiteSettings = () => safeFetch<CmsSiteSettings | null>(`*[_id == "siteSettings"][0]`, {}, null)
export const getHomePage = () =>
  safeFetch<CmsHomePage | null>(
    `*[_id == "homePage"][0]{_id,heroSlides[]{_key,title,description,image ${imageProjection},ctaLabel,ctaHref},introTitle,introText,introLogo ${imageProjection},introImages[] ${imageProjection},productsTitle,servicesTitle,articlesTitle,contactTitle,"featuredServices":featuredServices[]->${serviceProjection}}`,
    {},
    null,
  )
export const getAboutPage = () =>
  safeFetch<CmsAboutPage | null>(
    `*[_id == "aboutPage"][0]{_id,heroTitle,heroImage ${imageProjection},title,lead,body,gallery[] ${imageProjection},capabilities}`,
    {},
    null,
  )
export const getServicesPage = () =>
  safeFetch<CmsServicesPage | null>(
    `*[_id == "servicesPage"][0]{_id,heroTitle,heroImage ${imageProjection},title,intro,"services":serviceOrder[]->${serviceProjection}}`,
    {},
    null,
  )
export const getContactPage = () =>
  safeFetch<CmsContactPage | null>(
    `*[_id == "contactPage"][0]{_id,heroTitle,heroImage ${imageProjection},formTitle,formDescription,mapEmbedUrl,brandsTitle,"brands":brands[]->{_id,name,website,logo ${imageProjection}}}`,
    {},
    null,
  )
