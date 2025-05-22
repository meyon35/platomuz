"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// Örnek fotoğraflar (sonra gerçek fotoğraflarla değiştirilecek)
const photos = [
  {
    url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
  },
  {
    url: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg',
  },
  {
    url: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg',
  },
  {
    url: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg',
  },
  {
    url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
  }
]

const GalleryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      handleNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsAutoPlaying(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeDistance = touchEndX.current - touchStartX.current
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        handlePrev()
      } else {
        handleNext()
      }
    }
    setIsAutoPlaying(true)
  }

  const getPhotoIndex = (offset: number) => {
    return (currentIndex + offset + photos.length) % photos.length
  }

  return (
    <div 
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-7xl flex items-center justify-center">
          {/* Ana fotoğraf */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className={`
                overflow-hidden rounded-lg
                ${isMobile ? 'w-[300px] h-[400px]' : 'w-[600px] h-[400px]'}
              `}>
                <Image
                  src={photos[currentIndex].url}
                  alt="Gallery image"
                  width={isMobile ? 300 : 600}
                  height={400}
                  className="w-full h-full object-cover object-center shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Yan fotoğraflar */}
          <>
            <motion.div
              className="absolute left-0 transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`
                overflow-hidden rounded-lg
                ${isMobile ? 'w-[150px] h-[100px]' : 'w-[400px] h-[200px]'}
              `}>
                <Image
                  src={photos[getPhotoIndex(-1)].url}
                  alt="Previous image"
                  width={isMobile ? 150 : 400}
                  height={isMobile ? 100 : 200}
                  className="w-full h-full object-cover object-center filter blur-sm"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              className="absolute right-0 transform translate-x-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`
                overflow-hidden rounded-lg
                ${isMobile ? 'w-[150px] h-[100px]' : 'w-[400px] h-[200px]'}
              `}>
                <Image
                  src={photos[getPhotoIndex(1)].url}
                  alt="Next image"
                  width={isMobile ? 150 : 400}
                  height={isMobile ? 100 : 200}
                  className="w-full h-full object-cover object-center filter blur-sm"
                  priority
                />
              </div>
            </motion.div>
          </>
        </div>
      </div>

      {/* Navigasyon butonları */}
      <button
        onClick={() => {
          handlePrev()
          setIsAutoPlaying(false)
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-4 rounded-full transition-colors z-20"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <FaChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => {
          handleNext()
          setIsAutoPlaying(false)
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-4 rounded-full transition-colors z-20"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <FaChevronRight className="w-6 h-6" />
      </button>

      {/* Nokta navigasyonu */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default GalleryCarousel 