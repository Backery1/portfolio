export interface Project {
  id: string
  name: string
  slug: string
  description: string
  scope: string[]
  categories: string[]
  year: number
  cover_color: string
  thumbnail_url: string | null
  images: string[]
  featured: boolean
  sort_order: number
  created_at: string
}

export interface MediaItem {
  id: string
  type: "photo" | "gif" | "video"
  url: string
  title: string | null
  sort_order: number
  created_at: string
}
