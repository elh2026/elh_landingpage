import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ArticleDetail from '@/modules/CmsContent/ArticleDetail'
import { urlFor } from '@/sanity/image'
import { getPublishedArticle, getPublishedArticleSlugs } from '@/sanity/queries'

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getPublishedArticleSlugs()
  const buildSlugs = slugs.length ? slugs : ['_cms-placeholder']
  return buildSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getPublishedArticle(slug)
  if (!article) return { title: 'Tin tức' }

  const title = article.seo?.metaTitle || `${article.title} | ELH`
  const description = article.seo?.metaDescription || article.excerpt
  const socialImage = article.seo?.openGraphImage || article.coverImage
  const imageUrl = socialImage?.image?.asset
    ? urlFor(socialImage.image).width(1200).height(630).fit('crop').auto('format').url()
    : undefined

  return {
    title,
    description,
    alternates: { canonical: article.seo?.canonicalUrl || `https://elh.vn/news/${article.slug}/` },
    robots: article.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'article',
      title,
      description,
      url: `https://elh.vn/news/${article.slug}/`,
      publishedTime: article.publishedAt,
      images: imageUrl ? [{ url: imageUrl, alt: socialImage.alt }] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getPublishedArticle(slug)
  if (!article) notFound()
  return <ArticleDetail article={article} />
}
