import './globals.css'

import { Oswald, Source_Sans_3 } from 'next/font/google'
// Montserrat, Oxanium, Inria_Sans, Rajdhani,
import { ThemeProvider } from '@/components/theme-provider'
import { PlanetMenu } from '@/components/planet-menu'

// Montserrat
// If loading a variable font, you don't need to specify the font weight
// const montserrat = Montserrat({
//   weight: ['400', '500', '600', '700'],
//   display: 'swap',
//   subsets: ['latin'],
// })

const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
})

const sourceSans = Source_Sans_3({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
})

// const oxanium = Oxanium({
//   weight: ['400', '500', '600', '700'],
//   display: 'swap',
//   subsets: ['latin'],
// })

// const inria = Inria_Sans({
//   weight: ['300', '400'],
//   display: 'swap',
//   subsets: ['latin'],
// })

// export const rajdhani = Rajdhani({
//   weight: ['300', '400'],
//   display: 'swap',
//   subsets: ['latin'],
// })

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
  // bg-background text-foreground
  // ${rajdhani.className}
  // ${montserrat.className}  ${oxanium.className}
  return (
    <html
      lang='en'
      className={`${oswald.className} ${sourceSans.className} `}
      suppressHydrationWarning
    >
      <body className='bg-[url("/8k_stars_milky_way.jpeg")] be-center bg-cover'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <PlanetMenu />
          <main className='min-h-[100vh] min-w-screen relative'>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
