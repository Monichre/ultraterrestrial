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
      path: 'fonts/centima/Centima-Mono-W01-Bold.woff',
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
      path: 'fonts/centima/CentimaProSans-Bold.woff',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: 'fonts/centima/CentimaProSans.woff',
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
      path: 'fonts/eirene/EireneSans-Bold.otf',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: 'fonts/eirene/EireneSans-Regular.otf',
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
      path: 'fonts/stellar/PPStellar-Bold.woff',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: 'fonts/stellar/PPStellar-Light.woff',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-stellar',
})

export const ailerons = localFont({
  src: [
    {
      path: 'fonts/ailerons.woff2',
      style: 'normal',
    },
  ],
  display: 'swap',
  weight: '700',
  variable: '--font-ailerons',
})

export const futura = localFont({
  src: [
    {
      path: 'fonts/futura/futura.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/futura/futura medium bt.ttf',
      weight: '500',
      style: 'normal',
    },

    {
      path: 'fonts/futura/Futura Bold font.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-futura',
})

export const commitMono = localFont({
  src: [
    {
      path: 'fonts/CommitMono/CommitMono-400-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/CommitMono/CommitMono-700-Regular.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/CommitMono/CommitMono-700-Regular.otf',
      weight: '700',
      style: 'normal',
    },

    {
      path: 'fonts/CommitMono/CommitMono-700-Italic.otf',
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

export const firaCode = Fira_Code({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-fira-code',
})

// export const jetBrains = JetBrains_Mono({
//   weight: ['300', '400', '500', '600', '700', '800'],
//   display: 'swap',
//   subsets: ['latin'],
//   variable: '--font-jetbrains',
// })

export const jetBrains = localFont({
  src: 'fonts/jetbrains/JetBrainsMono-VariableFont_wght.ttf',
  // weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const nunito = localFont({
  src: [
    {
      path: 'fonts/Nunito/Fonts/WEB/fonts/Nunito-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-nunito',
})

export const sentient = localFont({
  src: [
    {
      path: 'fonts/Sentient/Fonts/WEB/fonts/Sentient-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-sentient',
})

export const bebasNeue = localFont({
  src: [
    {
      path: 'fonts/BebasNeue/Fonts/WEB/fonts/BebasNeue-Regular.eot',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-bebas-neue',
})
