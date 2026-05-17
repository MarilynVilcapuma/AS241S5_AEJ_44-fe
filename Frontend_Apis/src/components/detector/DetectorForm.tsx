import { useState } from 'react'
import { Dialog } from 'primereact/dialog'

interface DetectorFormProps {
  visible: boolean
  onHide: () => void
  onSubmit: (text: string) => Promise<void>
  loading: boolean
}

export default function DetectorForm({ visible, onHide, onSubmit, loading }: DetectorFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = async () => {
    if (!text.trim() || loading) return
    await onSubmit(text.trim())
    setText('')
    onHide()
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={false}
      footer={false}
      showHeader={false}
      style={{ width: '540px' }}
      pt={{
        root:    { style: { borderRadius: '16px', overflow: 'hidden' } },
        content: { style: { padding: 0 } },
      }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
        padding: '1.25rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '10px',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <i className="pi pi-search" style={{ color: '#fff', fontSize: '1.15rem' }} />
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>Analizar texto con IA</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem' }}>
            Detecta si un texto fue escrito por humano o IA
          </div>
        </div>
        <button onClick={onHide} style={{
          marginLeft: 'auto', background: 'rgba(255,255,255,0.15)',
          border: 'none', borderRadius: '8px', width: 32, height: 32,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <i className="pi pi-times" style={{ color: '#fff', fontSize: '0.85rem' }} />
        </button>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
            Texto a analizar <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <div style={{
            border: `1.5px solid ${text.trim() ? '#6366f1' : '#e2e8f0'}`,
            borderRadius: '10px', background: '#f8fafc', transition: 'border-color 0.2s',
          }}>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Pega o escribe el texto que deseas analizar..."
              rows={7}
              style={{
                width: '100%', border: 'none', outline: 'none',
                background: 'transparent', resize: 'vertical',
                padding: '0.75rem 1rem', fontSize: '0.875rem',
                color: '#1e293b', lineHeight: 1.6, borderRadius: '10px',
                fontFamily: 'inherit', boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px', textAlign: 'right' }}>
            {wordCount} {wordCount === 1 ? 'palabra' : 'palabras'}
          </div>
        </div>

        <div style={{
          background: '#eff6ff', border: '1px solid #bfdbfe',
          borderRadius: '8px', padding: '0.65rem 0.85rem',
          marginBottom: '1.25rem',
          display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
        }}>
          <i className="pi pi-info-circle" style={{ color: '#3b82f6', fontSize: '0.85rem', marginTop: '2px', flexShrink: 0 }} />
          <span style={{ fontSize: '0.78rem', color: '#1d4ed8', lineHeight: 1.5 }}>
            El análisis devuelve veredicto (IA / Humano / Mixto) junto con puntuaciones de confianza y el idioma detectado.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button onClick={onHide} style={{
            padding: '0.6rem 1.2rem', borderRadius: '8px',
            border: '1.5px solid #e2e8f0', background: '#fff',
            color: '#64748b', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
          }}>
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || loading}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none',
              background: text.trim() && !loading ? 'linear-gradient(135deg, #312e81, #6366f1)' : '#e2e8f0',
              color: text.trim() && !loading ? '#fff' : '#94a3b8',
              fontWeight: 700, fontSize: '0.875rem',
              cursor: text.trim() && !loading ? 'pointer' : 'not-allowed',
              boxShadow: text.trim() && !loading ? '0 4px 12px rgba(99,102,241,0.35)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            {loading
              ? <><i className="pi pi-spin pi-spinner" style={{ fontSize: '0.85rem' }} /> Analizando...</>
              : <><i className="pi pi-search" style={{ fontSize: '0.85rem' }} /> Analizar</>
            }
          </button>
        </div>
      </div>
    </Dialog>
  )
}
