"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaPalette } from 'react-icons/fa'
import Link from 'next/link'

interface ThemeSettings {
  primaryColor: string
  backgroundColor: string
  textColor: string
  fontFamily: string
  borderRadius: string
}

export default function ThemePage() {
  const [settings, setSettings] = useState<ThemeSettings>({
    primaryColor: '#4F46E5',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    fontFamily: 'Inter',
    borderRadius: '0.5rem'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<ThemeSettings>(settings)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSettings(formData)
    setIsEditing(false)
  }

  const fontFamilies = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Montserrat',
    'Poppins'
  ]

  const borderRadiusOptions = [
    { value: '0.25rem', label: 'Küçük' },
    { value: '0.5rem', label: 'Orta' },
    { value: '1rem', label: 'Büyük' }
  ]

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
              Tema Ayarları
            </h1>
          </div>
          <button
            onClick={() => {
              setFormData(settings)
              setIsEditing(true)
            }}
            className="flex items-center space-x-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaPalette className="w-5 h-5" />
            <span>Düzenle</span>
          </button>
        </div>

        {/* Current Theme Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-[rgb(var(--card))] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-4">
              Mevcut Tema
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-[rgb(var(--muted-foreground))] mb-2">
                  Ana Renk
                </h3>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: settings.primaryColor }}
                  />
                  <span className="text-[rgb(var(--foreground))]">
                    {settings.primaryColor}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[rgb(var(--muted-foreground))] mb-2">
                  Arkaplan Rengi
                </h3>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: settings.backgroundColor }}
                  />
                  <span className="text-[rgb(var(--foreground))]">
                    {settings.backgroundColor}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[rgb(var(--muted-foreground))] mb-2">
                  Yazı Rengi
                </h3>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: settings.textColor }}
                  />
                  <span className="text-[rgb(var(--foreground))]">
                    {settings.textColor}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[rgb(var(--muted-foreground))] mb-2">
                  Yazı Tipi
                </h3>
                <span className="text-[rgb(var(--foreground))]">
                  {settings.fontFamily}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[rgb(var(--muted-foreground))] mb-2">
                  Köşe Yuvarlaklığı
                </h3>
                <span className="text-[rgb(var(--foreground))]">
                  {borderRadiusOptions.find(opt => opt.value === settings.borderRadius)?.label}
                </span>
              </div>
            </div>
          </div>

          {/* Theme Preview */}
          <div className="bg-[rgb(var(--card))] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-4">
              Tema Önizleme
            </h2>
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: settings.backgroundColor,
                color: settings.textColor,
                fontFamily: settings.fontFamily,
                borderRadius: settings.borderRadius
              }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: settings.primaryColor }}
              >
                Örnek Başlık
              </h3>
              <p className="mb-4">
                Bu bir örnek metindir. Tema ayarlarınızın nasıl görüneceğini burada görebilirsiniz.
              </p>
              <button
                className="px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: settings.primaryColor,
                  color: '#FFFFFF',
                  borderRadius: settings.borderRadius
                }}
              >
                Örnek Buton
              </button>
            </div>
          </div>
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
                Tema Ayarlarını Düzenle
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[rgb(var(--foreground))] mb-2">
                    Ana Renk
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="flex-1 p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[rgb(var(--foreground))] mb-2">
                    Arkaplan Rengi
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData.backgroundColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.backgroundColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                      className="flex-1 p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[rgb(var(--foreground))] mb-2">
                    Yazı Rengi
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData.textColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.textColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                      className="flex-1 p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[rgb(var(--foreground))] mb-2">
                    Yazı Tipi
                  </label>
                  <select
                    value={formData.fontFamily}
                    onChange={(e) => setFormData(prev => ({ ...prev, fontFamily: e.target.value }))}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                  >
                    {fontFamilies.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[rgb(var(--foreground))] mb-2">
                    Köşe Yuvarlaklığı
                  </label>
                  <select
                    value={formData.borderRadius}
                    onChange={(e) => setFormData(prev => ({ ...prev, borderRadius: e.target.value }))}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
                  >
                    {borderRadiusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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