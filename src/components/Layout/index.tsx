import Header from './Header'
import Footer from './Footer'
import type { CmsSiteSettings } from '@/sanity/types'

const Layout = ({ children, settings }: { children: React.ReactNode; settings?: CmsSiteSettings | null }) => {
  return (
    <div className="overflow-x-clip">
      <Header settings={settings} />
      {children}
      <Footer settings={settings} />
    </div>
  )
}

export default Layout
