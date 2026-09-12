import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

import { urlFor } from '@/sanity/image'
import type { SanityImageWithAlt } from '@/sanity/types'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 mb-4 text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-semibold">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-primary-orange my-6 border-l-4 pl-5 italic">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-6">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '#'
      const external = href.startsWith('http')
      return (
        <a
          href={href}
          className="text-primary-orange underline underline-offset-2"
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    imageWithAlt: ({ value }) => {
      const image = value as SanityImageWithAlt
      if (!image?.image?.asset) return null

      return (
        <figure className="my-8">
          <Image
            src={urlFor(image.image).width(1400).fit('max').auto('format').url()}
            width={1400}
            height={900}
            alt={image.alt}
            className="h-auto w-full rounded-xl object-contain"
          />
          {image.caption ? (
            <figcaption className="mt-2 text-center text-sm text-gray-600">{image.caption}</figcaption>
          ) : null}
        </figure>
      )
    },
  },
}

export default function PortableContent({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />
}
