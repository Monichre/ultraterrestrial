import Image from 'next/image'
import { Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { GraphNodeCardData } from '@/components/ui/card/graph-node-card'
import './cards.css'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { DotGridBackgroundBlack } from '@/components/ui/backgrounds'
import { Toolbar } from '@/components/toolbar'
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
export interface MindMapEntityCardProps extends GraphNodeCardData {}

export const openSpring = { type: 'spring', stiffness: 200, damping: 30 }
export const closeSpring = { type: 'spring', stiffness: 300, damping: 35 }

const AnimatedCardContentWithRef = forwardRef((props, ref: any) => (
  <CardContent ref={ref} {...props} />
))
AnimatedCardContentWithRef.displayName = 'AnimatedCardContentWithRef'
const AnimatedCardContent = motion(AnimatedCardContentWithRef)

const AnimatedImageRef = forwardRef((props: any, ref: any) => (
  <Image ref={ref} {...props} />
))
AnimatedImageRef.displayName = 'AnimatedImageRef'
const AnimatedImageContent = motion(AnimatedImageRef)

export const MindMapEntityCard: React.FC<MindMapEntityCardProps> = ({
  data,
  ...rest
}) => {
  const {
    date,
    description,
    latitude,
    location,
    longitude,
    photos,
    name,
    color,
    type,
    label,
    fill,
  } = data
  const image = photos?.length ? photos[0] : null
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  const animation = {
    hide: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
      },
    },
  }
  const animatedClass = open ? 'w-[350px] h-fit' : 'w-[350px]'
  const duration = 100

  const [animatedTitle, setAnimatedTitle] = useState<string>('')
  const [animatedDate, setAnimatedDate] = useState<string>('')
  const [titleFinished, setTitleFinished] = useState(false)
  const [t, setT] = useState<number>(0)
  const [i, setI] = useState<number>(0)

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (t < name.length) {
        setAnimatedTitle(name.substring(0, t + 1))
        setT(t + 1)
      } else {
        clearInterval(typingEffect)

        setTitleFinished(true)
      }
    }, 100)

    return () => {
      clearInterval(typingEffect)
    }
  }, [name, t])

  useEffect(() => {
    const typingEffectTwo = setInterval(() => {
      if (titleFinished) {
        if (i < date.length) {
          setAnimatedDate(date.substring(0, i + 1))
          setI(i + 1)
        } else {
          clearInterval(typingEffectTwo)
        }
      }
    }, 100)

    return () => {
      clearInterval(typingEffectTwo)
    }
  }, [date, date.length, i, name, t, titleFinished])

  const springConfig = { stiffness: 100, damping: 5 }
  const x = useMotionValue(0) // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(useTransform(x, [-50, 50], [-45, 45]), springConfig)
  // translate the tooltip
  const translateX = useSpring(useTransform(x, [-75, 75], [0, 0]), springConfig)

  const [showTooltip, setShowTooltip] = useState(false)

  const handleMouseEnter = () => {
    console.log('handleMouseEnter: ', handleMouseEnter)
    setShowTooltip(true)
  }
  const handleMouseLeave = () => {
    setShowTooltip(false)
  }

  const handleMouseMove = (event: any) => {
    console.log('event: ', event)

    const halfWidth = event.target.offsetWidth / 2
    const halfHeight = event.target.offsetHeight / 2
    x.set(event.nativeEvent.offsetX - halfWidth) // set the x value, which is then used in transform and rotate
  }
  const cardRef = useRef()
  return (
    <div className='relative w-fit h-fit'>
      <AnimatePresence mode='popLayout'>
        {showTooltip && image && (
          <motion.div
            key='tooltip'
            initial={{ opacity: 0, y: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: -40,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: 'nowrap',
            }}
            className='absolute -top-16 -left-0 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2'
          >
            <div className='absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px ' />
            <div className='absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px ' />
            {image && (
              <AnimatedImageContent
                alt='Product image'
                className='aspect-square w-100 h-100 rounded-md object-cover m-auto'
                height='100'
                src={image?.src}
                width='100'
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Card
        className={`entity-card shadow relative ${animatedClass} rounded-lg border border-white/60 dark:border-border/30 rounded-[calc(var(--radius))] bg-dot-white/[0.2]`}
        ref={cardRef}
      >
        <div className='border border-white/20 rounded-[calc(var(--radius)-2px)] relative'>
          <CardHeader
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='flex flex-row items-center align-center justify-between space-y-0 p-2'
            onClick={toggle}
          >
            <h3 className='text-neutral-200'>{animatedTitle}</h3>

            <div className='w-fit ml-auto date'>
              <span className='text-sm text-muted-foreground'>
                {animatedDate}
              </span>
            </div>
          </CardHeader>
          {/* <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
        </CardDescription> */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={openSpring}
              >
                <AnimatedCardContent>
                  {image && (
                    <AnimatedImageContent
                      initial={{ opacity: 0, height: 0, width: 0, y: -40 }}
                      animate={{ opacity: 1, height: 300, width: 300, y: 0 }}
                      transition={{
                        ...openSpring,
                        delay: 0.5,
                      }}
                      alt='Product image'
                      className='aspect-square w-full h-full rounded-md object-cover m-auto'
                      height='300'
                      src={image.src}
                      width='300'
                    />
                  )}
                </AnimatedCardContent>
                <motion.div
                  className='w-full flex justify-center'
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    ...openSpring,
                    delay: 1,
                  }}
                >
                  <Toolbar />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  )
}
