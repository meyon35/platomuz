"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface PortfolioItem {
  id: number
  title: string
  category: string
  imageUrl: string
}

const categories = ['Tümü', 'Düğün', 'Nişan', 'Özel Çekim']

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Düğün Çekimi',
    category: 'Düğün',
    imageUrl: 'https://images.pexels.com/photos/1244627/pexels-photo-1244627.jpeg'
  },
  {
    id: 2,
    title: 'Nişan Çekimi',
    category: 'Nişan',
    imageUrl: 'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg'
  },
  {
    id: 3,
    title: 'Özel Çekim',
    category: 'Özel Çekim',
    imageUrl: 'https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg'
  },
  {
    id: 4,
    title: 'Kurumsal Etkinlik',
    category: 'Etkinlik',
    imageUrl: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg'
  },
  {
    id: 5,
    title: 'Aile Portresi',
    category: 'Portre',
    imageUrl: 'https://images.pexels.com/photos/1974927/pexels-photo-1974927.jpeg'
  }
]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const filteredItems = portfolioItems.filter(
    item => selectedCategory === 'Tümü' || item.category === selectedCategory
  )

  return (
    <div className="bg-[rgb(var(--background))] py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[rgb(var(--foreground))] mb-4">Portfolyo</h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            En güzel anlarınızı ölümsüzleştirdiğimiz çalışmalarımızdan örnekler
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
          role="tablist"
          aria-label="Portfolyo kategorileri"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${
                  selectedCategory === category
                    ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
                    : 'bg-[rgb(var(--card))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--card))]/80'
                }
              `}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-controls={`panel-${category}`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="tabpanel"
            id={`panel-${selectedCategory}`}
            aria-label={`${selectedCategory} kategorisindeki çalışmalar`}
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative group aspect-square"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    priority={item.id <= 6}
                  />
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-[rgb(var(--card))] to-transparent transition-opacity duration-300 ${
                      hoveredItem === item.id ? 'opacity-90' : 'opacity-0'
                    }`}
                    aria-hidden="true"
                  />
                  <div 
                    className={`absolute inset-0 flex items-end p-6 transition-opacity duration-300 ${
                      hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-[rgb(var(--card-foreground))] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[rgb(var(--muted-foreground))]">{item.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
} 