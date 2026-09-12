import { BlockContentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Bài viết',
  type: 'document',
  icon: BlockContentIcon,
  groups: [
    { name: 'content', title: 'Nội dung', default: true },
    { name: 'organization', title: 'Phân loại' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Tóm tắt',
      type: 'text',
      rows: 4,
      group: 'content',
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: 'coverImage',
      title: 'Ảnh đại diện',
      type: 'imageWithAlt',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Nội dung bài viết',
      type: 'blockContent',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Danh mục',
      type: 'reference',
      group: 'organization',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Thẻ',
      type: 'array',
      group: 'organization',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'tag' }] })],
    }),
    defineField({ name: 'authorName', title: 'Tác giả', type: 'string', group: 'organization' }),
    defineField({
      name: 'featured',
      title: 'Bài viết nổi bật',
      type: 'boolean',
      group: 'organization',
      initialValue: false,
    }),
    defineField({ name: 'publishedAt', title: 'Ngày xuất bản', type: 'datetime', group: 'organization' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [{ title: 'Mới nhất', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'authorName', media: 'coverImage.image' },
  },
})
