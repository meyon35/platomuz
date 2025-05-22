"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaEnvelopeOpen, FaTrash } from 'react-icons/fa'

interface Message {
  id: number
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
  isRead: boolean
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '0555 123 4567',
      message: 'Düğün organizasyonu için bilgi almak istiyorum. Fiyatlar hakkında detaylı bilgi verebilir misiniz?',
      createdAt: '2024-03-15T10:30:00',
      isRead: false
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      phone: '0555 987 6543',
      message: 'Nişan organizasyonu için fiyat bilgisi alabilir miyim? Ayrıca mekan seçenekleriniz nelerdir?',
      createdAt: '2024-03-14T15:45:00',
      isRead: true
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      phone: '0555 456 7890',
      message: 'Özel çekim için randevu almak istiyorum. Hafta sonu müsait misiniz?',
      createdAt: '2024-03-13T09:15:00',
      isRead: false
    }
  ])

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const handleDelete = (id: number) => {
    if (confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      setMessages(messages.filter(message => message.id !== id))
      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    }
  }

  const toggleRead = (id: number) => {
    setMessages(messages.map(message =>
      message.id === id
        ? { ...message, isRead: !message.isRead }
        : message
    ))
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--background))]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-8">
          Mesajlar
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 bg-[rgb(var(--card))] rounded-xl p-4">
            <div className="space-y-2">
              {messages.length === 0 ? (
                <p className="text-[rgb(var(--muted-foreground))] text-center py-4">
                  Henüz mesaj yok
                </p>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id
                        ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
                        : 'bg-[rgb(var(--background))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))]'
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {message.isRead ? (
                          <FaEnvelopeOpen className="w-4 h-4" />
                        ) : (
                          <FaEnvelope className="w-4 h-4" />
                        )}
                        <span className="font-semibold">{message.name}</span>
                      </div>
                      <span className="text-sm">
                        {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    <p className="mt-2 text-sm line-clamp-1">{message.message}</p>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[rgb(var(--card))] rounded-xl p-6"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                      {selectedMessage.name}
                    </h2>
                    <p className="text-[rgb(var(--muted-foreground))]">
                      {new Date(selectedMessage.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleRead(selectedMessage.id)}
                      className="p-2 rounded-lg hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] transition-colors"
                    >
                      {selectedMessage.isRead ? (
                        <FaEnvelopeOpen className="w-5 h-5" />
                      ) : (
                        <FaEnvelope className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))]">
                      E-posta
                    </label>
                    <p className="mt-1 text-[rgb(var(--foreground))]">
                      {selectedMessage.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))]">
                      Telefon
                    </label>
                    <p className="mt-1 text-[rgb(var(--foreground))]">
                      {selectedMessage.phone}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--muted-foreground))]">
                      Mesaj
                    </label>
                    <p className="mt-4 text-[rgb(var(--foreground))] whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-[rgb(var(--card))] rounded-xl p-6 flex items-center justify-center h-full">
                <p className="text-[rgb(var(--muted-foreground))]">
                  Mesaj seçilmedi
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 