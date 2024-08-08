'use client'
import { motion } from 'framer-motion'
export const BlurAppear = ({ children }: { children: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      exit={{ opacity: 0, filter: 'blur(20px)', y: -20 }}
      transition={{ duration: 0.7, type: 'ease' }}
    >
      {children}
    </motion.div>
  )
}
