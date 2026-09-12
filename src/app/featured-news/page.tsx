import ArticleList from '@/modules/CmsContent/ArticleList'
import FeaturedNewsPage from '@/modules/FeaturedNewsPage'
import { getFeaturedArticles } from '@/sanity/queries'

export default async function FeaturedNews() {
  const articles = await getFeaturedArticles()
  if (articles.length) return <ArticleList articles={articles} title="Tin nổi bật" />
  return <FeaturedNewsPage />
}
