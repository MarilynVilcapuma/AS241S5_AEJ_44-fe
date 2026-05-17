import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

interface MediaFormProps {
  visible: boolean
  onHide: () => void
  onSubmit: (username: string, postUrl: string) => Promise<void>
  loading: boolean
}

const isValidUrl = (url: string) =>
  url.startsWith('https://www.instagram.com/') || url.startsWith('http://www.instagram.com/')

export default function MediaForm({ visible, onHide, onSubmit, loading }: MediaFormProps) {
  const [username, setUsername] = useState('')
  const [postUrl, setPostUrl]   = useState('')

  const canSubmit  = username.trim().length > 0 && isValidUrl(postUrl.trim())
  const urlDirty   = postUrl.length > 0
  const urlValid   = isValidUrl(postUrl.trim())
  const urlInvalid = urlDirty && !urlValid

  const handleSubmit = async () => {
    if (!canSubmit) return
    await onSubmit(username.trim(), postUrl.trim())
    setUsername('')
    setPostUrl('')
    onHide()
  }

  const handleHide = () => {
    setUsername('')
    setPostUrl('')
    onHide()
  }

  const fieldBox = (valid: boolean | null): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#f8fafc',
    border: `1.5px solid ${valid === true ? '#22c55e' : valid === false ? '#ef4444' : '#e2e8f0'}`,
    borderRadius: '10px', padding: '0.7rem 1rem', transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: valid === true ? '0 0 0 3px rgba(34,197,94,0.10)' : valid === false ? '0 0 0 3px rgba(239,68,68,0.10)' : 'none',
  })

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.25rem 0' }}>
      <div style={{ width: 46, height: 46, borderRadius: '12px', flexShrink: 0, background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 60%, #fcb045 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(131,58,180,0.35)' }}>
        <i className="pi pi-download" style={{ color: '#fff', fontSize: '1.2rem' }} />
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', lineHeight: 1.2 }}>Guardar Media</div>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>Descarga fotos o videos de Instagram</div>
      </div>
    </div>
  )

  return (
    <Dialog visible={visible} onHide={handleHide} header={header} footer={false} style={{ width: '480px' }} modal
      pt={{ root: { style: { borderRadius: '16px', overflow: 'hidden' } }, header: { style: { padding: '1.25rem 1.5rem 1rem' } }, content: { style: { padding: '0 1.5rem 1.5rem' } } }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

        <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf2f8 60%, #fff1f2 100%)', border: '1px solid #ede9fe', borderRadius: '12px', padding: '0.9rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: '8px', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="pi pi-image" style={{ fontSize: '1rem', color: '#7c3aed' }} />
            </div>
            <div style={{ width: 34, height: 34, borderRadius: '8px', background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="pi pi-video" style={{ fontSize: '1rem', color: '#db2777' }} />
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#6d28d9' }}>Fotos y Videos</div>
            <div style={{ fontSize: '0.75rem', color: '#8b5cf6', marginTop: '1px' }}>Descarga media de cualquier post público</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <i className="pi pi-at" style={{ color: '#833ab4', fontSize: '0.85rem' }} /> Usuario de Instagram
          </label>
          <div style={fieldBox(username.trim().length > 0 ? true : null)}>
            <i className="pi pi-user" style={{ color: '#94a3b8', fontSize: '0.95rem', flexShrink: 0 }} />
            <InputText value={username} onChange={e => setUsername(e.target.value)} placeholder="ej: cristiano" autoFocus
              style={{ border: 'none', outline: 'none', boxShadow: 'none', padding: 0, flex: 1, fontSize: '0.9rem', background: 'transparent', color: '#1e293b' }} />
            {username.trim() && (
              <span style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 600, background: '#eef2ff', padding: '0.15rem 0.55rem', borderRadius: '20px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                @{username.trim()}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <i className="pi pi-link" style={{ color: '#fd1d1d', fontSize: '0.85rem' }} /> URL del post de Instagram
          </label>
          <div style={fieldBox(urlDirty ? (urlValid ? true : false) : null)}>
            <i className="pi pi-globe" style={{ color: '#94a3b8', fontSize: '0.95rem', flexShrink: 0 }} />
            <InputText value={postUrl} onChange={e => setPostUrl(e.target.value)} placeholder="https://www.instagram.com/p/..." onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{ border: 'none', outline: 'none', boxShadow: 'none', padding: 0, flex: 1, fontSize: '0.875rem', background: 'transparent', color: '#1e293b' }} />
            {urlValid   && <i className="pi pi-check-circle"  style={{ color: '#22c55e', fontSize: '1rem', flexShrink: 0 }} />}
            {urlInvalid && <i className="pi pi-times-circle"  style={{ color: '#ef4444', fontSize: '1rem', flexShrink: 0 }} />}
          </div>
          {urlInvalid && (
            <div style={{ fontSize: '0.75rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <i className="pi pi-exclamation-triangle" style={{ fontSize: '0.75rem' }} />
              La URL debe empezar con https://www.instagram.com/
            </div>
          )}
        </div>

        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '0.75rem 1rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
          <i className="pi pi-lightbulb" style={{ color: '#f59e0b', fontSize: '0.9rem', marginTop: '1px', flexShrink: 0 }} />
          <span style={{ fontSize: '0.78rem', color: '#78350f', lineHeight: 1.6 }}>
            Abre el post en Instagram, copia la URL del navegador y pégala aquí.&nbsp;
            Ej: <code style={{ background: '#fef3c7', padding: '1px 5px', borderRadius: '4px', fontFamily: 'monospace' }}>instagram.com/p/CxYz123/</code>
          </span>
        </div>

        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', gap: '0.75rem' }}>
          <Button label="Cancelar" icon="pi pi-times" severity="secondary" outlined onClick={handleHide} style={{ flex: 1 }} />
          <button onClick={handleSubmit} disabled={!canSubmit || loading}
            style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', borderRadius: '10px', border: 'none', cursor: canSubmit && !loading ? 'pointer' : 'not-allowed', background: canSubmit ? 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 60%, #fcb045 100%)' : '#e2e8f0', color: canSubmit ? '#fff' : '#94a3b8', fontWeight: 700, fontSize: '0.9rem', boxShadow: canSubmit ? '0 4px 14px rgba(131,58,180,0.38)' : 'none', transition: 'transform 0.15s, box-shadow 0.15s' }}
            onMouseEnter={e => { if (canSubmit) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)' }}
          >
            {loading ? <i className="pi pi-spin pi-spinner" style={{ fontSize: '0.9rem' }} /> : <i className="pi pi-download" style={{ fontSize: '0.9rem' }} />}
            {loading ? 'Guardando...' : 'Guardar Media'}
          </button>
        </div>
      </div>
    </Dialog>
  )
}
