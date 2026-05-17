import { useEffect } from 'react'
import type { Post } from '../../types/post.types'

interface Props {
  post: Post
  onClose: () => void
}

export default function PostDetailModal({ post, onClose }: Props) {
  const isVideo = post.mediaType?.toUpperCase() === 'VIDEO'

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const date = new Date(post.savedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}><i className="pi pi-times" /></button>
        <div style={styles.mediaWrapper}>
          {post.mediaUrl ? (
            isVideo
              ? <video src={post.mediaUrl} controls style={styles.media} />
              : <img src={post.mediaUrl} alt={post.caption ?? ''} style={styles.media} onError={(e) => { ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x600?text=Sin+imagen' }} />
          ) : (
            <div style={styles.noMedia}>
              <i className="pi pi-image" style={{ fontSize: '3rem', color: '#94a3b8' }} />
              <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Sin imagen disponible</p>
            </div>
          )}
        </div>
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <div style={styles.userInfo}>
              <div style={styles.userAvatar}>{post.username.charAt(0).toUpperCase()}</div>
              <span style={styles.panelUsername}>{post.username}</span>
            </div>
            <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" style={styles.sourceLink} title="Ver original en Instagram">
              <i className="pi pi-external-link" />
            </a>
          </div>
          <div style={styles.captionArea}>
            {post.caption ? <p style={styles.caption}>{post.caption}</p> : <p style={styles.noCaption}>Sin descripción</p>}
          </div>
          <div style={styles.meta}>
            <div style={styles.metaItem}><i className="pi pi-tag" style={{ color: '#94a3b8', fontSize: '0.8rem' }} /><span style={styles.metaLabel}>Tipo</span><span style={styles.metaValue}>{post.mediaType ?? '—'}</span></div>
            <div style={styles.metaItem}><i className="pi pi-calendar" style={{ color: '#94a3b8', fontSize: '0.8rem' }} /><span style={styles.metaLabel}>Guardado</span><span style={styles.metaValue}>{date}</span></div>
            <div style={styles.metaItem}><i className="pi pi-circle-fill" style={{ color: post.active ? '#22c55e' : '#ef4444', fontSize: '0.6rem' }} /><span style={styles.metaLabel}>Estado</span><span style={styles.metaValue}>{post.active ? 'Activo' : 'Inactivo'}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' },
  modal: { position: 'relative', display: 'flex', background: '#fff', borderRadius: '12px', overflow: 'hidden', maxWidth: 900, width: '100%', maxHeight: '90vh', boxShadow: '0 25px 60px rgba(0,0,0,0.4)' },
  closeBtn: { position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' },
  mediaWrapper: { flex: '0 0 60%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 },
  media: { width: '100%', height: '100%', objectFit: 'contain', maxHeight: '90vh' },
  noMedia: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', minHeight: 400, background: '#1e293b' },
  panel: { flex: 1, display: 'flex', flexDirection: 'column', padding: '1.25rem', overflowY: 'auto', minWidth: 0 },
  panelHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9', marginBottom: '1rem' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '0.6rem' },
  userAvatar: { width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #833ab4, #fd1d1d)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  panelUsername: { fontWeight: 600, color: '#1e293b', fontSize: '0.95rem' },
  sourceLink: { color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '0.3rem', borderRadius: '6px', transition: 'color 0.15s' },
  captionArea: { flex: 1, marginBottom: '1rem' },
  caption: { margin: 0, color: '#334155', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-line' },
  noCaption: { margin: 0, color: '#94a3b8', fontStyle: 'italic', fontSize: '0.88rem' },
  meta: { display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '10px', borderTop: '1px solid #f1f5f9' },
  metaItem: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  metaLabel: { fontSize: '0.78rem', color: '#94a3b8', flex: '0 0 60px' },
  metaValue: { fontSize: '0.85rem', fontWeight: 600, color: '#334155', textTransform: 'capitalize' },
}
