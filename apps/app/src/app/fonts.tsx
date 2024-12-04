import {
  Fira_Code,
  Oswald,
  Source_Sans_3
} from 'next/font/google'
import localFont from 'next/font/local'
export const lukasSans = localFont( {
  src: './fonts/LukasSansVar-Roman-v-0.0.2.woff2',
  variable: '--font-lukas-sans',
  display: 'swap'
} )

export const centimaSans = localFont( {
  src: [
    {
      path: 'fonts/centima/CentimaProSans-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/centima/CentimaProSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },

    {
      path: 'fonts/centima/CentimaProSans.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/centima/CentimaProSans.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/centima/CentimaProSansLight-Italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: 'fonts/centima/CentimaProSansLight.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/centima/CentimaProSerif-Bold.woff2',
      weight: '700',
      style: 'normal',
    },

    {
      path: 'fonts/centima/CentimaProSerif-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'fonts/centima/CentimaProSerif.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/centima/CentimaProSerif.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/centima/CentimaProSerifLight-Italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: 'fonts/centima/CentimaProSerifLight.woff2',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-centima-sans',
} )

export const eirene = localFont( {
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
} )

export const stellar = localFont( {
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
} )

export const ailerons = localFont( {
  src: [
    {
      path: 'fonts/ailerons.woff2',
      style: 'normal',
    },
  ],
  display: 'swap',
  weight: '700',
  variable: '--font-ailerons',
} )

export const futura = localFont( {
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
} )

export const commitMono = localFont( {
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
} )

export const oswald = Oswald( {
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-oswald',
} )

export const sourceSans = Source_Sans_3( {
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '---font-source-sans',
} )

export const firaCode = Fira_Code( {
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-fira-code',
} )

// export const jetBrains = JetBrains_Mono({
//   weight: ['300', '400', '500', '600', '700', '800'],
//   display: 'swap',
//   subsets: ['latin'],
//   variable: '--font-sentient',
// })

export const jetBrains = localFont( {
  src: 'fonts/jetbrains/JetBrainsMono-VariableFont_wght.ttf',
  // weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jetbrains',
} )

export const nunito = localFont( {
  src: [
    {
      path: 'fonts/Nunito/Fonts/WEB/fonts/Nunito-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-nunito',
} )

export const sentient = localFont( {
  src: [
    {
      path: 'fonts/Sentient/Fonts/WEB/fonts/Sentient-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-sentient',
} )

export const bebasNeue = localFont( {
  src: [
    {
      path: 'fonts/BebasNeue/BebasNeue-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-bebasNeue',
} )

export const bebasNeuePro = localFont( {
  src: [
    {
      path: 'fonts/BebasNeue/BebasNeuePro-Bold.ttf',
      weight: '700',
      style: 'normal',
    },

    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedBold.ttf',
      weight: '700',
      style: 'normal',
    },

    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedBook.ttf',
      weight: '300',
      style: 'normal',
    },

    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedLight.ttf',
      weight: '200',
      style: 'normal',
    },

    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedMedium.ttf',
      weight: '500',
      style: 'normal',
    },

    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedRegular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedThin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-ExpandedThinitalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-Light.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-LightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-Middle.ttf',
      weight: '500',
      style: 'normal',
    },

    {
      path: 'fonts/BebasNeue/BebasNeuePro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },

    {
      path: 'fonts/BebasNeue/BebasNeuePro-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: 'fonts/BebasNeue/BebasNeuePro-Thinitalic.ttf',
      weight: '100',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-bebasNeuePro',
} )
