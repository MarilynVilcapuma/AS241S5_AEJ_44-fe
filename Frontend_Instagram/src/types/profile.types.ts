export interface Profile {
  id: number
  username: string
  fullName: string | null
  bio: string | null
  profilePicUrl: string | null
  followersCount: number | null
  followingCount: number | null
  postsCount: number | null
  isVerified: boolean | null
  active: boolean
  savedAt: string
}
