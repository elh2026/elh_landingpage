import type { StructureBuilder, StructureResolver } from 'sanity/structure'

const singleton = (S: StructureBuilder, title: string, schemaType: string, documentId: string) =>
  S.listItem().title(title).child(S.document().schemaType(schemaType).documentId(documentId))

const filteredList = (S: StructureBuilder, title: string, filter: string, templateId: string) =>
  S.documentList()
    .title(title)
    .filter(filter)
    .apiVersion('2026-09-12')
    .initialValueTemplates([S.initialValueTemplateItem(templateId)])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Quản trị nội dung ELH')
    .items([
      S.listItem()
        .title('Chỉnh nội dung các trang')
        .child(
          S.list()
            .title('Chọn trang cần chỉnh')
            .items([
              singleton(S, 'Trang chủ', 'homePage', 'homePage'),
              singleton(S, 'Trang giới thiệu', 'aboutPage', 'aboutPage'),
              singleton(S, 'Trang dịch vụ', 'servicesPage', 'servicesPage'),
              singleton(S, 'Trang liên hệ', 'contactPage', 'contactPage'),
              singleton(S, 'Thông tin dùng chung', 'siteSettings', 'siteSettings'),
            ]),
        ),
      S.divider(),
      S.listItem().title('Sản phẩm').child(S.documentTypeList('product').title('Tất cả sản phẩm')),
      S.listItem().title('Dịch vụ').child(S.documentTypeList('service').title('Tất cả dịch vụ')),
      S.listItem()
        .title('Tư vấn & bài viết')
        .child(
          S.list()
            .title('Tư vấn & bài viết')
            .items([
              S.listItem().title('Tất cả bài viết').child(S.documentTypeList('article').title('Tất cả bài viết')),
              S.listItem()
                .title('Bản nháp')
                .child(filteredList(S, 'Bản nháp', `_type == "article" && _id in path("drafts.**")`, 'article-news')),
              S.listItem()
                .title('Đã xuất bản')
                .child(filteredList(S, 'Đã xuất bản', `_type == "article" && !(_id in path("drafts.**"))`, 'article-news')),
              S.listItem()
                .title('Tin tức & sự kiện')
                .child(
                  filteredList(
                    S,
                    'Tin tức & sự kiện',
                    `_type == "article" && section != "recruitment" && coalesce(featured, false) != true`,
                    'article-news',
                  ),
                ),
              S.listItem()
                .title('Tin nổi bật')
                .child(filteredList(S, 'Tin nổi bật', `_type == "article" && featured == true`, 'article-featured')),
              S.listItem()
                .title('Tin tuyển dụng')
                .child(filteredList(S, 'Tin tuyển dụng', `_type == "article" && section == "recruitment"`, 'article-recruitment')),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Tạo nội dung mới')
        .child(
          S.list()
            .title('Tạo nội dung mới')
            .items([
              S.listItem()
                .title('Tạo sản phẩm mới')
                .child(S.document().schemaType('product').initialValueTemplate('product-default')),
              S.listItem()
                .title('Tạo dịch vụ mới')
                .child(S.document().schemaType('service').initialValueTemplate('service-default')),
              S.listItem()
                .title('Tạo tin tức mới')
                .child(S.document().schemaType('article').initialValueTemplate('article-news')),
              S.listItem()
                .title('Tạo tin nổi bật mới')
                .child(S.document().schemaType('article').initialValueTemplate('article-featured')),
              S.listItem()
                .title('Tạo tin tuyển dụng mới')
                .child(S.document().schemaType('article').initialValueTemplate('article-recruitment')),
            ]),
        ),
      S.divider(),
      S.listItem().title('Danh mục').child(S.documentTypeList('category').title('Danh mục')),
      S.listItem().title('Hãng sản xuất').child(S.documentTypeList('brand').title('Hãng sản xuất')),
      S.listItem().title('Thẻ (tag)').child(S.documentTypeList('tag').title('Thẻ')),
    ])
