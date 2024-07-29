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
import '../cards.css'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { EntityCardUtilityMenu } from '@/components/ui/card/entity-card/entity-card-utility-menu'

import type { ImageProps } from '@/utils/image.utils'
import 'react-magic-motion/card.css'
import { truncate } from '@/utils/functions'
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export interface MindMapEntityCardProps {
  id: string
  data: {
    date: any
    description: string
    latitude: number
    location: string
    longitude: number
    photos: ImageProps[]
    name: string
    color: string
    type: string
    label: string
    fill: string
  }
}

export const openSpring = { type: 'spring', stiffness: 200, damping: 30 }
export const closeSpring = { type: 'spring', stiffness: 300, damping: 35 }
export const AnimatedCardWithRef = forwardRef((props: any, ref: any) => (
  <Card ref={ref} {...props} />
))
export const AnimatedCard = motion(AnimatedCardWithRef)
AnimatedCard.displayName = 'AnimatedCard'

export const AnimatedCardContentWithRef = forwardRef((props, ref: any) => (
  <CardContent ref={ref} {...props} />
))
AnimatedCardContentWithRef.displayName = 'AnimatedCardContentWithRef'
export const AnimatedCardContent = motion(AnimatedCardContentWithRef)

export const AnimatedImageRef = forwardRef((props: any, ref: any) => (
  <Image ref={ref} {...props} />
))
AnimatedImageRef.displayName = 'AnimatedImageRef'
export const AnimatedImageContent = motion(AnimatedImageRef)

export const MindMapEntityCard: React.FC<MindMapEntityCardProps> = ({
  data,
  id,
  ...rest
}) => {
  const {
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
    ...restOfData
  } = data
  console.log('restOfData: ', restOfData)
  const node = {
    id,
    data,
    type,
  }
  const date = dayjs(data?.date).format('MMMM DD, YYYY')
  const image: any = photos?.length
    ? photos[0]
    : { url: '/foofighters.webp', signedUrl: '/foofighters.webp' }
  console.log('image: ', image)
  const [expand, setExpand] = useState(false)
  const toggle = () => setExpand(!expand)

  const animation = {
    hide: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
      },
    },
  }
  const animatedClass = expand
    ? 'w-auto min-w-[500px] h-full'
    : 'w-auto min-w-[500px]'
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
  // const cardRef = useRef()
  // onMouseMove={handleMouseMove}
  // onMouseEnter={handleMouseEnter}
  // onMouseLeave={handleMouseLeave}

  const variants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0 },
    transition: {
      ...openSpring,
      duration: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.25,
    },
  }

  const variants2 = {
    open: { height: 'auto', opacity: 1, y: 0 },
    closed: { height: 0, opacity: 0, y: 100 },
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
      duration: 0.5,
    },
  }

  const variants3 = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 100 },
    transition: {
      ease: 'ease-in-out',
      delay: 0.5,
      duration: 0.25,
    },
  }
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text
    }
    return text.substring(0, maxLength) + '...'
  }

  const [showMenu, setShowMenu] = useState(false)
  const handleHoverEnter = () => {
    setShowMenu(true)
  }
  const handleHoverLeave = () => {
    setShowMenu(false)
  }

  const transition = {
    type: 'spring',
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
  }

  return (
    <AnimatedCard
      style={{ transition: 'all 0.5s ease-in-out' }}
      className={`entity-card shadow relative ${animatedClass} rounded-lg border border-white/60 dark:border-border/30 rounded-[calc(var(--radius))] bg-dot-white/[0.2]`}
    >
      <div
        className='border border-white/20 rounded-[calc(var(--radius)-2px)] relative '
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
      >
        <AnimatePresence>
          {showMenu && (
            <motion.div
              key='utility-menu'
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={transition}
              className='absolute top-[-50px] z-[-2] w-full h-auto flex align-center items-center justify-center bg-none'
            >
              <EntityCardUtilityMenu node={node} onSave={() => {}} />
            </motion.div>
          )}
        </AnimatePresence>
        <CardHeader
          className='flex flex-row items-center align-center justify-between p-4'
          onClick={toggle}
        >
          <AnimatedImageContent
            animate={{ opacity: 2, height: 50, width: 50, y: 0 }}
            // animate={expand ? { opacity: 1, height: 300, width: 300, y: 0 }: { opacity: 0, height: 0, width: 0, y: -40 }}

            alt={name}
            className='rounded-md object-cover'
            height={50}
            src={image?.url}
            width={50}
          />
          <h2 className='text-white uppercase font-centimaSans text-2xl mx-4'>
            {animatedTitle}
          </h2>

          <div className='w-fit ml-auto date'>
            <span className='text-1xl text-[#78efff] uppercase font-centimaSans'>
              {animatedDate}
            </span>
          </div>
        </CardHeader>

        {expand && (
          <motion.div
            variants={variants}
            key={`${id}-image-container`}
            initial={'closed'}
            animate={expand ? 'open' : 'closed'}
            className='p-2'
          >
            <AnimatedCardContent
              key={`${id}-image-card`}
              variants={variants2}
              initial='closed'
              animate={expand ? 'open' : 'closed'}
            >
              <AnimatedImageContent
                key={`${id}-image`}
                // initial={{ opacity: 0, height: 0, width: 0, y: -40 }}
                // animate={expand ? { opacity: 1, height: 300, width: 300, y: 0 }: { opacity: 0, height: 0, width: 0, y: -40 }}

                variants={variants2}
                initial={false}
                animate={expand ? 'open' : 'closed'}
                alt='Product image'
                className='w-full h-full rounded-md object-cover max-w-[500px] max-h-[500px]'
                height={200}
                src={image?.url}
                width={200}
              />
            </AnimatedCardContent>
            <motion.div
              className='w-full flex justify-center py-4 px-2'
              key={`${id}-additional-info`}
              initial='closed'
              variants={variants3}
              animate={expand ? 'open' : 'closed'}
            >
              <p className='text-md font-jetbrains text-white text-left'>
                {truncate(description, 300)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </AnimatedCard>
  )
}

// #TODO: Add this card expansion animation:
/* 
https://www.react-magic-motion.com/applications/expandable-card
*/
