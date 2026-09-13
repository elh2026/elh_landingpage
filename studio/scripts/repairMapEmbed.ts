import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-09-13' })
const mapEmbedUrl =
  'https://www.google.com/maps?q=23%2F3A%20%C4%90%C6%B0%E1%BB%9Dng%20TTH21%2C%20Ph%C6%B0%E1%BB%9Dng%20T%C3%A2n%20Th%E1%BB%9Bi%20Hi%E1%BB%87p%2C%20TP.HCM&output=embed'

client
  .patch('contactPage')
  .set({ mapEmbedUrl })
  .commit()
  .then(() => console.log('Repaired the published contactPage Google Maps embed URL.'))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
