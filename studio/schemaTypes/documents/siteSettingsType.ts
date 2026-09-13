import { CogIcon } from '@sanity/icons/Cog'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Cấu hình website',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Tên website',
      type: 'string',
      initialValue: 'ELH - Every Little Helps',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'companyName',
      title: 'Tên pháp lý của công ty',
      type: 'string',
      initialValue: 'CÔNG TY TNHH THƯƠNG MẠI KỸ THUẬT DỊCH VỤ ELH',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Địa chỉ website',
      type: 'url',
      initialValue: 'https://elh.vn',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'defaultSeo', title: 'SEO mặc định', type: 'seo' }),
    defineField({ name: 'contactEmail', title: 'Email liên hệ', type: 'string', validation: (rule) => rule.email() }),
    defineField({ name: 'salesEmail', title: 'Email kinh doanh', type: 'string', validation: (rule) => rule.email() }),
    defineField({ name: 'contactPhone', title: 'Số điện thoại', type: 'string' }),
    defineField({ name: 'address', title: 'Địa chỉ', type: 'text', rows: 3 }),
    defineField({ name: 'mapsUrl', title: 'Đường dẫn Google Maps', type: 'url' }),
    defineField({ name: 'facebookUrl', title: 'Facebook', type: 'url' }),
    defineField({ name: 'linkedInUrl', title: 'LinkedIn', type: 'url' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube', type: 'url' }),
    defineField({
      name: 'topTags',
      title: 'Top Tags ở đầu website',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'salesPolicies',
      title: 'Chính sách bán hàng ở chân trang',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'copyrightText', title: 'Dòng bản quyền', type: 'string', initialValue: '©Copyright By ELH.' }),
  ],
  preview: {
    prepare: () => ({ title: 'Cấu hình website ELH' }),
  },
})
