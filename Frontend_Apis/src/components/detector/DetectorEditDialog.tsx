import { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import type { Detection, UpdateDetectionRequest } from '../../types/detection.types'

interface DetectorEditDialogProps {
  detection: Detection | null
  visible: boolean
  onHide: () => void
  onUpdate: (id: string, data: UpdateDetectionRequest) => Promise<void>
  loading: boolean
}

const fieldBox = (hasValue: boolean): React.CSSProperties => ({
  border: `1.5px solid ${hasValue ? '#6366f1' : '#e2e8f0'}`,
  borderRadius: '10px',
  background: '#f8fafc',
  padding: '0.6rem 1rem',
  fontSize: '0.875rem',
  color: '#1e293b',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
})

export default function DetectorEditDialog({ detection, visible, onHide, onUpdate, loading }: DetectorEditDialogProps) {
  const [verdict,    setVerdict]    = useState('')
  const [humanScore, setHumanScore] = useState('')
  const [aiScore,    setAiScore]    = useState('')
  const [totalWords, setTotalWords] = useState('')
  const [lang,       setLang]       = useState('')

  useEffect(() => {
    if (detection) {
      setVerdict(detection.verdict ?? '')
      setHumanScore(detection.humanScore?.toString() ?? '')
      setAiScore(detection.aiScore?.toString() ?? '')
      setTotalWords(detection.totalWords?.toString() ?? '')
      setLang(detection.lang ?? '')
    }
  }, [detection])

  const handleSubmit = async () => {
    if (!detection) return
    const request: UpdateDetectionRequest = {}
    if (verdict)    request.verdict    = verdict
    if (humanScore) request.humanScore = parseFloat(humanScore)
    if (aiScore)    request.aiScore    = parseFloat(aiScore)
    if (totalWords) request.totalWords = parseInt(totalWords)
    if (lang)       request.lang       = lang
    await onUpdate(detection.id, request)
    onHide()
  }

  if (!detection) return null

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={false}
      footer={false}
      showHeader={false}
      style={{ width: '500px' }}
      pt={{
        root:    { style: { borderRadius: '16px', overflow: 'hidden' } },
        content: { style: { padding: 0 } },
      }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
        padding: '1.25rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '10px',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <i className="pi pi-pencil" style={{ color: '#fff', fontSize: '1.1rem' }} />
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>Editar detección</div>
          <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem', fontFamily: 'monospace' }}>
            #{detection.id.slice(-8)}
          </div>
        </div>
        <button
          onClick={onHide}
          style={{
            marginLeft: 'auto', background: 'rgba(255,255,255,0.15)',
            border: 'none', borderRadius: '8px', width: 32, height: 32,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <i className="pi pi-times" style={{ color: '#fff', fontSize: '0.85rem' }} />
        </button>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500 }}>Texto analizado (solo lectura)</label>
          <div style={{
            marginTop: '0.3rem', padding: '0.65rem 0.85rem',
            background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0',
            fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5,
            maxHeight: '64px', overflow: 'hidden',
          }}>
            {detection.inputText.length > 130
              ? detection.inputText.slice(0, 130) + '...'
              : detection.inputText}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
              Veredicto
            </label>
            <select value={verdict} onChange={e => setVerdict(e.target.value)} style={fieldBox(!!verdict)}>
              <option value="">Sin veredicto</option>
              <option value="HUMAN">Humano</option>
              <option value="AI">IA</option>
              <option value="MIXED">Mixto</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
              Score humano (0–1)
            </label>
            <input type="number" min="0" max="1" step="0.01"
              value={humanScore} onChange={e => setHumanScore(e.target.value)}
              placeholder="0.00" style={fieldBox(!!humanScore)} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
              Score IA (0–1)
            </label>
            <input type="number" min="0" max="1" step="0.01"
              value={aiScore} onChange={e => setAiScore(e.target.value)}
              placeholder="0.00" style={fieldBox(!!aiScore)} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
              Total palabras
            </label>
            <input type="number" min="0"
              value={totalWords} onChange={e => setTotalWords(e.target.value)}
              placeholder="0" style={fieldBox(!!totalWords)} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
              Idioma
            </label>
            <input type="text"
              value={lang} onChange={e => setLang(e.target.value)}
              placeholder="es, en..." style={fieldBox(!!lang)} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button onClick={onHide} style={{
            padding: '0.6rem 1.2rem', borderRadius: '8px',
            border: '1.5px solid #e2e8f0', background: '#fff',
            color: '#64748b', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
          }}>
            Cancelar
          </button>
          <button onClick={handleSubmit} disabled={loading} style={{
            display: 'flex', alignItems: 'center', gap: '0.45rem',
            padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none',
            background: 'linear-gradient(135deg, #312e81, #6366f1)',
            color: '#fff', fontWeight: 700, fontSize: '0.875rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 12px rgba(99,102,241,0.35)',
          }}>
            {loading
              ? <><i className="pi pi-spin pi-spinner" style={{ fontSize: '0.85rem' }} /> Guardando...</>
              : <><i className="pi pi-check" style={{ fontSize: '0.85rem' }} /> Actualizar</>
            }
          </button>
        </div>
      </div>
    </Dialog>
  )
}
