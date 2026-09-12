import { BlockContentIcon } from '@sanity/icons/BlockContent'
import { CogIcon } from '@sanity/icons/Cog'
import { DocumentsIcon } from '@sanity/icons/Documents'
import { PackageIcon } from '@sanity/icons/Package'
import { TagIcon } from '@sanity/icons/Tag'
import { UsersIcon } from '@sanity/icons/Users'
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Quản trị nội dung ELH')
    .items([
      S.listItem().title('Sản phẩm').icon(PackageIcon).child(S.documentTypeList('product').title('Sản phẩm')),
      S.listItem().title('Bài viết').icon(BlockContentIcon).child(S.documentTypeList('article').title('Bài viết')),
      S.divider(),
      S.listItem().title('Danh mục').icon(DocumentsIcon).child(S.documentTypeList('category').title('Danh mục')),
      S.listItem().title('Hãng sản xuất').icon(UsersIcon).child(S.documentTypeList('brand').title('Hãng sản xuất')),
      S.listItem().title('Thẻ (tag)').icon(TagIcon).child(S.documentTypeList('tag').title('Thẻ')),
      S.divider(),
      S.listItem()
        .title('Cấu hình website')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])
