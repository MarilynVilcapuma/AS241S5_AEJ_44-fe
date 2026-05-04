export const PROFILE_ENDPOINTS = {
  create:        (username: string) => `/api/profiles/${username}`,
  list:          '/api/profiles',
  getByUsername: (username: string) => `/api/profiles/${username}`,
  update:        (username: string) => `/api/profiles/${username}`,
  deactivate:    (id: number)       => `/api/profiles/${id}/deactivate`,
  activate:      (id: number)       => `/api/profiles/${id}/activate`,
}

export const MEDIA_ENDPOINTS = {
  create:     (username: string) => `/api/profiles/${username}/media`,
  listAll:    '/api/media',
  listByUser: (username: string) => `/api/profiles/${username}/media`,
  deactivate: (id: number)       => `/api/media/${id}/deactivate`,
  activate:   (id: number)       => `/api/media/${id}/activate`,
}
