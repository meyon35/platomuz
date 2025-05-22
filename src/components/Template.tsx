"use client"

import { motion } from 'framer-motion'
import { Footer } from './Footer'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "linear",
        duration: 0.3
      }}
      className="flex flex-col min-h-screen"
    >
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </motion.div>
  )
} 