/* eslint-disable sort-keys */
/* eslint-disable sort-keys */
/* eslint-disable import/order */

import '@/styles/flowith/flowith.css'
import '@/styles/flowith/reactflow.css'
import '@xyflow/react/dist/style.css'
import { ViewTransitions } from 'next-view-transitions'
import './globals.css'

import { ThemeProvider } from '@/providers'

import { ClerkProvider } from '@clerk/nextjs'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { FullSiteNav } from '@/components/navbar/full-site-nav'
import {
  ailerons,
  bebasNeue,
  bebasNeuePro,
  centimaSans,
  commitMono,
  eirene,
  firaCode,
  futura,
  jetBrains,
  nunito,
  oswald,
  sentient,
  sourceSans,
  stellar,
} from './fonts'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL( defaultUrl ),
  title: 'Ultraterrestrial',
  description:
    'Tracking the state of Disclosure. A visually rich and collaborative effort that strives to document, explore and synthesize the past, present and future of the UFO phenomenon, not only in its own regard but particularly as it concerns the origins of humanity, the fundamental nature of reality and the relationship between the two.', // and the space between?
  // We must first understand what it is before we can understand what it means.  What tradeoffs known or unbeknownst to us may exist in attempting to answer the two questions in parallel? Is there really any other option?
}

export default function RootLayout( { children }: { children: React.ReactNode } ) {
  // bg-[url("/8k_stars_milky_way.jpeg")] bg-center bg-cover dark
  return (

    <ClerkProvider>
      <html lang='en' suppressHydrationWarning className='dark'>
        <body
          className={` ${oswald.variable} ${sourceSans.variable} ${ailerons.variable} ${futura.variable} ${firaCode.variable} ${eirene.variable} ${stellar.variable} ${centimaSans.variable} ${jetBrains.variable} ${nunito.variable} ${sentient.variable} ${bebasNeue.variable} ${commitMono.variable} ${bebasNeuePro.variable} ${GeistMono.variable} ${GeistSans.variable} dark`}>
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
            <main className='min-h-[100vh] min-w-screen relative site dark'>
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
  )
}
