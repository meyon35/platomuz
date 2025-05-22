"use client"

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

interface Venue {
  id: number
  name: string
  description: string
  address: string
  phone: string
  email: string
  capacity: number
  price: number
  images: string[]
  features: string[]
  isActive: boolean
}

interface VenueFormData {
  name: string
  description: string
  address: string
  phone: string
  email: string
  capacity: number
  price: number
  images: string[]
  features: string[]
  isActive: boolean
}

export default function VenuePage() {
  const [venues, setVenues] = useState<Venue[]>([
    {
      id: 1,
      name: 'Platomuz Davet Evi',
      description: 'Modern ve şık tasarımıyla unutulmaz organizasyonlar için ideal mekan.',
      address: 'Örnek Mahallesi, Örnek Sokak No:1, İstanbul',
      phone: '0212 123 45 67',
      email: 'info@platomuz.com',
      capacity: 500,
      price: 50000,
      images: [
        'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg',
        'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg'
      ],
      features: [
        'Profesyonel Ses Sistemi',
        'LED Ekran',
        'Özel Mutfak',
        'Geniş Otopark',
        'Balkon Alanı'
      ],
      isActive: true
    }
  ])

  const [isEditing, setIsEditing] = useState(false)
  const [currentVenue, setCurrentVenue] = useState<Venue | null>(null)
  const [formData, setFormData] = useState<VenueFormData>({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    capacity: 0,
    price: 0,
    images: [''],
    features: [''],
    isActive: true
  })

  const handleEdit = (venue: Venue) => {
    setCurrentVenue(venue)
    setFormData({
      name: venue.name,
      description: venue.description,
      address: venue.address,
      phone: venue.phone,
      email: venue.email,
      capacity: venue.capacity,
      price: venue.price,
      images: venue.images,
      features: venue.features,
      isActive: venue.isActive
    })
    setIsEditing(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Bu davet evini silmek istediğinizden emin misiniz?')) {
      setVenues(venues.filter(venue => venue.id !== id))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (currentVenue) {
      setVenues(venues.map(venue => 
        venue.id === currentVenue.id 
          ? { ...venue, ...formData }
          : venue
      ))
    } else {
      const newVenue: Venue = {
        id: Math.max(...venues.map(v => v.id)) + 1,
        ...formData
      }
      setVenues([...venues, newVenue])
    }
    
    setIsEditing(false)
    setCurrentVenue(null)
    setFormData({
      name: '',
      description: '',
      address: '',
      phone: '',
      email: '',
      capacity: 0,
      price: 0,
      images: [''],
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

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: Number(value)
    }))
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData(prev => ({
      ...prev,
      images: newImages
    }))
  }

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
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
    setVenues(venues.map(venue =>
      venue.id === id
        ? { ...venue, isActive: !venue.isActive }
        : venue
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
              Davet Evi Yönetimi
            </h1>
          </div>
          <button
            onClick={() => {
              setCurrentVenue(null)
              setFormData({
                name: '',
                description: '',
                address: '',
                phone: '',
                email: '',
                capacity: 0,
                price: 0,
                images: [''],
                features: [''],
                isActive: true
              })
              setIsEditing(true)
            }}
            className="flex items-center space-x-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaPlus className="w-5 h-5" />
            <span>Yeni Davet Evi</span>
          </button>
        </div>

        {/* Venues List */}
        <div className="grid grid-cols-1 gap-6">
          {venues.map((venue) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[rgb(var(--card))] rounded-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                      {venue.name}
                    </h3>
                    <button
                      onClick={() => toggleActive(venue.id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        venue.isActive
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {venue.isActive ? 'Aktif' : 'Pasif'}
                    </button>
                  </div>
                  <p className="text-[rgb(var(--muted-foreground))]">
                    {venue.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="w-4 h-4 text-[rgb(var(--primary))]" />
                      <span className="text-[rgb(var(--foreground))]">{venue.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaPhone className="w-4 h-4 text-[rgb(var(--primary))]" />
                      <span className="text-[rgb(var(--foreground))]">{venue.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="w-4 h-4 text-[rgb(var(--primary))]" />
                      <span className="text-[rgb(var(--foreground))]">{venue.email}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-[rgb(var(--muted-foreground))]">Kapasite</span>
                      <p className="text-[rgb(var(--foreground))] font-semibold">{venue.capacity} Kişi</p>
                    </div>
                    <div>
                      <span className="text-sm text-[rgb(var(--muted-foreground))]">Fiyat</span>
                      <p className="text-[rgb(var(--foreground))] font-semibold">{venue.price.toLocaleString('tr-TR')} ₺</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[rgb(var(--foreground))] mb-2">
                      Özellikler:
                    </h4>
                    <ul className="list-disc list-inside text-[rgb(var(--muted-foreground))]">
                      {venue.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {venue.images.map((image, index) => (
                    <div key={index} className="relative h-48">
                      <Image
                        src={image}
                        alt={`${venue.name} - Görsel ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-[rgb(var(--border))]">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(venue)}
                    className="p-2 text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] rounded-lg transition-colors"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(venue.id)}
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
              className="bg-[rgb(var(--background))] rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-[rgb(var(--foreground))] mb-4">
                {currentVenue ? 'Davet Evi Düzenle' : 'Yeni Davet Evi'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[rgb(var(--foreground))] mb-2">
                      İsim
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[rgb(var(--foreground))] mb-2">
                      E-posta
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[rgb(var(--foreground))] mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[rgb(var(--foreground))] mb-2">
                      Adres
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[rgb(var(--foreground))] mb-2">
                      Kapasite
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleNumberChange}
                      className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[rgb(var(--foreground))] mb-2">
                      Fiyat (₺)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleNumberChange}
                      className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                      required
                    />
                  </div>
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
                    Görseller
                  </label>
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="flex-1 p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addImage}
                    className="mt-2 flex items-center space-x-2 text-[rgb(var(--primary))] hover:opacity-80"
                  >
                    <FaPlus className="w-4 h-4" />
                    <span>Görsel Ekle</span>
                  </button>
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