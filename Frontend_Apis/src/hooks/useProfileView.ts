import { useState, useCallback } from 'react'
import { profileService } from '../service/profile.service'
import { mediaService } from '../service/media.service'
import type { Profile } from '../types/profile.types'
import type { Post } from '../types/post.types'

export function useProfileView() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const searchProfile = useCallback(async (username: string) => {
    const trimmed = username.trim()
    if (!trimmed) return

    setLoading(true)
    setError(null)
    setProfile(null)
    setPosts([])
    setSearched(true)

    try {
      const [profileRes, mediaRes] = await Promise.allSettled([
        profileService.getByUsername(trimmed),
        mediaService.listByUser(trimmed, true),
      ])

      if (profileRes.status === 'fulfilled') {
        setProfile(profileRes.value.data)
      } else {
        setError(`No se encontró el perfil "@${trimmed}"`)
      }

      if (mediaRes.status === 'fulfilled') {
        setPosts(mediaRes.value.data)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setProfile(null)
    setPosts([])
    setError(null)
    setSearched(false)
  }, [])

  return { profile, posts, loading, error, searched, searchProfile, reset }
}
