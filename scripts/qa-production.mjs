const baseUrl = new URL(process.argv[2] || 'https://elh.vn/')
const failures = []
const warnings = []

const decodeXml = (value) =>
  value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")

const fetchUrl = async (url, options = {}) => {
  try {
    return await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(20_000),
      headers: { 'user-agent': 'ELH production QA/1.0', ...options.headers },
      ...options,
    })
  } catch (error) {
    failures.push(`${url} - ${error instanceof Error ? error.message : String(error)}`)
    return null
  }
}

const sitemapUrl = new URL('/sitemap.xml', baseUrl)
const sitemapResponse = await fetchUrl(sitemapUrl)
if (!sitemapResponse?.ok) {
  failures.push(`${sitemapUrl} - HTTP ${sitemapResponse?.status || 'network error'}`)
}

const sitemapXml = sitemapResponse ? await sitemapResponse.text() : ''
if (/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[\da-f]+;)/i.test(sitemapXml)) {
  failures.push('sitemap.xml contains an unescaped ampersand')
}

const pageUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeXml(match[1]))
for (const requiredPath of ['/', '/contact/', '/products/', '/recruitment/', '/news-%26-event/']) {
  const requiredUrl = new URL(requiredPath, baseUrl).href
  if (!pageUrls.includes(requiredUrl)) failures.push(`sitemap.xml is missing ${requiredUrl}`)
}

const internalTargets = new Set(pageUrls)
const htmlResults = []
const runPool = async (items, worker, concurrency = 10) => {
  let cursor = 0
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor++
        await worker(items[index], index)
      }
    }),
  )
}

await runPool(pageUrls, async (url) => {
  const response = await fetchUrl(url)
  if (!response) return
  if (!response.ok) {
    failures.push(`${url} - HTTP ${response.status}`)
    return
  }

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('text/html')) return
  const html = await response.text()
  htmlResults.push({ url, html })
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${url} - missing page title`)
  if (/Tên miền không hợp lệ cho khóa trang web|Invalid ['"]pb['"] parameter|g-recaptcha/i.test(html)) {
    failures.push(`${url} - contains a retired CAPTCHA or invalid map marker`)
  }

  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const rawTarget = decodeXml(match[1])
    if (/^(?:mailto:|tel:|data:|blob:|javascript:|#)/i.test(rawTarget)) continue
    try {
      const target = new URL(rawTarget, url)
      target.hash = ''
      if (target.hostname === baseUrl.hostname) internalTargets.add(target.href)
    } catch {
      warnings.push(`${url} - cannot parse target ${rawTarget}`)
    }
  }
})

for (const rscPath of [
  '/catalog/__next.catalog.__PAGE__.txt?_rsc=qa',
  '/products/tempco/__next.products.$d$slug.__PAGE__.txt?_rsc=qa',
  '/news/certificate-14/__next.news.$d$slug.__PAGE__.txt?_rsc=qa',
]) {
  const response = await fetchUrl(new URL(rscPath, baseUrl))
  if (!response?.ok)
    failures.push(`${rscPath} - RSC navigation asset returned HTTP ${response?.status || 'network error'}`)
}

const targetList = [...internalTargets]
await runPool(
  targetList,
  async (url) => {
    const response = await fetchUrl(url, { headers: { range: 'bytes=0-0' } })
    if (response && !response.ok && response.status !== 206) failures.push(`${url} - HTTP ${response.status}`)
  },
  14,
)

const homeHtml = htmlResults.find(({ url }) => new URL(url).pathname === '/')?.html || ''
if (!/<main(?:\s|>)/i.test(homeHtml)) failures.push('Homepage is missing a main landmark')
if (!/title=["']Bản đồ vị trí Công ty ELH["']/i.test(homeHtml))
  failures.push('Homepage map iframe is missing its title')

console.log(`QA checked ${pageUrls.length} sitemap pages and ${targetList.length} internal URLs.`)
for (const warning of warnings) console.warn(`WARN: ${warning}`)
if (failures.length) {
  for (const failure of [...new Set(failures)]) console.error(`FAIL: ${failure}`)
  process.exitCode = 1
} else {
  console.log('PASS: sitemap, pages, internal links/assets, map and retired CAPTCHA checks passed.')
}
