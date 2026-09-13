import { HomeIcon } from '@sanity/icons/Home'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Trang chủ',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Banner', default: true },
    { name: 'intro', title: 'Giới thiệu' },
    { name: 'sections', title: 'Các khu vực' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Danh sách banner',
      description: 'Kéo thả để thay đổi thứ tự hiển thị.',
      type: 'array',
      group: 'hero',
      of: [defineArrayMember({ type: 'heroSlide' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: 'introTitle', title: 'Tiêu đề giới thiệu', type: 'string', group: 'intro' }),
    defineField({ name: 'introText', title: 'Nội dung giới thiệu', type: 'text', rows: 5, group: 'intro' }),
    defineField({ name: 'introLogo', title: 'Logo trong phần giới thiệu', type: 'imageWithAlt', group: 'intro' }),
    defineField({
      name: 'introImages',
      title: 'Hình ảnh giới thiệu',
      type: 'array',
      group: 'intro',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
    }),
    defineField({ name: 'productsTitle', title: 'Tiêu đề khu vực sản phẩm', type: 'string', group: 'sections' }),
    defineField({
      name: 'featuredProducts',
      title: 'Sản phẩm nổi bật',
      type: 'array',
      group: 'sections',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'product' }] })],
    }),
    defineField({ name: 'servicesTitle', title: 'Tiêu đề khu vực dịch vụ', type: 'string', group: 'sections' }),
    defineField({
      name: 'featuredServices',
      title: 'Dịch vụ nổi bật',
      type: 'array',
      group: 'sections',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
    }),
    defineField({ name: 'articlesTitle', title: 'Tiêu đề khu vực bài viết', type: 'string', group: 'sections' }),
    defineField({
      name: 'featuredArticles',
      title: 'Bài viết nổi bật',
      type: 'array',
      group: 'sections',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'article' }] })],
    }),
    defineField({ name: 'contactTitle', title: 'Tiêu đề khu vực liên hệ', type: 'string', group: 'sections' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Trang chủ ELH' }) },
})
