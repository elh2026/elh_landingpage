'use client'

import { useState } from 'react'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

import Container from '@/components/Container'
import { cn } from '@/lib/utils'

import { cutflex, meihe, tempco } from '../HomePage/PoweredByTech'

const Catalog = () => {
  const searchParams = useSearchParams()
  const params = searchParams.get('product') || ''

  const convertIndex = (params: string) => {
    if (params === 'janastic') return 0
    if (params === 'tempco') return 1
    if (params === 'cutflex') return 2
    if (params === 'meihe') return 3
    if (params === 'igus') return 4
    return 0
  }
  const [selection, setSelection] = useState(() => ({ source: params, index: convertIndex(params) }))
  const index = selection.source === params ? selection.index : convertIndex(params)
  const setIndex = (nextIndex: number) => setSelection({ source: params, index: nextIndex })

  const data = [
    {
      text: 'Janatics',
      img: '/images/about/brand-1.svg',
      document: '/documents/janatics.pdf',
    },
    {
      text: 'Tempco',
      img: '/images/about/brand-2.svg',
      document: '/documents/tempco.pdf',
    },
    {
      text: 'CutFlex',
      img: '/images/about/brand-3.svg',
      document: '/documents/cutflex.pdf',
    },
    {
      text: 'Meihe',
      img: '/images/about/brand-4.svg',
      document: '/documents/meihe.pdf',
    },
    {
      text: 'Igus',
      img: '/images/about/brand-5.png',
      document: '/documents/igus.pdf',
    },
    {
      text: '2018 INT 124P MENNEKES Catalog',
      img: '/images/catalog/ctg1.jpg',
    },
    {
      text: 'Mennekes Pramonines Jungtys',
      img: '/images/catalog/ctg2.jpg',
    },
    {
      text: 'Mennekes Full Line Catalog',
      img: '/images/catalog/ctg3.jpg',
    },
    {
      text: 'Mennekes Amaxx International  Edition 2015',
      img: '/images/catalog/ctg4.jpg',
    },
    {
      text: 'Mennekes 2010 Short Form Export Catalog',
      img: '/images/catalog/ctg5.jpg',
    },
    {
      text: 'International Version',
      img: '/images/catalog/ctg6.jpg',
    },
  ]
  return (
    <section>
      <Container>
        <div className="mt-10 mb-32 flex flex-col-reverse gap-20 space-y-6 xl:grid xl:grid-cols-6 xl:space-y-0">
          <div className="space-y-8 xl:col-span-4">
            <div className="items-stretch gap-10 space-y-4 md:grid md:grid-cols-2 md:space-y-0 xl:grid-cols-3">
              {index === 0 &&
                Array.from({ length: 10 }).map((_, i) => (
                  <div key={i}>
                    <div className="h-full">
                      <Image
                        src={`/images/Janastic/Untitled-1-${i > 8 ? `${i + 1}.jpg` : `0${i + 1}.jpg`}`}
                        width={400}
                        height={400}
                        alt="Janastic"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              {index === 1 &&
                tempco.map(({ details, name, img }, i) => (
                  <div key={i} className="space-y-4 bg-white p-4">
                    <div>
                      <Image src={img || ''} width={400} height={400} alt="Tempco" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{name}</p>
                      <ul className="mt-2 ml-5 list-disc">
                        {details?.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              {index === 2 &&
                Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="space-y-4 bg-white p-4">
                    <div>
                      <Image src={`/images/CutFlex/sp-web-elh-0${i + 1}.jpg`} width={400} height={400} alt="CutFlex" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{cutflex[i]?.title}</p>
                      <ul className="mt-2 ml-5 list-disc">
                        {cutflex[i]?.info?.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              {index === 3 &&
                meihe.slice(0, 10).map(({ details, img, model, name }, i) => (
                  <div key={i} className="space-y-4 bg-white p-4">
                    <div>
                      <Image src={img} width={400} height={400} alt="Meihe" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{name}</p>
                      <p className="font-i-ciel-gotham font-medium">Model: {model}</p>
                      <ul className="mt-2 ml-5 list-disc">
                        {details?.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

              {index === 4 &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <div className="h-full">
                      <Image
                        src={`/images/IGUS/sp-0${i + 1}.png`}
                        width={400}
                        height={400}
                        alt="Janastic"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="h-fit rounded-2xl rounded-br-[80px] bg-white p-[24px_40px_32px_24px] md:mr-auto xl:col-span-2 xl:ml-auto xl:w-[86%]">
            <p className="font-semibold uppercase">Danh mục sản phẩm hãng sản xuất</p>
            <div className="bg-primary-blue my-4 h-px w-full" />
            <div className="space-y-8 pt-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={cn('cursor-pointer border border-transparent p-2', {
                    'border-primary-orange rounded-lg': i === index,
                  })}
                  onClick={() => setIndex(i)}
                >
                  <Image src={`/images/about/brand-${i + 1}.svg`} width={315} height={61} alt="" />
                </div>
              ))}
              <div
                className={cn('cursor-pointer border border-transparent p-2', {
                  'border-primary-orange rounded-lg': index === 4,
                })}
                onClick={() => setIndex(4)}
              >
                <Image src={`/images/about/brand-5.png`} width={315} height={61} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex items-center gap-x-2">
          <p className="text-title shrink-0">Catalog</p>
          <div className="bg-primary-blue mt-1.5 h-px w-full" />
        </div>

        <div className="border-primary-blue/50 grid gap-x-10 gap-y-6 border-b pb-16 md:grid-cols-2 xl:grid-cols-5">
          {data.slice(0, 5).map(({ text, document, img }, i) => (
            <div key={i} className="space-y-3">
              <div className="h-32 w-full bg-[#ebebeb] p-4">
                <Image src={img} width={729} height={510} alt="Catalog" />
              </div>
              {document && (
                <Link download={document} href={document} className="flex items-center justify-between">
                  <p className="font-semibold">{text}</p>
                  <div className="">
                    <Image src="/icons/icon-download.svg" width={35} height={41} alt="Download" />
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-x-16 gap-y-6 pt-12 pb-16 md:grid-cols-2 xl:grid-cols-3">
          {data.slice(5, data.length).map(({ text, img }, i) => (
            <div key={i} className="space-y-3">
              <div className="w-full">
                <Image src={img} width={729} height={510} alt="Catalog" />
              </div>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{text}</p>
                <div className="">
                  <Image src="/icons/icon-download.svg" width={35} height={41} alt="Download" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Catalog
