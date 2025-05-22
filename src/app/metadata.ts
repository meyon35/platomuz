import { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://platomuzvar.com'),
  title: 'PLATOMUZ - Profesyonel Fotoğrafçılık',
  description: 'Profesyonel fotoğrafçılık hizmetleri, düğün fotoğrafçılığı, portre çekimleri ve daha fazlası.',
  keywords: [
    'fotoğrafçı',
    'profesyonel fotoğrafçı',
    'düğün fotoğrafçısı',
    'Isparta fotoğrafçı',
    'portre çekimi',
    'platomuz',
  ],
  authors: [{ name: 'PLATOMUZ' }],
  creator: 'PLATOMUZ',
  publisher: 'MEY MEDIA',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://platomuzvar.com',
    siteName: 'PLATOMUZ',
    title: 'PLATOMUZ - Profesyonel Fotoğrafçılık',
    description: 'Profesyonel fotoğrafçılık hizmetleri, düğün fotoğrafçılığı, portre çekimleri ve daha fazlası.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PLATOMUZ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PLATOMUZ - Profesyonel Fotoğrafçılık',
    description: 'Profesyonel fotoğrafçılık hizmetleri, düğün fotoğrafçılığı, portre çekimleri ve daha fazlası.',
    images: ['/og-image.jpg'],
  },
} 