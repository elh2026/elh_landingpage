'use client'

import { useRef } from 'react'

import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Navigation, Autoplay } from 'swiper/modules'
import Image from 'next/image'

import Container from '@/components/Container'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/image'
import type { CmsHeroSlide } from '@/sanity/types'

const Hero = ({ slides = [] }: { slides?: CmsHeroSlide[] }) => {
  const prevRef1 = useRef(null)
  const nextRef1 = useRef(null)
  return (
    <Container className="px-0">
      <Swiper
        // grabCursor={true}
        effect={'creative'}
        loop
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative, Navigation, Autoplay]}
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef1.current
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef1.current
          swiper.navigation.init()
          swiper.navigation.update()
        }}
        className="mySwiper3"
      >
        {(slides.length
          ? slides
          : Array.from({ length: 4 }).map((_, i): CmsHeroSlide => ({ _key: `fallback-${i}` }))
        ).map((slide, i) => (
          <SwiperSlide key={slide._key}>
            <div className="relative isolate h-[calc(100vh-600px)] p-1 lg:h-[800px]">
              <div className={cn('absolute-center z-[-1] h-full w-full brightness-[30%] md:brightness-50')}>
                <Image
                  priority={i === 0}
                  fetchPriority={i === 0 ? 'high' : undefined}
                  className="object-cover md:object-center"
                  src={
                    slide.image?.image
                      ? urlFor(slide.image.image).width(1600).height(900).auto('format').quality(78).url()
                      : `/images/photos/hero-${i + 1}.webp`
                  }
                  fill
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  alt={slide.image?.alt || slide.title || 'Banner ELH'}
                />
              </div>

              <div className="relative z-10 h-full p-2 pt-6 text-white md:p-12">
                <div className="">
                  <div className="space-y-2">
                    <h1 className="font-semibold">{slide.title || 'ELH SERVICE TECHNOLOGY TRADING Co.,LTD'}</h1>
                    <blockquote className="before:absolute-center-y relative pl-4 text-sm uppercase before:left-0 before:mt-[2px] before:h-3/4 before:w-1 before:bg-white lg:w-[630px] lg:text-base">
                      {slide.description ||
                        'Hòa chung xu hướng công nghiệp hóa 4.0. ELH thành lập để hỗ trợ khách hàng vững bước trong thiên niên kỷ mới'}
                    </blockquote>
                    <Link
                      href={slide.ctaHref || '/catalog'}
                      className="mt-4 block w-fit rounded-full bg-[#a84f00] px-4 py-2 text-xs font-semibold uppercase"
                    >
                      {slide.ctaLabel || 'Catalog'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

export default Hero
