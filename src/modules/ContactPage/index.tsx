import Breadcrumb from '@/components/Breadcrumb'
import Container from '@/components/Container'

import Hero from './Hero'
import type { CmsContactPage, CmsSiteSettings } from '@/sanity/types'

const ContactPage = ({ content, settings }: { content?: CmsContactPage | null; settings?: CmsSiteSettings | null }) => {
  return (
    <>
      <Container className="my-2">
        <Breadcrumb title="Catalog" />
      </Container>
      <Hero content={content} settings={settings} />
    </>
  )
}

export default ContactPage
