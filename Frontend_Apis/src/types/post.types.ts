export interface Post {
  id: number
  username: string
  sourceUrl: string
  mediaUrl: string | null
  mediaType: string | null
  caption: string | null
  active: boolean
  savedAt: string
}
