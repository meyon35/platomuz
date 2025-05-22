import { NextResponse } from 'next/server'
import os from 'os'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Sistem Durumu
    const systemStatus = {
      cpu: {
        usage: os.loadavg()[0] * 100 / os.cpus().length,
        cores: os.cpus().length
      },
      memory: {
        total: os.totalmem(),
        free: os.freemem(),
        usage: ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
      },
      uptime: os.uptime()
    }

    // Son Aktiviteler
    const recentActivities = await prisma.activity.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Ziyaretçi İstatistikleri
    const visitorStats = await prisma.visitorStats.findFirst({
      where: {
        date: new Date().toISOString().split('T')[0]
      }
    })

    // Güvenlik Durumu
    const securityStatus = {
      sslValid: true, // SSL kontrolü yapılacak
      firewallActive: true,
      lastScan: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 saat önce
      vulnerabilities: 0
    }

    // Sistem Güncellemeleri
    const systemUpdates = {
      nextjs: {
        current: '14.1.0',
        latest: '14.1.0',
        needsUpdate: false
      },
      react: {
        current: '18.2.0',
        latest: '18.2.0',
        needsUpdate: false
      },
      tailwind: {
        current: '3.4.0',
        latest: '3.4.1',
        needsUpdate: true
      }
    }

    return NextResponse.json({
      systemStatus,
      recentActivities,
      visitorStats,
      securityStatus,
      systemUpdates
    })
  } catch (error) {
    console.error('Dashboard verisi alınırken hata:', error)
    return NextResponse.json(
      { error: 'Dashboard verisi alınamadı' },
      { status: 500 }
    )
  }
} 