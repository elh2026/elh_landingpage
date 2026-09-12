import { defineField, defineType } from 'sanity'

export const imageWithAltType = defineType({
  name: 'imageWithAlt',
  title: 'Hình ảnh',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Tệp hình ảnh',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Mô tả ảnh (Alt text)',
      description: 'Mô tả ngắn nội dung ảnh để hỗ trợ SEO và người dùng trình đọc màn hình.',
      type: 'string',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({ name: 'caption', title: 'Chú thích', type: 'string' }),
  ],
  preview: {
    select: { title: 'alt', media: 'image' },
  },
})
