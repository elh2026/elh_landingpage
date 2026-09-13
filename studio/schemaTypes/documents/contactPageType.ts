import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Trang liên hệ',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    { name: 'hero', title: 'Banner', default: true },
    { name: 'content', title: 'Nội dung' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'heroTitle', title: 'Tiêu đề banner', type: 'string', group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Hình nền banner', type: 'imageWithAlt', group: 'hero' }),
    defineField({ name: 'formTitle', title: 'Tiêu đề biểu mẫu', type: 'string', group: 'content' }),
    defineField({ name: 'formDescription', title: 'Mô tả biểu mẫu', type: 'text', rows: 3, group: 'content' }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Đường dẫn nhúng Google Maps',
      description: 'Dùng đường dẫn trong thuộc tính src của mã Google Maps Embed.',
      type: 'url',
      group: 'content',
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),
    defineField({ name: 'brandsTitle', title: 'Tiêu đề khu vực hãng sản xuất', type: 'string', group: 'content' }),
    defineField({
      name: 'brands',
      title: 'Danh sách hãng hiển thị',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'brand' }] })],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Trang liên hệ ELH' }) },
})
