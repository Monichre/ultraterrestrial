'use client'
import * as React from 'react'

import { BlurFade } from '@/components/animations/blur-fade/BlurFade'

const quoteLines = [
  `The most merciful thing in the world, I think, is the inability of the`,
  `human mind to correlate all its contents. We live on a placid island of`,
  `ignorance in the midst of black seas of infinity, and it was not meant`,
  `that we should voyage far. The sciences, each straining in its own`,
  `direction, have hitherto harmed us little; but some day the piecing`,
  `together of dissociated knowledge will open up such terrifying vistas of`,
  `reality, and of our frightful position therein, that we shall either go`,
  `mad from the revelation or flee from the deadly light into the peace and`,
  `safety of a new dark age.`,
]
const quote = `The most merciful thing in the world, I think, is the inability of the
  human mind to correlate all its contents. We live on a placid island of
  ignorance in the midst of black seas of infinity, and it was not meant
  that we should voyage far. The sciences, each straining in its own
  direction, have hitherto harmed us little; but some day the piecing
  together of dissociated knowledge will open up such terrifying vistas of
  reality, and of our frightful position therein, that we shall either go
  mad from the revelation or flee from the deadly light into the peace and
  safety of a new dark age.`
const end = quoteLines.length - 1
const start = 0
const words = quote.split(' ')
export const LovecraftQuote = () => {
  return (
    <>
      <div className='text-white tracking-wide mx-auto p-8 text-center w-[800px]'>
        <BlurFade inView delay={0.25}>
          <h2 className='font-centimaSans text-white text-bold text-center text-lg relative site-tagline'>
            Tracking the State of Disclosure
            <br />
            {/* <i>
            Striving to document, explore and disseminate the past, present and
            future of the UFO topic and its bearing on humanity, the universe
            and our place within it
          </i> */}
          </h2>
        </BlurFade>
        <div className='mt-8 leading-7'>
          {quoteLines.map((line: string, index: number) => (
            <BlurFade
              inView
              className={'inline'}
              delay={index === 0 ? 0.5 : index * 0.5}
              key={`${line.replace(/ /g, '-')}-${index}`}
            >
              {index === start && (
                <span
                  className={`!font-ailerons text-6xl font-bold inline relative h-0 top-[15px]`}
                >
                  "
                </span>
              )}
              <span className='font-centimaSans text-white text-bold text-[18px] tracking-wider '>
                {line}{' '}
              </span>
              {index === end && (
                <span
                  className={`!font-ailerons text-6xl font-bold inline absolute h-0 bottom-[33px]`}
                >
                  "
                </span>
              )}
            </BlurFade>
          ))}

          <BlurFade inView className='block mt-4' delay={0.99}>
            <span className='font-centimaSans text-white text-bold text-[20px] relative site-tagline'>
              H.P. Lovecraft
            </span>
          </BlurFade>
        </div>
      </div>
    </>
  )
}
