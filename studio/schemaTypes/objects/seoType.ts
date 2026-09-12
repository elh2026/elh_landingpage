import { defineField, defineType } from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Tiêu đề SEO',
      type: 'string',
      description: 'Khuyến nghị tối đa 60 ký tự.',
      validation: (rule) => rule.max(60).warning('Tiêu đề dài hơn 60 ký tự có thể bị cắt trên Google.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Mô tả SEO',
      type: 'text',
      rows: 3,
      description: 'Khuyến nghị tối đa 160 ký tự.',
      validation: (rule) => rule.max(160).warning('Mô tả dài hơn 160 ký tự có thể bị cắt trên Google.'),
    }),
    defineField({ name: 'canonicalUrl', title: 'Canonical URL', type: 'url' }),
    defineField({ name: 'openGraphImage', title: 'Ảnh khi chia sẻ', type: 'imageWithAlt' }),
    defineField({
      name: 'noIndex',
      title: 'Không cho công cụ tìm kiếm lập chỉ mục',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
