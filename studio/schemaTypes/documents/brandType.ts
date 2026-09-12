import { UsersIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const brandType = defineType({
  name: 'brand',
  title: 'Hãng sản xuất',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'name', title: 'Tên hãng', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'logo', title: 'Logo', type: 'imageWithAlt' }),
    defineField({ name: 'website', title: 'Website chính thức', type: 'url' }),
    defineField({ name: 'description', title: 'Giới thiệu', type: 'blockContent' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: { select: { title: 'name', media: 'logo.image' } },
})
