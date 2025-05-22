"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import WhyUs from '@/components/WhyUs'
import Services from '@/components/Services'
import InstagramFeed from '@/components/InstagramFeed'
import CTA from '@/components/CTA'

interface Settings {
  heroTitle: string
  heroSubtitle: string
  heroButtonText: string
  heroButtonLink: string
  heroImages: string[]
  stats: Array<{ title: string; value: number }>
  whyUsTitle: string
  whyUsSubtitle: string
  whyUsFeatures: Array<{ icon: string; title: string; description: string }>
  servicesTitle: string
  servicesSubtitle: string
  services: Array<{ icon: string; title: string; items: string[] }>
  ctaTitle: string
  ctaSubtitle: string
  ctaButtonText: string
  ctaButtonLink: string
  instagramUsername: string
}

interface SliderImage {
  id: string
  url: string
  order: number
}

interface PortfolioImage {
  id: string
  url: string
  title: string
  description: string
  category: {
    id: string
    name: string
  }
}

export default function Home() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([])
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, sliderRes, portfolioRes] = await Promise.all([
          fetch('/api/settings'),
          fetch('/api/slider'),
          fetch('/api/portfolio')
        ])

        if (!settingsRes.ok || !sliderRes.ok || !portfolioRes.ok) {
          throw new Error('Veriler alınamadı')
        }

        const [settingsData, sliderData, portfolioData] = await Promise.all([
          settingsRes.json(),
          sliderRes.json(),
          portfolioRes.json()
        ])

        setSettings(settingsData)
        setSliderImages(sliderData)
        setPortfolioImages(portfolioData)
      } catch (error) {
        console.error('Veri yükleme hatası:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[rgb(var(--foreground))]">Ayarlar yüklenemedi.</p>
      </div>
    )
  }

  return (
    <main>
      <Hero
        title={settings.heroTitle}
        subtitle={settings.heroSubtitle}
        buttonText={settings.heroButtonText}
        buttonLink={settings.heroButtonLink}
        images={settings.heroImages}
      />

      {/* Slider Section */}
      <section className="relative h-[70vh] w-full">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="h-full w-full"
        >
          {sliderImages.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="relative h-full w-full">
                <Image
                  src={image.url}
                  alt="Slider Image"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Stats stats={settings.stats} />

      <WhyUs
        title={settings.whyUsTitle}
        subtitle={settings.whyUsSubtitle}
        features={settings.whyUsFeatures}
      />

      <Services
        title={settings.servicesTitle}
        subtitle={settings.servicesSubtitle}
        services={settings.services}
      />

      {/* Portfolio Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Portfolyo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-200">{image.description}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                    {image.category.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <InstagramFeed username={settings.instagramUsername} />

      <CTA
        title={settings.ctaTitle}
        subtitle={settings.ctaSubtitle}
        buttonText={settings.ctaButtonText}
        buttonLink={settings.ctaButtonLink}
      />
    </main>
  )
}