import Image from 'next/image'
import Link from 'next/link'

import Container from '@/components/Container'
import { urlFor } from '@/sanity/image'
import type { CmsProductSummary } from '@/sanity/types'

export default function ProductList({ products }: { products: CmsProductSummary[] }) {
  return (
    <main className="py-10">
      <Container>
        <div className="mb-8 flex items-center gap-3">
          <h1 className="text-2xl font-semibold uppercase">Sản phẩm</h1>
          <div className="bg-primary-blue h-px flex-1" />
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center">Danh sách sản phẩm đang được cập nhật.</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}/`}
                className="hover:border-primary-orange group flex flex-col rounded-2xl border border-transparent bg-white p-5 transition"
              >
                <Image
                  src={urlFor(product.mainImage.image).width(720).height(540).fit('max').auto('format').url()}
                  width={720}
                  height={540}
                  alt={product.mainImage.alt}
                  className="aspect-4/3 w-full object-contain transition-transform group-hover:scale-[1.02]"
                />
                {product.brand?.name ? <p className="text-primary-blue mt-4 text-sm">{product.brand.name}</p> : null}
                <h2 className="mt-1 font-semibold">{product.title}</h2>
                {product.model || product.sku ? (
                  <p className="text-primary-orange mt-2 text-sm">{product.model || product.sku}</p>
                ) : null}
                {product.shortDescription ? (
                  <p className="mt-3 line-clamp-3 text-sm">{product.shortDescription}</p>
                ) : null}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </main>
  )
}
