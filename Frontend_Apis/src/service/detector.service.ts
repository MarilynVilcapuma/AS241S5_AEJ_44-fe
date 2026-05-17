import axiosInstance from './axios.config'
import { DETECTION_ENDPOINTS } from '../constants/api.constants'
import type { Detection, UpdateDetectionRequest } from '../types/detection.types'

export const detectorService = {
  listAll:    ()                                         => axiosInstance.get<Detection[]>(DETECTION_ENDPOINTS.listAll),
  getById:    (id: string)                               => axiosInstance.get<Detection>(DETECTION_ENDPOINTS.getById(id)),
  detect:     (text: string)                             => axiosInstance.post(DETECTION_ENDPOINTS.detect, { text }),
  update:     (id: string, data: UpdateDetectionRequest) => axiosInstance.put<Detection>(DETECTION_ENDPOINTS.update(id), data),
  deactivate: (id: string)                               => axiosInstance.patch<Detection>(DETECTION_ENDPOINTS.deactivate(id)),
  restore:    (id: string)                               => axiosInstance.patch<Detection>(DETECTION_ENDPOINTS.restore(id)),
}
