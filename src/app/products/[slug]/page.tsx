import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ProductDetail from '@/modules/CmsContent/ProductDetail'
import ProductsPage from '@/modules/ProductsPage'
import { urlFor } from '@/sanity/image'
import { getPublishedProduct, getPublishedProductSlugs } from '@/sanity/queries'

const productSlugs = ['janatics', 'tempco', 'cutflex', 'meihe', 'igus']

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const cmsSlugs = await getPublishedProductSlugs()
  return [...new Set([...productSlugs, ...cmsSlugs])].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getPublishedProduct(slug)

  if (!product) return { title: 'Sản phẩm' }

  const title = product.seo?.metaTitle || `${product.title} | ELH`
  const description = product.seo?.metaDescription || product.shortDescription
  const socialImage = product.seo?.openGraphImage || product.mainImage
  const imageUrl = socialImage?.image?.asset
    ? urlFor(socialImage.image).width(1200).height(630).fit('crop').auto('format').url()
    : undefined

  return {
    title,
    description,
    alternates: { canonical: product.seo?.canonicalUrl || `https://elh.vn/products/${product.slug}/` },
    robots: product.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      title,
      description,
      url: `https://elh.vn/products/${product.slug}/`,
      images: imageUrl ? [{ url: imageUrl, alt: socialImage.alt }] : undefined,
    },
  }
}

export default async function ProductsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const product = await getPublishedProduct(slug)
  if (product) return <ProductDetail product={product} />

  if (!productSlugs.includes(slug)) notFound()
  return <ProductsPage slug={slug} />
}
