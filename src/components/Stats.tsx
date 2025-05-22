"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FaUsers, FaCamera, FaCalendarAlt, FaAward } from 'react-icons/fa'

interface StatsProps {
  stats: Array<{
    title: string
    value: number
  }>
}

export default function Stats({ stats }: StatsProps) {
  const icons = [FaUsers, FaCamera, FaCalendarAlt, FaAward]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-blue-500 mb-2">
                {stat.value}+
              </div>
              <div className="text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 