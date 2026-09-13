import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

import { locations, mainDocuments } from './presentation'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { templates } from './templates'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId) {
  throw new Error('Missing SANITY_STUDIO_PROJECT_ID')
}

export default defineConfig({
  name: 'elh_content_studio',
  title: 'ELH Content Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure, title: 'Quản lý nội dung' }),
    presentationTool({
      title: 'Xem & chỉnh trên website',
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_URL || 'https://preview.elh.vn',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      allowOrigins: ['http://localhost:*', 'https://preview.elh.vn'],
      resolve: { mainDocuments, locations },
    }),
  ],
  schema: {
    types: schemaTypes,
    templates,
  },
})
