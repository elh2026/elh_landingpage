'use client'

import { Controller, useForm } from 'react-hook-form'

import Container from '@/components/Container'
import Input from '@/components/Input'
import { getGoogleMapsEmbedUrl } from '@/lib/googleMaps'

type FormValues = {
  fullname: string
  phone: string
  email: string
  address: string
}

const Contact = ({ title, mapEmbedUrl }: { title?: string; mapEmbedUrl?: string }) => {
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
    <section className="mb-16">
      <Container>
        <div className="block items-end space-y-8 gap-x-8 xl:flex xl:space-y-0">
          <div className="h-full flex-1 rounded-2xl bg-white px-4 py-8 lg:px-8 xl:py-4">
            <p className="text-title pb-8">{title || 'Liên hệ làm đại lý'}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-x-4 gap-y-8 lg:grid-cols-2">
                <Controller
                  name="fullname"
                  control={control}
                  rules={{ required: 'Họ tên không được để trống' }}
                  render={({ field }) => <Input {...field} label="Họ tên" error={errors.fullname?.message} />}
                />
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: 'Số điện thoại không được để trống',
                    pattern: { value: /^[0-9]{9,11}$/, message: 'Số điện thoại không hợp lệ' },
                  }}
                  render={({ field }) => <Input {...field} label="Số điện thoại" error={errors.phone?.message} />}
                />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email không được để trống',
                    pattern: { value: /^\S+@\S+$/i, message: 'Email không hợp lệ' },
                  }}
                  render={({ field }) => <Input {...field} label="Email" error={errors.email?.message} />}
                />
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: 'Địa chỉ không được để trống' }}
                  render={({ field }) => <Input {...field} label="Địa chỉ" error={errors.address?.message} />}
                />
              </div>

              <div className="mt-4 flex items-center justify-center gap-x-2 xl:justify-end">
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
            </form>
          </div>

          <div className="h-full">
            <div>
              <iframe
                src={getGoogleMapsEmbedUrl(mapEmbedUrl)}
                width={'100%'}
                height={'100%'}
                className="h-[200px] w-full border-0 xl:w-[500px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Contact
