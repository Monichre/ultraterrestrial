import {
  Oswald,
  Source_Sans_3,
  Fira_Code,
  JetBrains_Mono,
} from 'next/font/google'
import localFont from 'next/font/local'

export const centima = localFont({
  src: [
    {
      path: './centima/Centima-Mono-W01-Bold.woff',
      weight: 'bold',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-centima',
})

export const centimaSans = localFont({
  src: [
    {
      path: './centima/CentimaProSans-Bold.woff',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: './centima/CentimaProSans.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-centima-sans',
})

export const eirene = localFont({
  src: [
    {
      path: './Eirene-Sans-Font-Family/EireneSans-Bold.otf',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: './Eirene-Sans-Font-Family/EireneSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-eirene',
})

export const stellar = localFont({
  src: [
    {
      path: './stellar/PPStellar-Bold.woff',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: './stellar/PPStellar-Light.woff',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-stellar',
})

export const ailerons = localFont({
  src: './ailerons.woff2',
  display: 'swap',
  variable: '--font-ailerons',
})

export const futura = localFont({
  src: [
    {
      path: './futura/futura.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './futura/futura medium bt.ttf',
      weight: '500',
      style: 'normal',
    },

    {
      path: './futura/Futura Bold font.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-futura',
})

export const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-oswald',
})

export const sourceSans = Source_Sans_3({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-source-sans',
})

export const fireCode = Fira_Code({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-fire-code',
})

export const jetBrains = JetBrains_Mono({
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-jetbrains',
})
