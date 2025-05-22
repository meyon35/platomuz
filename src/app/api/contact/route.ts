import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validasyon
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Tüm alanları doldurunuz' },
        { status: 400 }
      )
    }

    // Veritabanına kaydet
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        message,
        isRead: false,
        createdAt: new Date()
      }
    })

    return NextResponse.json({ success: true, data: contact })
  } catch (error) {
    console.error('İletişim formu hatası:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
} 