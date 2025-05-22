"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollContext = createContext({
  scrollY: 0,
  scrollYProgress: 0,
})

export const useScrollContext = () => useContext(ScrollContext)

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollY, scrollYProgress: scrollYProgress as unknown as number }}>
      {children}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 transform origin-left z-50"
        style={{ scaleX }}
      />
    </ScrollContext.Provider>
  )
} 