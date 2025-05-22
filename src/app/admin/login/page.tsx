"use client"

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

// Giriş bilgileri
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'Pl@tomuz2024!' // Güvenli şifre
}

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (formData.username === ADMIN_CREDENTIALS.username && 
        formData.password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('adminLoggedIn', 'true')
      router.push('/admin')
    } else {
      setError('Kullanıcı adı veya şifre hatalı!')
    }
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[rgb(var(--card))] rounded-xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-6 text-center">
          Yönetim Paneli Girişi
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[rgb(var(--foreground))] mb-2">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className="w-full p-2 rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))]"
              required
            />
          </div>
          
          <div>
            <label className="block text-[rgb(var(--foreground))] mb-2">
              Şifre
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full p-2 rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))]"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Giriş Yap
          </button>
        </form>
      </motion.div>
    </div>
  )
} 