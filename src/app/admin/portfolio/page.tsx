"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'

interface PortfolioItem {
  id: number
  title: string
  category: string
  imageUrl: string
  description?: string
  date?: string
}

const categories = ['Tümü', 'Düğün', 'Nişan', 'Özel Çekim']

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Düğün Çekimi',
    category: 'Düğün',
    imageUrl: 'https://images.pexels.com/photos/1244627/pexels-photo-1244627.jpeg'
  },
  {
    id: 2,
    title: 'Nişan Çekimi',
    category: 'Nişan',
    imageUrl: 'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg'
  },
  {
    id: 3,
    title: 'Özel Çekim',
    category: 'Özel Çekim',
    imageUrl: 'https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg'
  },
  {
    id: 4,
    title: 'Kurumsal Etkinlik',
    category: 'Etkinlik',
    imageUrl: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg'
  },
  {
    id: 5,
    title: 'Aile Portresi',
    category: 'Portre',
    imageUrl: 'https://images.pexels.com/photos/1974927/pexels-photo-1974927.jpeg'
  }
]

export default function PortfolioPage() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Tümü')

  const filteredItems = portfolioItems.filter(
    item => selectedCategory === 'Tümü' || item.category === selectedCategory
  )

  const handleDelete = (id: number) => {
    if (confirm('Bu portfolyo öğesini silmek istediğinizden emin misiniz?')) {
      // Silme işlemi burada yapılacak
      console.log('Silinen öğe:', id)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">
            Portfolyo Yönetimi
          </h1>
          <p className="text-[rgb(var(--muted-foreground))] mt-1">
            Portfolyo görsellerini ve bilgilerini yönetin
          </p>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
        >
          <FaPlus className="w-4 h-4" />
          <span>Yeni Ekle</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                selectedCategory === category
                  ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
                  : 'bg-[rgb(var(--card))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--card))]/80'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[rgb(var(--card))] rounded-xl overflow-hidden"
          >
            <div className="relative aspect-video">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="p-2 rounded-full bg-white text-black hover:bg-[rgb(var(--primary))] hover:text-white transition-colors"
                >
                  <FaEye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="p-2 rounded-full bg-white text-black hover:bg-[rgb(var(--primary))] hover:text-white transition-colors"
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-full bg-white text-black hover:bg-red-500 hover:text-white transition-colors"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[rgb(var(--foreground))]">
                  {item.title}
                </h3>
                <span className="text-sm text-[rgb(var(--muted-foreground))]">
                  {item.category}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(isAddingNew || selectedItem) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[rgb(var(--card))] rounded-xl p-6 w-full max-w-2xl"
          >
            <h2 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-4">
              {isAddingNew ? 'Yeni Portfolyo Ekle' : 'Portfolyo Düzenle'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                  Başlık
                </label>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  defaultValue={selectedItem?.title}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                  Kategori
                </label>
                <select
                  className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  defaultValue={selectedItem?.category}
                >
                  {categories.filter(cat => cat !== 'Tümü').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                  Görsel URL
                </label>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  defaultValue={selectedItem?.imageUrl}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false)
                    setSelectedItem(null)
                  }}
                  className="px-4 py-2 rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 transition-opacity"
                >
                  {isAddingNew ? 'Ekle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
} 