import { useState, useCallback } from 'react'
import type { Profile } from '../types/profile.types'
import { profileService } from '../service/profile.service'

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(false)

  const loadProfiles = useCallback(async (active?: boolean) => {
    setLoading(true)
    try {
      const { data } = await profileService.list(active)
      setProfiles(data)
    } finally {
      setLoading(false)
    }
  }, [])

  const createProfile = async (username: string) => {
    const { data } = await profileService.create(username)
    setProfiles(prev => [...prev, data])
    return data
  }

  const updateProfile = async (username: string) => {
    const { data } = await profileService.update(username)
    setProfiles(prev => prev.map(p => p.username === username ? data : p))
    return data
  }

  const deactivateProfile = async (id: number) => {
    const { data } = await profileService.deactivate(id)
    setProfiles(prev => prev.map(p => p.id === id ? data : p))
  }

  const activateProfile = async (id: number) => {
    const { data } = await profileService.activate(id)
    setProfiles(prev => prev.map(p => p.id === id ? data : p))
  }

  return { profiles, loading, loadProfiles, createProfile, updateProfile, deactivateProfile, activateProfile }
}
