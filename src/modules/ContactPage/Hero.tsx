'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'

import Container from '@/components/Container'
import Input from '@/components/Input'

type FormValues = {
  fullname: string
  phone: string
  email: string
  address: string
}

const Hero = () => {
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
        <div className="bg-bg_hero_contact relative z-0 h-[600px] bg-cover bg-center bg-no-repeat">
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
                <p className="text-title shrink-0">Liên hệ làm đại lý</p>
                <div className="mt-1.5 h-1 w-full bg-white/10" />
              </div>

              <div className="flex-1 shrink-0">
                <p className="text-lg font-semibold uppercase lg:text-xl">
                  Công ty TNHH Thương Mại Kỹ Thuật Dịch Vụ ELH
                </p>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-x-4">
                    <div className="shrink-0 pt-1.5">
                      <Image src="/icons/map.svg" width={15} height={15} alt="Map" />
                    </div>
                    <Link
                      href="https://maps.app.goo.gl/Bfk51u4gX9vk5tX8A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      Địa chỉ: 23/3a Đường TTH21, Phường Tân Thới Hiệp, TP.HCM
                    </Link>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <div>
                      <Image src="/icons/phone.svg" width={15} height={15} alt="Phone" />
                    </div>
                    <Link href="tel:+84915706936" className="block">
                      Kinh doanh: (+84) 915 706 936
                    </Link>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <div>
                      <Image src="/icons/mail.svg" width={15} height={15} alt="Phone" />
                    </div>
                    <div>
                      Email: <Link href="mailto:info@elh.vn">info@elh.vn</Link> /{' '}
                      <Link href="mailto:sales@elh.vn">sales@elh.vn</Link>
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
                <form onSubmit={handleSubmit(onSubmit)}>
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
          <button type="submit" className="bg-primary-orange rounded-sm px-2 py-1 text-white uppercase">
            Gửi
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-primary-orange rounded-sm px-2 py-1 text-white uppercase"
          >
            Nhập lại
          </button>
        </div>

        <div className="mt-8 grid-cols-6 gap-20 space-y-6 xl:grid xl:space-y-0">
          <div className="col-span-4 space-y-8">
            <div className="h-full">
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.340807743716!2d106.6423876759785!3d10.861662157613834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ec384211b7%3A0xdcaa7467b51e4f3b!2zMjMvM0EgxJAuIFRUSDIxLCBUw6JuIFRo4bubaSBIaeG7h3AsIFF14bqtbiAxMiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1770395419123!5m2!1sen!2s"
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
            <p className="font-semibold uppercase">Danh mục sản phẩm hãng sản xuất</p>
            <div className="bg-primary-blue my-4 h-px w-full" />
            <div className="space-y-8 pt-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <Image src={`/images/about/brand-${i + 1}.svg`} width={315} height={61} alt="" />
                </div>
              ))}
              <div className="pt-1">
                <Image src={`/images/about/brand-5.png`} width={315} height={61} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
