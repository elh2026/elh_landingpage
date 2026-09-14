import { readdir } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const imageDirectory = path.resolve('public/images')
const filenames = await readdir(imageDirectory)
const inputs = filenames.filter((filename) => /^tech-\d+\.png$|^logo\d+\.png$/.test(filename))

for (const filename of inputs) {
  const source = path.join(imageDirectory, filename)
  const destination = path.join(imageDirectory, filename.replace(/\.png$/, '.webp'))
  const isLogo = filename.startsWith('logo')

  await sharp(source)
    .resize({ width: isLogo ? 400 : 500, withoutEnlargement: true })
    .webp({ quality: 78, alphaQuality: 85, effort: 6 })
    .toFile(destination)

  console.log(`${filename} -> ${path.basename(destination)}`)
}
