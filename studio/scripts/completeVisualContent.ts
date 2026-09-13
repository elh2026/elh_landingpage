import { createReadStream } from 'node:fs'
import { basename, resolve } from 'node:path'

import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-09-12' })
const repositoryRoot = resolve(process.cwd(), '..')

async function image(webPath: string, alt: string) {
  const sourceId = `elh-visual:${webPath}`
  let assetId = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && source.id == $sourceId][0]._id`,
    { sourceId },
  )
  if (!assetId) {
    const absolutePath = resolve(repositoryRoot, 'public', webPath.replace(/^\//, ''))
    const asset = await client.assets.upload('image', createReadStream(absolutePath), {
      filename: basename(absolutePath),
      source: { id: sourceId, name: 'ELH visual content', url: `https://elh.vn${webPath}` },
    })
    assetId = asset._id
  }
  return {
    _type: 'imageWithAlt',
    image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
    alt,
  }
}

async function run() {
  const introLogo = await image('/images/logo_elh.svg', 'Logo ELH')
  const introImages = await Promise.all([
    image('/images/about-1.jpg', 'Hoạt động của ELH'),
    image('/images/about-2.jpg', 'Đội ngũ ELH'),
    image('/images/machine.png', 'Thiết bị công nghiệp'),
    image('/images/chemical.jpg', 'Giải pháp hóa chất'),
  ])
  const gallery = await Promise.all([
    image('/images/about/gt2.png', 'Giới thiệu ELH'),
    image('/images/about/gt3.png', 'Năng lực ELH'),
    image('/images/about/gt5.png', 'Đối tác ELH'),
  ])
  const brandIds = await client.fetch<string[]>(`*[_type == "brand"] | order(name asc)._id`)

  await client.patch('homePage').setIfMissing({ introLogo, introImages }).commit()
  await client.patch('aboutPage').setIfMissing({ gallery }).commit()
  await client.patch('contactPage').setIfMissing({
    brands: brandIds.map((_ref) => ({ _type: 'reference', _key: _ref, _ref })),
  }).commit()

  console.log(`Completed visual content: ${introImages.length} home images, ${gallery.length} about images, ${brandIds.length} brands.`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
