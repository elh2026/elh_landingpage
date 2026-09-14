export type CreateTemplateId =
  'article-news' | 'article-featured' | 'article-recruitment' | 'product-default' | 'service-default'

const templateTypes: Record<CreateTemplateId, 'article' | 'product' | 'service'> = {
  'article-news': 'article',
  'article-featured': 'article',
  'article-recruitment': 'article',
  'product-default': 'product',
  'service-default': 'service',
}

export const getSanityCreateUrl = (template: CreateTemplateId) => {
  const studio = (process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://admin.elh.vn').replace(/\/$/, '')
  return `${studio}/structure/intent/create/type=${templateTypes[template]};template=${template}`
}
