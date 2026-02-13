import { NextRequest, NextResponse } from 'next/server';

// Extract video ID from YouTube URL
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
    /youtube\.com\/embed\/([^&\s]+)/,
    /youtube\.com\/v\/([^&\s]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Extract URLs from text
function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/g;
  const matches = text.match(urlRegex) || [];
  return [...new Set(matches)]; // Remove duplicates
}

// Filter out obvious non-affiliate links (social media profiles, etc.)
function isLikelyAffiliateLink(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase().replace('www.', '');
    const pathname = urlObj.pathname.toLowerCase();

    // BLACKLIST: Definitely NOT affiliate links
    
    // Twitter/X profiles (not affiliate)
    if ((hostname === 'twitter.com' || hostname === 'x.com') && 
        (pathname.match(/^\/[a-zA-Z0-9_]+\/?$/) || pathname === '/')) {
      return false;
    }

    // LinkedIn profiles (not affiliate)
    if (hostname === 'linkedin.com' && 
        (pathname.startsWith('/in/') || pathname.startsWith('/company/'))) {
      return false;
    }

    // YouTube videos/channels (not affiliate)
    if ((hostname === 'youtube.com' || hostname === 'youtu.be') && 
        (pathname.startsWith('/watch') || pathname.startsWith('/channel') || 
         pathname.startsWith('/@') || pathname.startsWith('/c/'))) {
      return false;
    }

    // Discord invites (not affiliate)
    if ((hostname === 'discord.gg' || hostname === 'discord.com') && 
        pathname.startsWith('/invite')) {
      return false;
    }

    // Instagram profiles (simple ones - not shopping links)
    if (hostname === 'instagram.com' && 
        pathname.match(/^\/[a-zA-Z0-9_.]+\/?$/)) {
      return false;
    }

    // Facebook profiles (not affiliate)
    if (hostname === 'facebook.com' && 
        (pathname.match(/^\/[a-zA-Z0-9.]+\/?$/) || pathname.startsWith('/profile.php'))) {
      return false;
    }

    // TikTok profiles (but NOT TikTok Shop links)
    if (hostname === 'tiktok.com' && 
        pathname.match(/^\/@[a-zA-Z0-9_.]+\/?$/)) {
      return false;
    }

    // Patreon creator pages (not affiliate)
    if (hostname === 'patreon.com' && 
        pathname.match(/^\/[a-zA-Z0-9_]+\/?$/)) {
      return false;
    }

    // Link aggregators (personal link pages)
    if (hostname === 'linktr.ee' || hostname === 'beacons.ai' || 
        hostname === 'bio.link' || hostname === 'linkin.bio') {
      return false;
    }

    // Threads profiles
    if (hostname === 'threads.net' && 
        pathname.match(/^\/@[a-zA-Z0-9_.]+\/?$/)) {
      return false;
    }

    // Everything else: assume it COULD be an affiliate link
    return true;

  } catch (e) {
    // If URL parsing fails, include it (better safe than sorry)
    return true;
  }
}

// Check single link status
async function checkLinkStatus(url: string) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'manual', // Don't follow redirects automatically
    });

    clearTimeout(timeout);

    return {
      url,
      status: response.status,
      redirected: response.status >= 300 && response.status < 400,
    };
  } catch (error) {
    return {
      url,
      status: 0,
      redirected: false,
      error: 'Timeout or network error',
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { videoUrl } = await req.json();

    if (!videoUrl) {
      return NextResponse.json(
        { error: 'Video URL required' },
        { status: 400 }
      );
    }

    // Extract video ID
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    // Fetch video description from YouTube API
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'YouTube API not configured' },
        { status: 500 }
      );
    }

    const youtubeResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );

    if (!youtubeResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch video data' },
        { status: 500 }
      );
    }

    const data = await youtubeResponse.json();
    
    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    const description = data.items[0].snippet.description;
    const allUrls = extractUrls(description);
    
    // Filter out social media profile links, keep potential affiliate links
    const urls = allUrls.filter(url => isLikelyAffiliateLink(url));

    if (allUrls.length === 0) {
      return NextResponse.json({
        working: 0,
        broken: 0,
        redirects: 0,
        total: 0,
        message: 'No links found in video description',
      });
    }

    if (urls.length === 0) {
      return NextResponse.json({
        working: 0,
        broken: 0,
        redirects: 0,
        total: 0,
        message: 'Links found, but they appear to be social media profiles (not affiliate links)',
      });
    }

    // Check all links (limit to prevent abuse)
    const linksToCheck = urls.slice(0, 50); // Max 50 links
    const results = await Promise.all(
      linksToCheck.map(url => checkLinkStatus(url))
    );

    // Categorize results
    const working = results.filter(r => r.status >= 200 && r.status < 300);
    const broken = results.filter(r => r.status >= 400 || r.status === 0);
    const redirects = results.filter(r => r.redirected);

    // Estimate lost revenue ($60 per broken link per month)
    const estimatedLostRevenue = broken.length * 60;

    return NextResponse.json({
      working: working.length,
      broken: broken.length,
      redirects: redirects.length,
      total: results.length,
      estimatedLostRevenue,
      brokenUrls: broken.map(r => r.url),
      redirectUrls: redirects.map(r => r.url),
    });

  } catch (error) {
    console.error('Link check error:', error);
    return NextResponse.json(
      { error: 'Failed to check links' },
      { status: 500 }
    );
  }
}
