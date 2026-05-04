import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import type { Post } from '../../types/post.types'
import type { Profile } from '../../types/profile.types'

interface MediaTableProps {
  media: Post[]
  profiles: Profile[]
  loading: boolean
  onDeactivate: (id: number) => Promise<void>
  onActivate: (id: number) => Promise<void>
}

export default function MediaTable({ media, profiles, loading, onDeactivate, onActivate }: MediaTableProps) {
  const profileMap = new Map(profiles.map(p => [p.username, p]))

  const thumbnailTemplate = (post: Post) => {
    if (post.mediaType === 'VIDEO') {
      return (
        <div style={{
          width: 56, height: 56, borderRadius: '10px',
          background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(49,46,129,0.35)',
          flexShrink: 0
        }}>
          <i className="pi pi-play-circle" style={{ fontSize: '1.6rem', color: '#a5b4fc' }} />
        </div>
      )
    }
    if (post.mediaUrl) {
      return (
        <img
          src={post.mediaUrl}
          alt="media"
          width={56}
          height={56}
          style={{
            objectFit: 'cover', borderRadius: '10px',
            border: '2px solid #e2e8f0',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            flexShrink: 0
          }}
          onError={e => {
            const t = e.target as HTMLImageElement
            t.style.display = 'none'
            t.insertAdjacentHTML('afterend',
              `<div style="width:56px;height:56px;border-radius:10px;background:#f1f5f9;display:flex;align-items:center;justify-content:center">
                <i class="pi pi-image" style="color:#94a3b8;font-size:1.4rem"></i>
              </div>`
            )
          }}
        />
      )
    }
    return (
      <div style={{
        width: 56, height: 56, borderRadius: '10px',
        background: '#f1f5f9',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <i className="pi pi-image" style={{ color: '#94a3b8', fontSize: '1.4rem' }} />
      </div>
    )
  }

  const usernameTemplate = (post: Post) => {
    const profile = profileMap.get(post.username)
    const picUrl  = profile?.profilePicUrl ?? null
    const initial = post.username.charAt(0).toUpperCase()
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {/* Avatar con fallback en capa — el gradiente siempre está debajo */}
        <div style={{ position: 'relative', width: 38, height: 38, flexShrink: 0 }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'linear-gradient(135deg, #833ab4, #fd1d1d)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.95rem', fontWeight: 700, color: '#fff',
            zIndex: 0
          }}>
            {initial}
          </div>
          {picUrl && (
            <img
              src={picUrl}
              alt={post.username}
              width={38} height={38}
              style={{
                position: 'absolute', inset: 0, zIndex: 1,
                borderRadius: '50%', objectFit: 'cover',
                border: '2px solid #e2e8f0', boxSizing: 'border-box'
              }}
              onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden' }}
            />
          )}
        </div>
        <div>
          <div className="font-semibold text-900" style={{ fontSize: '0.9rem' }}>@{post.username}</div>
          <div className="text-xs" style={{ color: '#94a3b8' }}>
            {profile?.fullName ?? `Post #${post.id}`}
          </div>
        </div>
      </div>
    )
  }

  const typeTemplate = (post: Post) => {
    if (!post.mediaType) return <span style={{ color: '#9ca3af' }}>—</span>
    const isVideo = post.mediaType === 'VIDEO'
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
        padding: '0.25rem 0.65rem', borderRadius: '20px',
        background: isVideo ? '#ede9fe' : '#fff7ed',
        color: isVideo ? '#7c3aed' : '#ea580c',
        fontSize: '0.75rem', fontWeight: 600
      }}>
        <i className={`pi ${isVideo ? 'pi-video' : 'pi-image'}`} style={{ fontSize: '0.75rem' }} />
        {post.mediaType}
      </div>
    )
  }

  const captionTemplate = (post: Post) => {
    if (!post.caption) return <span style={{ color: '#cbd5e1', fontStyle: 'italic', fontSize: '0.8rem' }}>Sin descripción</span>
    return (
      <div title={post.caption} style={{ maxWidth: '260px' }}>
        <div style={{
          fontSize: '0.85rem', color: '#334155', lineHeight: '1.4',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
        }}>
          {post.caption}
        </div>
        {post.caption.length > 60 && (
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>
            {post.caption.length} caracteres
          </div>
        )}
      </div>
    )
  }

  const statusTemplate = (post: Post) => (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
      padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
      background: post.active ? '#f0fdf4' : '#fef2f2',
      color: post.active ? '#16a34a' : '#dc2626',
      border: `1px solid ${post.active ? '#bbf7d0' : '#fecaca'}`
    }}>
      <i className={`pi ${post.active ? 'pi-check-circle' : 'pi-ban'}`} style={{ fontSize: '0.75rem' }} />
      {post.active ? 'Activo' : 'Inactivo'}
    </div>
  )

  const sourceTemplate = (post: Post) => {
    if (!post.sourceUrl) return <span style={{ color: '#9ca3af' }}>—</span>
    return (
      <a
        href={post.sourceUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
          color: '#6366f1', fontSize: '0.8rem', textDecoration: 'none',
          padding: '0.2rem 0.6rem', borderRadius: '6px', background: '#eef2ff',
          fontWeight: 500, transition: 'background 0.15s'
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#e0e7ff')}
        onMouseLeave={e => (e.currentTarget.style.background = '#eef2ff')}
      >
        <i className="pi pi-external-link" style={{ fontSize: '0.7rem' }} />
        Ver post
      </a>
    )
  }

  const actionsTemplate = (post: Post) => (
    <div className="flex gap-1 justify-content-center">
      {post.active
        ? <Button
            icon="pi pi-ban"
            size="small"
            severity="danger"
            text
            rounded
            tooltip="Desactivar"
            tooltipOptions={{ position: 'top' }}
            onClick={() => onDeactivate(post.id)}
          />
        : <Button
            icon="pi pi-check-circle"
            size="small"
            severity="success"
            text
            rounded
            tooltip="Activar"
            tooltipOptions={{ position: 'top' }}
            onClick={() => onActivate(post.id)}
          />
      }
    </div>
  )

  return (
    <DataTable
      value={media}
      loading={loading}
      emptyMessage={
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <i className="pi pi-images" style={{ fontSize: '3rem', color: '#cbd5e1', display: 'block', marginBottom: '1rem' }} />
          <div style={{ color: '#64748b', fontWeight: 600, fontSize: '1rem' }}>No hay media registrado</div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Guarda tu primer post con el botón "Guardar Media"
          </div>
        </div>
      }
      stripedRows
      showGridlines
      style={{ fontSize: '0.9rem' }}
    >
      <Column header=""            body={thumbnailTemplate}  style={{ width: '76px', textAlign: 'center' }} />
      <Column header="Usuario"     body={usernameTemplate}   sortField="username" sortable style={{ minWidth: '160px' }} />
      <Column header="Tipo"        body={typeTemplate}       style={{ width: '110px' }} />
      <Column header="Descripción" body={captionTemplate}    style={{ minWidth: '200px' }} />
      <Column header="Post"        body={sourceTemplate}     style={{ width: '110px' }} />
      <Column header="Estado"      body={statusTemplate}     style={{ width: '110px' }} />
      <Column header="Acciones"    body={actionsTemplate}    style={{ width: '90px', textAlign: 'center' }} />
    </DataTable>
  )
}
