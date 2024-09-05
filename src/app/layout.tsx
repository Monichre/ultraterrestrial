import '@xyflow/react/dist/style.css'

import './globals.css'
import { ViewTransitions } from 'next-view-transitions'

import { ThemeProvider } from '@/providers'

import DataLayer from '@/providers/data-layer'
import { Home, Sparkles, LibraryBig, Crosshair } from 'lucide-react'
import { ClerkProvider } from '@clerk/nextjs'

import {
  centima,
  centimaSans,
  eirene,
  stellar,
  ailerons,
  futura,
  oswald,
  sourceSans,
  firaCode,
  jetBrains,
} from './fonts'
import { FullSiteNav } from '@/components/navbar/full-site-nav'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Ultraterrestrial',
  description:
    'Tracking the state of Disclosure. A visually rich and collaborative effort that strives to document, explore and synthesize the past, present and future of the UFO phenomenon, not only in its own regard but particularly as it concerns the origins of humanity, the fundamental nature of reality and the relationship between the two.', // and the space between?
  // We must first understand what it is before we can understand what it means.  What tradeoffs known or unbeknownst to us may exist in attempting to answer the two questions in parallel? Is there really any other option?
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // bg-[url("/8k_stars_milky_way.jpeg")] bg-center bg-cover dark
  return (
    <ViewTransitions>
      <ClerkProvider>
        <html lang='en' suppressHydrationWarning>
          <body
            className={` ${oswald.variable} ${sourceSans.variable} ${ailerons.variable} ${futura.variable} ${firaCode.variable} ${centima.variable} ${eirene.variable} ${stellar.variable} ${centimaSans.variable} ${jetBrains.variable}`}
          >
            <ThemeProvider
              attribute='class'
              defaultTheme='dark'
              enableSystem
              // disableTransitionOnChange
            >
              {/* <DataLayer> */}

              <FullSiteNav />
              {/* <AnimationProvider> */}
              {/* <PageTransition> */}
              <main className='min-h-[100vh] min-w-screen relative dark'>
                {/* <NavBar navItems={navItems} /> */}
                {/* <HomePageNav navItems={navItems} /> */}
                {/* <FullSiteNav className='top-2' /> */}
                {children}
              </main>

              {/* </PageTransition> */}
              {/* </AnimationProvider> */}
            </ThemeProvider>
          </body>
          {/* </DataLayer> */}
        </html>
      </ClerkProvider>
    </ViewTransitions>
  )
}
