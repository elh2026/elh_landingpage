import type { Metadata } from 'next'

import ProductList from '@/modules/CmsContent/ProductList'
import { getPublishedProducts } from '@/sanity/queries'

export const metadata: Metadata = {
  title: 'Sản phẩm',
  description: 'Danh mục sản phẩm và giải pháp công nghiệp do ELH cung cấp.',
  alternates: { canonical: 'https://elh.vn/products/' },
}

export default async function ProductsPage() {
  const products = await getPublishedProducts()
  return <ProductList products={products} />
}
