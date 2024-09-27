import {
  Oswald,
  Source_Sans_3,
  Fira_Code,
  JetBrains_Mono,
} from 'next/font/google'
import localFont from 'next/font/local'

export const centimaSans = localFont({
  src: [
    {
      path: 'fonts/centima/Centima-Mono-W01-Bold.woff',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: '/fonts/centima/Centima-Mono-W01-Bold.eot',
      weight: '700',
      style: 'normal',
    },

    {
      path: '/fonts/centima/Centima-Mono-W01-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '/fonts/centima/Centima-Mono-W01-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '/fonts/centima/Centima-Mono-W01-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '/fonts/centima/CentimaProSans-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '/fonts/centima/CentimaProSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '/fonts/centima/CentimaProSans-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '/fonts/centima/CentimaProSans-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '/fonts/centima/CentimaProSans.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/centima/CentimaProSans.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/centima/CentimaProSansLight-Italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '/fonts/centima/CentimaProSansLight.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '/fonts/centima/CentimaProSerif-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '/fonts/centima/CentimaProSerif-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '/fonts/centima/CentimaProSerif-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '/fonts/centima/CentimaProSerif.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/centima/CentimaProSerif.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/centima/CentimaProSerifLight-Italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '/fonts/centima/CentimaProSerifLight.woff2',
      weight: '300',
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
//   variable: '--font-sentient',
// })

export const jetBrains = localFont({
  src: 'fonts/jetbrains/JetBrainsMono-VariableFont_wght.ttf',
  // weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sentient',
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
      path: 'fonts/BebasNeue/BebasNeue-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-Bolditalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-Book.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-Bookitalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedBolditalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedBook.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedBookitalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedLight.woff2',
      weight: '200',
      style: 'normal',
    },

    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedMedium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedMediumit.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedThin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedThinitalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-Light.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-LightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-Middle.woff2',
      weight: '500',
      style: 'normal',
    },

    {
      path: 'fonts/BebasNeue/BebasNeuePro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },

    {
      path: 'fonts/BebasNeue/BebasNeuePro-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-Thinitalic.woff2',
      weight: '100',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-bebasNeue',
})
