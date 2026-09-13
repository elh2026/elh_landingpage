import { CogIcon } from '@sanity/icons/Cog'
import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Dịch vụ',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'content', title: 'Nội dung', default: true },
    { name: 'media', title: 'Hình ảnh' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Tên dịch vụ',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 4,
      group: 'content',
      validation: (rule) => rule.max(320),
    }),
    defineField({ name: 'body', title: 'Nội dung chi tiết', type: 'blockContent', group: 'content' }),
    defineField({
      name: 'mainImage',
      title: 'Ảnh đại diện',
      type: 'imageWithAlt',
      group: 'media',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'ctaLabel', title: 'Nhãn nút liên hệ', type: 'string', group: 'content', initialValue: 'Liên hệ tư vấn' }),
    defineField({ name: 'featured', title: 'Hiển thị ở trang chủ', type: 'boolean', initialValue: false }),
    defineField({ name: 'archived', title: 'Ngừng hiển thị', type: 'boolean', initialValue: false }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [{ title: 'Tên A-Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'summary', media: 'mainImage.image' },
  },
})
