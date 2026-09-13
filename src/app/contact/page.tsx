import ContactPage from '@/modules/ContactPage'
import { getContactPage, getSiteSettings } from '@/sanity/queries'

export default async function Contact() {
  const [content, settings] = await Promise.all([getContactPage(), getSiteSettings()])
  return <ContactPage content={content} settings={settings} />
}
