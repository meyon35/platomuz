import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import About from '@/models/About'

export async function GET() {
  try {
    await connectDB()
    const about = await About.findOne()
    return NextResponse.json(about || {})
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()
    
    // İlk kayıt varsa güncelle, yoksa yeni oluştur
    const about = await About.findOne()
    if (about) {
      about.title = data.title
      about.subtitle = data.subtitle
      about.description = data.description
      about.image = data.image
      about.mission = data.mission
      about.vision = data.vision
      about.features = data.features
      about.stats = data.stats
      await about.save()
    } else {
      await About.create(data)
    }

    return NextResponse.json({ message: 'Success' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 