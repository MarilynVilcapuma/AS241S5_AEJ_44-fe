import axiosInstance from './axios.config'
import { MEDIA_ENDPOINTS } from '../constants/api.constants'
import type { Post } from '../types/post.types'

export const mediaService = {
  create: (username: string, postUrl: string) =>
    axiosInstance.post<Post>(MEDIA_ENDPOINTS.create(username), { postUrl }),

  listAll: (active?: boolean) =>
    axiosInstance.get<Post[]>(MEDIA_ENDPOINTS.listAll, {
      params: active !== undefined ? { active } : {},
    }),

  listByUser: (username: string, active?: boolean) =>
    axiosInstance.get<Post[]>(MEDIA_ENDPOINTS.listByUser(username), {
      params: active !== undefined ? { active } : {},
    }),

  deactivate: (id: number) =>
    axiosInstance.patch<Post>(MEDIA_ENDPOINTS.deactivate(id)),

  activate: (id: number) =>
    axiosInstance.patch<Post>(MEDIA_ENDPOINTS.activate(id)),
}
