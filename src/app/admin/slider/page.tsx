"use client"

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

interface Slide {
  id: number
  image: string
  title: string
  description: string
}

interface SlideFormData {
  image: string
  title: string
  description: string
}

export default function SliderPage() {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      title: 'Profesyonel Fotoğrafçılık Hizmeti',
      description: 'En özel anlarınızı profesyonel ekibimizle ölümsüzleştiriyoruz'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg',
      title: 'Modern Davet Evi',
      description: 'Özel günleriniz için şık ve konforlu bir mekan'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg',
      title: 'Unutulmaz Organizasyonlar',
      description: 'Kına, nişan ve özel gün organizasyonlarında profesyonel çözümler'
    }
  ])

  const [isEditing, setIsEditing] = useState(false)
  const [currentSlide, setCurrentSlide] = useState<Slide | null>(null)
  const [formData, setFormData] = useState<SlideFormData>({
    image: '',
    title: '',
    description: ''
  })

  const handleEdit = (slide: Slide) => {
    setCurrentSlide(slide)
    setFormData({
      image: slide.image,
      title: slide.title,
      description: slide.description
    })
    setIsEditing(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Bu slaytı silmek istediğinizden emin misiniz?')) {
      setSlides(slides.filter(slide => slide.id !== id))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (currentSlide) {
      // Düzenleme işlemi
      setSlides(slides.map(slide => 
        slide.id === currentSlide.id 
          ? { ...slide, ...formData }
          : slide
      ))
    } else {
      // Yeni slayt ekleme
      const newSlide: Slide = {
        id: Math.max(...slides.map(s => s.id)) + 1,
        ...formData
      }
      setSlides([...slides, newSlide])
    }
    
    setIsEditing(false)
    setCurrentSlide(null)
    setFormData({ image: '', title: '', description: '' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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
              Slider Yönetimi
            </h1>
          </div>
          <button
            onClick={() => {
              setCurrentSlide(null)
              setFormData({ image: '', title: '', description: '' })
              setIsEditing(true)
            }}
            className="flex items-center space-x-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaPlus className="w-5 h-5" />
            <span>Yeni Slayt</span>
          </button>
        </div>

        {/* Slides List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[rgb(var(--card))] rounded-xl overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
                  {slide.title}
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] mb-4">
                  {slide.description}
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(slide)}
                    className="p-2 text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] rounded-lg transition-colors"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[rgb(var(--background))] rounded-xl p-6 w-full max-w-2xl"
            >
              <h2 className="text-xl font-bold text-[rgb(var(--foreground))] mb-4">
                {currentSlide ? 'Slayt Düzenle' : 'Yeni Slayt'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[rgb(var(--foreground))] mb-2">
                    Görsel URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[rgb(var(--foreground))] mb-2">
                    Başlık
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[rgb(var(--foreground))] mb-2">
                    Açıklama
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                    rows={3}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
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
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
} 