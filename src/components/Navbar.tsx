"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaImages, FaBuilding, FaChartBar, FaEnvelope, FaCog } from 'react-icons/fa'

const menuItems = [
  { href: '/admin', label: 'Ana Sayfa', icon: FaHome },
  { href: '/admin/venue', label: 'Davet Evi', icon: FaBuilding },
  { href: '/admin/gallery', label: 'Galeri', icon: FaImages },
  { href: '/admin/stats', label: 'İstatistikler', icon: FaChartBar },
  { href: '/admin/messages', label: 'Mesajlar', icon: FaEnvelope },
  { href: '/admin/settings', label: 'Ayarlar', icon: FaCog },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[rgb(var(--card))] border-b border-[rgb(var(--border))] z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/admin" className="text-xl font-bold text-[rgb(var(--foreground))]">
            Platomuz
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
                      : 'text-[rgb(var(--foreground))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
                      : 'text-[rgb(var(--foreground))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
} 