import ProductsPage from '@/modules/ProductsPage'

const productSlugs = ['janatics', 'tempco', 'cutflex', 'meihe', 'igus']

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }))
}

export default async function ProductsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ProductsPage slug={slug} />
}
