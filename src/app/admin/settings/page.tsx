"use client"

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSave, FaUpload, FaLink, FaPalette, FaFont, FaRuler, FaSun, FaMoon } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

// RGB'den HEX'e çevirme fonksiyonu
const rgbToHex = (rgb: string) => {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  if (!match) return '#000000'
  
  const r = parseInt(match[1])
  const g = parseInt(match[2])
  const b = parseInt(match[3])
  
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

// HEX'ten RGB'ye çevirme fonksiyonu
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return 'rgb(0, 0, 0)'
  
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  
  return `rgb(${r}, ${g}, ${b})`
}

const FONT_FAMILIES = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Montserrat',
  'Poppins',
  'Lato',
  'Playfair Display',
  'Source Sans Pro',
  'Raleway',
  'Nunito',
]

export default function SettingsPage() {
  const logoInputRef = useRef<HTMLInputElement>(null)
  const faviconInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [content, setContent] = useState({
    siteTitle: 'Platomuz',
    siteDescription: 'Isparta\'nın önde gelen fotoğrafçılık stüdyosu ve davet evi',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    theme: {
      light: {
        background: 'rgb(255, 255, 255)',
        foreground: 'rgb(10, 10, 10)',
        primary: 'rgb(37, 99, 235)',
        primaryForeground: 'rgb(255, 255, 255)',
        secondary: 'rgb(226, 232, 240)',
        secondaryForeground: 'rgb(10, 10, 10)',
        muted: 'rgb(241, 245, 249)',
        mutedForeground: 'rgb(100, 116, 139)',
        accent: 'rgb(241, 245, 249)',
        accentForeground: 'rgb(10, 10, 10)',
        destructive: 'rgb(239, 68, 68)',
        destructiveForeground: 'rgb(255, 255, 255)',
        border: 'rgb(226, 232, 240)',
        input: 'rgb(226, 232, 240)',
        ring: 'rgb(37, 99, 235)',
      },
      dark: {
        background: 'rgb(10, 10, 10)',
        foreground: 'rgb(255, 255, 255)',
        primary: 'rgb(37, 99, 235)',
        primaryForeground: 'rgb(255, 255, 255)',
        secondary: 'rgb(30, 41, 59)',
        secondaryForeground: 'rgb(255, 255, 255)',
        muted: 'rgb(30, 41, 59)',
        mutedForeground: 'rgb(148, 163, 184)',
        accent: 'rgb(30, 41, 59)',
        accentForeground: 'rgb(255, 255, 255)',
        destructive: 'rgb(239, 68, 68)',
        destructiveForeground: 'rgb(255, 255, 255)',
        border: 'rgb(30, 41, 59)',
        input: 'rgb(30, 41, 59)',
        ring: 'rgb(37, 99, 235)',
      },
      fontFamily: 'Inter',
      headingFont: 'Inter',
      bodyFont: 'Inter',
      borderRadius: '0.5rem',
      spacing: '1rem',
      containerWidth: '1200px',
      headerHeight: '80px',
      footerHeight: '300px',
    },
    footer: {
      text: '',
      copyright: '© 2024 Platomuz. Tüm hakları saklıdır.',
    }
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/settings')
      const data = await response.json()
      if (data && Object.keys(data).length > 0) {
        setContent(data)
      }
    } catch (error) {
      console.error('Error fetching content:', error)
      toast.error('İçerik yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      })

      if (!response.ok) {
        throw new Error('Kaydetme işlemi başarısız oldu')
      }

      // Tema değişikliklerini tüm siteye uygula
      const event = new CustomEvent('themeChange', { detail: content.theme })
      window.dispatchEvent(event)

      toast.success('Ayarlar başarıyla kaydedildi')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Ayarlar kaydedilirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setContent({ ...content, [type]: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleColorChange = (color: string, value: string) => {
    // Eğer değer hex formatındaysa rgb'ye çevir
    const rgbValue = value.startsWith('#') ? hexToRgb(value) : value
    
    setContent({
      ...content,
      theme: {
        ...content.theme,
        [mode]: {
          ...content.theme[mode],
          [color]: rgbValue
        }
      }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(var(--primary))]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">
          Genel Ayarlar
        </h1>
        <p className="text-[rgb(var(--muted-foreground))] mt-1">
          Site genel ayarlarını düzenleyin
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sol Kolon */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Site Başlığı
              </label>
              <input
                type="text"
                value={content.siteTitle}
                onChange={(e) => setContent({ ...content, siteTitle: e.target.value })}
                className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Site Açıklaması
              </label>
              <textarea
                value={content.siteDescription}
                onChange={(e) => setContent({ ...content, siteDescription: e.target.value })}
                className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))] h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Logo
              </label>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-[rgb(var(--background))] border border-[rgb(var(--border))] group">
                <img
                  src={content.logo}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="flex items-center space-x-2 px-4 py-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <FaUpload className="w-4 h-4" />
                    <span>Dosya Yükle</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt('Logo URL\'sini girin:')
                      if (url) {
                        setContent({ ...content, logo: url })
                      }
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <FaLink className="w-4 h-4" />
                    <span>URL Ekle</span>
                  </button>
                </div>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo')}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Favicon
              </label>
              <div className="relative aspect-square w-16 rounded-lg overflow-hidden bg-[rgb(var(--background))] border border-[rgb(var(--border))] group">
                <img
                  src={content.favicon}
                  alt="Favicon"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <button
                    type="button"
                    onClick={() => faviconInputRef.current?.click()}
                    className="flex items-center space-x-2 px-2 py-1 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity text-xs"
                  >
                    <FaUpload className="w-3 h-3" />
                    <span>Yükle</span>
                  </button>
                </div>
                <input
                  ref={faviconInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'favicon')}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Sağ Kolon */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] flex items-center">
                <FaPalette className="w-5 h-5 mr-2" />
                Renk Ayarları
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setMode('light')}
                  className={`p-2 rounded-lg ${mode === 'light' ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]' : 'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]'}`}
                >
                  <FaSun className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setMode('dark')}
                  className={`p-2 rounded-lg ${mode === 'dark' ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]' : 'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]'}`}
                >
                  <FaMoon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                  Arkaplan Rengi
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={rgbToHex(content.theme[mode].background)}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.theme[mode].background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                  Metin Rengi
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={rgbToHex(content.theme[mode].foreground)}
                    onChange={(e) => handleColorChange('foreground', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.theme[mode].foreground}
                    onChange={(e) => handleColorChange('foreground', e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                  Ana Renk
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={rgbToHex(content.theme[mode].primary)}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.theme[mode].primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                  Ana Renk Metni
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={rgbToHex(content.theme[mode].primaryForeground)}
                    onChange={(e) => handleColorChange('primaryForeground', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.theme[mode].primaryForeground}
                    onChange={(e) => handleColorChange('primaryForeground', e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                  İkincil Renk
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={rgbToHex(content.theme[mode].secondary)}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.theme[mode].secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                  İkincil Renk Metni
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={rgbToHex(content.theme[mode].secondaryForeground)}
                    onChange={(e) => handleColorChange('secondaryForeground', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.theme[mode].secondaryForeground}
                    onChange={(e) => handleColorChange('secondaryForeground', e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-4 flex items-center">
                <FaFont className="w-5 h-5 mr-2" />
                Yazı Tipi Ayarları
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                    Başlık Yazı Tipi
                  </label>
                  <select
                    value={content.theme.headingFont}
                    onChange={(e) => setContent({
                      ...content,
                      theme: { ...content.theme, headingFont: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  >
                    {FONT_FAMILIES.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                    Metin Yazı Tipi
                  </label>
                  <select
                    value={content.theme.bodyFont}
                    onChange={(e) => setContent({
                      ...content,
                      theme: { ...content.theme, bodyFont: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  >
                    {FONT_FAMILIES.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-4 flex items-center">
                <FaRuler className="w-5 h-5 mr-2" />
                Boyut Ayarları
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                    Köşe Yuvarlaklığı
                  </label>
                  <input
                    type="text"
                    value={content.theme.borderRadius}
                    onChange={(e) => setContent({
                      ...content,
                      theme: { ...content.theme, borderRadius: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                    Boşluk
                  </label>
                  <input
                    type="text"
                    value={content.theme.spacing}
                    onChange={(e) => setContent({
                      ...content,
                      theme: { ...content.theme, spacing: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                    Konteyner Genişliği
                  </label>
                  <input
                    type="text"
                    value={content.theme.containerWidth}
                    onChange={(e) => setContent({
                      ...content,
                      theme: { ...content.theme, containerWidth: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                    Header Yüksekliği
                  </label>
                  <input
                    type="text"
                    value={content.theme.headerHeight}
                    onChange={(e) => setContent({
                      ...content,
                      theme: { ...content.theme, headerHeight: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                    Footer Yüksekliği
                  </label>
                  <input
                    type="text"
                    value={content.theme.footerHeight}
                    onChange={(e) => setContent({
                      ...content,
                      theme: { ...content.theme, footerHeight: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <FaSave className="w-4 h-4" />
            <span>{loading ? 'Kaydediliyor...' : 'Kaydet'}</span>
          </button>
        </div>
      </form>
    </div>
  )
} 