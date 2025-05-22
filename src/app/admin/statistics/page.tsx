"use client"

import { motion } from 'framer-motion'
import { FaUsers, FaEnvelope, FaImages, FaCalendarAlt } from 'react-icons/fa'

interface StatCard {
  title: string
  value: string | number
  icon: any
  color: string
}

const stats: StatCard[] = [
  {
    title: 'Toplam Ziyaretçi',
    value: '1,234',
    icon: FaUsers,
    color: 'bg-blue-500'
  },
  {
    title: 'Toplam Mesaj',
    value: '56',
    icon: FaEnvelope,
    color: 'bg-green-500'
  },
  {
    title: 'Toplam Görsel',
    value: '89',
    icon: FaImages,
    color: 'bg-purple-500'
  },
  {
    title: 'Bu Ayki Etkinlik',
    value: '12',
    icon: FaCalendarAlt,
    color: 'bg-orange-500'
  }
]

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--background))]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-8">
          İstatistikler
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[rgb(var(--card))] rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[rgb(var(--muted-foreground))] text-sm">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-[rgb(var(--foreground))] mt-1">
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ziyaretçi Grafiği */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[rgb(var(--card))] rounded-xl p-6"
          >
            <h2 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-4">
              Ziyaretçi İstatistikleri
            </h2>
            <div className="h-64 flex items-center justify-center">
              <p className="text-[rgb(var(--muted-foreground))]">
                Grafik burada görüntülenecek
              </p>
            </div>
          </motion.div>

          {/* Mesaj İstatistikleri */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[rgb(var(--card))] rounded-xl p-6"
          >
            <h2 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-4">
              Mesaj İstatistikleri
            </h2>
            <div className="h-64 flex items-center justify-center">
              <p className="text-[rgb(var(--muted-foreground))]">
                Grafik burada görüntülenecek
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 