"use client"

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSave, FaImage, FaCheckCircle, FaUpload, FaLink } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

export default function AboutPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState({
    title: 'Hakkımızda',
    subtitle: 'Isparta\'nın önde gelen fotoğrafçılık stüdyosu ve davet evi olarak profesyonel hizmet sunuyoruz',
    description: `Isparta'nın merkezinde yer alan stüdyomuzda ve davet evimizde, modern ekipmanlarımız ve uzman 
    kadromuzla en kaliteli hizmeti sunmaktayız. Düğün, nişan, kına organizasyonları, 
    mezuniyet ve özel gün çekimleriniz için profesyonel çözümler üretiyoruz.

    Amacımız, sizin en özel anlarınızı en güzel şekilde ölümsüzleştirmek, 
    unutulmaz organizasyonlar düzenlemek ve modern davet evimizde konforlu bir ortam sunmaktır. 
    Her hizmetimizde en yüksek kaliteyi yakalamak için sürekli kendimizi geliştiriyor 
    ve en son teknolojileri takip ediyoruz.`,
    image: 'https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg',
    mission: 'Müşterilerimizin en özel anlarını profesyonel fotoğrafçılık hizmetlerimizle ölümsüzleştirmek, organizasyon hizmetlerimizle unutulmaz etkinlikler düzenlemek ve modern davet evimizle konforlu bir ortam sunmak. Her projede en yüksek kaliteyi ve müşteri memnuniyetini hedefliyoruz.',
    vision: 'Fotoğrafçılık, organizasyon ve davet evi hizmetlerimizle sektörde öncü olmak, yenilikçi yaklaşımlarımızla fark yaratmak ve müşterilerimizin hayallerini gerçeğe dönüştürmek. Sürekli gelişerek ve kendimizi yenileyerek en iyi hizmeti sunmaya devam edeceğiz.',
    features: [
      'Profesyonel Ekipman',
      'Deneyimli Ekip',
      'Hızlı Teslimat',
      'Kaliteli Hizmet',
      'Müşteri Memnuniyeti',
      'Modern Davet Evi',
      'Organizasyon Uzmanlığı',
      'Özel Menü Seçenekleri'
    ],
    stats: [
      {
        value: '1000+',
        label: 'Başarılı Çekim'
      },
      {
        value: '5+',
        label: 'Yıllık Deneyim'
      },
      {
        value: '500+',
        label: 'Mutlu Müşteri'
      },
      {
        value: '200+',
        label: 'Organizasyon'
      },
      {
        value: '100+',
        label: 'Davet Evi Etkinliği'
      },
      {
        value: '100%',
        label: 'Müşteri Memnuniyeti'
      }
    ]
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/about')
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
      const response = await fetch('/api/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      })

      if (!response.ok) {
        throw new Error('Kaydetme işlemi başarısız oldu')
      }

      toast.success('İçerik başarıyla kaydedildi')
    } catch (error) {
      console.error('Error saving content:', error)
      toast.error('İçerik kaydedilirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setContent({ ...content, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
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
          Hakkımızda Sayfası
        </h1>
        <p className="text-[rgb(var(--muted-foreground))] mt-1">
          Hakkımızda sayfası içeriğini düzenleyin
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Başlık
              </label>
              <input
                type="text"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Alt Başlık
              </label>
              <input
                type="text"
                value={content.subtitle}
                onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Açıklama
              </label>
              <textarea
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))] h-48"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Özellikler
              </label>
              <div className="grid grid-cols-2 gap-2">
                {content.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FaCheckCircle className="text-[rgb(var(--primary))] w-4 h-4" />
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...content.features]
                        newFeatures[index] = e.target.value
                        setContent({ ...content, features: newFeatures })
                      }}
                      className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Ekip Görseli
              </label>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-[rgb(var(--background))] border border-[rgb(var(--border))] group">
                <img
                  src={content.image}
                  alt="Ekip Görseli"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 px-4 py-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <FaUpload className="w-4 h-4" />
                    <span>Dosya Yükle</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt('Görsel URL\'sini girin:')
                      if (url) {
                        setContent({ ...content, image: url })
                      }
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <FaLink className="w-4 h-4" />
                    <span>URL Ekle</span>
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Misyon
              </label>
              <textarea
                value={content.mission}
                onChange={(e) => setContent({ ...content, mission: e.target.value })}
                className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))] h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                Vizyon
              </label>
              <textarea
                value={content.vision}
                onChange={(e) => setContent({ ...content, vision: e.target.value })}
                className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))] h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))] mb-1">
                İstatistikler
              </label>
              <div className="grid grid-cols-2 gap-4">
                {content.stats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...content.stats]
                        newStats[index] = { ...stat, value: e.target.value }
                        setContent({ ...content, stats: newStats })
                      }}
                      className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                      placeholder="Değer"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...content.stats]
                        newStats[index] = { ...stat, label: e.target.value }
                        setContent({ ...content, stats: newStats })
                      }}
                      className="w-full p-2 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))]"
                      placeholder="Etiket"
                    />
                  </div>
                ))}
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