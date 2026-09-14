const SANITY_INTENT_PREFIX = '/structure/intent/'

export default {
  fetch(request: Request, env: Env): Response | Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname.startsWith(SANITY_INTENT_PREFIX)) {
      let decodedPath = url.pathname
      try {
        decodedPath = decodeURIComponent(url.pathname)
      } catch {
        return new Response('Invalid intent URL', { status: 400 })
      }
      if (decodedPath !== url.pathname) {
        const canonicalUrl = new URL(url)
        canonicalUrl.pathname = decodedPath
        return Response.redirect(canonicalUrl, 307)
      }

      const studioShellUrl = new URL('/index.html', url)
      return env.ASSETS.fetch(new Request(studioShellUrl, request))
    }

    return env.ASSETS.fetch(request)
  },
}
