import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: process.env.ELH_PREVIEW_BUILD === 'true' ? undefined : 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  turbopack: {
    resolveAlias: process.env.ELH_PREVIEW_BUILD === 'true' ? {} : {
      'next-sanity/visual-editing': './src/components/NoopVisualEditing.tsx',
    },
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

export default nextConfig
