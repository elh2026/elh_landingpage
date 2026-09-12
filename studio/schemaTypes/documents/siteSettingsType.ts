import { CogIcon } from '@sanity/icons/Cog'
import { defineField, defineType } from 'sanity'

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
      name: 'siteUrl',
      title: 'Địa chỉ website',
      type: 'url',
      initialValue: 'https://elh.vn',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'defaultSeo', title: 'SEO mặc định', type: 'seo' }),
    defineField({ name: 'contactEmail', title: 'Email liên hệ', type: 'string' }),
    defineField({ name: 'contactPhone', title: 'Số điện thoại', type: 'string' }),
    defineField({ name: 'address', title: 'Địa chỉ', type: 'text', rows: 3 }),
    defineField({ name: 'facebookUrl', title: 'Facebook', type: 'url' }),
    defineField({ name: 'linkedInUrl', title: 'LinkedIn', type: 'url' }),
  ],
  preview: {
    prepare: () => ({ title: 'Cấu hình website ELH' }),
  },
})
