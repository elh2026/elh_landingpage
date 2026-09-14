import Image from 'next/image'
import Breadcrumb from '@/components/Breadcrumb'
import Container from '@/components/Container'
import ServicePage from '@/modules/ServicePage'
import PortableContent from '@/modules/CmsContent/PortableContent'
import { urlFor } from '@/sanity/image'
import { getServicesPage } from '@/sanity/queries'

export default async function Service() {
  const page = await getServicesPage()
  if (!page) return <ServicePage />
  return (
    <main>
      <section className="relative mt-8 h-[520px] overflow-hidden">
        {page.heroImage?.image && (
          <Image
            src={urlFor(page.heroImage.image).width(1600).height(700).url()}
            fill
            className="object-cover"
            alt={page.heroImage.alt || ''}
          />
        )}
        <div className="absolute inset-0 bg-slate-950/45" />
        <Container className="relative flex h-full items-end pb-16">
          <h1 className="text-4xl font-bold text-white">{page.heroTitle}</h1>
        </Container>
      </section>
      <Container className="py-16">
        <Breadcrumb title="Dịch vụ" />
        <h2 className="text-title mt-8">{page.title}</h2>
        {page.intro && <p className="mt-4 max-w-4xl">{page.intro}</p>}
        <div className="mt-12 space-y-16">
          {page.services?.map((service) => (
            <article key={service._id} className="grid items-center gap-8 md:grid-cols-2">
              {service.mainImage?.image && (
                <Image
                  src={urlFor(service.mainImage.image).width(800).height(520).url()}
                  width={800}
                  height={520}
                  className="rounded-xl object-cover"
                  alt={service.mainImage.alt || service.title}
                />
              )}
              <div>
                <h3 className="text-title">{service.title}</h3>
                {service.summary && <p className="mt-3">{service.summary}</p>}
                {service.body && (
                  <div className="mt-4">
                    <PortableContent value={service.body} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  )
}
