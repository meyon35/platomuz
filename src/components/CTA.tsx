"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface CTAProps {
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
}

export default function CTA({ title, subtitle, buttonText, buttonLink }: CTAProps) {
  return (
    <section className="py-16 bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <a
          href={buttonLink}
          className="inline-block bg-white text-blue-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          {buttonText}
        </a>
      </div>
    </section>
  )
} 