import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.sliderImage.delete({
      where: {
        id: params.id
      }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Slider görseli silinemedi:', error)
    return NextResponse.json(
      { error: 'Slider görseli silinemedi' },
      { status: 500 }
    )
  }
} 