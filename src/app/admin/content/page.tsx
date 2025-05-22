"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaSave } from 'react-icons/fa'
import Link from 'next/link'

interface ContentSection {
  id: string
  title: string
  content: string
  page: 'home' | 'about' | 'gallery' | 'contact'
}

export default function ContentPage() {
  const [sections, setSections] = useState<ContentSection[]>([
    {
      id: 'home-title',
      title: 'Ana Sayfa Başlığı',
      content: 'Platomuz Davet Evi',
      page: 'home'
    },
    {
      id: 'home-description',
      title: 'Ana Sayfa Açıklaması',
      content: 'Unutulmaz anlarınız için mükemmel mekan',
      page: 'home'
    },
    {
      id: 'about-title',
      title: 'Hakkımızda Başlığı',
      content: 'Hakkımızda',
      page: 'about'
    },
    {
      id: 'about-content',
      title: 'Hakkımızda İçeriği',
      content: 'Platomuz Davet Evi, 2020 yılından bu yana hizmet vermektedir...',
      page: 'about'
    },
    {
      id: 'gallery-title',
      title: 'Galeri Başlığı',
      content: 'Galeri',
      page: 'gallery'
    },
    {
      id: 'contact-title',
      title: 'İletişim Başlığı',
      content: 'İletişim',
      page: 'contact'
    },
    {
      id: 'contact-address',
      title: 'İletişim Adresi',
      content: 'Örnek Mahallesi, Örnek Sokak No:1, İstanbul',
      page: 'contact'
    }
  ])

  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })

  const handleEdit = (section: ContentSection) => {
    setEditingSection(section.id)
    setFormData({
      title: section.title,
      content: section.content
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    setSections(sections.map(section =>
      section.id === editingSection
        ? { ...section, ...formData }
        : section
    ))
    
    setEditingSection(null)
    setFormData({ title: '', content: '' })
  }

  const getPageTitle = (page: string) => {
    switch (page) {
      case 'home':
        return 'Ana Sayfa'
      case 'about':
        return 'Hakkımızda'
      case 'gallery':
        return 'Galeri'
      case 'contact':
        return 'İletişim'
      default:
        return page
    }
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="p-2 rounded-lg hover:bg-[rgb(var(--card))] transition-colors"
            >
              <FaArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">
              İçerik Düzenleme
            </h1>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {['home', 'about', 'gallery', 'contact'].map((page) => (
            <div key={page} className="bg-[rgb(var(--card))] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-4">
                {getPageTitle(page)}
              </h2>
              <div className="space-y-4">
                {sections
                  .filter(section => section.page === page)
                  .map((section) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[rgb(var(--background))] rounded-lg p-4"
                    >
                      {editingSection === section.id ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <label className="block text-[rgb(var(--foreground))] mb-2">
                              Başlık
                            </label>
                            <input
                              type="text"
                              value={formData.title}
                              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[rgb(var(--foreground))] mb-2">
                              İçerik
                            </label>
                            <textarea
                              value={formData.content}
                              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                              className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                              rows={4}
                              required
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              onClick={() => setEditingSection(null)}
                              className="px-4 py-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))] hover:opacity-90 transition-opacity"
                            >
                              İptal
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-lg bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 transition-opacity"
                            >
                              Kaydet
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-medium text-[rgb(var(--foreground))]">
                              {section.title}
                            </h3>
                            <button
                              onClick={() => handleEdit(section)}
                              className="p-2 text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] rounded-lg transition-colors"
                            >
                              <FaSave className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-[rgb(var(--muted-foreground))] whitespace-pre-wrap">
                            {section.content}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 