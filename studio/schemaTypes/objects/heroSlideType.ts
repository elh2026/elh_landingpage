import { defineField, defineType } from 'sanity'

export const heroSlideType = defineType({
  name: 'heroSlide',
  title: 'Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'description',
      title: 'Mô tả',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: 'image',
      title: 'Hình nền',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'ctaLabel', title: 'Nhãn nút', type: 'string' }),
    defineField({
      name: 'ctaHref',
      title: 'Đường dẫn của nút',
      type: 'string',
      description: 'Ví dụ: /catalog/ hoặc https://example.com',
    }),
    defineField({ name: 'enabled', title: 'Hiển thị banner', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description', media: 'image.image' },
  },
})
