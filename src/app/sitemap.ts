import type { MetadataRoute } from 'next'

import { getPublishedArticles, getPublishedProducts } from '@/sanity/queries'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, articles] = await Promise.all([getPublishedProducts(), getPublishedArticles()])
  const staticPages = [
    '',
    'about',
    'catalog',
    'contact',
    'featured-news',
    'news-%26-event',
    'products',
    'recruitment',
    'services',
  ]

  return [
    ...staticPages.map((path) => ({
      url: `https://elh.vn/${path ? `${path}/` : ''}`,
      changeFrequency: path ? ('monthly' as const) : ('weekly' as const),
      priority: path ? 0.7 : 1,
    })),
    ...products.map((product) => ({
      url: `https://elh.vn/products/${product.slug}/`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: `https://elh.vn/news/${article.slug}/`,
      lastModified: article.publishedAt ? new Date(article.publishedAt) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
