import Image from 'next/image'

import { Marquee } from '@/components/ui/marquee'

import Hero from './Hero'
import About from './About'
import PoweredByTech from './PoweredByTech'
import Products from './Products'
import Service from './Service'
import Contact from './Contact'
import { Constraction } from './Constraction'
import type { CmsHomePage } from '@/sanity/types'
import { urlFor } from '@/sanity/image'

const HomePage = ({ content, mapEmbedUrl }: { content?: CmsHomePage | null; mapEmbedUrl?: string }) => {
  return (
    <main>
      <Hero slides={content?.heroSlides} />
      <div className="my-8 bg-white py-4">
        <Marquee pauseOnHover className="[--duration:60s] [--gap:3rem]">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="relative aspect-[192/80] h-20 w-[192px]">
              <Image src={`/images/logo${i + 1}.webp`} fill alt={`logo ${i + 1}`} className="object-contain" />
            </div>
          ))}
        </Marquee>
      </div>
      {content?.introTitle || content?.introText ? (
        <section className="mx-auto max-w-5xl px-6 py-16 text-center">
          {content.introLogo?.image && (
            <Image
              src={urlFor(content.introLogo.image).width(420).auto('format').quality(82).url()}
              width={306}
              height={128}
              className="mx-auto mb-8 h-auto"
              alt={content.introLogo.alt || 'ELH'}
            />
          )}
          <h2 className="text-title">{content.introTitle}</h2>
          <p className="mt-4">{content.introText}</p>
          {!!content.introImages?.length && (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {content.introImages.map((item, index) => (
                <div
                  key={`${item.image.asset._ref}-${index}`}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={urlFor(item.image).width(640).height(480).auto('format').quality(76).url()}
                    fill
                    className="object-cover"
                    alt={item.alt || ''}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <About />
      )}
      <PoweredByTech title={content?.productsTitle} />

      <Products />
      <Service title={content?.servicesTitle} services={content?.featuredServices} />
      <Contact title={content?.contactTitle} mapEmbedUrl={mapEmbedUrl} />
    </main>
  )
}

export default HomePage
