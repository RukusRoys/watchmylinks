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

// Categorize link type
function categorizeLink(url: string): { category: string; provider: string } {
  const urlLower = url.toLowerCase()
  
  // Affiliate platforms
  const affiliatePatterns = [
    { domains: ['amzn.to', 'amazon.com', 'amazon.de', 'amazon.co.uk'], provider: 'Amazon', category: 'Affiliate' },
    { domains: ['ebay.com', 'ebay.de', 'ebay.co.uk'], provider: 'eBay', category: 'Affiliate' },
    { domains: ['aliexpress.com'], provider: 'AliExpress', category: 'Affiliate' },
    { domains: ['banggood.com'], provider: 'Banggood', category: 'Affiliate' },
    { domains: ['gearbest.com'], provider: 'GearBest', category: 'Affiliate' },
    { domains: ['shareasale.com'], provider: 'ShareASale', category: 'Affiliate' },
    { domains: ['awin1.com', 'awin.com'], provider: 'Awin', category: 'Affiliate' },
    { domains: ['anrdoezrs.net', 'tkqlhce.com', 'jdoqocy.com', 'dpbolvw.net'], provider: 'CJ Affiliate', category: 'Affiliate' },
    { domains: ['partnerize.com'], provider: 'Partnerize', category: 'Affiliate' },
    { domains: ['pxf.io', 'impact.com'], provider: 'Impact', category: 'Affiliate' },
  ]
  
  // URL Shorteners
  const shortenerPatterns = [
    'bit.ly', 'tinyurl.com', 'ow.ly', 'is.gd', 'buff.ly',
    't.co', 'goo.gl', 'lnkd.in', 'tiny.cc', 'cli.gs',
    'hier.gg', 'short.gy', 'cutt.ly', 'rb.gy', 'tiny.one',
  ]
  
  // Check affiliate patterns
  for (const pattern of affiliatePatterns) {
    for (const domain of pattern.domains) {
      if (urlLower.includes(domain)) {
        return { category: pattern.category, provider: pattern.provider }
      }
    }
  }
  
  // Check shorteners
  for (const shortener of shortenerPatterns) {
    if (urlLower.includes(shortener)) {
      return { category: 'Shortlink', provider: shortener }
    }
  }
  
  // Try to extract domain for custom shops
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.replace('www.', '')
    
    // Known creator shop platforms
    if (hostname.includes('spreadshirt.') || hostname.includes('redbubble.') || 
        hostname.includes('teespring.') || hostname.includes('fourthwall.')) {
      return { category: 'Eigener Shop', provider: hostname }
    }
    
    // Everything else is likely a custom shop or brand link
    return { category: 'Sonstige', provider: hostname }
  } catch {
    return { category: 'Sonstige', provider: 'Unknown' }
  }
}

// Extract all links from video description
function extractAllLinks(description: string): Array<{ url: string; category: string; provider: string }> {
  const links: Array<{ url: string; category: string; provider: string }> = []
  
  // Extract all URLs from description
  const urlPattern = /https?:\/\/[^\s<>"]+/g
  const urls = description.match(urlPattern) || []
  
  // Remove duplicates and categorize
  const uniqueUrls = [...new Set(urls)]
  
  for (const url of uniqueUrls) {
    const { category, provider } = categorizeLink(url)
    links.push({ url, category, provider })
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
    
    // Extract all links
    const allLinks = extractAllLinks(description)
    
    if (allLinks.length === 0) {
      return NextResponse.json({
        success: true,
        video: {
          id: videoId,
          title,
          url: videoUrl,
        },
        links: [],
        message: 'Keine Links gefunden'
      })
    }

    // Check link status for each link
    const checkedLinks = await Promise.all(
      allLinks.map(async (link) => {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout
          
          const response = await fetch(link.url, {
            method: 'HEAD',
            redirect: 'follow',
            signal: controller.signal,
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; WatchMyLinks/1.0; +https://watchmylinks.app)',
            },
          })
          
          clearTimeout(timeoutId)
          
          // Get final URL after redirects
          const finalUrl = response.url !== link.url ? response.url : undefined
          
          return {
            url: link.url,
            category: link.category,
            provider: link.provider,
            status: response.ok ? 'WORKING' : 'BROKEN',
            statusCode: response.status,
            finalUrl,
          }
        } catch (error: any) {
          return {
            url: link.url,
            category: link.category,
            provider: link.provider,
            status: error.name === 'AbortError' ? 'TIMEOUT' : 'BROKEN',
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
