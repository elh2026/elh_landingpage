import ArticleList from '@/modules/CmsContent/ArticleList'
import { getRecruitmentArticles } from '@/sanity/queries'

export default async function RecruitmentPage() {
  const articles = await getRecruitmentArticles()
  return <ArticleList articles={articles} title="Tin tuyển dụng" />
}
