"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FaCamera, FaGlassCheers, FaHome, FaCheckCircle } from 'react-icons/fa'

interface Service {
  icon: string
  title: string
  items: string[]
}

interface ServicesProps {
  title: string
  subtitle: string
  services: Array<{
    icon: string
    title: string
    items: string[]
  }>
}

export default function Services({ title, subtitle, services }: ServicesProps) {
  const icons = {
    camera: FaCamera,
    glass: FaGlassCheers,
    home: FaHome
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-500 text-4xl mb-4">
                <i className={`fas fa-${service.icon}`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <ul className="space-y-2">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 