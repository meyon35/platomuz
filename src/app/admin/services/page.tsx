"use client"

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaCamera } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

interface Service {
  id: number
  title: string
  description: string
  image: string
  features: string[]
  isActive: boolean
}

interface ServiceFormData {
  title: string
  description: string
  image: string
  features: string[]
  isActive: boolean
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: 'Fotoğrafçılık Hizmetleri',
      description: 'Profesyonel fotoğrafçılık hizmetlerimiz ile özel anlarınızı ölümsüzleştiriyoruz.',
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      features: [
        'Düğün Fotoğrafçılığı',
        'Nişan Fotoğrafçılığı',
        'Kına Fotoğrafçılığı',
        'Aile Fotoğrafçılığı'
      ],
      isActive: true
    },
    {
      id: 2,
      title: 'Organizasyon Hizmetleri',
      description: 'Özel günleriniz için profesyonel organizasyon hizmetleri sunuyoruz.',
      image: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg',
      features: [
        'Düğün Organizasyonu',
        'Nişan Organizasyonu',
        'Kına Organizasyonu',
        'Özel Gün Organizasyonu'
      ],
      isActive: true
    }
  ])

  const [isEditing, setIsEditing] = useState(false)
  const [currentService, setCurrentService] = useState<Service | null>(null)
  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    description: '',
    image: '',
    features: [''],
    isActive: true
  })

  const handleEdit = (service: Service) => {
    setCurrentService(service)
    setFormData({
      title: service.title,
      description: service.description,
      image: service.image,
      features: service.features,
      isActive: service.isActive
    })
    setIsEditing(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
      setServices(services.filter(service => service.id !== id))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (currentService) {
      // Düzenleme işlemi
      setServices(services.map(service => 
        service.id === currentService.id 
          ? { ...service, ...formData }
          : service
      ))
    } else {
      // Yeni hizmet ekleme
      const newService: Service = {
        id: Math.max(...services.map(s => s.id)) + 1,
        ...formData
      }
      setServices([...services, newService])
    }
    
    setIsEditing(false)
    setCurrentService(null)
    setFormData({
      title: '',
      description: '',
      image: '',
      features: [''],
      isActive: true
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }))
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const toggleActive = (id: number) => {
    setServices(services.map(service =>
      service.id === id
        ? { ...service, isActive: !service.isActive }
        : service
    ))
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
              Hizmetler Yönetimi
            </h1>
          </div>
          <button
            onClick={() => {
              setCurrentService(null)
              setFormData({
                title: '',
                description: '',
                image: '',
                features: [''],
                isActive: true
              })
              setIsEditing(true)
            }}
            className="flex items-center space-x-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaPlus className="w-5 h-5" />
            <span>Yeni Hizmet</span>
          </button>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[rgb(var(--card))] rounded-xl overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[rgb(var(--foreground))]">
                    {service.title}
                  </h3>
                  <button
                    onClick={() => toggleActive(service.id)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      service.isActive
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {service.isActive ? 'Aktif' : 'Pasif'}
                  </button>
                </div>
                <p className="text-[rgb(var(--muted-foreground))] mb-4">
                  {service.description}
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold text-[rgb(var(--foreground))] mb-2">
                    Özellikler:
                  </h4>
                  <ul className="list-disc list-inside text-[rgb(var(--muted-foreground))]">
                    {service.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] rounded-lg transition-colors"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
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
              className="bg-[rgb(var(--background))] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-[rgb(var(--foreground))] mb-4">
                {currentService ? 'Hizmet Düzenle' : 'Yeni Hizmet'}
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
                <div>
                  <label className="block text-[rgb(var(--foreground))] mb-2">
                    Özellikler
                  </label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="mt-2 flex items-center space-x-2 text-[rgb(var(--primary))] hover:opacity-80"
                  >
                    <FaPlus className="w-4 h-4" />
                    <span>Özellik Ekle</span>
                  </button>
                </div>
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