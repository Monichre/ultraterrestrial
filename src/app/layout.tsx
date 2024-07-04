import '@xyflow/react/dist/style.css'

import './globals.css'

import { Oswald, Source_Sans_3 } from 'next/font/google'
import localFont from 'next/font/local'
import { ThemeProvider } from '@/providers'
import { AnimationProvider } from '@/providers/animation-provider'
import { PageTransition } from '@/components/ui/animations/page-transition'
import DataLayer from '@/providers/data-layer'
import { Home, Sparkles, LibraryBig, Crosshair } from 'lucide-react'
import { NavBar } from '@/components/navbar'

const ailerons = localFont({
  src: './_fonts/ailerons.woff2',
  display: 'swap',
  variable: '--font-ailerons',
})

const futura = localFont({
  src: [
    {
      path: './_fonts/futura/futura.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './_fonts/futura/futura medium bt.ttf',
      weight: '500',
      style: 'normal',
    },

    {
      path: './_fonts/futura/Futura Bold font.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-futura',
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
  return (
    <html
      lang='en'
      className={`${oswald.variable} ${sourceSans.variable} ${ailerons.variable} ${futura.variable}`}
      suppressHydrationWarning
    >
      <body className='bg-[url("/8k_stars_milky_way.jpeg")] be-center bg-cover dark'>
        <DataLayer>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <AnimationProvider>
              <PageTransition>
                <main className='min-h-[100vh] min-w-screen relative'>
                  <NavBar navItems={navItems} />
                  {children}
                </main>
              </PageTransition>
            </AnimationProvider>
          </ThemeProvider>
        </DataLayer>
      </body>
    </html>
  )
}
