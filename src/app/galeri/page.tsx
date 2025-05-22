"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Portfolio from '../../components/Portfolio'
import GalleryCarousel from '@/components/GalleryCarousel'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function GaleriPage() {
  return (
    <main className="pt-20 bg-[rgb(var(--background))] min-h-screen">
      {/* Header */}
      <ScrollAnimation>
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--foreground))] mb-6">
                Galeri
              </h1>
              <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
                En güzel anlarınızı ölümsüzleştirdiğimiz çekimlerimizden örnekler
              </p>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Gallery */}
      <ScrollAnimation delay={0.2}>
        <section className="pb-20">
          <GalleryCarousel />
        </section>
      </ScrollAnimation>

      {/* Categories */}
      <ScrollAnimation delay={0.4}>
        <section className="py-20 bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--card))]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['Düğün', 'Nişan', 'Özel Çekim'].map((category, index) => (
                <div 
                  key={category}
                  className="bg-[rgb(var(--card))] p-8 rounded-lg text-center hover-grow hover-shine"
                >
                  <h3 className="text-2xl font-semibold text-[rgb(var(--foreground))] mb-4">{category}</h3>
                  <p className="text-[rgb(var(--muted-foreground))]">
                    {category} fotoğraflarımızı inceleyin
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Portfolio Grid */}
      <Portfolio />
    </main>
  )
} 