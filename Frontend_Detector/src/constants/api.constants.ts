export const DETECTION_ENDPOINTS = {
  listAll:    '/api/detection',
  getById:    (id: string) => `/api/detection/${id}`,
  detect:     '/api/detection',
  update:     (id: string) => `/api/detection/${id}`,
  deactivate: (id: string) => `/api/detection/${id}/deactivate`,
  restore:    (id: string) => `/api/detection/${id}/restore`,
}
