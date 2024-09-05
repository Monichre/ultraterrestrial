'use client'
import * as React from 'react'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function Answer({ prompt, answer }: { prompt: any; answer: any }) {
  return (
    <div className='container flex h-auto w-full shrink-0 gap-4 rounded-lg border border-solid border-[#C2C2C2] bg-white p-5 '>
      <div className='hidden lg:block'>
        <Image
          unoptimized
          src='/img/Info.svg'
          alt='footer'
          width={24}
          height={24}
        />
      </div>
      <div className='w-full'>
        <div className='flex items-center justify-between pb-3'>
          <div className='flex gap-4'>
            <Image
              unoptimized
              src='/img/Info.svg'
              alt='footer'
              width={24}
              height={24}
              className='block lg:hidden'
            />
            {prompt && (
              <h3 className='text-base font-bold uppercase text-black'>
                Question:{prompt}
              </h3>
            )}
            {answer && (
              <h3 className='text-base font-bold uppercase text-black'>
                Answer:
              </h3>
            )}
          </div>
          {answer && (
            <div className='flex items-center gap-1'>
              {/* <Image unoptimized
                src="/img/link.svg"
                alt="footer"
                width={20}
                height={20}
                className="cursor-pointer"
              /> */}
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(answer.trim())
                }}
              >
                <Image
                  unoptimized
                  src='/img/copy.svg'
                  alt='footer'
                  width={20}
                  height={20}
                  className='cursor-pointer'
                />
              </Button>
              {/* <Image unoptimized
                src="/img/share.svg"
                alt="footer"
                width={20}
                height={20}
                className="cursor-pointer"
              /> */}
            </div>
          )}
        </div>
        <div className='flex flex-wrap content-center items-center gap-[15px]'>
          <div className='w-full whitespace-pre-wrap text-base font-light leading-[152.5%] text-black'>
            {answer}
          </div>
        </div>
      </div>
    </div>
  )
}
