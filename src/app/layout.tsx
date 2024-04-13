import './globals.css'

import { Montserrat } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

// Montserrat
// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // bg-background text-foreground
  return (
    <html lang='en' className={montserrat.className} suppressHydrationWarning>
      <body className='bg-[url("/8k_stars_milky_way.jpeg")] be-center bg-cover'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          {/* <main className='min-h-screen flex flex-col items-center'> */}
          {children}
          {/* </main> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
