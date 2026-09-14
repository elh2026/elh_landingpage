'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'

import Container from '@/components/Container'
import Input from '@/components/Input'
import { getGoogleMapsEmbedUrl } from '@/lib/googleMaps'
import type { CmsContactPage, CmsSiteSettings } from '@/sanity/types'
import { urlFor } from '@/sanity/image'

type FormValues = {
  fullname: string
  phone: string
  email: string
  address: string
}

const Hero = ({ content, settings }: { content?: CmsContactPage | null; settings?: CmsSiteSettings | null }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data)
  }
  return (
    <section>
      <div className="relative z-0">
        <div className="bg-bg_hero_contact relative z-0 h-[600px] overflow-hidden bg-cover bg-center bg-no-repeat">
          {content?.heroImage?.image && (
            <Image
              src={urlFor(content.heroImage.image).width(1600).height(800).url()}
              fill
              className="object-cover"
              alt={content.heroImage.alt || content.heroTitle || 'Liên hệ ELH'}
            />
          )}
          <div className="absolute inset-0 bg-slate-950/35" />
          <Container className="relative z-10 h-full">
            <div className={`bg-primary-blue absolute bottom-0 z-20 p-[32px_0_24px_32px] lg:right-32 lg:-bottom-28`}>
              <div className="space-y-2">
                <q className="block font-semibold text-white uppercase">Đạo đức kinh doanh là nền tảng</q>
                <div className="ml-auto w-fit">
                  <Image src="/images/contact/contact.jpg" width={400} height={125} alt="" />
                </div>
              </div>
            </div>

            <div className="relative flex h-full w-3/5 flex-col gap-y-8 py-8 text-white lg:gap-y-20">
              <div className="flex items-center gap-x-2">
                <p className="text-title shrink-0">
                  {content?.heroTitle || content?.formTitle || 'Liên hệ làm đại lý'}
                </p>
                <div className="mt-1.5 h-1 w-full bg-white/10" />
              </div>

              {content?.formDescription && (
                <p className="-mt-14 max-w-2xl text-sm lg:text-base">{content.formDescription}</p>
              )}

              <div className="flex-1 shrink-0">
                <p className="text-lg font-semibold uppercase lg:text-xl">
                  {settings?.companyName || 'Công ty TNHH Thương Mại Kỹ Thuật Dịch Vụ ELH'}
                </p>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-x-4">
                    <div className="shrink-0 pt-1.5">
                      <Image src="/icons/map.svg" width={15} height={15} alt="Map" />
                    </div>
                    <Link
                      href={settings?.mapsUrl || 'https://maps.app.goo.gl/Bfk51u4gX9vk5tX8A'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      Địa chỉ: {settings?.address || '23/3A Đường TTH21, Phường Tân Thới Hiệp, TP.HCM'}
                    </Link>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <div>
                      <Image src="/icons/phone.svg" width={15} height={15} alt="Phone" />
                    </div>
                    <Link href={`tel:${settings?.contactPhone || '+84915706936'}`} className="block">
                      Kinh doanh: {settings?.contactPhone || '(+84) 915 706 936'}
                    </Link>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <div>
                      <Image src="/icons/mail.svg" width={15} height={15} alt="Phone" />
                    </div>
                    <div>
                      Email:{' '}
                      <Link href={`mailto:${settings?.contactEmail || 'info@elh.vn'}`}>
                        {settings?.contactEmail || 'info@elh.vn'}
                      </Link>{' '}
                      /{' '}
                      <Link href={`mailto:${settings?.salesEmail || 'sales@elh.vn'}`}>
                        {settings?.salesEmail || 'sales@elh.vn'}
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <div>
                      <Image src="/icons/globe.svg" width={15} height={15} alt="Phone" />
                    </div>
                    <Link href="https://elh.vn" className="block">
                      Web: www.elh.vn
                    </Link>
                  </div>
                </div>
              </div>

              <div className="">
                <form id="contact-page-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="[&_label]:text-primary-blue grid gap-x-4 gap-y-8 lg:grid-cols-2">
                    <Controller
                      name="fullname"
                      control={control}
                      rules={{ required: 'Họ tên không được để trống' }}
                      render={({ field }) => (
                        <Input
                          className="text-primary-blue bg-white"
                          {...field}
                          label="Họ tên"
                          error={errors.fullname?.message}
                        />
                      )}
                    />
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: 'Số điện thoại không được để trống',
                        pattern: { value: /^[0-9]{9,11}$/, message: 'Số điện thoại không hợp lệ' },
                      }}
                      render={({ field }) => (
                        <Input
                          className="text-primary-blue bg-white"
                          {...field}
                          label="Số điện thoại"
                          error={errors.phone?.message}
                        />
                      )}
                    />
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: 'Email không được để trống',
                        pattern: { value: /^\S+@\S+$/i, message: 'Email không hợp lệ' },
                      }}
                      render={({ field }) => (
                        <Input
                          className="text-primary-blue bg-white"
                          {...field}
                          label="Email"
                          error={errors.email?.message}
                        />
                      )}
                    />
                    <Controller
                      name="address"
                      control={control}
                      rules={{ required: 'Địa chỉ không được để trống' }}
                      render={({ field }) => (
                        <Input
                          className="text-primary-blue bg-white"
                          {...field}
                          label="Địa chỉ"
                          error={errors.address?.message}
                        />
                      )}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Container className="pb-32">
        <div className="mt-4 flex items-center gap-x-2">
          <button
            form="contact-page-form"
            type="submit"
            className="rounded-sm bg-[#a84f00] px-2 py-1 text-white uppercase"
          >
            Gửi
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-sm bg-[#a84f00] px-2 py-1 text-white uppercase"
          >
            Nhập lại
          </button>
        </div>

        <div className="mt-8 grid-cols-6 gap-20 space-y-6 xl:grid xl:space-y-0">
          <div className="col-span-4 space-y-8">
            <div className="h-full">
              <div>
                <iframe
                  src={getGoogleMapsEmbedUrl(content?.mapEmbedUrl)}
                  title="Bản đồ vị trí Công ty ELH"
                  width={'100%'}
                  height={'100%'}
                  className="h-[200px] w-full border-0 xl:h-96 xl:w-11/12"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 mt-24 ml-auto h-fit rounded-2xl rounded-br-[80px] bg-white p-[24px_40px_32px_24px] xl:w-[86%]">
            <p className="font-semibold uppercase">{content?.brandsTitle || 'Danh mục sản phẩm hãng sản xuất'}</p>
            <div className="bg-primary-blue my-4 h-px w-full" />
            <div className="space-y-8 pt-6">
              {content?.brands?.length
                ? content.brands.map((brand) => (
                    <div key={brand._id}>
                      {brand.logo?.image ? (
                        <Image
                          src={urlFor(brand.logo.image).width(315).height(90).fit('max').url()}
                          width={315}
                          height={90}
                          alt={brand.logo.alt || brand.name}
                        />
                      ) : (
                        <p className="text-center text-lg font-semibold">{brand.name}</p>
                      )}
                    </div>
                  ))
                : Array.from({ length: 5 }).map((_, i) => (
                    <div key={i}>
                      <Image
                        src={i === 4 ? '/images/about/brand-5.png' : `/images/about/brand-${i + 1}.svg`}
                        width={315}
                        height={61}
                        alt=""
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
