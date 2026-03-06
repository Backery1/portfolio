export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content?: string
  category: string
  year: number
  thumbnail_url: string
  images?: string[]
  tags?: string[]
  external_url?: string
  featured: boolean
  created_at: string
}

export interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  thumbnail_url?: string
  caption?: string
  alt?: string
  order_index: number
  created_at: string
}
