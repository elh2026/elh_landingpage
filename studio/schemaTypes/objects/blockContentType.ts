import { defineArrayMember, defineType } from 'sanity'

export const blockContentType = defineType({
  name: 'blockContent',
  title: 'Nội dung',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Đoạn văn', value: 'normal' },
        { title: 'Tiêu đề 2', value: 'h2' },
        { title: 'Tiêu đề 3', value: 'h3' },
        { title: 'Trích dẫn', value: 'blockquote' },
      ],
      lists: [
        { title: 'Danh sách chấm', value: 'bullet' },
        { title: 'Danh sách số', value: 'number' },
      ],
      marks: {
        annotations: [
          {
            name: 'link',
            title: 'Liên kết',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (rule) => rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: 'imageWithAlt' }),
  ],
})
