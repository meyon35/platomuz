import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const portfolioImages = await prisma.portfolioImage.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(portfolioImages)
  } catch (error) {
    console.error('Portfolyo görselleri alınamadı:', error)
    return NextResponse.json(
      { error: 'Portfolyo görselleri alınamadı' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const portfolioImage = await prisma.portfolioImage.create({
      data: {
        url: data.url,
        title: data.title || '',
        description: data.description || '',
        category: data.category
      }
    })
    return NextResponse.json(portfolioImage)
  } catch (error) {
    console.error('Portfolyo görseli eklenemedi:', error)
    return NextResponse.json(
      { error: 'Portfolyo görseli eklenemedi' },
      { status: 500 }
    )
  }
} 