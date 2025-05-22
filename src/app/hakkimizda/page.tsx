"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCamera, FaAward, FaUsers, FaCheckCircle, FaGlassCheers, FaHome } from 'react-icons/fa'

export default function HakkimizdaPage() {
  const stats = [
    {
      icon: FaCamera,
      value: '1000+',
      label: 'Başarılı Çekim'
    },
    {
      icon: FaAward,
      value: '5+',
      label: 'Yıllık Deneyim'
    },
    {
      icon: FaUsers,
      value: '500+',
      label: 'Mutlu Müşteri'
    },
    {
      icon: FaGlassCheers,
      value: '200+',
      label: 'Organizasyon'
    },
    {
      icon: FaHome,
      value: '100+',
      label: 'Davet Evi Etkinliği'
    },
    {
      icon: FaCheckCircle,
      value: '100%',
      label: 'Müşteri Memnuniyeti'
    }
  ]

  const features = [
    'Profesyonel Ekipman',
    'Deneyimli Ekip',
    'Hızlı Teslimat',
    'Kaliteli Hizmet',
    'Müşteri Memnuniyeti',
    'Modern Davet Evi',
    'Organizasyon Uzmanlığı',
    'Özel Menü Seçenekleri'
  ]

  return (
    <main className="pt-20 bg-[rgb(var(--background))] min-h-screen">
      {/* Header */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--foreground))] mb-6">
              Hakkımızda
            </h1>
            <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              Isparta'nın önde gelen fotoğrafçılık stüdyosu ve davet evi olarak profesyonel hizmet sunuyoruz
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[rgb(var(--foreground))] mb-6">
                Profesyonel Hizmet Hikayemiz
              </h2>
              <p className="text-[rgb(var(--muted-foreground))] mb-6">
                Isparta'nın merkezinde yer alan stüdyomuzda ve davet evimizde, modern ekipmanlarımız ve uzman 
                kadromuzla en kaliteli hizmeti sunmaktayız. Düğün, nişan, kına organizasyonları, 
                mezuniyet ve özel gün çekimleriniz için profesyonel çözümler üretiyoruz.
              </p>
              <p className="text-[rgb(var(--muted-foreground))] mb-8">
                Amacımız, sizin en özel anlarınızı en güzel şekilde ölümsüzleştirmek, 
                unutulmaz organizasyonlar düzenlemek ve modern davet evimizde konforlu bir ortam sunmaktır. 
                Her hizmetimizde en yüksek kaliteyi yakalamak için sürekli kendimizi geliştiriyor 
                ve en son teknolojileri takip ediyoruz.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FaCheckCircle className="text-[rgb(var(--primary))] w-5 h-5" />
                    <span className="text-[rgb(var(--foreground))] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-xl overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg"
                alt="Stüdyo"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[rgb(var(--card))] rounded-xl p-8 text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12 text-[rgb(var(--primary))]" />
                </div>
                <div className="text-3xl font-bold text-[rgb(var(--foreground))] mb-2">{stat.value}</div>
                <div className="text-[rgb(var(--muted-foreground))]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmetlerimiz */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[rgb(var(--foreground))] mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              Profesyonel fotoğrafçılık hizmetlerimiz, organizasyonlarımız ve davet evimiz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fotoğrafçılık Hizmetleri */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[rgb(var(--card))] rounded-xl p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="flex justify-center mb-6">
                <FaCamera className="w-12 h-12 text-[rgb(var(--primary))]" />
              </div>
              <h3 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-4 text-center">
                Fotoğrafçılık Hizmetleri
              </h3>
              <ul className="space-y-3 text-[rgb(var(--muted-foreground))]">
                <li className="flex items-center">
                  <FaCheckCircle className="w-5 h-5 text-[rgb(var(--primary))] mr-2" />
                  Düğün Fotoğrafçılığı
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="w-5 h-5 text-[rgb(var(--primary))] mr-2" />
                  Nişan Fotoğrafçılığı
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="w-5 h-5 text-[rgb(var(--primary))] mr-2" />
                  Kına Gecesi Çekimleri
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="w-5 h-5 text-[rgb(var(--primary))] mr-2" />
                  Özel Gün Çekimleri
                </li>
              </ul>
            </motion.div>

            {/* Organizasyon Hizmetleri */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[rgb(var(--card))] rounded-xl p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="flex justify-center mb-6">
                <FaGlassCheers className="w-12 h-12 text-[rgb(var(--primary))]" />
              </div>
              <h3 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-4 text-center">
                Organizasyon Hizmetleri
              </h3>
              <ul className="space-y-3 text-[rgb(var(--muted-foreground))]">
                <li className="flex items-center">
                  <FaCheckCircle className="w-5 h-5 text-[rgb(var(--primary))] mr-2" />
                  Kına Organizasyonu
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="w-5 h-5 text-[rgb(var(--primary))] mr-2" />
                  Nişan Organizasyonu
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="w-5 h-5 text-[rgb(var(--primary))] mr-2" />
                  Doğum Günü Organizasyonu
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="w-5 h-5 text-[rgb(var(--primary))] mr-2" />
                  Özel Etkinlik Organizasyonu
                </li>
              </ul>
            </motion.div>

            {/* Davet Evi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[rgb(var(--card))] rounded-xl p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="flex justify-center mb-6">
                <FaHome className="w-12 h-12 text-[rgb(var(--primary))]" />
              </div>
              <h3 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-4 text-center">
                Davet Evi
              </h3>
              <ul className="space-y-3 text-[rgb(var(--muted-foreground))]">
                <li className="flex items-center">
                  <FaCheckCircle className="w-5 h-5 text-[rgb(var(--primary))] mr-2" />
                  Modern Mekan
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="w-5 h-5 text-[rgb(var(--primary))] mr-2" />
                  Profesyonel Ekip
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="w-5 h-5 text-[rgb(var(--primary))] mr-2" />
                  Özel Menü Seçenekleri
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="w-5 h-5 text-[rgb(var(--primary))] mr-2" />
                  Dekorasyon Hizmeti
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="py-20 bg-[rgb(var(--card))]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <h3 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-4">
                Misyonumuz
              </h3>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                Müşterilerimizin en özel anlarını profesyonel fotoğrafçılık hizmetlerimizle ölümsüzleştirmek, 
                organizasyon hizmetlerimizle unutulmaz etkinlikler düzenlemek ve modern davet evimizle 
                konforlu bir ortam sunmak. Her projede en yüksek kaliteyi ve müşteri memnuniyetini 
                hedefliyoruz.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <h3 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-4">
                Vizyonumuz
              </h3>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                Fotoğrafçılık, organizasyon ve davet evi hizmetlerimizle sektörde öncü olmak, 
                yenilikçi yaklaşımlarımızla fark yaratmak ve müşterilerimizin hayallerini 
                gerçeğe dönüştürmek. Sürekli gelişerek ve kendimizi yenileyerek en iyi 
                hizmeti sunmaya devam edeceğiz.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
} 