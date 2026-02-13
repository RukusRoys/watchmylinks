// Database Connection Test API
// GET /api/db-test

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Test 1: Check connection
    await prisma.$connect()
    
    // Test 2: Count tables (should be 0 initially)
    const userCount = await prisma.user.count()
    const channelCount = await prisma.channel.count()
    const linkCount = await prisma.link.count()
    const checkCount = await prisma.linkCheck.count()
    
    return NextResponse.json({
      success: true,
      message: '✅ Database connected successfully!',
      tables: {
        users: userCount,
        channels: channelCount,
        links: linkCount,
        link_checks: checkCount,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('❌ Database test failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: String(error),
        message: '❌ Database connection failed',
      },
      { status: 500 }
    )
  }
}
