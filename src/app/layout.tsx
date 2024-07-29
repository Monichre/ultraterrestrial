import '@xyflow/react/dist/style.css'

import './globals.css'

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

const navItems = [
  {
    name: 'Home',
    link: '/',
    icon: <Home strokeWidth={1} />,
  },
  {
    name: 'Explore',
    link: '/explore',
    icon: <Sparkles strokeWidth={1} />,
  },
  {
    name: 'History',
    link: '/history',
    icon: <LibraryBig strokeWidth={1} />,
  },
  {
    name: 'Sightings',
    link: '/sightings',
    icon: <Crosshair strokeWidth={1} />,
  },
]

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
  // bg-[url("/8k_stars_milky_way.jpeg")] bg-center bg-cover dark
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body
          className={`bg-[#fff] ${oswald.variable} ${sourceSans.variable} ${ailerons.variable} ${futura.variable} ${firaCode.variable} ${centima.variable} ${eirene.variable} ${stellar.variable} ${centimaSans.variable} ${jetBrains.variable} dark`}
        >
          <DataLayer>
            <ThemeProvider
              attribute='class'
              defaultTheme='dark'
              enableSystem
              disableTransitionOnChange
            >
              <FullSiteNav />
              {/* <AnimationProvider> */}
              {/* <PageTransition> */}
              <main className='min-h-[100vh] min-w-screen relative'>
                {/* <NavBar navItems={navItems} /> */}
                {/* <HomePageNav navItems={navItems} /> */}
                {/* <FullSiteNav className='top-2' /> */}
                {children}
              </main>

              {/* </PageTransition> */}
              {/* </AnimationProvider> */}
            </ThemeProvider>
          </DataLayer>
        </body>
      </html>
    </ClerkProvider>
  )
}
