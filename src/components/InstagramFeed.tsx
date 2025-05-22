"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaInstagram } from 'react-icons/fa'

interface InstagramFeedProps {
  username: string
}

export default function InstagramFeed({ username }: InstagramFeedProps) {
  // Örnek Instagram gönderileri
  const posts = [
    { id: 1, image: '/images/instagram1.jpg', likes: 120, comments: 15 },
    { id: 2, image: '/images/instagram2.jpg', likes: 85, comments: 8 },
    { id: 3, image: '/images/instagram3.jpg', likes: 150, comments: 20 },
    { id: 4, image: '/images/instagram4.jpg', likes: 95, comments: 12 },
    { id: 5, image: '/images/instagram5.jpg', likes: 110, comments: 18 },
    { id: 6, image: '/images/instagram6.jpg', likes: 75, comments: 10 }
  ]

  return (
    <section className="py-20 bg-[rgb(var(--background))]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-[rgb(var(--foreground))] mb-4">
            Instagram'da Biz
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            En son çalışmalarımızı ve özel anlarımızı Instagram'da paylaşıyoruz
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={`https://instagram.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square group overflow-hidden rounded-lg"
            >
              <Image
                src={post.image}
                alt={`Instagram Post ${post.id}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <FaInstagram className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">{post.likes} beğeni</p>
                  <p className="text-sm">{post.comments} yorum</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-6 py-3 rounded-lg hover:bg-[rgb(var(--primary))/90] transition-colors"
          >
            <FaInstagram className="w-5 h-5" />
            Instagram'da Takip Et
          </a>
        </motion.div>
      </div>
    </section>
  )
} 