import axios from 'axios'

export interface InstagramPost {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  permalink: string
  caption: string
  timestamp: string
  thumbnail_url?: string
}

export interface InstagramApiResponse {
  data: InstagramPost[]
  paging: {
    cursors: {
      before: string
      after: string
    }
    next: string
  }
}

const INSTAGRAM_ACCESS_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN

export async function getInstagramPosts(limit: number = 6): Promise<InstagramPost[]> {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    console.error('Instagram access token is not defined')
    return []
  }

  try {
    const response = await axios.get<InstagramApiResponse>(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,caption,timestamp,thumbnail_url&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=${limit}`
    )

    return response.data.data
  } catch (error) {
    console.error('Error fetching Instagram posts:', error)
    return []
  }
} 