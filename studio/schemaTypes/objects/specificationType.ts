import { defineField, defineType } from 'sanity'

export const specificationType = defineType({
  name: 'specification',
  title: 'Thông số kỹ thuật',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Tên thông số', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'value', title: 'Giá trị', type: 'string', validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'value' },
  },
})
