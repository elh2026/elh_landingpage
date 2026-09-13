import Image from 'next/image'
import Breadcrumb from '@/components/Breadcrumb'
import Container from '@/components/Container'
import AboutPage from '@/modules/AboutPage'
import PortableContent from '@/modules/CmsContent/PortableContent'
import { urlFor } from '@/sanity/image'
import { getAboutPage } from '@/sanity/queries'

export default async function About() {
  const page = await getAboutPage()
  if (!page) return <AboutPage />

  return (
    <main>
      <section className="relative mt-8 h-[520px] overflow-hidden">
        {page.heroImage?.image && (
          <Image
            src={urlFor(page.heroImage.image).width(1600).height(700).url()}
            fill
            className="object-cover"
            alt={page.heroImage.alt || page.heroTitle || ''}
          />
        )}
        <div className="absolute inset-0 bg-slate-950/45" />
        <Container className="relative flex h-full items-end pb-16">
          <h1 className="text-4xl font-bold text-white">{page.heroTitle}</h1>
        </Container>
      </section>
      <Container className="py-16">
        <Breadcrumb title="Giới thiệu" />
        <h2 className="text-title mt-8">{page.title}</h2>
        {page.lead && <p className="mt-5 text-lg font-semibold">{page.lead}</p>}
        {page.body && <div className="mt-6"><PortableContent value={page.body} /></div>}
        {!!page.gallery?.length && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.gallery.map((item, index) => (
              <figure key={`${item.image.asset._ref}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={urlFor(item.image).width(900).height(675).url()}
                  fill
                  className="object-cover"
                  alt={item.alt || ''}
                />
              </figure>
            ))}
          </div>
        )}
        {!!page.capabilities?.length && (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {page.capabilities.map((item) => (
              <article key={item._key} className="rounded-xl bg-white p-6 shadow">
                <h3 className="font-bold text-primary-orange">{item.title}</h3>
                <p className="mt-3">{item.description}</p>
              </article>
            ))}
          </div>
        )}
      </Container>
    </main>
  )
}
