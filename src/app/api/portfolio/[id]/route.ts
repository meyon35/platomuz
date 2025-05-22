import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const updatedImage = await prisma.portfolioImage.update({
      where: {
        id: params.id
      },
      data: {
        title: data.title,
        description: data.description,
        category: data.category
      }
    })
    return NextResponse.json(updatedImage)
  } catch (error) {
    console.error('Portfolyo görseli güncellenemedi:', error)
    return NextResponse.json(
      { error: 'Portfolyo görseli güncellenemedi' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.portfolioImage.delete({
      where: {
        id: params.id
      }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Portfolyo görseli silinemedi:', error)
    return NextResponse.json(
      { error: 'Portfolyo görseli silinemedi' },
      { status: 500 }
    )
  }
} 