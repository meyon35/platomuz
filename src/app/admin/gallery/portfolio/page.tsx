"use client"

import { useState, useEffect } from 'react'
import { FaUpload, FaTrash, FaEdit } from 'react-icons/fa'

interface PortfolioImage {
  id: string
  url: string
  category: string
  title: string
  description?: string
}

// Web sitemizdeki portfolyo kategorileri
const PORTFOLIO_CATEGORIES = [
  { id: 'dugun', name: 'Düğün' },
  { id: 'nisan', name: 'Nişan' },
  { id: 'ozel-cekim', name: 'Özel Çekim' }
]

export default function PortfolioManagement() {
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)
  const [editingImage, setEditingImage] = useState<PortfolioImage | null>(null)

  useEffect(() => {
    fetchPortfolioImages()
  }, [])

  const fetchPortfolioImages = async () => {
    try {
      const response = await fetch('/api/portfolio')
      const data = await response.json()
      setPortfolioImages(data)
    } catch (error) {
      console.error('Portfolyo görselleri yüklenirken hata:', error)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setIsLoading(true)
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i])
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        const newImages = await Promise.all(
          data.urls.map(async (url: string) => {
            const imageData = {
              url,
              category: selectedCategory === 'all' ? 'dugun' : selectedCategory,
              title: '',
              description: ''
            }
            
            const createResponse = await fetch('/api/portfolio', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(imageData),
            })

            if (createResponse.ok) {
              return await createResponse.json()
            }
            throw new Error('Görsel kaydedilemedi')
          })
        )
        
        setPortfolioImages([...portfolioImages, ...newImages])
      }
    } catch (error) {
      console.error('Görsel yükleme hatası:', error)
      alert('Görsel yüklenirken bir hata oluştu!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPortfolioImages(portfolioImages.filter(img => img.id !== id))
      }
    } catch (error) {
      console.error('Görsel silme hatası:', error)
    }
  }

  const handleUpdateImage = async (id: string, updates: Partial<PortfolioImage>) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        setPortfolioImages(portfolioImages.map(img => 
          img.id === id ? { ...img, ...updates } : img
        ))
        setEditingImage(null)
      }
    } catch (error) {
      console.error('Görsel güncelleme hatası:', error)
    }
  }

  const filteredImages = selectedCategory === 'all'
    ? portfolioImages
    : portfolioImages.filter(img => img.category === selectedCategory)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Portfolyo Yönetimi</h1>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
          >
            <option value="all">Tüm Kategoriler</option>
            {PORTFOLIO_CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label className="relative cursor-pointer bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-4 py-2 rounded-lg hover:bg-[rgb(var(--primary))]/90 transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              disabled={isLoading}
            />
            <div className="flex items-center space-x-2">
              <FaUpload />
              <span>{isLoading ? 'Yükleniyor...' : 'Görsel Yükle'}</span>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="relative group bg-[rgb(var(--card))] rounded-lg overflow-hidden"
          >
            <img
              src={image.url}
              alt={image.title || 'Portfolyo görseli'}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <button
                onClick={() => setEditingImage(image)}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(image.id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{image.title || 'Başlıksız'}</h3>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                {image.description || 'Açıklama yok'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Düzenleme Modalı */}
      {editingImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[rgb(var(--card))] p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Görsel Düzenle</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <select
                  value={editingImage.category}
                  onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value })}
                  className="w-full p-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
                >
                  {PORTFOLIO_CATEGORIES.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Başlık</label>
                <input
                  type="text"
                  value={editingImage.title}
                  onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                  className="w-full p-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Açıklama</label>
                <textarea
                  value={editingImage.description || ''}
                  onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
                  className="w-full p-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditingImage(null)}
                  className="px-4 py-2 rounded-lg bg-[rgb(var(--background))] hover:bg-[rgb(var(--background))]/80"
                >
                  İptal
                </button>
                <button
                  onClick={() => handleUpdateImage(editingImage.id, editingImage)}
                  className="px-4 py-2 rounded-lg bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgb(var(--primary))]/90"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 