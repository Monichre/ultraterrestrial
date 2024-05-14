import './globals.css'

import { Oswald, Source_Sans_3 } from 'next/font/google'
import localFont from 'next/font/local'
import { ThemeProvider } from '@/providers'
import { AnimationProvider } from '@/providers/animation-provider'
import { PageTransition } from '@/components/animations/page-transition'

const ailerons = localFont({
  src: './ailerons.woff2',
  display: 'swap',
  variable: '--font-ailerons',
})

const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-oswald',
})

const sourceSans = Source_Sans_3({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-source-sans',
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'UltraTerrestrial',
  description:
    'Tracking the State of Disclosure. Striving to document, explore and disseminate the past, present and future of the UFO topic and its bearing on humanity, the universe and our place within it.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={`${oswald.variable} ${sourceSans.variable} ${ailerons.variable} `}
      suppressHydrationWarning
    >
      <body className='bg-[url("/8k_stars_milky_way.jpeg")] be-center bg-cover'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <AnimationProvider>
            <PageTransition>
              <main className='min-h-[100vh] min-w-screen relative'>
                {children}
              </main>
            </PageTransition>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
