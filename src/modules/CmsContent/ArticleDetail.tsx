import Image from 'next/image'
import Link from 'next/link'

import Container from '@/components/Container'
import { urlFor } from '@/sanity/image'
import type { CmsArticle } from '@/sanity/types'
import { serializeJsonLd } from '@/utils/jsonLd'

import PortableContent from './PortableContent'

export default function ArticleDetail({ article }: { article: CmsArticle }) {
  const coverImageUrl = urlFor(article.coverImage.image).width(1400).fit('max').auto('format').url()
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [coverImageUrl],
    datePublished: article.publishedAt,
    author: article.authorName ? { '@type': 'Person', name: article.authorName } : undefined,
    publisher: { '@type': 'Organization', name: 'ELH', url: 'https://elh.vn/' },
    mainEntityOfPage: `https://elh.vn/news/${article.slug}/`,
  }

  return (
    <main className="py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }} />
      <Container>
        <article className="mx-auto max-w-4xl">
          <nav className="mb-8 text-sm text-gray-600" aria-label="Breadcrumb">
            <Link href="/">Trang chủ</Link> <span aria-hidden="true">/</span> <Link href="/news-&-event/">Tin tức</Link>{' '}
            <span aria-hidden="true">/</span> <span>{article.title}</span>
          </nav>
          <h1 className="text-3xl leading-tight font-semibold md:text-4xl">{article.title}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            {article.authorName ? <span>{article.authorName}</span> : null}
            {article.publishedAt ? (
              <time dateTime={article.publishedAt}>
                {new Intl.DateTimeFormat('vi-VN').format(new Date(article.publishedAt))}
              </time>
            ) : null}
          </div>
          <Image
            src={coverImageUrl}
            width={1400}
            height={900}
            alt={article.coverImage.alt}
            priority
            className="mt-8 h-auto w-full rounded-2xl object-cover"
          />
          {article.excerpt ? <p className="my-8 text-lg leading-8 font-semibold">{article.excerpt}</p> : null}
          <PortableContent value={article.body} />
          {article.tags?.length ? (
            <div className="mt-10 flex flex-wrap gap-2 border-t pt-6">
              {article.tags.map((tag) => (
                <span key={tag.title} className="rounded-full bg-white px-3 py-1 text-sm">
                  {tag.title}
                </span>
              ))}
            </div>
          ) : null}
        </article>
      </Container>
    </main>
  )
}
