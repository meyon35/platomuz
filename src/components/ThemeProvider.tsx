"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }: { children: React.ReactNode }) {
  useEffect(() => {
    // Tema ayarlarını yükle
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.theme) {
          // CSS değişkenlerini güncelle
          const root = document.documentElement
          const mode = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
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
  }, [])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
} 