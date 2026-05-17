import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import type { Profile } from '../../types/profile.types'

interface ProfileEditDialogProps {
  profile: Profile | null
  visible: boolean
  onHide: () => void
  onUpdate: (username: string) => Promise<void>
  loading: boolean
}

export default function ProfileEditDialog({ profile, visible, onHide, onUpdate, loading }: ProfileEditDialogProps) {
  if (!profile) return null

  const handleUpdate = async () => {
    await onUpdate(profile.username)
    onHide()
  }

  const initial = profile.username.charAt(0).toUpperCase()
  const stats = [
    { label: 'Seguidores', value: profile.followersCount?.toLocaleString() ?? '—', icon: 'pi-users',     bg: '#eef2ff', color: '#6366f1' },
    { label: 'Siguiendo',  value: profile.followingCount?.toLocaleString() ?? '—', icon: 'pi-user-plus', bg: '#f0fdf4', color: '#22c55e' },
    { label: 'Posts',      value: profile.postsCount?.toLocaleString()     ?? '—', icon: 'pi-images',    bg: '#fffbeb', color: '#f59e0b' },
  ]

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.25rem 0' }}>
      <div style={{ width: 46, height: 46, borderRadius: '12px', flexShrink: 0, background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 60%, #fcb045 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(131,58,180,0.35)' }}>
        <i className="pi pi-pencil" style={{ color: '#fff', fontSize: '1.1rem' }} />
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', lineHeight: 1.2 }}>Editar perfil</div>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>@{profile.username}</div>
      </div>
    </div>
  )

  return (
    <Dialog visible={visible} onHide={onHide} header={header} footer={false} style={{ width: '480px' }} modal
      pt={{ root: { style: { borderRadius: '16px', overflow: 'hidden' } }, header: { style: { padding: '1.25rem 1.5rem 1rem' } }, content: { style: { padding: '0 1.5rem 1.5rem' } } }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

        <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf2f8 60%, #fff1f2 100%)', border: '1px solid #ede9fe', borderRadius: '14px', padding: '1.1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'linear-gradient(135deg, #833ab4, #fd1d1d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', zIndex: 0 }}>
              {initial}
            </div>
            {profile.profilePicUrl && (
              <img src={profile.profilePicUrl} alt={profile.username} width={64} height={64}
                style={{ position: 'absolute', inset: 0, zIndex: 1, borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', boxSizing: 'border-box', boxShadow: '0 2px 10px rgba(131,58,180,0.25)' }}
                onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden' }} />
            )}
            {profile.isVerified && (
              <div style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 2, width: 20, height: 20, borderRadius: '50%', background: '#3b82f6', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="pi pi-check" style={{ color: '#fff', fontSize: '0.55rem', fontWeight: 900 }} />
              </div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>@{profile.username}</span>
              {profile.isVerified && <span style={{ fontSize: '0.7rem', background: '#dbeafe', color: '#1d4ed8', padding: '0.1rem 0.5rem', borderRadius: '20px', fontWeight: 600 }}>Verificado</span>}
            </div>
            {profile.fullName && <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>{profile.fullName}</div>}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '6px', padding: '0.15rem 0.6rem', borderRadius: '20px', background: profile.active ? '#f0fdf4' : '#fef2f2', border: `1px solid ${profile.active ? '#bbf7d0' : '#fecaca'}`, fontSize: '0.72rem', fontWeight: 600, color: profile.active ? '#16a34a' : '#dc2626' }}>
              <i className={`pi ${profile.active ? 'pi-check-circle' : 'pi-ban'}`} style={{ fontSize: '0.7rem' }} />
              {profile.active ? 'Activo' : 'Inactivo'}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: '12px', padding: '0.85rem 0.5rem', textAlign: 'center', border: `1px solid ${s.color}22` }}>
              <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#fff', margin: '0 auto 0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 8px ${s.color}30` }}>
                <i className={`pi ${s.icon}`} style={{ color: s.color, fontSize: '1rem' }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '1px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {profile.bio && (
          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '0.85rem 1rem', borderLeft: '3px solid #833ab4' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Biografía</div>
            <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>{profile.bio}</div>
          </div>
        )}

        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '0.75rem 1rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
          <i className="pi pi-refresh" style={{ color: '#f59e0b', fontSize: '0.9rem', marginTop: '1px', flexShrink: 0 }} />
          <span style={{ fontSize: '0.78rem', color: '#78350f', lineHeight: 1.6 }}>
            <strong>"Actualizar desde API"</strong> reconsulta Instagram y sobreescribe foto, seguidores y todos los datos del perfil.
          </span>
        </div>

        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', gap: '0.75rem' }}>
          <Button label="Cerrar" icon="pi pi-times" severity="secondary" outlined onClick={onHide} style={{ flex: 1 }} />
          <button onClick={handleUpdate} disabled={loading}
            style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', borderRadius: '10px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 4px 14px rgba(99,102,241,0.38)', transition: 'transform 0.15s, box-shadow 0.15s', opacity: loading ? 0.75 : 1 }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)' }}>
            {loading ? <i className="pi pi-spin pi-spinner" style={{ fontSize: '0.9rem' }} /> : <i className="pi pi-refresh" style={{ fontSize: '0.9rem' }} />}
            {loading ? 'Actualizando...' : 'Actualizar desde API'}
          </button>
        </div>
      </div>
    </Dialog>
  )
}
