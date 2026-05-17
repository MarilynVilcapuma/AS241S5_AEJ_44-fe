import { useState } from 'react'
import type { Post } from '../../types/post.types'
import PostDetailModal from './PostDetailModal'

interface Props { posts: Post[] }

export default function PostGrid({ posts }: Props) {
  const [selected, setSelected] = useState<Post | null>(null)

  if (posts.length === 0) {
    return (
      <div style={styles.empty}>
        <i className="pi pi-images" style={{ fontSize: '2.5rem', color: '#cbd5e1' }} />
        <p style={{ color: '#94a3b8', margin: '0.5rem 0 0' }}>Sin publicaciones guardadas</p>
      </div>
    )
  }

  return (
    <>
      <div style={styles.tabBar}>
        <div style={styles.tabActive}>
          <i className="pi pi-th-large" style={{ fontSize: '0.9rem' }} />
          <span>PUBLICACIONES</span>
        </div>
      </div>
      <div style={styles.grid}>
        {posts.map((post) => <GridCell key={post.id} post={post} onClick={() => setSelected(post)} />)}
      </div>
      {selected && <PostDetailModal post={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

function GridCell({ post, onClick }: { post: Post; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  const isVideo = post.mediaType?.toUpperCase() === 'VIDEO'

  return (
    <div style={{ ...styles.cell, ...(hovered ? styles.cellHover : {}) }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onClick}>
      {post.mediaUrl ? (
        isVideo
          ? <video src={post.mediaUrl} style={styles.media} muted preload="metadata" />
          : <img src={post.mediaUrl} alt={post.caption ?? ''} style={styles.media} loading="lazy" onError={(e) => { ;(e.target as HTMLImageElement).style.display = 'none'; ;(e.target as HTMLImageElement).parentElement!.style.background = '#e2e8f0' }} />
      ) : (
        <div style={styles.noMedia}><i className="pi pi-image" style={{ fontSize: '1.5rem', color: '#94a3b8' }} /></div>
      )}
      {hovered && <div style={styles.overlay}>{isVideo && <i className="pi pi-play-circle" style={styles.overlayIcon} />}{!isVideo && post.caption && <i className="pi pi-comment" style={styles.overlayIcon} />}</div>}
      {isVideo && !hovered && <div style={styles.videoBadge}><i className="pi pi-play" style={{ fontSize: '0.6rem' }} /></div>}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  tabBar: { display: 'flex', borderTop: '1px solid #e2e8f0', marginBottom: '2px' },
  tabActive: { display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.5rem', borderTop: '2px solid #1e293b', fontSize: '0.78rem', fontWeight: 700, color: '#1e293b', letterSpacing: '0.08em' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' },
  cell: { position: 'relative', aspectRatio: '1', overflow: 'hidden', cursor: 'pointer', background: '#f1f5f9' },
  cellHover: { opacity: 0.85 },
  media: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.2s' },
  noMedia: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' },
  overlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  overlayIcon: { color: '#fff', fontSize: '1.8rem', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' },
  videoBadge: { position: 'absolute', top: '0.4rem', right: '0.4rem', background: 'rgba(0,0,0,0.55)', color: '#fff', borderRadius: '4px', padding: '2px 5px', display: 'flex', alignItems: 'center' },
  empty: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', background: '#fff', borderRadius: '12px', border: '1.5px dashed #e2e8f0' },
}
