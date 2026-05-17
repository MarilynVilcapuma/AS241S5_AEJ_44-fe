import { useState, useCallback } from 'react'
import type { Detection, UpdateDetectionRequest } from '../types/detection.types'
import { detectorService } from '../service/detector.service'

export const useDetector = () => {
  const [detections, setDetections] = useState<Detection[]>([])
  const [loading, setLoading]       = useState(false)

  const loadDetections = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await detectorService.listAll()
      setDetections(data)
    } finally {
      setLoading(false)
    }
  }, [])

  const detectText = async (text: string) => {
    const { data } = await detectorService.detect(text)
    await loadDetections()
    return data
  }

  const updateDetection = async (id: string, request: UpdateDetectionRequest) => {
    const { data } = await detectorService.update(id, request)
    setDetections(prev => prev.map(d => d.id === id ? data : d))
  }

  const deactivateDetection = async (id: string) => {
    const { data } = await detectorService.deactivate(id)
    setDetections(prev => prev.map(d => d.id === id ? data : d))
  }

  const restoreDetection = async (id: string) => {
    const { data } = await detectorService.restore(id)
    setDetections(prev => prev.map(d => d.id === id ? data : d))
  }

  return { detections, loading, loadDetections, detectText, updateDetection, deactivateDetection, restoreDetection }
}
