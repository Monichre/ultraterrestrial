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
const words = quote.split(' ')
export const LovecraftQuote = () => {
  return (
    <>
      <div className='text-black tracking-wide mx-auto p-8 text-center w-[800px]'>
        <BlurFade inView delay={0}>
          <h2 className='font-centimaSans text-black text-bold text-center text-lg relative site-tagline'>
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
              className='inline'
              delay={index === 0 ? 0.2 : index * 0.25}
              key={`${line.replace(/ /g, '-')}-${index}`}
            >
              <span className='font-centimaSans text-black text-bold text-[16px]'>
                {line}{' '}
              </span>
            </BlurFade>
          ))}
        </div>
      </div>
    </>
  )
}
