import localFont from 'next/font/local'
export const lukasSans = localFont( {
  src: './fonts/LukasSans.woff2',
  variable: '--font-lukas-sans',
  display: 'swap'
} )

export const neueHaasGrotesk = localFont( {
  src: './fonts/Neue Haas Grotesk Text Pro 55 Roman/Neue Haas Grotesk Text Pro 55 Roman.woff',
  variable: '--font-neue-haas',
  display: 'swap'
} )

export const monumentGroteskMono = localFont( {
  src: './fonts/MonumentGroteskMono/ABCMonumentGroteskMono-Regular-Trial.woff2',
  variable: '--font-monument-mono',
  display: 'swap'
} )

// export const monumentGrotesk = localFont( {
//   src: './fonts/Monument-Grotesk/ABCMonument-Grotesk.woff2',
//   variable: '--font-monument',
//   display: 'swap'
// } )

export const monumentGrotesk = localFont( {
  src: './fonts/Monument-Grotesk/ABCMonumentGrotesk-Regular-Trial.woff2',
  variable: '--font-monument',
  display: 'swap'
} )
