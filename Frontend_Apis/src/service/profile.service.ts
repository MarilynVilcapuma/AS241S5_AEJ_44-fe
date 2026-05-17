import axiosInstance from './axios.config'
import { PROFILE_ENDPOINTS } from '../constants/api.constants'
import type { Profile } from '../types/profile.types'

export const profileService = {
  create: (username: string) =>
    axiosInstance.post<Profile>(PROFILE_ENDPOINTS.create(username)),

  list: (active?: boolean) =>
    axiosInstance.get<Profile[]>(PROFILE_ENDPOINTS.list, {
      params: active !== undefined ? { active } : {},
    }),

  getByUsername: (username: string) =>
    axiosInstance.get<Profile>(PROFILE_ENDPOINTS.getByUsername(username)),

  update: (username: string) =>
    axiosInstance.put<Profile>(PROFILE_ENDPOINTS.update(username)),

  deactivate: (id: number) =>
    axiosInstance.patch<Profile>(PROFILE_ENDPOINTS.deactivate(id)),

  activate: (id: number) =>
    axiosInstance.patch<Profile>(PROFILE_ENDPOINTS.activate(id)),
}
