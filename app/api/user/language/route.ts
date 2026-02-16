import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()
    
    if (!user || !user.emailAddresses[0]) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { language } = body

    if (!language || !['en', 'de'].includes(language)) {
      return NextResponse.json(
        { error: 'Invalid language' },
        { status: 400 }
      )
    }

    // Update user language in database
    const updatedUser = await prisma.user.update({
      where: { email: user.emailAddresses[0].emailAddress },
      data: { language },
    })

    return NextResponse.json({
      success: true,
      language: updatedUser.language,
    })

  } catch (error) {
    console.error('Update language error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
