import HomePage from '@/modules/HomePage'
import { getContactPage, getHomePage } from '@/sanity/queries'

export default async function Home() {
  const [content, contact] = await Promise.all([getHomePage(), getContactPage()])
  return <HomePage content={content} mapEmbedUrl={contact?.mapEmbedUrl} />
}
