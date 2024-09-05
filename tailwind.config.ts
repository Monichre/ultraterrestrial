import type { Config } from 'tailwindcss'
const tailwindAnimate = require('tailwindcss-animate')
const svgToDataUri = require('mini-svg-data-uri')

const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

const storyPaths = [
  './src/**/*.mdx',
  './src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  './src/**/**/*.stories.@(js|jsx|mjs|ts|tsx)',
]

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars,
  })
}

const config = {
  darkMode: 'selector',
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/stories/*.{ts,tsx}',
    './src/stories/**/*.stories.{ts,tsx}',
    ...storyPaths,
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        oswald: ['var(--font-oswald)'],
        source: ['var(--font-source-sans)'],
        ailerons: ['var(--font-ailerons)'],
        futura: ['var(--font-futura)'],
        firaCode: ['var(--font-fira-code)'],
        centima: ['var(--font-centima})'],
        centimaSans: ['var(--font-centima-sans)'],
        eirene: ['var(--font-eirene})'],
        stellar: ['var(--font-stellar})'],
        jetbrains: ['var(--font-jetbrains)'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'radar-spin': 'radar-spin 10s linear infinite',
        shine: 'shine 2s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        'meteor-effect': 'meteor 5s linear infinite',
        'text-reveal': 'text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s',
        'border-flip': 'flip 6s infinite steps(2, end)',
        'border-rotate': 'rotate 3s linear infinite both',
        'border-width': 'border-width 3s infinite alternate',
        'zoom-in': 'zoom-in linear both',
      },
      keyframes: {
        'zoom-in': {
          '0%': {
            transform: 'translateZ(-1000px)',
            opacity: '0',
            filter: 'blur(5px)',
          },
          '50%': {
            transform: 'translateZ(0px)',
            opacity: '1',
            filter: 'blur(0px)',
          },
          '100%': {
            transform: 'translateZ(1000px)',
            opacity: '0',
            filter: 'blur(5px)',
          },
        },
        shine: {
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
          },
        },
        'radar-spin': {
          from: {
            transform: 'rotate(20deg)',
          },
          to: {
            transform: 'rotate(380deg)',
          },
        },
        'border-width': {
          from: {
            width: '10px',
            opacity: '0',
          },
          to: {
            width: '100px',
            opacity: '1',
          },
        },
        flip: {
          to: {
            transform: 'rotate(360deg)',
          },
        },
        rotate: {
          to: {
            transform: 'rotate(90deg)',
          },
        },
        'text-reveal': {
          '0%': {
            transform: 'translate(0, 100%)',
          },
          '100%': {
            transform: 'translate(0, 0)',
          },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        spotlight: {
          '0%': {
            // @ts-ignore
            opacity: 0,
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            // @ts-ignore
            opacity: 1,
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },

        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [
    tailwindAnimate,
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'bg-grid': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-grid-small': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-dot': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )
    },
  ],
} satisfies Config

export default config
