"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaHome, FaImages, FaInfoCircle, FaEnvelope, FaCog, FaSave, FaChartBar, FaClock, FaBolt, FaServer, FaUsers, FaShieldAlt, FaDownload } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface Settings {
  heroTitle: string
  heroSubtitle: string
  heroButtonText: string
  heroButtonLink: string
  heroImages: string[]
  stats: { title: string; value: number }[]
  whyUsTitle: string
  whyUsSubtitle: string
  whyUsFeatures: { icon: string; title: string; description: string }[]
  servicesTitle: string
  servicesSubtitle: string
  services: { icon: string; title: string; items: string[] }[]
  ctaTitle: string
  ctaSubtitle: string
  ctaButtonText: string
  ctaButtonLink: string
  instagramUsername: string
  instagramPosts: string[]
  portfolioImages?: string[]
}

interface Activity {
  id: string
  type: 'message' | 'gallery' | 'settings'
  action: string
  details?: string
  createdAt: string
  updatedAt: string
}

interface DashboardData {
  systemStatus: {
    cpu: { usage: number }
    memory: { usage: number }
    disk: { usage: number }
  }
  recentActivities: Activity[]
  visitorStats: {
    today: number
    week: number
    topPage: string
  }
  securityStatus: {
    sslValid: boolean
    firewallActive: boolean
    lastScan: string
  }
  systemUpdates: {
    nextjs: { current: string; latest: string; needsUpdate: boolean }
    react: { current: string; latest: string; needsUpdate: boolean }
    tailwind: { current: string; latest: string; needsUpdate: boolean }
  }
}

export default function AdminPanel() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('home')
  const [settings, setSettings] = useState<Settings>({
    // Hero Section
    heroTitle: '',
    heroSubtitle: '',
    heroButtonText: '',
    heroButtonLink: '',
    heroImages: [],

    // Stats Section
    stats: [
      { title: 'Mutlu Müşteri', value: 0 },
      { title: 'Tamamlanan Proje', value: 0 },
      { title: 'Yıllık Deneyim', value: 0 }
    ],

    // Why Us Section
    whyUsTitle: '',
    whyUsSubtitle: '',
    whyUsFeatures: [
      { icon: 'heart', title: '', description: '' },
      { icon: 'clock', title: '', description: '' },
      { icon: 'camera', title: '', description: '' },
      { icon: 'magic', title: '', description: '' },
      { icon: 'glass', title: '', description: '' },
      { icon: 'home', title: '', description: '' }
    ],

    // Services Section
    servicesTitle: '',
    servicesSubtitle: '',
    services: [
      { icon: 'camera', title: '', items: [] },
      { icon: 'glass', title: '', items: [] },
      { icon: 'home', title: '', items: [] }
    ],

    // CTA Section
    ctaTitle: '',
    ctaSubtitle: '',
    ctaButtonText: '',
    ctaButtonLink: '',

    // Instagram
    instagramUsername: '',
    instagramPosts: []
  })

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    systemStatus: {
      cpu: { usage: 0 },
      memory: { usage: 0 },
      disk: { usage: 0 }
    },
    recentActivities: [],
    visitorStats: {
      today: 0,
      week: 0,
      topPage: ''
    },
    securityStatus: {
      sslValid: true,
      firewallActive: true,
      lastScan: new Date().toISOString()
    },
    systemUpdates: {
      nextjs: { current: '', latest: '', needsUpdate: false },
      react: { current: '', latest: '', needsUpdate: false },
      tailwind: { current: '', latest: '', needsUpdate: false }
    }
  })

  useEffect(() => {
    // Ayarları yükle
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Ayarlar yüklenirken hata:', err))

    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard')
        const data = await response.json()
        setDashboardData(data)
      } catch (error) {
        console.error('Dashboard verisi alınamadı:', error)
      }
    }

    fetchDashboardData()
    // Her 5 dakikada bir güncelle
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSave = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        alert('Ayarlar başarıyla kaydedildi!')
      } else {
        throw new Error('Ayarlar kaydedilemedi')
      }
    } catch (error) {
      console.error('Ayarlar kaydedilirken hata:', error)
      alert('Ayarlar kaydedilirken bir hata oluştu!')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'hero' | 'portfolio') => {
    const files = e.target.files
    if (!files) return

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
        if (type === 'hero') {
          setSettings(prev => ({
            ...prev,
            heroImages: [...prev.heroImages, ...data.urls]
          }))
        } else {
          setSettings(prev => ({
            ...prev,
            portfolioImages: [...(prev.portfolioImages || []), ...data.urls]
          }))
        }
      } else {
        throw new Error('Görseller yüklenemedi')
      }
    } catch (error) {
      console.error('Görsel yükleme hatası:', error)
      alert('Görseller yüklenirken bir hata oluştu!')
    }
  }

  const renderHomeSettings = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-[rgb(var(--card))] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlık</label>
            <input
              type="text"
              value={settings.heroTitle}
              onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alt Başlık</label>
            <input
              type="text"
              value={settings.heroSubtitle}
              onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Buton Metni</label>
            <input
              type="text"
              value={settings.heroButtonText}
              onChange={(e) => setSettings({ ...settings, heroButtonText: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Buton Linki</label>
            <input
              type="text"
              value={settings.heroButtonLink}
              onChange={(e) => setSettings({ ...settings, heroButtonLink: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slider Görselleri</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'hero')}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {settings.heroImages.map((image, index) => (
                <div key={index} className="relative aspect-video">
                  <img
                    src={image}
                    alt={`Hero ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    onClick={() => {
                      const newImages = [...settings.heroImages]
                      newImages.splice(index, 1)
                      setSettings({ ...settings, heroImages: newImages })
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[rgb(var(--card))] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">İstatistikler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settings.stats.map((stat, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-1">{stat.title}</label>
              <input
                type="number"
                value={stat.value}
                onChange={(e) => {
                  const newStats = [...settings.stats]
                  newStats[index].value = parseInt(e.target.value)
                  setSettings({ ...settings, stats: newStats })
                }}
                className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Why Us Section */}
      <div className="bg-[rgb(var(--card))] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Neden Biz</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlık</label>
            <input
              type="text"
              value={settings.whyUsTitle}
              onChange={(e) => setSettings({ ...settings, whyUsTitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alt Başlık</label>
            <input
              type="text"
              value={settings.whyUsSubtitle}
              onChange={(e) => setSettings({ ...settings, whyUsSubtitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          {settings.whyUsFeatures.map((feature, index) => (
            <div key={index} className="border-t pt-4">
              <h4 className="font-medium mb-2">Özellik {index + 1}</h4>
              <div className="space-y-2">
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => {
                    const newFeatures = [...settings.whyUsFeatures]
                    newFeatures[index].title = e.target.value
                    setSettings({ ...settings, whyUsFeatures: newFeatures })
                  }}
                  placeholder="Başlık"
                  className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
                />
                <input
                  type="text"
                  value={feature.description}
                  onChange={(e) => {
                    const newFeatures = [...settings.whyUsFeatures]
                    newFeatures[index].description = e.target.value
                    setSettings({ ...settings, whyUsFeatures: newFeatures })
                  }}
                  placeholder="Açıklama"
                  className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-[rgb(var(--card))] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Hizmetler</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlık</label>
            <input
              type="text"
              value={settings.servicesTitle}
              onChange={(e) => setSettings({ ...settings, servicesTitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alt Başlık</label>
            <input
              type="text"
              value={settings.servicesSubtitle}
              onChange={(e) => setSettings({ ...settings, servicesSubtitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          {settings.services.map((service, index) => (
            <div key={index} className="border-t pt-4">
              <h4 className="font-medium mb-2">Hizmet {index + 1}</h4>
              <div className="space-y-2">
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => {
                    const newServices = [...settings.services]
                    newServices[index].title = e.target.value
                    setSettings({ ...settings, services: newServices })
                  }}
                  placeholder="Başlık"
                  className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
                />
                <div className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <input
                      key={itemIndex}
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newServices = [...settings.services]
                        newServices[index].items[itemIndex] = e.target.value
                        setSettings({ ...settings, services: newServices })
                      }}
                      placeholder={`Madde ${itemIndex + 1}`}
                      className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
                    />
                  ))}
                  <button
                    onClick={() => {
                      const newServices = [...settings.services]
                      newServices[index].items.push('')
                      setSettings({ ...settings, services: newServices })
                    }}
                    className="text-[rgb(var(--primary))] hover:underline"
                  >
                    + Yeni Madde Ekle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[rgb(var(--card))] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">CTA Bölümü</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlık</label>
            <input
              type="text"
              value={settings.ctaTitle}
              onChange={(e) => setSettings({ ...settings, ctaTitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alt Başlık</label>
            <input
              type="text"
              value={settings.ctaSubtitle}
              onChange={(e) => setSettings({ ...settings, ctaSubtitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Buton Metni</label>
            <input
              type="text"
              value={settings.ctaButtonText}
              onChange={(e) => setSettings({ ...settings, ctaButtonText: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Buton Linki</label>
            <input
              type="text"
              value={settings.ctaButtonLink}
              onChange={(e) => setSettings({ ...settings, ctaButtonLink: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
        </div>
      </div>

      {/* Instagram Section */}
      <div className="bg-[rgb(var(--card))] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Instagram</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Instagram Kullanıcı Adı</label>
            <input
              type="text"
              value={settings.instagramUsername}
              onChange={(e) => setSettings({ ...settings, instagramUsername: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderGeneralSettings = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-[rgb(var(--card))] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlık</label>
            <input
              type="text"
              value={settings.heroTitle}
              onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alt Başlık</label>
            <input
              type="text"
              value={settings.heroSubtitle}
              onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Buton Metni</label>
            <input
              type="text"
              value={settings.heroButtonText}
              onChange={(e) => setSettings({ ...settings, heroButtonText: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Buton Linki</label>
            <input
              type="text"
              value={settings.heroButtonLink}
              onChange={(e) => setSettings({ ...settings, heroButtonLink: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[rgb(var(--card))] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">İstatistikler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settings.stats.map((stat, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-1">{stat.title}</label>
              <input
                type="number"
                value={stat.value}
                onChange={(e) => {
                  const newStats = [...settings.stats]
                  newStats[index].value = parseInt(e.target.value)
                  setSettings({ ...settings, stats: newStats })
                }}
                className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Why Us Section */}
      <div className="bg-[rgb(var(--card))] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Neden Biz</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlık</label>
            <input
              type="text"
              value={settings.whyUsTitle}
              onChange={(e) => setSettings({ ...settings, whyUsTitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alt Başlık</label>
            <input
              type="text"
              value={settings.whyUsSubtitle}
              onChange={(e) => setSettings({ ...settings, whyUsSubtitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          {settings.whyUsFeatures.map((feature, index) => (
            <div key={index} className="border-t pt-4">
              <h4 className="font-medium mb-2">Özellik {index + 1}</h4>
              <div className="space-y-2">
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => {
                    const newFeatures = [...settings.whyUsFeatures]
                    newFeatures[index].title = e.target.value
                    setSettings({ ...settings, whyUsFeatures: newFeatures })
                  }}
                  placeholder="Başlık"
                  className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
                />
                <input
                  type="text"
                  value={feature.description}
                  onChange={(e) => {
                    const newFeatures = [...settings.whyUsFeatures]
                    newFeatures[index].description = e.target.value
                    setSettings({ ...settings, whyUsFeatures: newFeatures })
                  }}
                  placeholder="Açıklama"
                  className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-[rgb(var(--card))] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Hizmetler</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlık</label>
            <input
              type="text"
              value={settings.servicesTitle}
              onChange={(e) => setSettings({ ...settings, servicesTitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alt Başlık</label>
            <input
              type="text"
              value={settings.servicesSubtitle}
              onChange={(e) => setSettings({ ...settings, servicesSubtitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          {settings.services.map((service, index) => (
            <div key={index} className="border-t pt-4">
              <h4 className="font-medium mb-2">Hizmet {index + 1}</h4>
              <div className="space-y-2">
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => {
                    const newServices = [...settings.services]
                    newServices[index].title = e.target.value
                    setSettings({ ...settings, services: newServices })
                  }}
                  placeholder="Başlık"
                  className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
                />
                <div className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <input
                      key={itemIndex}
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newServices = [...settings.services]
                        newServices[index].items[itemIndex] = e.target.value
                        setSettings({ ...settings, services: newServices })
                      }}
                      placeholder={`Madde ${itemIndex + 1}`}
                      className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
                    />
                  ))}
                  <button
                    onClick={() => {
                      const newServices = [...settings.services]
                      newServices[index].items.push('')
                      setSettings({ ...settings, services: newServices })
                    }}
                    className="text-[rgb(var(--primary))] hover:underline"
                  >
                    + Yeni Madde Ekle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[rgb(var(--card))] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">CTA Bölümü</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlık</label>
            <input
              type="text"
              value={settings.ctaTitle}
              onChange={(e) => setSettings({ ...settings, ctaTitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alt Başlık</label>
            <input
              type="text"
              value={settings.ctaSubtitle}
              onChange={(e) => setSettings({ ...settings, ctaSubtitle: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Buton Metni</label>
            <input
              type="text"
              value={settings.ctaButtonText}
              onChange={(e) => setSettings({ ...settings, ctaButtonText: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Buton Linki</label>
            <input
              type="text"
              value={settings.ctaButtonLink}
              onChange={(e) => setSettings({ ...settings, ctaButtonLink: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
        </div>
      </div>

      {/* Instagram Section */}
      <div className="bg-[rgb(var(--card))] p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Instagram</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Instagram Kullanıcı Adı</label>
            <input
              type="text"
              value={settings.instagramUsername}
              onChange={(e) => setSettings({ ...settings, instagramUsername: e.target.value })}
              className="w-full p-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--background))]"
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[rgb(var(--background))]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-8">Yönetim Paneli</h1>
        
        {/* Ana Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Mesajlar */}
          <div className="bg-[rgb(var(--card))] rounded-xl p-6 flex flex-col items-center justify-center">
            <FaEnvelope className="w-8 h-8 text-[rgb(var(--primary))] mb-2" />
            <div className="text-lg font-semibold mb-1">Mesajlar</div>
            <div className="text-3xl font-bold text-[rgb(var(--foreground))]">
              {dashboardData.recentActivities.filter(a => a.type === 'message').length}
            </div>
            <a href="/admin/messages" className="mt-4 text-[rgb(var(--primary))] hover:underline">Tüm Mesajlar</a>
          </div>
          {/* Galeri */}
          <div className="bg-[rgb(var(--card))] rounded-xl p-6 flex flex-col items-center justify-center">
            <FaImages className="w-8 h-8 text-[rgb(var(--primary))] mb-2" />
            <div className="text-lg font-semibold mb-1">Galeri</div>
            <div className="text-3xl font-bold text-[rgb(var(--foreground))]">
              {dashboardData.recentActivities.filter(a => a.type === 'gallery').length}
            </div>
            <a href="/admin/gallery" className="mt-4 text-[rgb(var(--primary))] hover:underline">Galeriye Git</a>
          </div>
          {/* Ayarlar */}
          <div className="bg-[rgb(var(--card))] rounded-xl p-6 flex flex-col items-center justify-center">
            <FaCog className="w-8 h-8 text-[rgb(var(--primary))] mb-2" />
            <div className="text-lg font-semibold mb-1">Ayarlar</div>
            <div className="text-3xl font-bold text-[rgb(var(--foreground))]">
              {dashboardData.systemUpdates.nextjs.needsUpdate || 
               dashboardData.systemUpdates.react.needsUpdate || 
               dashboardData.systemUpdates.tailwind.needsUpdate ? '!' : '-'}
            </div>
            <a href="/admin/settings" className="mt-4 text-[rgb(var(--primary))] hover:underline">Ayarlar</a>
          </div>
        </div>

        {/* Alt Kartlar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Son Aktiviteler */}
          <div className="bg-[rgb(var(--card))] rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FaClock className="w-6 h-6 text-[rgb(var(--primary))] mr-2" />
              <h2 className="text-xl font-semibold">Son Aktiviteler</h2>
            </div>
            <div className="space-y-4">
              {dashboardData.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[rgb(var(--background))] rounded-lg">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">
                      {new Date(activity.createdAt).toLocaleString('tr-TR')}
                    </p>
                  </div>
                  {activity.type === 'message' && <FaEnvelope className="w-5 h-5 text-[rgb(var(--primary))]" />}
                  {activity.type === 'gallery' && <FaImages className="w-5 h-5 text-[rgb(var(--primary))]" />}
                  {activity.type === 'settings' && <FaCog className="w-5 h-5 text-[rgb(var(--primary))]" />}
                </div>
              ))}
            </div>
          </div>

          {/* Hızlı İşlemler */}
          <div className="bg-[rgb(var(--card))] rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FaBolt className="w-6 h-6 text-[rgb(var(--primary))] mr-2" />
              <h2 className="text-xl font-semibold">Hızlı İşlemler</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => router.push('/admin/gallery/upload')}
                className="p-4 bg-[rgb(var(--background))] rounded-lg hover:bg-[rgb(var(--primary))] hover:text-white transition-colors"
              >
                <FaImages className="w-6 h-6 mx-auto mb-2" />
                <span>Fotoğraf Yükle</span>
              </button>
              <button 
                onClick={() => router.push('/admin/messages')}
                className="p-4 bg-[rgb(var(--background))] rounded-lg hover:bg-[rgb(var(--primary))] hover:text-white transition-colors"
              >
                <FaEnvelope className="w-6 h-6 mx-auto mb-2" />
                <span>Mesajları Kontrol Et</span>
              </button>
              <button 
                onClick={() => router.push('/admin/backup')}
                className="p-4 bg-[rgb(var(--background))] rounded-lg hover:bg-[rgb(var(--primary))] hover:text-white transition-colors"
              >
                <FaSave className="w-6 h-6 mx-auto mb-2" />
                <span>Yedek Al</span>
              </button>
              <button 
                onClick={() => router.push('/admin/settings')}
                className="p-4 bg-[rgb(var(--background))] rounded-lg hover:bg-[rgb(var(--primary))] hover:text-white transition-colors"
              >
                <FaCog className="w-6 h-6 mx-auto mb-2" />
                <span>Ayarları Güncelle</span>
              </button>
            </div>
          </div>

          {/* Sistem Durumu */}
          <div className="bg-[rgb(var(--card))] rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FaServer className="w-6 h-6 text-[rgb(var(--primary))] mr-2" />
              <h2 className="text-xl font-semibold">Sistem Durumu</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>CPU Kullanımı</span>
                  <span>{Math.round(dashboardData.systemStatus.cpu.usage)}%</span>
                </div>
                <div className="w-full bg-[rgb(var(--background))] rounded-full h-2">
                  <div 
                    className="bg-[rgb(var(--primary))] h-2 rounded-full" 
                    style={{ width: `${dashboardData.systemStatus.cpu.usage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>RAM Kullanımı</span>
                  <span>{Math.round(dashboardData.systemStatus.memory.usage)}%</span>
                </div>
                <div className="w-full bg-[rgb(var(--background))] rounded-full h-2">
                  <div 
                    className="bg-[rgb(var(--primary))] h-2 rounded-full" 
                    style={{ width: `${dashboardData.systemStatus.memory.usage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Disk Kullanımı</span>
                  <span>{Math.round(dashboardData.systemStatus.disk.usage)}%</span>
                </div>
                <div className="w-full bg-[rgb(var(--background))] rounded-full h-2">
                  <div 
                    className="bg-[rgb(var(--primary))] h-2 rounded-full" 
                    style={{ width: `${dashboardData.systemStatus.disk.usage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yeni Kartlar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ziyaretçi İstatistikleri */}
          <div className="bg-[rgb(var(--card))] rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FaUsers className="w-6 h-6 text-[rgb(var(--primary))] mr-2" />
              <h2 className="text-xl font-semibold">Ziyaretçi İstatistikleri</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[rgb(var(--background))] p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[rgb(var(--primary))]">
                    {dashboardData.visitorStats.today.toLocaleString()}
                  </div>
                  <div className="text-sm text-[rgb(var(--muted-foreground))]">Bugünkü Ziyaret</div>
                </div>
                <div className="bg-[rgb(var(--background))] p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-[rgb(var(--primary))]">
                    {dashboardData.visitorStats.week.toLocaleString()}
                  </div>
                  <div className="text-sm text-[rgb(var(--muted-foreground))]">Bu Hafta</div>
                </div>
              </div>
              <div className="bg-[rgb(var(--background))] p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>En Çok Ziyaret Edilen Sayfa</span>
                  <span className="text-[rgb(var(--primary))]">{dashboardData.visitorStats.topPage}</span>
                </div>
                <div className="w-full bg-[rgb(var(--border))] rounded-full h-2">
                  <div className="bg-[rgb(var(--primary))] h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sistem Güncellemeleri */}
          <div className="bg-[rgb(var(--card))] rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FaDownload className="w-6 h-6 text-[rgb(var(--primary))] mr-2" />
              <h2 className="text-xl font-semibold">Sistem Güncellemeleri</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[rgb(var(--background))] rounded-lg">
                <div>
                  <p className="font-medium">Next.js v{dashboardData.systemUpdates.nextjs.current}</p>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">
                    {dashboardData.systemUpdates.nextjs.needsUpdate ? 'Güncelleme Mevcut' : 'Güncel'}
                  </p>
                </div>
                {dashboardData.systemUpdates.nextjs.needsUpdate ? (
                  <button className="text-[rgb(var(--primary))] hover:underline">Güncelle</button>
                ) : (
                  <span className="text-green-500">✓</span>
                )}
              </div>
              <div className="flex items-center justify-between p-3 bg-[rgb(var(--background))] rounded-lg">
                <div>
                  <p className="font-medium">React v{dashboardData.systemUpdates.react.current}</p>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">
                    {dashboardData.systemUpdates.react.needsUpdate ? 'Güncelleme Mevcut' : 'Güncel'}
                  </p>
                </div>
                {dashboardData.systemUpdates.react.needsUpdate ? (
                  <button className="text-[rgb(var(--primary))] hover:underline">Güncelle</button>
                ) : (
                  <span className="text-green-500">✓</span>
                )}
              </div>
              <div className="flex items-center justify-between p-3 bg-[rgb(var(--background))] rounded-lg">
                <div>
                  <p className="font-medium">Tailwind CSS v{dashboardData.systemUpdates.tailwind.current}</p>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">
                    {dashboardData.systemUpdates.tailwind.needsUpdate ? 'Güncelleme Mevcut' : 'Güncel'}
                  </p>
                </div>
                {dashboardData.systemUpdates.tailwind.needsUpdate ? (
                  <button className="text-[rgb(var(--primary))] hover:underline">Güncelle</button>
                ) : (
                  <span className="text-green-500">✓</span>
                )}
              </div>
            </div>
          </div>

          {/* Güvenlik Durumu */}
          <div className="bg-[rgb(var(--card))] rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FaShieldAlt className="w-6 h-6 text-[rgb(var(--primary))] mr-2" />
              <h2 className="text-xl font-semibold">Güvenlik Durumu</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[rgb(var(--background))] rounded-lg">
                <div>
                  <p className="font-medium">SSL Sertifikası</p>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">
                    {dashboardData.securityStatus.sslValid ? 'Geçerli' : 'Geçersiz'}
                  </p>
                </div>
                <span className={dashboardData.securityStatus.sslValid ? "text-green-500" : "text-red-500"}>
                  {dashboardData.securityStatus.sslValid ? "✓" : "✗"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[rgb(var(--background))] rounded-lg">
                <div>
                  <p className="font-medium">Güvenlik Duvarı</p>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">
                    {dashboardData.securityStatus.firewallActive ? 'Aktif' : 'Pasif'}
                  </p>
                </div>
                <span className={dashboardData.securityStatus.firewallActive ? "text-green-500" : "text-red-500"}>
                  {dashboardData.securityStatus.firewallActive ? "✓" : "✗"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[rgb(var(--background))] rounded-lg">
                <div>
                  <p className="font-medium">Son Tarama</p>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">
                    {new Date(dashboardData.securityStatus.lastScan).toLocaleString('tr-TR')}
                  </p>
                </div>
                <button className="text-[rgb(var(--primary))] hover:underline">Tara</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 