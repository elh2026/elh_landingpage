import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'

import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-09-12' })
const root = resolve(process.cwd(), '..')

const block = (text: string, key: string) => ({
  _type: 'block', _key: key, style: 'normal', markDefs: [],
  children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
})

async function image(path: string, alt: string) {
  const asset = await client.assets.upload('image', createReadStream(resolve(root, 'public', path)), { filename: path.split('/').at(-1) })
  return { _type: 'imageWithAlt', image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }, alt }
}

async function main() {
  const existing = await client.fetch<string[]>(`*[_id in ["homePage","aboutPage","servicesPage","contactPage"]]._id`)
  const serviceIds = ['service-industry-4', 'service-automation', 'service-compressor', 'service-technical']
  const serviceTitles = ['Công nghiệp hóa 4.0', 'Cung cấp thiết bị tự động hóa', 'Máy nén khí', 'Dịch vụ kỹ thuật']
  const serviceSummaries = [
    'Thiết bị công nghệ mới kết hợp giải pháp phần mềm điều khiển cho nhà máy hiện đại.',
    'Thiết bị tự động hóa chất lượng từ các nhà cung cấp uy tín hàng đầu thế giới.',
    'Giải pháp máy nén khí công nghiệp phù hợp nhiều yêu cầu vận hành.',
    'Bảo dưỡng, sửa chữa và nâng cấp hệ thống thiết bị hiện hữu.',
  ]

  for (let i = 0; i < serviceIds.length; i += 1) {
    const serviceImage = await image(`images/service/service-${i + 1}.png`, serviceTitles[i])
    await client.createIfNotExists({ _id: serviceIds[i], _type: 'service', title: serviceTitles[i], slug: { _type: 'slug', current: serviceIds[i].replace('service-', '') }, summary: serviceSummaries[i], body: [block(serviceSummaries[i], `service-${i}`)], mainImage: serviceImage, ctaLabel: 'Xem thêm', featured: true, archived: false })
  }

  if (!existing.includes('homePage')) {
    const heroSlides = []
    for (let i = 1; i <= 4; i += 1) heroSlides.push({ _type: 'heroSlide', _key: `hero-${i}`, title: 'ELH SERVICE TECHNOLOGY TRADING Co.,LTD', description: 'Hòa chung xu hướng công nghiệp hóa 4.0. ELH thành lập để hỗ trợ khách hàng vững bước trong thiên niên kỷ mới.', image: await image(`images/photos/hero-${i}.webp`, `Banner ELH ${i}`), ctaLabel: 'Catalog', ctaHref: '/catalog', enabled: true })
    await client.create({ _id: 'homePage', _type: 'homePage', heroSlides, introTitle: 'ELH SERVICE TECHNOLOGY TRADING Co.,LTD', introText: 'Đối tác thiết bị và giải pháp kỹ thuật công nghiệp đáng tin cậy.', productsTitle: 'Sản phẩm nổi bật', servicesTitle: 'Dịch vụ chính của ELH', articlesTitle: 'Tin tức & sự kiện', contactTitle: 'Liên hệ với ELH', featuredServices: serviceIds.map((_ref) => ({ _type: 'reference', _key: _ref, _ref })) })
  }
  if (!existing.includes('aboutPage')) await client.create({ _id: 'aboutPage', _type: 'aboutPage', heroTitle: 'ELH SERVICE TECHNOLOGY TRADING Co.,LTD', heroImage: await image('images/about/gt2.png', 'Giới thiệu ELH'), title: 'Giới thiệu chung', lead: 'ELH được hình thành từ đội ngũ chuyên viên nhiều năm kinh nghiệm trong công nghiệp hóa, tự động hóa, máy nén khí và dịch vụ kỹ thuật.', body: [block('Với sự đa dạng về thiết bị và dịch vụ, ELH là đối tác tin cậy, đồng hành cùng khách hàng để nâng cao hiệu quả sản xuất.', 'about-body')], capabilities: ['Tầm nhìn', 'Sứ mệnh', 'Mục tiêu', 'Niềm tin'].map((title, i) => ({ _key: `cap-${i}`, title, description: 'Đồng hành cùng khách hàng bằng giải pháp kỹ thuật hiệu quả và giá trị bền vững.' })) })
  if (!existing.includes('servicesPage')) await client.create({ _id: 'servicesPage', _type: 'servicesPage', heroTitle: 'Dịch vụ ELH', heroImage: await image('images/service/service.png', 'Dịch vụ ELH'), title: 'Dịch vụ của ELH', intro: 'Các giải pháp kỹ thuật được thiết kế theo nhu cầu thực tế của doanh nghiệp.', serviceOrder: serviceIds.map((_ref) => ({ _type: 'reference', _key: _ref, _ref })) })
  if (!existing.includes('contactPage')) await client.create({ _id: 'contactPage', _type: 'contactPage', heroTitle: 'Liên hệ ELH', heroImage: await image('images/contact/contact.jpg', 'Liên hệ ELH'), formTitle: 'Liên hệ làm đại lý', formDescription: 'Để lại thông tin để đội ngũ ELH hỗ trợ bạn.', mapEmbedUrl: 'https://www.google.com/maps?q=23%2F3A%20%C4%90%C6%B0%E1%BB%9Dng%20TTH21%2C%20Ph%C6%B0%E1%BB%9Dng%20T%C3%A2n%20Th%E1%BB%9Bi%20Hi%E1%BB%87p%2C%20TP.HCM&output=embed', brandsTitle: 'Danh mục sản phẩm hãng sản xuất' })

  await client.createIfNotExists({ _id: 'siteSettings', _type: 'siteSettings', siteName: 'ELH - Every Little Helps', siteUrl: 'https://elh.vn' })
  await client.patch('siteSettings').setIfMissing({ companyName: 'CÔNG TY TNHH THƯƠNG MẠI KỸ THUẬT DỊCH VỤ ELH', contactEmail: 'info@elh.vn', salesEmail: 'sales-06@elh.vn', contactPhone: '(+84) 915 706 936', address: '23/3A Đường TTH21, Phường Tân Thới Hiệp, TP.HCM', mapsUrl: 'https://maps.app.goo.gl/Bfk51u4gX9vk5tX8A', topTags: ['Cảm biến nhiệt độ', 'Đồng hồ lưu lượng', 'Bơm hoá chất', 'Đá cắt', 'Khí nén'], salesPolicies: ['Chính sách bảo hành sản phẩm', 'Chính sách bảo mật thông tin', 'Quy trình giao hàng', 'Chính sách đổi trả hàng'], copyrightText: '©Copyright By ELH.' }).commit()

  const articles = await client.fetch<Array<{ _id: string }>>(`*[_type == "article" && !defined(section)]{_id}`)
  for (const article of articles) await client.patch(article._id).set({ section: 'news' }).commit()
  console.log(`Seed complete: ${serviceIds.length} services, ${articles.length} article sections updated.`)
}

main().catch((error) => { console.error(error); process.exit(1) })
