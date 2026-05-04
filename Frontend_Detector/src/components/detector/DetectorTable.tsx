import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import type { Detection } from '../../types/detection.types'

interface DetectorTableProps {
  detections: Detection[]
  loading: boolean
  onEdit: (detection: Detection) => void
  onDeactivate: (id: string) => Promise<void>
  onRestore: (id: string) => Promise<void>
}

const VERDICT_CFG: Record<string, { bg: string; color: string; border: string; label: string; icon: string }> = {
  HUMAN: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', label: 'Humano', icon: 'pi-user' },
  AI:    { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', label: 'IA',     icon: 'pi-android' },
  MIXED: { bg: '#fff7ed', color: '#ea580c', border: '#fed7aa', label: 'Mixto',  icon: 'pi-chart-pie' },
}

export default function DetectorTable({ detections, loading, onEdit, onDeactivate, onRestore }: DetectorTableProps) {

  const inputTextTemplate = (d: Detection) => (
    <div title={d.inputText} style={{ maxWidth: '280px' }}>
      <div style={{
        fontSize: '0.85rem', color: '#334155', lineHeight: 1.4,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {d.inputText}
      </div>
      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>
        {d.inputText.split(/\s+/).filter(Boolean).length} palabras aprox.
      </div>
    </div>
  )

  const verdictTemplate = (d: Detection) => {
    if (!d.verdict) return <span style={{ color: '#94a3b8', fontSize: '0.78rem', fontStyle: 'italic' }}>Sin analizar</span>
    const cfg = VERDICT_CFG[d.verdict]
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
        padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
        background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
      }}>
        <i className={`pi ${cfg.icon}`} style={{ fontSize: '0.72rem' }} />
        {cfg.label}
      </div>
    )
  }

  const scoreBar = (value: number | null, isHuman: boolean) => {
    if (value == null) return <span style={{ color: '#94a3b8' }}>—</span>
    const raw    = value > 1 ? value : value * 100
    const pct    = Math.min(raw, 100).toFixed(1)
    const barPct = Math.min(raw, 100)
    const color     = isHuman ? '#22c55e' : '#ef4444'
    const textColor = isHuman ? '#16a34a' : '#dc2626'
    return (
      <div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: textColor }}>{pct}%</div>
        <div style={{ width: 56, height: 4, background: '#f1f5f9', borderRadius: 4, marginTop: 3, overflow: 'hidden' }}>
          <div style={{ width: `${barPct}%`, height: '100%', borderRadius: 4, background: color }} />
        </div>
      </div>
    )
  }

  const langTemplate = (d: Detection) => (
    d.lang
      ? <span style={{ padding: '0.15rem 0.5rem', borderRadius: '6px', background: '#f1f5f9', fontSize: '0.78rem', fontWeight: 600, color: '#475569' }}>
          {d.lang.toUpperCase()}
        </span>
      : <span style={{ color: '#94a3b8' }}>—</span>
  )

  const statusTemplate = (d: Detection) => (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
      padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
      background: d.active ? '#f0fdf4' : '#fef2f2',
      color: d.active ? '#16a34a' : '#dc2626',
      border: `1px solid ${d.active ? '#bbf7d0' : '#fecaca'}`,
    }}>
      <i className={`pi ${d.active ? 'pi-check-circle' : 'pi-ban'}`} style={{ fontSize: '0.75rem' }} />
      {d.active ? 'Activo' : 'Inactivo'}
    </div>
  )

  const actionBtn = (
    icon: string,
    hoverColor: string,
    hoverBg: string,
    iconColor: string,
    title: string,
    onClick: () => void
  ) => (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = hoverColor
        e.currentTarget.style.background  = hoverBg
        e.currentTarget.style.color       = hoverColor
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'transparent'
        e.currentTarget.style.background  = 'transparent'
        e.currentTarget.style.color       = iconColor
      }}
      style={{
        width: 34, height: 34, borderRadius: '50%',
        border: '2px solid transparent',
        background: 'transparent',
        cursor: 'pointer', display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center',
        color: iconColor, transition: 'all 0.18s',
        outline: 'none', flexShrink: 0,
      }}
    >
      <i className={`pi ${icon}`} style={{ fontSize: '0.9rem' }} />
    </button>
  )

  const actionsTemplate = (d: Detection) => (
    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'center' }}>
      {actionBtn('pi-pencil',       '#f59e0b', '#fffbeb', '#f59e0b', 'Editar',      () => onEdit(d))}
      {d.active
        ? actionBtn('pi-ban',         '#ef4444', '#fef2f2', '#ef4444', 'Desactivar', () => onDeactivate(d.id))
        : actionBtn('pi-check-circle','#22c55e', '#f0fdf4', '#22c55e', 'Restaurar',  () => onRestore(d.id))
      }
    </div>
  )

  return (
    <DataTable
      value={detections}
      loading={loading}
      emptyMessage={
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <i className="pi pi-search" style={{ fontSize: '3rem', color: '#cbd5e1', display: 'block', marginBottom: '1rem' }} />
          <div style={{ color: '#64748b', fontWeight: 600, fontSize: '1rem' }}>No hay detecciones registradas</div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Analiza tu primer texto con el botón "Nueva Detección"
          </div>
        </div>
      }
      stripedRows showGridlines style={{ fontSize: '0.9rem' }}
    >
      <Column header="Texto analizado" body={inputTextTemplate}                  style={{ minWidth: '220px' }} />
      <Column header="Veredicto"        body={verdictTemplate}                    style={{ width: '120px' }} />
      <Column header="% Humano"         body={d => scoreBar(d.humanScore, true)}  style={{ width: '100px' }} />
      <Column header="% IA"             body={d => scoreBar(d.aiScore, false)}    style={{ width: '100px' }} />
      <Column field="totalWords"         header="Palabras"                         style={{ width: '90px' }} />
      <Column header="Idioma"           body={langTemplate}                       style={{ width: '80px' }} />
      <Column header="Estado"           body={statusTemplate}                     style={{ width: '110px' }} />
      <Column header="Acciones"         body={actionsTemplate}                    style={{ width: '130px', textAlign: 'center' }} />
    </DataTable>
  )
}
