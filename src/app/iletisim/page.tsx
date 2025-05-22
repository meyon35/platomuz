"use client"

import React from 'react'
import Contact from '../../components/Contact'

export default function IletisimPage() {
  return (
    <main className="pt-20 bg-[rgb(var(--background))] min-h-screen">
      {/* Header */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--foreground))] mb-6">
              İletişim
            </h1>
            <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              Sorularınız ve randevu talepleriniz için bize ulaşın
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <Contact />
    </main>
  )
} 