import type { Profile } from '../../types/profile.types'

interface Props { profile: Profile }

export default function ProfileHeader({ profile }: Props) {
  const avatar = profile.profilePicUrl
    ? profile.profilePicUrl
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.username)}&background=833ab4&color=fff&size=150`

  const fmt = (n: number | null) =>
    n === null ? '—' : n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + 'M' : n >= 1_000 ? (n / 1_000).toFixed(1) + 'K' : n.toString()

  return (
    <div style={styles.wrapper}>
      <div style={styles.avatarRing}>
        <img src={avatar} alt={profile.username} style={styles.avatar}
          onError={(e) => { ;(e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.username)}&background=833ab4&color=fff&size=150` }} />
      </div>
      <div style={styles.info}>
        <div style={styles.usernameRow}>
          <span style={styles.username}>{profile.username}</span>
          {profile.isVerified && <span title="Verificado" style={styles.verified}><i className="pi pi-verified" style={{ fontSize: '1.1rem' }} /></span>}
          {!profile.active && <span style={styles.inactiveBadge}>Inactivo</span>}
        </div>
        <div style={styles.stats}>
          <div style={styles.stat}><span style={styles.statValue}>{fmt(profile.postsCount)}</span><span style={styles.statLabel}>publicaciones</span></div>
          <div style={styles.statDivider} />
          <div style={styles.stat}><span style={styles.statValue}>{fmt(profile.followersCount)}</span><span style={styles.statLabel}>seguidores</span></div>
          <div style={styles.statDivider} />
          <div style={styles.stat}><span style={styles.statValue}>{fmt(profile.followingCount)}</span><span style={styles.statLabel}>seguidos</span></div>
        </div>
        {profile.fullName && <p style={styles.fullName}>{profile.fullName}</p>}
        {profile.bio && <p style={styles.bio}>{profile.bio}</p>}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: { display: 'flex', alignItems: 'flex-start', gap: '2.5rem', padding: '2rem 2.5rem', background: '#fff', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '1.5rem' },
  avatarRing: { flexShrink: 0, width: 110, height: 110, borderRadius: '50%', background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', padding: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 104, height: 104, borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff' },
  info: { flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  usernameRow: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  username: { fontSize: '1.4rem', fontWeight: 600, color: '#1e293b' },
  verified: { color: '#3b82f6', display: 'flex', alignItems: 'center' },
  inactiveBadge: { fontSize: '0.72rem', fontWeight: 600, background: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '20px', padding: '0.15rem 0.6rem' },
  stats: { display: 'flex', alignItems: 'center', gap: '1rem' },
  stat: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  statValue: { fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.2 },
  statLabel: { fontSize: '0.78rem', color: '#64748b' },
  statDivider: { width: 1, height: 28, background: '#e2e8f0' },
  fullName: { margin: 0, fontWeight: 600, color: '#1e293b', fontSize: '0.95rem' },
  bio: { margin: 0, color: '#475569', fontSize: '0.9rem', whiteSpace: 'pre-line', lineHeight: 1.5 },
}
