'use client'

import { useRef } from 'react'

import Image from 'next/image'
import { Autoplay, EffectCreative, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import Container from '@/components/Container'

const Products = () => {
  const prevRef1 = useRef<HTMLButtonElement>(null)
  const nextRef1 = useRef<HTMLButtonElement>(null)
  const prevRef2 = useRef<HTMLButtonElement>(null)
  const nextRef2 = useRef<HTMLButtonElement>(null)
  // const data1 = [
  //   {
  //     image: '/images/xylem6.jpg',
  //     name: 'Lowara e-IXP',
  //     model: 'e-IXP',
  //   },
  //   {
  //     image: '/images/xylem4.jpg',
  //     name: 'Lowara TLCN, TLCHN',
  //     model: 'TLCN, TLCHN',
  //   },
  //   {
  //     image: '/images/xylem3.jpg',
  //     name: 'Lowara Ecocirc+',
  //     model: 'Ecocirc+',
  //   },
  //   {
  //     image: '/images/xylem2.jpg',
  //     name: 'Lowara SHO',
  //     model: 'SHO',
  //   },
  //   {
  //     image: '/images/anel4.jpg',
  //     name: 'GRACO 1250A6 HUSKY 205 PVDF 1/4″ 19 L/min Diaphragm Pump PP NULL PVDF SP (NPT)',
  //     model: 'GRACO D150A6',
  //   },
  //   {
  //     image: '/images/anel3.jpg',
  //     name: 'GRACO 647671 HUSKY 1050 Aluminum 1′ 189 L/min Diaphragm Pump A01 A A2 BN BN BN – (BSP)',
  //     model: 'GRACO 647671',
  //   },
  //   {
  //     image: '/images/anel2.jpg',
  //     name: 'GRACO 649034 HUSKY 1050 Polypropylene 1′ 189 L/min Diaphragm Pump',
  //     model: 'GRACO 649034',
  //   },
  //   {
  //     image: '/images/anel1.jpg',
  //     name: 'GRACO D52911 HUSKY 515 Polypropylene 1/2″ 57L/min Diaphragm Pump',
  //     model: 'GRACO D52911',
  //   },
  // ]

  const data2 = [
    {
      name: 'IO link master with iot interface',
      model: '',
    },
    {
      name: 'Ultrasonic flow meter',
      model: '',
    },
    {
      name: 'Switched mode power supply 24VDC',
      model: '',
    },
    {
      name: 'Magnetic inductive flow meter',
      model: '',
    },
    {
      name: 'Magnetic inductive flow meter',
      model: '',
    },
    {
      name: 'Inductive full metal sensor',
      model: '',
    },
    {
      name: 'Flush pressure sensor with analogue display',
      model: '',
    },
    {
      name: 'AS interface power supply',
      model: '',
    },
  ]

  return (
    <div className="mt-16 space-y-16">
      <Container>
        <div className="items-center space-y-2 gap-x-2 lg:flex lg:space-y-0">
          <p className="shrink-0 text-xl font-semibold uppercase">Khách hàng thân thiết </p>
          <div className="bg-primary-blue mt-1.5 hidden h-px w-full lg:block" />
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <p>Posco | Intermalt | Kenda | ChengLong |</p>
            <button className="text-[#a84f00] uppercase">Xem tất cả</button>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center gap-x-4">
            <button ref={prevRef1} className="swiper-button-prev" aria-label="Xem đối tác trước">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={'100%'}
                height={'100%'}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left-icon lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button ref={nextRef1} className="swiper-button-next" aria-label="Xem đối tác tiếp theo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={'100%'}
                height={'100%'}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="s0 lucide lucide-chevron-right-icon lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            navigation
            onBeforeInit={(swiper) => {
              const navigation = swiper.params.navigation
              if (navigation && typeof navigation !== 'boolean') {
                navigation.prevEl = prevRef1.current
                navigation.nextEl = nextRef1.current
              }
            }}
            modules={[Navigation]}
          >
            {Array.from({ length: 36 }).map((image, i) => (
              <SwiperSlide key={i}>
                <div className="hover:border-primary-orange relative grid min-h-[300px] place-items-center rounded-2xl border border-white bg-white p-4 transition-all duration-300">
                  {/* {i === 0 && (
                    <div className="absolute top-4 left-4">
                      <Image src="/images/baohanh.png" width={100} height={100} alt="" />
                    </div>
                  )} */}

                  <div className="flex flex-col">
                    <div className="mx-auto w-fit">
                      <Image
                        src={`/images/KHTT/logo-${i > 8 ? `${i + 1}` : `0${i + 1}`}.png`}
                        width={217}
                        height={230}
                        alt={''}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      <Container>
        <div className="items-center space-y-2 gap-x-2 lg:flex lg:space-y-0">
          <p className="shrink-0 text-xl font-semibold uppercase">Chứng chỉ</p>
          <div className="bg-primary-blue mt-1.5 hidden h-px w-full lg:block" />
          {/* <div className="flex shrink-0 flex-wrap items-center gap-2">
            <p>Tempco | ABB | Landz | Omron | Keyence |</p>
            <button className="text-primary-orange uppercase">Xem tất cả</button>
          </div> */}
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center gap-x-4">
            <button ref={prevRef2} className="swiper-button-prev" aria-label="Xem chứng chỉ trước">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={'100%'}
                height={'100%'}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left-icon lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button ref={nextRef2} className="swiper-button-next" aria-label="Xem chứng chỉ tiếp theo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={'100%'}
                height={'100%'}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="s0 lucide lucide-chevron-right-icon lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
          <Swiper
            // spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop
            modules={[EffectCreative, Navigation, Autoplay]}
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            navigation
            onBeforeInit={(swiper) => {
              const navigation = swiper.params.navigation
              if (navigation && typeof navigation !== 'boolean') {
                navigation.prevEl = prevRef2.current
                navigation.nextEl = nextRef2.current
              }
            }}
            className="items-stretch!"
          >
            {Array.from({ length: 10 }).map((image, i) => (
              <SwiperSlide key={i} className="h-full">
                <div className="hover:border-primary-orange relative grid min-h-[350px] place-items-center rounded-2xl border border-white bg-white p-4 transition-all duration-300 lg:min-h-[425px]">
                  <div className="flex w-full flex-col">
                    <div className="mx-auto w-full">
                      <Image
                        className="h-full w-full"
                        src={`/images/certificate/cer-0${i + 1}.jpg`}
                        width={217}
                        height={230}
                        alt={''}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  )
}

export default Products
