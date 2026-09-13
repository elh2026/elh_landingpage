import type { Template } from 'sanity'

export const templates: Template[] = [
  {
    id: 'article-news',
    title: 'Tin tức & sự kiện mới',
    schemaType: 'article',
    value: { section: 'news', featured: false, publishedAt: new Date().toISOString() },
  },
  {
    id: 'article-featured',
    title: 'Tin nổi bật mới',
    schemaType: 'article',
    value: { section: 'news', featured: true, publishedAt: new Date().toISOString() },
  },
  {
    id: 'article-recruitment',
    title: 'Tin tuyển dụng mới',
    schemaType: 'article',
    value: { section: 'recruitment', featured: false, publishedAt: new Date().toISOString() },
  },
  {
    id: 'product-default',
    title: 'Sản phẩm mới',
    schemaType: 'product',
    value: { featured: false, archived: false, publishedAt: new Date().toISOString() },
  },
  {
    id: 'service-default',
    title: 'Dịch vụ mới',
    schemaType: 'service',
    value: { featured: false, archived: false, ctaLabel: 'Liên hệ tư vấn' },
  },
]
