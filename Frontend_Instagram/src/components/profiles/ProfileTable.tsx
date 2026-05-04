import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import type { Profile } from '../../types/profile.types'

interface ProfileTableProps {
  profiles: Profile[]
  loading: boolean
  onEdit: (profile: Profile) => void
  onDeactivate: (id: number) => Promise<void>
  onActivate: (id: number) => Promise<void>
}

export default function ProfileTable({ profiles, loading, onEdit, onDeactivate, onActivate }: ProfileTableProps) {

  const avatarTemplate = (profile: Profile) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Fallback en capa inferior — siempre visible si la foto falla */}
      <div style={{ position: 'relative', width: 42, height: 42 }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'linear-gradient(135deg, #833ab4, #fd1d1d)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', fontWeight: 700, color: '#fff',
          textTransform: 'uppercase', zIndex: 0
        }}>
          {profile.username.charAt(0)}
        </div>
        {profile.profilePicUrl && (
          <img
            src={profile.profilePicUrl}
            alt={profile.username}
            width={42} height={42}
            style={{
              position: 'absolute', inset: 0, zIndex: 1,
              borderRadius: '50%', objectFit: 'cover',
              border: '2px solid #e2e8f0', boxSizing: 'border-box'
            }}
            onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden' }}
          />
        )}
      </div>
    </div>
  )

  const usernameTemplate = (profile: Profile) => (
    <div>
      <div className="font-semibold text-900">@{profile.username}</div>
      <div className="text-xs text-color-secondary">{profile.fullName ?? '—'}</div>
    </div>
  )

  const followersTemplate = (profile: Profile) => (
    <span className="font-medium">{profile.followersCount?.toLocaleString() ?? '—'}</span>
  )

  const verifiedTemplate = (profile: Profile) => (
    profile.isVerified
      ? <i className="pi pi-verified" style={{ color: '#3b82f6', fontSize: '1.1rem' }} />
      : <span className="text-color-secondary">—</span>
  )

  const statusTemplate = (profile: Profile) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
        padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
        background: profile.active ? '#f0fdf4' : '#fef2f2',
        color: profile.active ? '#16a34a' : '#dc2626',
        border: `1px solid ${profile.active ? '#bbf7d0' : '#fecaca'}`
      }}>
        <i className={`pi ${profile.active ? 'pi-check-circle' : 'pi-ban'}`} style={{ fontSize: '0.75rem' }} />
        {profile.active ? 'Activo' : 'Inactivo'}
      </div>
    </div>
  )

  const actionsTemplate = (profile: Profile) => (
    <div className="flex gap-1">
      <Button
        icon="pi pi-pencil"
        size="small"
        severity="warning"
        text
        rounded
        tooltip="Editar / Actualizar"
        tooltipOptions={{ position: 'top' }}
        onClick={() => onEdit(profile)}
      />
      {profile.active
        ? <Button
            icon="pi pi-ban"
            size="small"
            severity="danger"
            text
            rounded
            tooltip="Desactivar"
            tooltipOptions={{ position: 'top' }}
            onClick={() => onDeactivate(profile.id)}
          />
        : <Button
            icon="pi pi-check-circle"
            size="small"
            severity="success"
            text
            rounded
            tooltip="Activar"
            tooltipOptions={{ position: 'top' }}
            onClick={() => onActivate(profile.id)}
          />
      }
    </div>
  )

  return (
    <DataTable
      value={profiles}
      loading={loading}
      emptyMessage="No hay perfiles registrados"
      stripedRows
      showGridlines
      style={{ fontSize: '0.9rem' }}
    >
      <Column
        header=""
        body={avatarTemplate}
        style={{ width: '68px' }}
        pt={{ bodyCell: { style: { padding: '0.4rem 0.5rem', textAlign: 'center' } } }}
      />
      <Column header="Usuario"    body={usernameTemplate}   sortField="username"       sortable />
      <Column header="Seguidores" body={followersTemplate}  sortField="followersCount" sortable style={{ width: '130px' }} />
      <Column field="followingCount" header="Siguiendo"  style={{ width: '100px' }} />
      <Column field="postsCount"     header="Posts"      style={{ width: '80px' }} />
      <Column header="✓"    body={verifiedTemplate} style={{ width: '60px', textAlign: 'center' }} />
      <Column header="Estado"   body={statusTemplate}  style={{ width: '100px' }} />
      <Column header="Acciones" body={actionsTemplate} style={{ width: '110px' }} />
    </DataTable>
  )
}
