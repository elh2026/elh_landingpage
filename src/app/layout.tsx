import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import localFont from 'next/font/local'
import { VisualEditing } from 'next-sanity/visual-editing'

import './globals.css'
import 'swiper/css'
import 'swiper/css/navigation'

import Layout from '@/components/Layout'
import PreviewToolbar from '@/components/PreviewToolbar'
import { getSiteSettings } from '@/sanity/queries'

const utm_avo = localFont({
  src: [
    {
      path: './fonts/UTM_Avo.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/UTM_AvoBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
})

const iCielGotham = localFont({
  src: [
    {
      path: './fonts/iCielGotham-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/iCielGotham-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--iCielGotham',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.ELH_PREVIEW_BUILD === 'true' ? 'https://preview.elh.vn' : 'https://elh.vn'),
  title: {
    default: 'ELH - Every Little Helps',
    template: '%s | ELH',
  },
  description: 'ELH cung cấp thiết bị và giải pháp kỹ thuật công nghiệp.',
  robots: process.env.ELH_PREVIEW_BUILD === 'true' ? { index: false, follow: false } : undefined,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const previewBuild = process.env.ELH_PREVIEW_BUILD === 'true'
  const isDraft = previewBuild ? (await draftMode()).isEnabled : false
  const settings = await getSiteSettings()

  return (
    <html lang="vi">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = 'manual'`,
          }}
        />
      </head>
      <body className={`${utm_avo.className} ${iCielGotham.variable} antialiased`}>
        <Layout settings={settings}>{children}</Layout>
        {isDraft && <VisualEditing />}
        {isDraft && <PreviewToolbar />}
      </body>
    </html>
  )
}
