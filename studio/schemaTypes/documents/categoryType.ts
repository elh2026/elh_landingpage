import { DocumentsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Danh mục',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({ name: 'title', title: 'Tên danh mục', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', title: 'Mô tả', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Ảnh danh mục', type: 'imageWithAlt' }),
    defineField({
      name: 'parent',
      title: 'Danh mục cha',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: { select: { title: 'title', subtitle: 'parent.title', media: 'image.image' } },
})
