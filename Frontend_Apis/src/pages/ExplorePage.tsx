import { useState, useRef, type FormEvent } from 'react'
import { useProfileView } from '../hooks/useProfileView'
import ProfileHeader from '../components/profile-view/ProfileHeader'
import PostGrid from '../components/profile-view/PostGrid'

export default function ExplorePage() {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { profile, posts, loading, error, searched, searchProfile, reset } = useProfileView()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input.trim()) searchProfile(input.trim())
  }

  const handleClear = () => {
    setInput('')
    reset()
    inputRef.current?.focus()
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>Explorar Perfiles</h2>
          <p>Busca un usuario para ver su perfil y publicaciones</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.searchForm}>
        <div style={styles.searchBox}>
          <i className="pi pi-search" style={styles.searchIcon} />
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Buscar usuario por nombre exacto..." style={styles.searchInput} disabled={loading} autoComplete="off" spellCheck={false} />
          {input && <button type="button" onClick={handleClear} style={styles.clearBtn} tabIndex={-1}><i className="pi pi-times" style={{ fontSize: '0.75rem' }} /></button>}
        </div>
        <button type="submit" disabled={!input.trim() || loading} style={{ ...styles.searchBtn, ...(!input.trim() || loading ? styles.searchBtnDisabled : {}) }}>
          {loading ? <i className="pi pi-spin pi-spinner" style={{ fontSize: '0.9rem' }} /> : <><i className="pi pi-user-edit" style={{ fontSize: '0.9rem' }} /> Ver perfil</>}
        </button>
      </form>

      {loading && (
        <div style={styles.centered}>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem', color: '#833ab4' }} />
          <p style={{ color: '#64748b', marginTop: '0.75rem' }}>Buscando perfil...</p>
        </div>
      )}

      {!loading && error && (
        <div style={styles.errorBox}>
          <i className="pi pi-exclamation-circle" style={{ fontSize: '1.5rem', color: '#ef4444' }} />
          <div>
            <p style={styles.errorTitle}>{error}</p>
            <p style={styles.errorSub}>Verifica que el nombre de usuario esté guardado en el sistema.</p>
          </div>
        </div>
      )}

      {!loading && !searched && !error && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}><i className="pi pi-instagram" style={{ fontSize: '2.5rem', color: '#833ab4' }} /></div>
          <p style={styles.emptyTitle}>Busca un perfil de Instagram</p>
          <p style={styles.emptySub}>Ingresa el nombre de usuario exacto para visualizar su perfil y publicaciones guardadas.</p>
        </div>
      )}

      {!loading && profile && (
        <div style={styles.profileSection}>
          <ProfileHeader profile={profile} />
          <div style={styles.postsCard}><PostGrid posts={posts} /></div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  searchForm: { display: 'flex', gap: '0.75rem', marginBottom: '2rem', alignItems: 'center' },
  searchBox: { flex: 1, display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '0.7rem 1rem', transition: 'border-color 0.2s, box-shadow 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  searchIcon: { color: '#94a3b8', fontSize: '1rem', flexShrink: 0 },
  searchInput: { flex: 1, border: 'none', outline: 'none', fontSize: '0.95rem', color: '#1e293b', background: 'transparent' },
  clearBtn: { background: '#f1f5f9', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexShrink: 0 },
  searchBtn: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #833ab4, #fd1d1d)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(131,58,180,0.35)', transition: 'opacity 0.2s' },
  searchBtnDisabled: { opacity: 0.5, cursor: 'not-allowed', boxShadow: 'none' },
  centered: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem' },
  errorBox: { display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem 1.5rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', marginBottom: '1rem' },
  errorTitle: { margin: 0, fontWeight: 600, color: '#dc2626', fontSize: '0.95rem' },
  errorSub: { margin: '0.25rem 0 0', color: '#ef4444', fontSize: '0.85rem' },
  emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem', background: '#fff', borderRadius: '16px', border: '1.5px dashed #e2e8f0', textAlign: 'center' },
  emptyIcon: { width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #f3e8ff, #ffe4e6)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' },
  emptyTitle: { margin: 0, fontWeight: 700, fontSize: '1.1rem', color: '#1e293b' },
  emptySub: { margin: '0.5rem 0 0', color: '#64748b', fontSize: '0.9rem', maxWidth: 380, lineHeight: 1.5 },
  profileSection: { display: 'flex', flexDirection: 'column', gap: '0' },
  postsCard: { background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', padding: '1rem 0 0' },
}
