"use client"

import React, { useState } from 'react'
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { SocialIcon } from 'react-social-icons'
import { motion, AnimatePresence } from 'framer-motion'

export default function SocialMedia() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  const socialLinks = [
    {
      url: 'https://instagram.com/platomuzvar',
      label: 'Fotoğrafçılık için Instagram'
    },
    {
      url: 'https://instagram.com/platomuzvardavetevi',
      label: 'Davet Evi için Instagram'
    }
  ]

  const phoneNumber = "905444413200"

  return (
    <div className="fixed right-6 bottom-24 z-50 flex flex-col gap-4">
      {/* Sosyal Medya İkonları */}
      <div className="flex flex-col gap-3">
        {socialLinks.map((social, index) => (
          <motion.div
            key={social.url}
            className="relative"
            onMouseEnter={() => setHoveredIcon(social.url)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="shadow-lg rounded-full relative z-10"
            >
              <SocialIcon
                url={social.url}
                className="hover:opacity-90 transition-all !h-12 !w-12"
                target="_blank"
                rel="noopener noreferrer"
                bgColor="rgb(var(--primary))"
                fgColor="rgb(var(--primary-foreground))"
                network="instagram"
              />
            </motion.div>

            <AnimatePresence>
              {hoveredIcon === social.url && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
                >
                  <div className="relative">
                    {social.label}
                    <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-[rgb(var(--primary))]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* WhatsApp Butonu */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.1 }}
        className="shadow-lg rounded-full relative z-10"
        onMouseEnter={() => setHoveredIcon('whatsapp')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <a
          href={`https://wa.me/${phoneNumber}?text=Merhaba,%20bilgi%20almak%20istiyorum.`}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <SocialIcon
            url={`https://wa.me/${phoneNumber}`}
            className="hover:opacity-90 transition-all !h-12 !w-12"
            target="_blank"
            rel="noopener noreferrer"
            bgColor="rgb(var(--primary))"
            fgColor="rgb(var(--primary-foreground))"
            network="whatsapp"
          />
        </a>
        <AnimatePresence>
          {hoveredIcon === 'whatsapp' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
            >
              <div className="relative">
                WhatsApp'tan Bize Ulaşın
                <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-[rgb(var(--primary))]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
} 