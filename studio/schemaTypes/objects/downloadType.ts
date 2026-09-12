import { defineField, defineType } from 'sanity'

export const downloadType = defineType({
  name: 'download',
  title: 'Tài liệu tải về',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Tên tài liệu', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'file',
      title: 'Tệp PDF',
      type: 'file',
      options: { accept: 'application/pdf' },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: 'title' } },
})
