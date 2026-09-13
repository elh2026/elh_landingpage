import { InfoOutlineIcon } from '@sanity/icons/InfoOutline'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'Trang giới thiệu',
  type: 'document',
  icon: InfoOutlineIcon,
  groups: [
    { name: 'hero', title: 'Banner', default: true },
    { name: 'content', title: 'Nội dung' },
    { name: 'media', title: 'Hình ảnh' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'heroTitle', title: 'Tiêu đề banner', type: 'string', group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Hình nền banner', type: 'imageWithAlt', group: 'hero' }),
    defineField({ name: 'title', title: 'Tiêu đề nội dung', type: 'string', group: 'content' }),
    defineField({ name: 'lead', title: 'Đoạn giới thiệu ngắn', type: 'text', rows: 5, group: 'content' }),
    defineField({ name: 'body', title: 'Nội dung chi tiết', type: 'blockContent', group: 'content' }),
    defineField({
      name: 'gallery',
      title: 'Thư viện hình ảnh',
      description: 'Kéo thả để thay đổi thứ tự.',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
    }),
    defineField({
      name: 'capabilities',
      title: 'Năng lực chính',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Tiêu đề', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', title: 'Mô tả', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Trang giới thiệu ELH' }) },
})
