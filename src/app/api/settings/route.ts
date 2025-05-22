import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const settingsFile = path.join(process.cwd(), 'data', 'settings.json')

// Ayarları oku
export async function GET() {
  try {
    // Eğer dosya yoksa varsayılan ayarları oluştur
    if (!fs.existsSync(settingsFile)) {
      const defaultSettings = {
        heroTitle: "Platomuz",
        heroSubtitle: "Profesyonel Çözüm Ortağınız",
        heroButtonText: "İletişime Geç",
        heroButtonLink: "/iletisim",
        heroImages: [],
        stats: [
          { title: "Tamamlanan Proje", value: 150 },
          { title: "Mutlu Müşteri", value: 100 },
          { title: "Yıllık Deneyim", value: 10 }
        ],
        whyUsTitle: "Neden Biz?",
        whyUsSubtitle: "Size en iyi hizmeti sunmak için çalışıyoruz",
        whyUsFeatures: [
          {
            icon: "check-circle",
            title: "Profesyonel Ekip",
            description: "Alanında uzman ekibimizle kaliteli hizmet sunuyoruz"
          },
          {
            icon: "clock",
            title: "Hızlı Teslimat",
            description: "Projelerinizi zamanında teslim ediyoruz"
          },
          {
            icon: "shield",
            title: "Güvenilir Hizmet",
            description: "Müşteri memnuniyeti odaklı çalışıyoruz"
          }
        ],
        servicesTitle: "Hizmetlerimiz",
        servicesSubtitle: "Size özel çözümler sunuyoruz",
        services: [
          {
            icon: "camera",
            title: "Fotoğrafçılık",
            items: [
              "Düğün Fotoğrafçılığı",
              "Nişan Fotoğrafçılığı",
              "Kına Fotoğrafçılığı",
              "Özel Çekimler"
            ]
          },
          {
            icon: "glass",
            title: "Organizasyon",
            items: [
              "Düğün Organizasyonu",
              "Nişan Organizasyonu",
              "Kına Organizasyonu",
              "Özel Gün Organizasyonu"
            ]
          },
          {
            icon: "home",
            title: "Davet Evi",
            items: [
              "Modern Mekan",
              "Profesyonel Ekip",
              "Özel Menü Seçenekleri",
              "Ses ve Işık Sistemleri"
            ]
          }
        ],
        ctaTitle: "Özel Gününüzü Planlayalım",
        ctaSubtitle: "Size özel hizmetlerimiz için hemen iletişime geçin",
        ctaButtonText: "İletişime Geçin",
        ctaButtonLink: "/iletisim",
        instagramUsername: "platomuz",
        instagramPosts: [],
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
      }
      // data klasörünü oluştur
      if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
        fs.mkdirSync(path.join(process.cwd(), 'data'))
      }
      fs.writeFileSync(settingsFile, JSON.stringify(defaultSettings, null, 2))
      return NextResponse.json(defaultSettings)
    }

    // Dosya varsa onu oku ve döndür
    const settings = JSON.parse(fs.readFileSync(settingsFile, 'utf-8'))
    // Eğer theme alanı eksikse ekle
    if (!settings.theme) {
      settings.theme = {
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
      }
      fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2))
    }
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Ayarlar alınamadı:', error)
    return NextResponse.json(
      { error: 'Ayarlar alınamadı' },
      { status: 500 }
    )
  }
}

// Ayarları güncelle
export async function POST(request: Request) {
  try {
    const settings = await request.json()
    if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
      fs.mkdirSync(path.join(process.cwd(), 'data'))
    }
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2))
    return NextResponse.json({ message: 'Ayarlar başarıyla kaydedildi' })
  } catch (error) {
    console.error('Ayarlar kaydedilirken hata:', error)
    return NextResponse.json({ error: 'Ayarlar kaydedilemedi' }, { status: 500 })
  }
} 