import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

interface ProfileFormProps {
  visible: boolean
  onHide: () => void
  onSubmit: (username: string) => Promise<void>
  loading: boolean
}

export default function ProfileForm({ visible, onHide, onSubmit, loading }: ProfileFormProps) {
  const [username, setUsername] = useState('')

  const canSubmit = username.trim().length > 0

  const handleSubmit = async () => {
    if (!canSubmit) return
    await onSubmit(username.trim())
    setUsername('')
    onHide()
  }

  const handleHide = () => {
    setUsername('')
    onHide()
  }

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.25rem 0' }}>
      <div style={{ width: 46, height: 46, borderRadius: '12px', flexShrink: 0, background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 60%, #fcb045 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(131,58,180,0.35)' }}>
        <i className="pi pi-user-plus" style={{ color: '#fff', fontSize: '1.2rem' }} />
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', lineHeight: 1.2 }}>Registrar Perfil</div>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>Consulta y guarda un perfil de Instagram</div>
      </div>
    </div>
  )

  return (
    <Dialog visible={visible} onHide={handleHide} header={header} footer={false} style={{ width: '440px' }} modal
      pt={{ root: { style: { borderRadius: '16px', overflow: 'hidden' } }, header: { style: { padding: '1.25rem 1.5rem 1rem' } }, content: { style: { padding: '0 1.5rem 1.5rem' } } }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

        <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf2f8 60%, #fff1f2 100%)', border: '1px solid #ede9fe', borderRadius: '12px', padding: '0.9rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: 38, height: 38, borderRadius: '10px', flexShrink: 0, background: 'linear-gradient(135deg, #833ab4, #fd1d1d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="pi pi-instagram" style={{ color: '#fff', fontSize: '1.1rem' }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#6d28d9' }}>Búsqueda en Instagram</div>
            <div style={{ fontSize: '0.75rem', color: '#8b5cf6', marginTop: '1px' }}>Se consultará la API con el username ingresado</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <i className="pi pi-at" style={{ color: '#833ab4', fontSize: '0.85rem' }} /> Nombre de usuario
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#f8fafc', border: `1.5px solid ${canSubmit ? '#6366f1' : '#e2e8f0'}`, borderRadius: '10px', padding: '0.7rem 1rem', transition: 'border-color 0.2s, box-shadow 0.2s', boxShadow: canSubmit ? '0 0 0 3px rgba(99,102,241,0.10)' : 'none' }}>
            <i className="pi pi-user" style={{ color: '#94a3b8', fontSize: '0.95rem', flexShrink: 0 }} />
            <InputText id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="ej: cristiano" onKeyDown={e => e.key === 'Enter' && handleSubmit()} autoFocus
              style={{ border: 'none', outline: 'none', boxShadow: 'none', padding: 0, flex: 1, fontSize: '0.9rem', background: 'transparent', color: '#1e293b' }} />
            {canSubmit && <span style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 600, background: '#eef2ff', padding: '0.15rem 0.55rem', borderRadius: '20px', whiteSpace: 'nowrap', flexShrink: 0 }}>@{username.trim()}</span>}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <i className="pi pi-info-circle" style={{ fontSize: '0.75rem' }} /> Ingresa el username tal como aparece en Instagram
          </div>
        </div>

        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.75rem 1rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
          <i className="pi pi-check-circle" style={{ color: '#22c55e', fontSize: '0.9rem', marginTop: '1px', flexShrink: 0 }} />
          <span style={{ fontSize: '0.78rem', color: '#166534', lineHeight: 1.6 }}>Al registrar se obtendrán: foto de perfil, seguidores, posts, verificación y más datos del perfil.</span>
        </div>

        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', gap: '0.75rem' }}>
          <Button label="Cancelar" icon="pi pi-times" severity="secondary" outlined onClick={handleHide} style={{ flex: 1 }} />
          <button onClick={handleSubmit} disabled={!canSubmit || loading}
            style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', borderRadius: '10px', border: 'none', cursor: canSubmit && !loading ? 'pointer' : 'not-allowed', background: canSubmit ? 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 60%, #fcb045 100%)' : '#e2e8f0', color: canSubmit ? '#fff' : '#94a3b8', fontWeight: 700, fontSize: '0.9rem', boxShadow: canSubmit ? '0 4px 14px rgba(131,58,180,0.38)' : 'none', transition: 'transform 0.15s, box-shadow 0.15s' }}
            onMouseEnter={e => { if (canSubmit) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)' }}>
            {loading ? <i className="pi pi-spin pi-spinner" style={{ fontSize: '0.9rem' }} /> : <i className="pi pi-user-plus" style={{ fontSize: '0.9rem' }} />}
            {loading ? 'Registrando...' : 'Registrar Perfil'}
          </button>
        </div>
      </div>
    </Dialog>
  )
}
