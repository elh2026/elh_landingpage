import ArticleList from '@/modules/CmsContent/ArticleList'
import NewsNEventPage from '@/modules/NewsNEventPage'
import { getPublishedArticles } from '@/sanity/queries'

export default async function NewsNEvent() {
  const articles = await getPublishedArticles()
  if (articles.length)
    return <ArticleList articles={articles} title="Tin tức & Sự kiện" createTemplate="article-news" />
  return <NewsNEventPage />
}
