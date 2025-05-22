"use client"

import { useState, useEffect } from 'react'
import { FaUpload, FaTrash } from 'react-icons/fa'

interface SliderImage {
  id: string
  url: string
  order: number
}

export default function SliderManagement() {
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchSliderImages()
  }, [])

  const fetchSliderImages = async () => {
    try {
      const response = await fetch('/api/slider')
      const data = await response.json()
      setSliderImages(data)
    } catch (error) {
      console.error('Slider görselleri yüklenirken hata:', error)
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
        const newImages = data.urls.map((url: string, index: number) => ({
          id: `slider${sliderImages.length + index + 1}`,
          url,
          order: sliderImages.length + index + 1
        }))
        setSliderImages([...sliderImages, ...newImages])
        await saveSliderOrder([...sliderImages, ...newImages])
      }
    } catch (error) {
      console.error('Görsel yükleme hatası:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/slider/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSliderImages(sliderImages.filter(img => img.id !== id))
      }
    } catch (error) {
      console.error('Görsel silme hatası:', error)
    }
  }

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(sliderImages)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }))

    setSliderImages(updatedItems)
    await saveSliderOrder(updatedItems)
  }

  const saveSliderOrder = async (images: SliderImage[]) => {
    try {
      await fetch('/api/slider', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images }),
      })
    } catch (error) {
      console.error('Sıralama kaydedilirken hata:', error)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Slider Yönetimi</h1>
        <div className="flex items-center space-x-4">
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
        {sliderImages.map((image, index) => (
          <div
            key={image.id}
            className="relative group bg-[rgb(var(--card))] rounded-lg overflow-hidden"
          >
            <img
              src={image.url}
              alt={`Slider ${index + 1}`}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => handleDelete(image.id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
              {image.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 