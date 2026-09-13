import { defineDocuments, defineLocations } from 'sanity/presentation'

export const mainDocuments = defineDocuments([
  { route: '/products/:slug', filter: `_type == "product" && slug.current == $slug` },
  { route: '/news/:slug', filter: `_type == "article" && slug.current == $slug` },
  { route: '/products', filter: `_id == "homePage"` },
  { route: '/news-&-event', filter: `_id == "homePage"` },
  { route: '/featured-news', filter: `_id == "homePage"` },
  { route: '/recruitment', filter: `_id == "homePage"` },
  { route: '/about', type: 'aboutPage' },
  { route: '/services', type: 'servicesPage' },
  { route: '/contact', type: 'contactPage' },
  { route: '/', type: 'homePage' },
])

export const locations = {
  homePage: defineLocations({ locations: [{ title: 'Trang chủ', href: '/' }] }),
  aboutPage: defineLocations({ locations: [{ title: 'Trang giới thiệu', href: '/about/' }] }),
  servicesPage: defineLocations({ locations: [{ title: 'Trang dịch vụ', href: '/services/' }] }),
  contactPage: defineLocations({ locations: [{ title: 'Trang liên hệ', href: '/contact/' }] }),
  product: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (document) => ({
      locations: [
        ...(document?.slug ? [{ title: document.title || 'Sản phẩm', href: `/products/${document.slug}/` }] : []),
        { title: 'Danh sách sản phẩm', href: '/products/' },
      ],
    }),
  }),
  service: defineLocations({
    select: { title: 'title' },
    resolve: (document) => ({
      locations: [
        { title: document?.title || 'Dịch vụ', href: '/services/' },
        { title: 'Dịch vụ nổi bật trên trang chủ', href: '/' },
      ],
    }),
  }),
  article: defineLocations({
    select: { title: 'title', slug: 'slug.current', section: 'section', featured: 'featured' },
    resolve: (document) => ({
      locations: [
        ...(document?.slug ? [{ title: document.title || 'Bài viết', href: `/news/${document.slug}/` }] : []),
        {
          title: document?.section === 'recruitment' ? 'Tin tuyển dụng' : 'Tin tức & sự kiện',
          href: document?.section === 'recruitment' ? '/recruitment/' : '/news-&-event/',
        },
        ...(document?.featured ? [{ title: 'Tin nổi bật', href: '/featured-news/' }] : []),
      ],
    }),
  }),
  siteSettings: defineLocations({
    message: 'Thông tin này được sử dụng ở đầu trang, chân trang và trang liên hệ.',
    tone: 'caution',
  }),
}
