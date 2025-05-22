"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FaHeart, FaClock, FaCamera, FaMagic, FaGlassCheers, FaHome } from 'react-icons/fa'

interface Feature {
  icon: string
  title: string
  description: string
}

interface WhyUsProps {
  title: string
  subtitle: string
  features: Array<{
    icon: string
    title: string
    description: string
  }>
}

export default function WhyUs({ title, subtitle, features }: WhyUsProps) {
  const icons = {
    heart: FaHeart,
    clock: FaClock,
    camera: FaCamera,
    magic: FaMagic,
    glass: FaGlassCheers,
    home: FaHome
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="text-blue-500 text-4xl mb-4">
                <i className={`fas fa-${feature.icon}`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 