type Env = {
  ASSETS: {
    fetch(request: Request): Promise<Response>
  }
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    let response = await env.ASSETS.fetch(request)

    if (response.status === 404) {
      const url = new URL(request.url)
      if (url.pathname.includes('__next.') && url.pathname.endsWith('.__PAGE__.txt')) {
        url.pathname = url.pathname
          .replace(/\.(?:\$d\$|%24d%24)/gi, '/$d$')
          .replace(/\.__PAGE__\.txt$/, '/__PAGE__.txt')
        response = await env.ASSETS.fetch(new Request(url, request))
      }
    }

    const contentType = response.headers.get('content-type') || ''

    if (!contentType.includes('text/html')) return response

    const headers = new Headers(response.headers)
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  },
}

export default worker
