import { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { sileo } from 'sileo'
import { useMedia } from '../hooks/useMedia'
import { useProfiles } from '../hooks/useProfiles'
import MediaForm from '../components/media/MediaForm'
import MediaTable from '../components/media/MediaTable'

type StatusFilter = 'all' | 'active' | 'inactive'
type TypeFilter   = 'all' | 'IMAGE' | 'VIDEO'

export default function MediaPage() {
  const [showForm, setShowForm]         = useState(false)
  const [searchText, setSearchText]     = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [typeFilter, setTypeFilter]     = useState<TypeFilter>('all')

  const { media, loading, loadMedia, createMedia, deactivateMedia, activateMedia } = useMedia()
  const { profiles, loadProfiles } = useProfiles()

  useEffect(() => { loadMedia() }, [loadMedia])
  useEffect(() => { loadProfiles() }, [loadProfiles])

  const filteredMedia = media.filter(m => {
    const matchSearch = m.username.toLowerCase().includes(searchText.toLowerCase())
    const matchStatus = statusFilter === 'all' ? true : statusFilter === 'active' ? m.active : !m.active
    const matchType   = typeFilter   === 'all' ? true : m.mediaType === typeFilter
    return matchSearch && matchStatus && matchType
  })

  const activeCount   = media.filter(m => m.active).length
  const inactiveCount = media.filter(m => !m.active).length
  const videoCount    = media.filter(m => m.mediaType === 'VIDEO').length
  const imageCount    = media.filter(m => m.mediaType === 'IMAGE').length
  const hasFilters    = searchText !== '' || statusFilter !== 'all' || typeFilter !== 'all'
  const clearFilters  = () => { setSearchText(''); setStatusFilter('all'); setTypeFilter('all') }

  const handleCreate = async (username: string, postUrl: string) => {
    await sileo.promise(createMedia(username, postUrl), {
      loading: { title: 'Guardando media...', description: `@${username}` },
      success: { title: '¡Media guardado!',   description: 'El post fue descargado correctamente' },
      error:   { title: 'Error al guardar',   description: 'No se pudo guardar el media' },
    })
  }

  const handleDeactivate = async (id: number) => {
    await sileo.promise(deactivateMedia(id), {
      loading: { title: 'Desactivando...' },
      success: { title: 'Media desactivado',   description: 'El media fue desactivado correctamente' },
      error:   { title: 'Error al desactivar', description: 'No se pudo desactivar el media' },
    })
  }

  const handleActivate = async (id: number) => {
    await sileo.promise(activateMedia(id), {
      loading: { title: 'Activando...' },
      success: { title: 'Media activado',   description: 'El media fue activado correctamente' },
      error:   { title: 'Error al activar', description: 'No se pudo activar el media' },
    })
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-title">
          <h2><i className="pi pi-images mr-2" />Media de Instagram</h2>
          <p>Descarga y gestiona fotos y videos de publicaciones</p>
        </div>
        <button onClick={() => setShowForm(true)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.65rem 1.6rem', borderRadius: '10px', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 60%, #fcb045 100%)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 4px 14px rgba(131,58,180,0.38)', transition: 'transform 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
          <i className="pi pi-download" style={{ fontSize: '0.9rem' }} /> Guardar Media
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card total" onClick={() => { setTypeFilter('all'); setStatusFilter('all'); setSearchText('') }} style={{ cursor: 'pointer' }}>
          <i className="pi pi-images stat-icon purple" />
          <div className="stat-info"><span className="stat-value">{media.length}</span><span className="stat-label">Total media</span></div>
        </div>
        <div className="stat-card active" onClick={() => setTypeFilter('IMAGE')} style={{ cursor: 'pointer' }}>
          <i className="pi pi-image stat-icon green" />
          <div className="stat-info"><span className="stat-value">{imageCount}</span><span className="stat-label">Imágenes</span></div>
        </div>
        <div className="stat-card inactive" onClick={() => setTypeFilter('VIDEO')} style={{ cursor: 'pointer' }}>
          <i className="pi pi-video stat-icon red" />
          <div className="stat-info"><span className="stat-value">{videoCount}</span><span className="stat-label">Videos</span></div>
        </div>
      </div>

      <Card>
        <div className="filter-bar">
          <div className="filter-search">
            <i className="pi pi-search" style={{ color: '#94a3b8', fontSize: '0.9rem', flexShrink: 0 }} />
            <input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Buscar por usuario..." />
            {searchText && <button onClick={() => setSearchText('')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}><i className="pi pi-times-circle" style={{ color: '#94a3b8', fontSize: '0.85rem' }} /></button>}
          </div>
          <div className="filter-pills">
            <button className={`filter-pill pill-all ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>Todos <span className="pill-badge">{media.length}</span></button>
            <button className={`filter-pill pill-active ${statusFilter === 'active' ? 'active' : ''}`} onClick={() => setStatusFilter('active')}>Activos <span className="pill-badge">{activeCount}</span></button>
            <button className={`filter-pill pill-inactive ${statusFilter === 'inactive' ? 'active' : ''}`} onClick={() => setStatusFilter('inactive')}>Inactivos <span className="pill-badge">{inactiveCount}</span></button>
          </div>
          {hasFilters && <button className="filter-clear" onClick={clearFilters}><i className="pi pi-filter-slash" style={{ fontSize: '0.78rem' }} /> Limpiar filtros</button>}
        </div>

        <div className="filter-bar-secondary">
          <span>Tipo:</span>
          <button className={`filter-pill-sm ${typeFilter === 'all' ? 'active-all' : ''}`} onClick={() => setTypeFilter('all')}>Todos</button>
          <button className={`filter-pill-sm ${typeFilter === 'IMAGE' ? 'active-img' : ''}`} onClick={() => setTypeFilter('IMAGE')}><i className="pi pi-image" style={{ fontSize: '0.72rem', marginRight: '4px' }} />Imágenes ({imageCount})</button>
          <button className={`filter-pill-sm ${typeFilter === 'VIDEO' ? 'active-video' : ''}`} onClick={() => setTypeFilter('VIDEO')}><i className="pi pi-video" style={{ fontSize: '0.72rem', marginRight: '4px' }} />Videos ({videoCount})</button>
        </div>

        <div className="table-toolbar">
          <span className="table-toolbar-title"><i className="pi pi-list" style={{ color: '#6366f1' }} /> Lista de media</span>
          <span className="table-toolbar-count">{hasFilters ? `${filteredMedia.length} de ${media.length} elementos` : `${media.length} elemento${media.length !== 1 ? 's' : ''}`}</span>
        </div>

        <MediaTable media={filteredMedia} profiles={profiles} loading={loading} onDeactivate={handleDeactivate} onActivate={handleActivate} />
      </Card>

      <MediaForm visible={showForm} onHide={() => setShowForm(false)} onSubmit={handleCreate} loading={loading} />
    </>
  )
}
