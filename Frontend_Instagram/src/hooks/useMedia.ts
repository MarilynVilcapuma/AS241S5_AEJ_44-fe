import { useState, useCallback } from 'react'
import type { Post } from '../types/post.types'
import { mediaService } from '../service/media.service'

export const useMedia = () => {
  const [media, setMedia] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  const loadMedia = useCallback(async (username?: string, active?: boolean) => {
    setLoading(true)
    try {
      const { data } = username
        ? await mediaService.listByUser(username, active)
        : await mediaService.listAll(active)
      setMedia(data)
    } finally {
      setLoading(false)
    }
  }, [])

  const createMedia = async (username: string, postUrl: string) => {
    const { data } = await mediaService.create(username, postUrl)
    setMedia(prev => [...prev, data])
    return data
  }

  const deactivateMedia = async (id: number) => {
    const { data } = await mediaService.deactivate(id)
    setMedia(prev => prev.map(m => m.id === id ? data : m))
  }

  const activateMedia = async (id: number) => {
    const { data } = await mediaService.activate(id)
    setMedia(prev => prev.map(m => m.id === id ? data : m))
  }

  return { media, loading, loadMedia, createMedia, deactivateMedia, activateMedia }
}
