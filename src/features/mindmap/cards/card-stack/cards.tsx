'use client'

import { LuxeCard } from '@/features/mindmap/cards/luxe-card'
import { RootNodeCard } from '@/features/mindmap/cards/root-node-card'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'

import React, { useCallback, useEffect, useState } from 'react'

interface CardRotateProps {
  children: React.ReactNode
  cardId: any
  onSendToBack: (id: any) => void
}

function CardRotate({ children, cardId, onSendToBack }: CardRotateProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [60, -60])
  const rotateY = useTransform(x, [-100, 100], [-60, 60])

  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      console.log('_: ', _)
      console.log('info: ', info)
      console.log(Math.abs(info.offset.x))
      const threshold = 180
      if (Math.abs(info.offset.x) > threshold) {
        console.log('FOR FUCK SAKE')
        onSendToBack(cardId)
      } else {
        x.set(0)
        y.set(0)
      }
    },
    [onSendToBack, cardId]
  )

  return (
    <motion.div
      className='absolute cursor-grab'
      key={`panel-${cardId}-outer`}
      layout
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  )
}

// const StackCard = () => {
//   return (

//   )
// }

export function CardStackUI({ mindmapCards }: { mindmapCards: any }) {
  const [cards, setCards] = useState(mindmapCards)
  // const handleShuffle = ( ) => {

  // }
  const sendToBack = (id: number) => {
    const incoming = cards.find((card: { id: number }) => card.id === id)
    const filtered = [...cards].filter((card) => card.id !== id)

    const newCards = [...filtered, incoming]
    setCards(newCards)
  }

  // useEffect(() => {
  //   setCards(mindmapCards)
  // }, [mindmapCards])

  return (
    <div
      className='relative p-4 rounded-xl border-b-base-100 '
      style={{ perspective: 600 }}
    >
      {cards.map((card: any, index: any) => {
        return (
          <CardRotate
            key={`panel-${card.id}`}
            cardId={card.id}
            onSendToBack={sendToBack}
          >
            <motion.div
              layout
              key={`panel-${card.id}-inner`}
              className='h-full w-full rounded-lg'
              animate={{
                rotateZ: (cards.length - index - 1) * 4,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: '90% 90%',
              }}
              initial={false}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              {/* <RootNodeCard nodeData={card} /> */}
              <LuxeCard title={card.title} />
            </motion.div>
          </CardRotate>
        )
      })}
    </div>
  )
}
