import { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { sileo } from 'sileo'
import { useProfiles } from '../hooks/useProfiles'
import ProfileForm from '../components/profiles/ProfileForm'
import ProfileEditDialog from '../components/profiles/ProfileEditDialog'
import ProfileTable from '../components/profiles/ProfileTable'
import type { Profile } from '../types/profile.types'

type StatusFilter = 'all' | 'active' | 'inactive'

export default function ProfilesPage() {
  const [showForm, setShowForm]         = useState(false)
  const [editProfile, setEditProfile]   = useState<Profile | null>(null)
  const [searchText, setSearchText]     = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const { profiles, loading, loadProfiles, createProfile, updateProfile, deactivateProfile, activateProfile } = useProfiles()

  useEffect(() => { loadProfiles() }, [loadProfiles])

  const filteredProfiles = profiles.filter(p => {
    const matchSearch = p.username.toLowerCase().includes(searchText.toLowerCase()) ||
                        (p.fullName ?? '').toLowerCase().includes(searchText.toLowerCase())
    const matchStatus = statusFilter === 'all' ? true : statusFilter === 'active' ? p.active : !p.active
    return matchSearch && matchStatus
  })

  const activeCount   = profiles.filter(p => p.active).length
  const inactiveCount = profiles.filter(p => !p.active).length
  const hasFilters    = searchText !== '' || statusFilter !== 'all'

  const clearFilters = () => { setSearchText(''); setStatusFilter('all') }

  const handleCreate = async (username: string) => {
    await sileo.promise(createProfile(username), {
      loading: { title: 'Registrando perfil...', description: `@${username}` },
      success: { title: '¡Perfil registrado!',   description: `@${username} guardado correctamente` },
      error:   { title: 'Error al registrar',    description: `No se pudo registrar @${username}` },
    })
  }

  const handleUpdate = async (username: string) => {
    await sileo.promise(updateProfile(username), {
      loading: { title: 'Actualizando perfil...', description: `@${username}` },
      success: { title: '¡Perfil actualizado!',   description: `@${username} actualizado correctamente` },
      error:   { title: 'Error al actualizar',    description: `No se pudo actualizar @${username}` },
    })
  }

  const handleDeactivate = async (id: number) => {
    await sileo.promise(deactivateProfile(id), {
      loading: { title: 'Desactivando...' },
      success: { title: 'Perfil desactivado',  description: 'El perfil fue desactivado correctamente' },
      error:   { title: 'Error al desactivar', description: 'No se pudo desactivar el perfil' },
    })
  }

  const handleActivate = async (id: number) => {
    await sileo.promise(activateProfile(id), {
      loading: { title: 'Activando...' },
      success: { title: 'Perfil activado',  description: 'El perfil fue activado correctamente' },
      error:   { title: 'Error al activar', description: 'No se pudo activar el perfil' },
    })
  }

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-title">
          <h2><i className="pi pi-users mr-2" />Perfiles de Instagram</h2>
          <p>Consulta, registra y gestiona perfiles de usuarios</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            padding: '0.65rem 1.6rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 60%, #fcb045 100%)',
            color: '#fff', fontWeight: 700, fontSize: '0.9rem',
            boxShadow: '0 4px 14px rgba(131,58,180,0.38)', transition: 'transform 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <i className="pi pi-plus" style={{ fontSize: '0.9rem' }} />
          Nuevo Perfil
        </button>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card total" onClick={() => { setStatusFilter('all'); setSearchText('') }} style={{ cursor: 'pointer' }}>
          <i className="pi pi-users stat-icon purple" />
          <div className="stat-info">
            <span className="stat-value">{profiles.length}</span>
            <span className="stat-label">Total perfiles</span>
          </div>
        </div>
        <div className="stat-card active" onClick={() => setStatusFilter('active')} style={{ cursor: 'pointer' }}>
          <i className="pi pi-check-circle stat-icon green" />
          <div className="stat-info">
            <span className="stat-value">{activeCount}</span>
            <span className="stat-label">Activos</span>
          </div>
        </div>
        <div className="stat-card inactive" onClick={() => setStatusFilter('inactive')} style={{ cursor: 'pointer' }}>
          <i className="pi pi-ban stat-icon red" />
          <div className="stat-info">
            <span className="stat-value">{inactiveCount}</span>
            <span className="stat-label">Inactivos</span>
          </div>
        </div>
      </div>

      <Card>
        {/* Barra de filtros */}
        <div className="filter-bar">
          <div className="filter-search">
            <i className="pi pi-search" style={{ color: '#94a3b8', fontSize: '0.9rem', flexShrink: 0 }} />
            <input
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Buscar por usuario o nombre..."
            />
            {searchText && (
              <button onClick={() => setSearchText('')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}>
                <i className="pi pi-times-circle" style={{ color: '#94a3b8', fontSize: '0.85rem' }} />
              </button>
            )}
          </div>

          <div className="filter-pills">
            <button className={`filter-pill pill-all ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>
              Todos <span className="pill-badge">{profiles.length}</span>
            </button>
            <button className={`filter-pill pill-active ${statusFilter === 'active' ? 'active' : ''}`} onClick={() => setStatusFilter('active')}>
              Activos <span className="pill-badge">{activeCount}</span>
            </button>
            <button className={`filter-pill pill-inactive ${statusFilter === 'inactive' ? 'active' : ''}`} onClick={() => setStatusFilter('inactive')}>
              Inactivos <span className="pill-badge">{inactiveCount}</span>
            </button>
          </div>

          {hasFilters && (
            <button className="filter-clear" onClick={clearFilters}>
              <i className="pi pi-filter-slash" style={{ fontSize: '0.78rem' }} />
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Toolbar de tabla */}
        <div className="table-toolbar">
          <span className="table-toolbar-title">
            <i className="pi pi-list" style={{ color: '#6366f1' }} />
            Lista de perfiles
          </span>
          <span className="table-toolbar-count">
            {hasFilters
              ? `${filteredProfiles.length} de ${profiles.length} perfiles`
              : `${profiles.length} perfil${profiles.length !== 1 ? 'es' : ''}`
            }
          </span>
        </div>

        <ProfileTable
          profiles={filteredProfiles}
          loading={loading}
          onEdit={profile => setEditProfile(profile)}
          onDeactivate={handleDeactivate}
          onActivate={handleActivate}
        />
      </Card>

      <ProfileForm
        visible={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleCreate}
        loading={loading}
      />

      <ProfileEditDialog
        profile={editProfile}
        visible={!!editProfile}
        onHide={() => setEditProfile(null)}
        onUpdate={handleUpdate}
        loading={loading}
      />
    </>
  )
}
