'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import anime from 'animejs'
import Typed from 'typed.js'

export const BackgroundGlobe = () => {
  const ref = useRef(null)
  const typerRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [darkMode, setDarkMode] = useState(false) // State to manage dark mode

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const dots = [
    {
      id: 'dot1',
      type: 'dot',
      left: '50%',
      top: '29.9%',
      delay: 1,
    },
    {
      id: 'dot2',
      type: 'dot',
      left: '24.3%',
      top: '50.2%',
      delay: 1,
    },
    {
      id: 'dot3',
      type: 'dot',
      left: '77.8%',
      top: '63.4%',
      delay: 1,
    },
  ]

  const svgs = useMemo(
    () => [
      {
        id: 'svg1',
        type: 'svg',
        viewbox: '0 0 155 284',
        width: '15.244%',
        height: '41.24%',
        left: '38.8%',
        top: '31.2%',
        path: 'M.797 283.216c14.605-22.693 64.498-78.738 87.739-104.396-22.406-17.823-47.852-46.354-57.983-58.555 36.536-29.153 96.735-65.699 122.267-80.327-6.727-8.041-21.226-27.282-26.518-39.053',
        x1: '100%',
        x2: '100%',
        y1: '-20%',
        y1config: {
          initial: '-20%',
          frames: ['-20%', '100%'],
        },
        y2: '0',
        y2config: {
          initial: '0',
          frames: ['0', '130%'],
        },
        duration: 350,
        delay: 1350,
        offset: 0,
        easing: 'linear',
      },
      {
        id: 'svg2',
        type: 'svg',
        viewbox: '0 0 272 235',
        width: '27.458%',
        height: '34.045%',
        left: '50.8%',
        top: '31.4%',
        path: 'M271.749 233.614C215.075 230.474 159.599 210.964 138.945 201.602C144.38 186.681 156.517 152.612 161.587 135.71C126.058 122.39 44.25 76.75 1.25 0.75',
        x1: '100%',
        x2: '100%',
        y1: '-20%',
        y1config: {
          initial: '-20%',
          frames: ['-20%', '100%'],
        },
        y2: '0',
        y2config: {
          initial: '0',
          frames: ['0', '130%'],
        },
        duration: 300,
        delay: 1350,
        offset: 0,
        easing: 'linear',
      },
      {
        id: 'svg3',
        type: 'svg',
        viewbox: '0 0 261 144',
        width: '26.687%',
        height: '20.49%',
        left: '25.1%',
        top: '31.4%',
        path: 'M260.5 1.5C157.75 30.75 67.75 89 1.13281 143.202',
        x1: '100%',
        x2: '100%',
        y1: '-20%',
        y1config: {
          initial: '-20%',
          frames: ['-20%', '100%'],
        },
        y2: '0',
        y2config: {
          initial: '0',
          frames: ['0', '130%'],
        },
        duration: 200,
        delay: 1350,
        offset: 0,
        easing: 'linear',
      },
    ],
    []
  )

  useEffect(() => {
    const animate = () => {
      const tl = anime.timeline({
        loop: false,
        autoplay: true,
      })

      svgs.forEach((s) => {
        tl.add(
          {
            targets: `#functions-hero #${s.id} linearGradient`,
            y2: s.y2config.frames,
            easing: s.easing,
            duration: s.duration,
            delay: s.delay,
          },
          s.offset
        )
      })
      if (typerRef?.current) {
        const typed = new Typed(typerRef.current, {
          strings: ['npm install eldoraui'],
          typeSpeed: 10,
          startDelay: 300,
          showCursor: false,
          loop: false,
        })

        setTimeout(() => {
          typed.start()
          tl.play()
        }, 100)

        return () => {
          typed.destroy()
        }
      }
    }

    animate()
  }, [svgs])

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    // <div className="items-center justify-center relative mt-24 dark:bg-black bg-white w-full h-[550px]">
    <div
      ref={ref}
      id='functions-hero'
      className='
        absolute inset-0
        -left-28 top-4 w-[150%] md:w-[150%] aspect-[978/678]
        sm:-left-32 sm:-top-2
        md:-left-44
        lg:-left-10 lg:-top-10 lg:w-[130%]
        xl:-left-32 xl:w-[130%]
      '
    >
      {/* Animated svgs in globe */}
      {svgs.map((s) => (
        <svg
          key={s.id}
          id={s.id}
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          fill='none'
          viewBox={s.viewbox}
          className='absolute'
          style={{
            width: s.width,
            height: s.height,
            left: s.left,
            top: s.top,
          }}
        >
          <path stroke={`url(#lg-${s.id})`} strokeWidth='1.396' d={s.path} />
          <defs>
            <linearGradient
              id={`lg-${s.id}`}
              x1={s.x1}
              x2={s.x2}
              y1={s.y1}
              y2={s.y2}
              gradientUnits='userSpaceOnUse'
            >
              {/* Define colors for both light and dark modes */}
              <stop
                offset='0'
                stopColor={darkMode ? '#000000' : '#FFFFFF'}
                stopOpacity='0'
              />
              <stop
                offset='0.5'
                stopColor={darkMode ? '#000000' : '#FFFFFF'}
                stopOpacity='0.6'
              />
              <stop
                offset='1'
                stopColor={darkMode ? '#000000' : '#FFFFFF'}
                stopOpacity='0'
              />
            </linearGradient>
          </defs>
        </svg>
      ))}

      {/* Dots on globe */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          id={dot.id}
          style={{ left: dot.left, top: dot.top }}
          className='absolute origin-center w-[2.5%] h-[3.6%] flex items-center justify-center opacity-0 transition-opacity animate-fade-in delay-75'
        >
          <span className='absolute inset-0 w-full h-full rounded-full bg-black dark:bg-white bg-opacity-20' />
          <span className='absolute w-4/5 h-4/5 rounded-full bg-black dark:bg-white bg-opacity-90' />
        </div>
      ))}
      <div className='absolute left-[51.15%] top-[10%] w-px h-[20%] overflow-hidden'>
        <span className='absolute inset-0 w-full bg-gradient-to-t from-current to-transparent h-full delay-1200 animate-slide-in' />
      </div>
      {/* Globe background */}
      <Image
        src='/usage/globe-light.svg'
        alt='globe wireframe'
        width={400}
        height={400}
        className={`w-full h-full ${darkMode ? 'hidden' : 'block'}`} // Hide/show based on dark mode
        quality={100}
        priority
      />
      <Image
        src='/usage/globe.svg'
        alt='globe wireframe'
        width={400}
        height={400}
        className={`w-full h-full ${darkMode ? 'block' : 'hidden'}`} // Hide/show based on dark mode
        quality={100}
        priority
      />
    </div>
  )
}