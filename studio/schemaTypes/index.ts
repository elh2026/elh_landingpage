import { articleType } from './documents/articleType'
import { aboutPageType } from './documents/aboutPageType'
import { brandType } from './documents/brandType'
import { categoryType } from './documents/categoryType'
import { contactPageType } from './documents/contactPageType'
import { homePageType } from './documents/homePageType'
import { productType } from './documents/productType'
import { serviceType } from './documents/serviceType'
import { servicesPageType } from './documents/servicesPageType'
import { siteSettingsType } from './documents/siteSettingsType'
import { tagType } from './documents/tagType'
import { blockContentType } from './objects/blockContentType'
import { downloadType } from './objects/downloadType'
import { heroSlideType } from './objects/heroSlideType'
import { imageWithAltType } from './objects/imageWithAltType'
import { seoType } from './objects/seoType'
import { specificationType } from './objects/specificationType'

export const schemaTypes = [
  imageWithAltType,
  heroSlideType,
  blockContentType,
  seoType,
  specificationType,
  downloadType,
  categoryType,
  brandType,
  tagType,
  productType,
  articleType,
  serviceType,
  siteSettingsType,
  homePageType,
  aboutPageType,
  servicesPageType,
  contactPageType,
]
