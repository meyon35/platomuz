"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSave, FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState({
    address: 'Mehmet Tönge Mah. 4842 Sk. No: 71 Merkez/ISPARTA',
    phone: '+90 (555) 123 45 67',
    whatsapp: '+90 (555) 123 45 67',
    email: 'info@platomuzvar.com',
    socialMedia: {
      instagramPhoto: 'https://www.instagram.com/platomuzvar',
      instagramVenue: 'https://www.instagram.com/platomuzvar.davetevi'
    },
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.1234567890123!2d30.5532!3d37.7648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3a1c0c0c0c0c0%3A0x0!2zTWVobWV0IFTDtm5nZSBNYWguIDQ4NDIgU2suIE5vOjcxLCBNZXJrZXovSVNQQVJUQQ!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Kaydetme işlemi burada yapılacak
    console.log('Kaydedilen iletişim bilgileri:', contactInfo)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">
          İletişim Bilgileri
        </h1>
        <p className="text-[rgb(var(--muted-foreground))] mt-1">
          İletişim bilgilerini düzenleyin
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Adres
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
                </div>
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                  className="w-full pl-10 p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Telefon
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
                </div>
                <input
                  type="text"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="w-full pl-10 p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                WhatsApp
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaWhatsapp className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
                </div>
                <input
                  type="text"
                  value={contactInfo.whatsapp}
                  onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                  className="w-full pl-10 p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                E-posta
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
                </div>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="w-full pl-10 p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Google Maps Embed Kodu
              </label>
              <textarea
                value={contactInfo.mapEmbed}
                onChange={(e) => setContactInfo({ ...contactInfo, mapEmbed: e.target.value })}
                className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))] h-32"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-4">
                Sosyal Medya
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                    Instagram (Fotoğrafçılık)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaInstagram className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
                    </div>
                    <input
                      type="text"
                      value={contactInfo.socialMedia.instagramPhoto}
                      onChange={(e) => setContactInfo({
                        ...contactInfo,
                        socialMedia: { ...contactInfo.socialMedia, instagramPhoto: e.target.value }
                      })}
                      className="w-full pl-10 p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                    Instagram (Davet Evi)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaInstagram className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
                    </div>
                    <input
                      type="text"
                      value={contactInfo.socialMedia.instagramVenue}
                      onChange={(e) => setContactInfo({
                        ...contactInfo,
                        socialMedia: { ...contactInfo.socialMedia, instagramVenue: e.target.value }
                      })}
                      className="w-full pl-10 p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-4 py-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaSave className="w-4 h-4" />
            <span>Kaydet</span>
          </button>
        </div>
      </form>
    </div>
  )
} 