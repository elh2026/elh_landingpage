import { TagIcon } from '@sanity/icons/Tag'
import { defineField, defineType } from 'sanity'

export const tagType = defineType({
  name: 'tag',
  title: 'Thẻ',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({ name: 'title', title: 'Tên thẻ', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socialHashtag',
      title: 'Hashtag dùng trên mạng xã hội',
      type: 'string',
      description: 'Ví dụ: #MayBomCongNghiep. Không dùng trường này để nhồi từ khóa SEO.',
      validation: (rule) =>
        rule
          .regex(/^#[A-Za-z0-9_]+$/, { name: 'hashtag' })
          .warning('Hashtag nên bắt đầu bằng # và không có khoảng trắng.'),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'socialHashtag' } },
})
