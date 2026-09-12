import { articleType } from './documents/articleType'
import { brandType } from './documents/brandType'
import { categoryType } from './documents/categoryType'
import { productType } from './documents/productType'
import { siteSettingsType } from './documents/siteSettingsType'
import { tagType } from './documents/tagType'
import { blockContentType } from './objects/blockContentType'
import { downloadType } from './objects/downloadType'
import { imageWithAltType } from './objects/imageWithAltType'
import { seoType } from './objects/seoType'
import { specificationType } from './objects/specificationType'

export const schemaTypes = [
  imageWithAltType,
  blockContentType,
  seoType,
  specificationType,
  downloadType,
  categoryType,
  brandType,
  tagType,
  productType,
  articleType,
  siteSettingsType,
]
