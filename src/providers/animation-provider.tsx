'use client'

import { AnimatePresence } from 'framer-motion'

interface AnimationProviderProps {
  children: any
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
}) => {
  return (
    <AnimatePresence initial={false} mode='popLayout'>
      {children}
    </AnimatePresence>
  )
}
