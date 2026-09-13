import { CogIcon } from '@sanity/icons/Cog'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const servicesPageType = defineType({
  name: 'servicesPage',
  title: 'Trang dịch vụ',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'hero', title: 'Banner', default: true },
    { name: 'content', title: 'Nội dung' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'heroTitle', title: 'Tiêu đề banner', type: 'string', group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Hình nền banner', type: 'imageWithAlt', group: 'hero' }),
    defineField({ name: 'title', title: 'Tiêu đề danh sách dịch vụ', type: 'string', group: 'content' }),
    defineField({ name: 'intro', title: 'Mô tả mở đầu', type: 'text', rows: 4, group: 'content' }),
    defineField({
      name: 'serviceOrder',
      title: 'Dịch vụ và thứ tự hiển thị',
      description: 'Tạo dịch vụ trước, sau đó thêm vào đây và kéo thả để sắp xếp.',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Trang dịch vụ ELH' }) },
})
