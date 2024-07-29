import * as React from 'react'

import { getXataClient } from '@/lib/xata/client'

import SwipeGrid from '@/components/animations/swipe-grid/SwipeGrid'
import { Suspense } from 'react'
import { Particles } from '@/components/animations/particles/Particles'
import { BoxReveal } from '@/components/animations/box-reveal'
import { Button } from '@/components/ui/button/button'
import { BlurFade } from '@/components/animations/blur-fade'

export default async function Index() {
  const xata = getXataClient()
  const data: any = await xata.db.personnel
    .select([
      'name',
      'bio',
      'role',
      'photo',
      'facebook',
      'twitter',
      'website',
      'instagram',
      'rank',
      'credibility',
      'popularity',
      'photo.signedUrl',
      'photo.enablePublicUrl',
    ])
    .getAll()

  const personnel = data.toSerializable()
  console.log('personnel: ', personnel)
  return (
    <Suspense fallback={null}>
      <div className='key-figures'>
        <SwipeGrid items={personnel}>
          {/* <BoxReveal boxColor={'#5046e6'} duration={0.5}>
            <p className='text-[3.5rem] font-semibold'>
              Key Figures<span className='text-[#5046e6]'>.</span>
            </p>
          </BoxReveal>

          <BoxReveal boxColor={'#5046e6'} duration={0.5}>
            <h2 className='mt-[.5rem] text-[1rem]'>
              These are the need-to-know or who's-who of Ufology
              <span className='text-[#5046e6]'>Subject Matter Experts</span>
              <span className='text-[#5046e6]'>Critical Personnel</span>
            </h2>
          </BoxReveal>

          <BoxReveal boxColor={'#5046e6'} duration={0.5}>
            <div className='mt-[1.5rem]'>
              <p>
                Help us verify the credibility of these individuals' <br />
                <span className='font-semibold text-[#5046e6]'> Claims</span>,
                <span className='font-semibold text-[#5046e6]'> Expertise</span>
                ,
                <span className='font-semibold text-[#5046e6]'>
                  {' '}
                  Testimony CSS
                </span>
              </p>
            </div>
          </BoxReveal>

          <BoxReveal boxColor={'#5046e6'} duration={0.5}>
            <p>
              <span className='font-semibold text-[#5046e6]'>
                {' '}
                Not seeing someone
              </span>
              submit a request to add a key figure <br />
              . <br />
              <Button className='mt-[1.6rem] bg-[#5046e6]'>Add Now</Button>
            </p>
          </BoxReveal> */}
        </SwipeGrid>
        <Particles />
      </div>
    </Suspense>
  )
}
