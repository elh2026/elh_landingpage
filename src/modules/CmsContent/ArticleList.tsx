import Image from 'next/image'
import Link from 'next/link'

import Container from '@/components/Container'
import { getSanityCreateUrl, type CreateTemplateId } from '@/lib/sanityIntent'
import { urlFor } from '@/sanity/image'
import type { CmsArticleSummary } from '@/sanity/types'

export default function ArticleList({
  articles,
  title,
  createTemplate,
  createLabel = 'Thêm bài viết',
}: {
  articles: CmsArticleSummary[]
  title: string
  createTemplate?: CreateTemplateId
  createLabel?: string
}) {
  const showCreateButton = process.env.ELH_PREVIEW_BUILD === 'true' && createTemplate

  return (
    <main className="py-10">
      <Container>
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold uppercase">{title}</h1>
          <div className="bg-primary-blue h-px flex-1" />
          {showCreateButton ? (
            <a
              href={getSanityCreateUrl(createTemplate)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#a84f00] px-4 py-2 text-sm font-semibold text-white"
            >
              + {createLabel}
            </a>
          ) : null}
        </div>
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <Link key={article._id} href={`/news/${article.slug}/`} className="group flex flex-col">
              <Image
                src={urlFor(article.coverImage.image).width(900).height(590).fit('crop').auto('format').url()}
                width={900}
                height={590}
                alt={article.coverImage.alt}
                className="aspect-3/2 w-full rounded-xl object-cover"
              />
              <h2 className="group-hover:text-primary-orange mt-4 text-xl font-semibold transition">{article.title}</h2>
              {article.excerpt ? <p className="mt-3 line-clamp-3">{article.excerpt}</p> : null}
              {article.publishedAt ? (
                <time className="mt-3 text-sm text-gray-600" dateTime={article.publishedAt}>
                  {new Intl.DateTimeFormat('vi-VN').format(new Date(article.publishedAt))}
                </time>
              ) : null}
            </Link>
          ))}
        </div>
      </Container>
    </main>
  )
}
