export const DEFAULT_MAP_EMBED_URL =
  'https://www.google.com/maps?q=23%2F3A%20%C4%90%C6%B0%E1%BB%9Dng%20TTH21%2C%20Ph%C6%B0%E1%BB%9Dng%20T%C3%A2n%20Th%E1%BB%9Bi%20Hi%E1%BB%87p%2C%20TP.HCM&output=embed'

const extractUrl = (value: string) => {
  const iframeSource = value.match(/\bsrc=["']([^"']+)["']/i)?.[1]
  return (iframeSource || value).replaceAll('&amp;', '&').trim()
}

export const isValidGoogleMapsEmbedUrl = (value?: string) => {
  if (!value) return false

  try {
    const url = new URL(extractUrl(value))
    const isGoogleHost = /(^|\.)google\.[a-z.]+$/i.test(url.hostname)
    if (!isGoogleHost || !url.pathname.includes('/maps')) return false

    if (url.searchParams.get('output') === 'embed' && url.searchParams.has('q')) return true

    const pb = url.searchParams.get('pb')
    return Boolean(
      url.pathname.includes('/maps/embed') &&
        pb &&
        pb.length > 120 &&
        pb.includes('!2m3') &&
        pb.includes('!3m3'),
    )
  } catch {
    return false
  }
}

export const getGoogleMapsEmbedUrl = (value?: string) =>
  isValidGoogleMapsEmbedUrl(value) ? extractUrl(value as string) : DEFAULT_MAP_EMBED_URL
