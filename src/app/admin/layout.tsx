"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FaHome, 
  FaImages, 
  FaEnvelope, 
  FaChartBar, 
  FaBars, 
  FaTimes,
  FaNewspaper,
  FaUsers,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa'

const menuItems = [
  {
    title: 'Ana Sayfa',
    icon: FaHome,
    href: '/admin'
  },
  {
    title: 'İçerik Yönetimi',
    icon: FaImages,
    items: [
      {
        title: 'Slider Yönetimi',
        href: '/admin/gallery/slider'
      },
      {
        title: 'Portfolyo Yönetimi',
        href: '/admin/gallery/portfolio'
      },
      {
        title: 'Hakkımızda',
        href: '/admin/about'
      },
      {
        title: 'İletişim',
        href: '/admin/contact'
      }
    ]
  },
  {
    title: 'Mesajlar',
    icon: FaEnvelope,
    href: '/admin/messages'
  },
  {
    title: 'Ayarlar',
    icon: FaCog,
    href: '/admin/settings'
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[rgb(var(--background))]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[rgb(var(--card))] p-4 flex items-center justify-between border-b border-[rgb(var(--border))]">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] transition-colors"
        >
          {isSidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
        <h1 className="text-xl font-bold text-[rgb(var(--foreground))]">Yönetim Paneli</h1>
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        className="fixed top-0 left-0 bottom-0 w-72 bg-[rgb(var(--card))] p-4 z-40 lg:translate-x-0 border-r border-[rgb(var(--border))]"
      >
        <div className="h-full flex flex-col">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Yönetim Paneli</h1>
            <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
              Davet Evi Organizasyon
            </p>
          </div>

          <nav className="flex-1 space-y-6">
            {menuItems.map((section) => (
              <div key={section.title}>
                <h2 className="text-sm font-semibold text-[rgb(var(--muted-foreground))] mb-2 px-4">
                  {section.title}
                </h2>
                <ul className="space-y-1">
                  {section.items ? (
                    section.items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                              isActive
                                ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
                                : 'hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))]'
                            }`}
                          >
                            <section.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      )
                    })
                  ) : (
                    <li>
                      <Link
                        href={section.href}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                          pathname === section.href
                            ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
                            : 'hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))]'
                        }`}
                      >
                        <section.icon className="w-4 h-4" />
                        <span>{section.title}</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </nav>

          <div className="pt-4 border-t border-[rgb(var(--border))]">
            <Link
              href="/admin/logout"
              className="flex items-center space-x-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Çıkış Yap</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`lg:ml-72 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
} 