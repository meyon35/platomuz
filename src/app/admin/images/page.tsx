"use client"

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaArrowUp, FaArrowDown, FaUpload } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

interface ImageItem {
  id: number
  url: string
  title: string
  description: string
  category: 'slider' | 'portfolio'
  subCategory: 'dugun' | 'nisan' | 'ozel-cekim' | null
  order: number
  isActive: boolean
}

const PORTFOLIO_SUBCATEGORIES = [
  { value: 'dugun', label: 'Düğün' },
  { value: 'nisan', label: 'Nişan' },
  { value: 'ozel-cekim', label: 'Özel Çekim' }
]

export default function ImagesPage() {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: 1,
      url: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg',
      title: 'Slider 1',
      description: 'Ana sayfa slider görseli',
      category: 'slider',
      subCategory: null,
      order: 1,
      isActive: true
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg',
      title: 'Slider 2',
      description: 'Ana sayfa slider görseli',
      category: 'slider',
      subCategory: null,
      order: 2,
      isActive: true
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg',
      title: 'Slider 3',
      description: 'Ana sayfa slider görseli',
      category: 'slider',
      subCategory: null,
      order: 3,
      isActive: true
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg',
      title: 'Düğün Görseli 1',
      description: 'Düğün organizasyonu',
      category: 'portfolio',
      subCategory: 'dugun',
      order: 1,
      isActive: true
    }
  ])

  const [isEditing, setIsEditing] = useState(false)
  const [currentImage, setCurrentImage] = useState<ImageItem | null>(null)
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    category: 'slider' as 'slider' | 'portfolio',
    subCategory: null as 'dugun' | 'nisan' | 'ozel-cekim' | null,
    order: 1,
    isActive: true
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleEdit = (image: ImageItem) => {
    setCurrentImage(image)
    setFormData({
      url: image.url,
      title: image.title,
      description: image.description,
      category: image.category,
      subCategory: image.subCategory,
      order: image.order,
      isActive: image.isActive
    })
    setIsEditing(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Bu görseli silmek istediğinizden emin misiniz?')) {
      setImages(images.filter(image => image.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentImage) {
      setImages(images.map(image => 
        image.id === currentImage.id 
          ? { ...image, ...formData }
          : image
      ))
    } else {
      const newImage: ImageItem = {
        id: Math.max(...images.map(i => i.id)) + 1,
        ...formData
      }
      setImages([...images, newImage])
    }
    
    setIsEditing(false)
    setCurrentImage(null)
    setFormData({
      url: '',
      title: '',
      description: '',
      category: 'slider',
      subCategory: null,
      order: 1,
      isActive: true
    })
  }

  const toggleActive = (id: number) => {
    setImages(images.map(image =>
      image.id === id
        ? { ...image, isActive: !image.isActive }
        : image
    ))
  }

  const moveImage = (id: number, direction: 'up' | 'down') => {
    const currentIndex = images.findIndex(img => img.id === id)
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === images.length - 1)
    ) {
      return
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    const newImages = [...images]
    const [movedImage] = newImages.splice(currentIndex, 1)
    newImages.splice(newIndex, 0, movedImage)

    // Update order numbers
    const updatedImages = newImages.map((img, index) => ({
      ...img,
      order: index + 1
    }))

    setImages(updatedImages)
  }

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'slider':
        return 'Slider Görselleri'
      case 'portfolio':
        return 'Portfolyo Görselleri'
      default:
        return category
    }
  }

  const getSubCategoryTitle = (subCategory: string) => {
    const found = PORTFOLIO_SUBCATEGORIES.find(cat => cat.value === subCategory)
    return found ? found.label : subCategory
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      
      if (data.success) {
        setFormData(prev => ({
          ...prev,
          url: data.url
        }))
      } else {
        alert('Dosya yüklenirken bir hata oluştu')
      }
    } catch (error) {
      console.error('Dosya yükleme hatası:', error)
      alert('Dosya yüklenirken bir hata oluştu')
    } finally {
      setIsUploading(false)
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
              Görsel Yönetimi
            </h1>
          </div>
          <button
            onClick={() => {
              setCurrentImage(null)
              setFormData({
                url: '',
                title: '',
                description: '',
                category: 'slider',
                subCategory: null,
                order: 1,
                isActive: true
              })
              setIsEditing(true)
            }}
            className="flex items-center space-x-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaPlus className="w-5 h-5" />
            <span>Yeni Görsel</span>
          </button>
        </div>

        {/* Images List */}
        <div className="space-y-8">
          {['slider', 'portfolio'].map((category) => (
            <div key={category} className="bg-[rgb(var(--card))] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-4">
                {getCategoryTitle(category)}
              </h2>
              {category === 'portfolio' && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {PORTFOLIO_SUBCATEGORIES.map((subCat) => (
                    <button
                      key={subCat.value}
                      onClick={() => {
                        const filteredImages = images.filter(
                          img => img.category === 'portfolio' && img.subCategory === subCat.value
                        )
                        if (filteredImages.length > 0) {
                          const element = document.getElementById(`portfolio-${subCat.value}`)
                          element?.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className="px-3 py-1 rounded-full text-sm bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 transition-opacity"
                    >
                      {subCat.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images
                  .filter(image => image.category === category)
                  .sort((a, b) => a.order - b.order)
                  .map((image) => (
                    <motion.div
                      key={image.id}
                      id={image.category === 'portfolio' ? `portfolio-${image.subCategory}` : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[rgb(var(--background))] rounded-xl overflow-hidden"
                    >
                      <div className="relative h-48">
                        <Image
                          src={image.url}
                          alt={image.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-[rgb(var(--foreground))]">
                              {image.title}
                            </h3>
                            {image.category === 'portfolio' && image.subCategory && (
                              <span className="text-sm text-[rgb(var(--muted-foreground))]">
                                {getSubCategoryTitle(image.subCategory)}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => toggleActive(image.id)}
                            className={`px-3 py-1 rounded-full text-sm ${
                              image.isActive
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                            }`}
                          >
                            {image.isActive ? 'Aktif' : 'Pasif'}
                          </button>
                        </div>
                        <p className="text-[rgb(var(--muted-foreground))]">
                          {image.description}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => moveImage(image.id, 'up')}
                              className="p-2 text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] rounded-lg transition-colors"
                            >
                              <FaArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => moveImage(image.id, 'down')}
                              className="p-2 text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] rounded-lg transition-colors"
                            >
                              <FaArrowDown className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEdit(image)}
                              className="p-2 text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] rounded-lg transition-colors"
                            >
                              <FaEdit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(image.id)}
                              className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                            >
                              <FaTrash className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
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
                {currentImage ? 'Görsel Düzenle' : 'Yeni Görsel'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[rgb(var(--foreground))] mb-2">
                    Görsel
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      <FaUpload className="w-5 h-5" />
                      <span>{isUploading ? 'Yükleniyor...' : 'Dosya Seç'}</span>
                    </button>
                    <input
                      type="text"
                      value={formData.url}
                      onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="Veya görsel URL'si girin"
                      className="flex-1 p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                      required
                    />
                  </div>
                  {formData.url && (
                    <div className="mt-2 relative h-32 w-full">
                      <Image
                        src={formData.url}
                        alt="Önizleme"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  )}
                </div>
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
                    Açıklama
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[rgb(var(--foreground))] mb-2">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      category: e.target.value as 'slider' | 'portfolio',
                      subCategory: e.target.value === 'slider' ? null : (prev.subCategory || 'dugun')
                    }))}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                    required
                  >
                    <option value="slider">Slider</option>
                    <option value="portfolio">Portfolyo</option>
                  </select>
                </div>

                {formData.category === 'portfolio' && (
                  <div>
                    <label className="block text-[rgb(var(--foreground))] mb-2">
                      Alt Kategori
                    </label>
                    <select
                      value={formData.subCategory || 'dugun'}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        subCategory: e.target.value as 'dugun' | 'nisan' | 'ozel-cekim'
                      }))}
                      className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                      required
                    >
                      {PORTFOLIO_SUBCATEGORIES.map((subCat) => (
                        <option key={subCat.value} value={subCat.value}>
                          {subCat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <label htmlFor="isActive" className="text-[rgb(var(--foreground))]">
                    Aktif
                  </label>
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