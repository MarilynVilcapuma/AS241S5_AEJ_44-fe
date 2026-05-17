export interface Detection {
  id: string
  inputText: string
  verdict: 'HUMAN' | 'AI' | 'MIXED' | null
  humanScore: number | null
  aiScore: number | null
  totalWords: number | null
  lang: string | null
  active: boolean
  createdAt: string
}

export interface UpdateDetectionRequest {
  verdict?: string
  humanScore?: number
  aiScore?: number
  totalWords?: number
  lang?: string
}
