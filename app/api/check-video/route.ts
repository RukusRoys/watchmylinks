import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

// Extract video ID from YouTube URL
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\?\/]+)/,
    /youtube\.com\/embed\/([^&\?\/]+)/,
    /youtube\.com\/v\/([^&\?\/]+)/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return null
}

// Extract affiliate links from video description
function extractAffiliateLinks(description: string): Array<{ url: string; provider: string }> {
  const links: Array<{ url: string; provider: string }> = []
  
  // Common affiliate domains
  const affiliatePatterns = [
    { domain: 'amzn.to', provider: 'Amazon' },
    { domain: 'amazon.com', provider: 'Amazon' },
    { domain: 'amazon.de', provider: 'Amazon' },
    { domain: 'ebay.com', provider: 'eBay' },
    { domain: 'ebay.de', provider: 'eBay' },
    { domain: 'aliexpress.com', provider: 'AliExpress' },
    { domain: 'banggood.com', provider: 'Banggood' },
    { domain: 'shareasale.com', provider: 'ShareASale' },
    { domain: 'awin1.com', provider: 'Awin' },
    { domain: 'anrdoezrs.net', provider: 'CJ Affiliate' },
    { domain: 'tkqlhce.com', provider: 'CJ Affiliate' },
    { domain: 'jdoqocy.com', provider: 'CJ Affiliate' },
  ]
  
  // Extract all URLs from description
  const urlPattern = /https?:\/\/[^\s<>"]+/g
  const urls = description.match(urlPattern) || []
  
  for (const url of urls) {
    for (const pattern of affiliatePatterns) {
      if (url.includes(pattern.domain)) {
        links.push({ url, provider: pattern.provider })
        break
      }
    }
  }
  
  return links
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()
    
    if (!user || !user.emailAddresses[0]) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress },
    })

    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { videoUrl } = body

    if (!videoUrl) {
      return NextResponse.json(
        { error: 'Video URL required' },
        { status: 400 }
      )
    }

    // Extract video ID
    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      )
    }

    // Fetch video details from YouTube API
    const apiKey = process.env.YOUTUBE_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'YouTube API not configured' },
        { status: 500 }
      )
    }

    const youtubeResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    )

    if (!youtubeResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch video from YouTube' },
        { status: 500 }
      )
    }

    const youtubeData = await youtubeResponse.json()
    
    if (!youtubeData.items || youtubeData.items.length === 0) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    const video = youtubeData.items[0]
    const description = video.snippet.description || ''
    const title = video.snippet.title
    
    // Extract affiliate links
    const affiliateLinks = extractAffiliateLinks(description)
    
    if (affiliateLinks.length === 0) {
      return NextResponse.json({
        success: true,
        video: {
          id: videoId,
          title,
          url: videoUrl,
        },
        links: [],
        message: 'Keine Affiliate-Links gefunden'
      })
    }

    // Check link status for each link
    const checkedLinks = await Promise.all(
      affiliateLinks.map(async (link) => {
        try {
          const response = await fetch(link.url, {
            method: 'HEAD',
            redirect: 'follow',
          })
          
          return {
            url: link.url,
            provider: link.provider,
            status: response.ok ? 'WORKING' : 'BROKEN',
            statusCode: response.status,
          }
        } catch (error) {
          return {
            url: link.url,
            provider: link.provider,
            status: 'BROKEN',
            statusCode: 0,
          }
        }
      })
    )

    return NextResponse.json({
      success: true,
      video: {
        id: videoId,
        title,
        url: videoUrl,
      },
      links: checkedLinks,
    })

  } catch (error) {
    console.error('Check video error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
