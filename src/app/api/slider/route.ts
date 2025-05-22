import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sliderImages = await prisma.sliderImage.findMany({
      orderBy: {
        order: 'asc'
      }
    })
    return NextResponse.json(sliderImages)
  } catch (error) {
    console.error('Slider görselleri alınamadı:', error)
    return NextResponse.json(
      { error: 'Slider görselleri alınamadı' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { images } = await request.json()
    
    // Önce tüm slider görsellerini sil
    await prisma.sliderImage.deleteMany()
    
    // Yeni görselleri ekle
    const createdImages = await prisma.sliderImage.createMany({
      data: images.map((image: any) => ({
        id: image.id,
        url: image.url,
        order: image.order
      }))
    })
    
    return NextResponse.json(createdImages)
  } catch (error) {
    console.error('Slider görselleri güncellenemedi:', error)
    return NextResponse.json(
      { error: 'Slider görselleri güncellenemedi' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const sliderImage = await prisma.sliderImage.create({
      data: {
        url: data.url,
        order: data.order || 0
      }
    })
    return NextResponse.json(sliderImage)
  } catch (error) {
    console.error('Slider görseli eklenemedi:', error)
    return NextResponse.json(
      { error: 'Slider görseli eklenemedi' },
      { status: 500 }
    )
  }
} 