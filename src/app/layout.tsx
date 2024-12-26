
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Footer } from './(root)/_components/layouts/Footer'
import AuthProvider from '../components/auth-provider'
import NavigationMain from './pathname-nav'
import Loading from './loading'
import './globals.css'
import CookieConsent from '@/components/CookieConsent'

export const metadata: Metadata = {
  title: "SIIT Academy Club - OrcaBOT",
  description: "Academy Club of Sirindhorn International Institute of Technology",

  metadataBase: new URL('https://orcabot.in.th'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'th-TH': '/th-TH',
    },
  },
  openGraph: {
    url: 'https://orcabot.in.th',
    type: 'website', // or website
    locale: 'th_TH',
    title: "SIIT Academy Club - OrcaBOT",
    description: "Academy Club of Sirindhorn International Institute of Technology",
    images: [
      {
        url: 'https://i.imgur.com/ikXg6UW.png',
        width: 200,
        height: 200,
        alt: 'OrcaBOT',
      },
    ],
  },
  twitter: {
    title: "SIIT OrcaBOT",
    description: "Academy Club of Sirindhorn International Institute of Technology",
    card: 'summary_large_image',
    site: 'SIIT Academy Club - OrcaBOT',
    creator: 'SIIT Academy Club - OrcaBOT',
    images: [
      'https://i.imgur.com/ikXg6UW.png',
    ],
  },

}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className="" suppressHydrationWarning={true}>
        <Suspense fallback={<Loading children={undefined} />}>
          <AuthProvider>
            <ThemeProvider
              enableSystem
              attribute='class'
              defaultTheme='system'
              disableTransitionOnChange
              themes={['light', 'dark']}
            >
              <NavigationMain />
              <CookieConsent />
              {children}
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  )
}
