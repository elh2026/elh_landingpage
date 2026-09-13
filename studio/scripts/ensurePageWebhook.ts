import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-09-12' })

type Hook = { name: string; url: string }

async function run() {
  const hooks = await client.request<Hook[]>({ method: 'GET', url: '/hooks/projects/cm9sdebg' })
  if (hooks.some((hook) => hook.name === 'Cloudflare page content rebuild')) {
    console.log('Page content rebuild webhook already exists.')
    return
  }
  const source = hooks.find((hook) => hook.name === 'Cloudflare production rebuild')
  if (!source) throw new Error('Existing Cloudflare rebuild webhook was not found.')

  await client.request({
    method: 'POST',
    url: '/hooks/projects/cm9sdebg',
    body: {
      type: 'document',
      name: 'Cloudflare page content rebuild',
      url: source.url,
      dataset: 'production',
      description: 'Rebuild elh.vn after page, service, settings, brand, category, or tag content changes.',
      rule: {
        on: ['create', 'update', 'delete'],
        filter: '_type in ["homePage", "aboutPage", "servicesPage", "contactPage", "service", "siteSettings", "brand", "category", "tag"]',
        projection: '{_id, _type}',
      },
      apiVersion: 'v2025-02-19',
      httpMethod: 'POST',
      includeDrafts: false,
      includeAllVersions: false,
      isDisabledByUser: false,
    },
  })
  console.log('Created page content rebuild webhook.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
