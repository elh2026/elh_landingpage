import Image from 'next/image'
import Link from 'next/link'

import Container from '@/components/Container'
import { urlFor } from '@/sanity/image'
import type { CmsProduct } from '@/sanity/types'
import { serializeJsonLd } from '@/utils/jsonLd'

import PortableContent from './PortableContent'

export default function ProductDetail({ product }: { product: CmsProduct }) {
  const mainImageUrl = urlFor(product.mainImage.image).width(1200).height(900).fit('max').auto('format').url()
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription,
    image: [mainImageUrl],
    sku: product.sku,
    mpn: product.model,
    brand: product.brand?.name ? { '@type': 'Brand', name: product.brand.name } : undefined,
    url: `https://elh.vn/products/${product.slug}/`,
  }

  return (
    <main className="py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(productJsonLd) }} />
      <Container>
        <nav className="mb-8 text-sm text-gray-600" aria-label="Breadcrumb">
          <Link href="/">Trang chủ</Link> <span aria-hidden="true">/</span> <Link href="/products/">Sản phẩm</Link>{' '}
          <span aria-hidden="true">/</span> <span>{product.title}</span>
        </nav>

        <article>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6">
              <Image
                src={mainImageUrl}
                width={1200}
                height={900}
                alt={product.mainImage.alt}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
            <div>
              {product.brand?.name ? <p className="text-primary-blue font-semibold">{product.brand.name}</p> : null}
              <h1 className="mt-2 text-3xl leading-tight font-semibold">{product.title}</h1>
              {product.model ? <p className="text-primary-orange mt-4">Model: {product.model}</p> : null}
              {product.sku ? <p className="mt-1 text-sm">Mã sản phẩm: {product.sku}</p> : null}
              {product.shortDescription ? <p className="mt-6 leading-7">{product.shortDescription}</p> : null}

              <Link
                href="/contact/"
                className="bg-primary-orange mt-8 inline-flex rounded-full px-6 py-3 font-semibold text-white"
              >
                Yêu cầu tư vấn / báo giá
              </Link>

              {product.tags?.length ? (
                <div className="mt-8 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag.title} className="rounded-full bg-white px-3 py-1 text-sm">
                      {tag.title}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {product.description?.length ? (
            <section className="mx-auto mt-14 max-w-4xl">
              <PortableContent value={product.description} />
            </section>
          ) : null}

          {product.specifications?.length ? (
            <section className="mx-auto mt-14 max-w-4xl">
              <h2 className="mb-5 text-2xl font-semibold">Thông số kỹ thuật</h2>
              <dl className="overflow-hidden rounded-2xl border bg-white">
                {product.specifications.map((specification, index) => (
                  <div key={specification._key} className={`grid gap-2 p-4 sm:grid-cols-2 ${index ? 'border-t' : ''}`}>
                    <dt className="font-semibold">{specification.label}</dt>
                    <dd>{specification.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {product.downloads?.length ? (
            <section className="mx-auto mt-14 max-w-4xl">
              <h2 className="mb-5 text-2xl font-semibold">Catalogue / Datasheet</h2>
              <div className="flex flex-wrap gap-3">
                {product.downloads.map((download) => (
                  <a
                    key={download._key}
                    href={download.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-primary-blue rounded-full border px-5 py-2"
                  >
                    {download.title}
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </Container>
    </main>
  )
}
