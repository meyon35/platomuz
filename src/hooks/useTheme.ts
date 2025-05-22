"use client"

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export function useThemeSettings() {
  const { theme } = useTheme()

  useEffect(() => {
    // Tema değiştiğinde ayarları güncelle
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.theme) {
          const root = document.documentElement
          const mode = theme === 'dark' ? 'dark' : 'light'
          Object.entries(data.theme[mode]).forEach(([key, value]) => {
            if (typeof value === 'string') {
              const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
              const rgbValues = value.match(/\d+/g)?.join(' ')
              if (rgbValues) {
                root.style.setProperty(`--${cssVar}`, rgbValues)
              }
            }
          })
        }
      })
      .catch(console.error)

    // Tema değişikliklerini dinle
    const handleThemeChange = (event: CustomEvent) => {
      const root = document.documentElement
      const mode = theme === 'dark' ? 'dark' : 'light'
      Object.entries(event.detail[mode]).forEach(([key, value]) => {
        if (typeof value === 'string') {
          const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
          const rgbValues = value.match(/\d+/g)?.join(' ')
          if (rgbValues) {
            root.style.setProperty(`--${cssVar}`, rgbValues)
          }
        }
      })
    }

    window.addEventListener('themeChange', handleThemeChange as EventListener)
    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener)
    }
  }, [theme])
} 