import { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { sileo } from 'sileo'
import { useDetector } from '../hooks/useDetector'
import DetectorForm from '../components/detector/DetectorForm'
import DetectorEditDialog from '../components/detector/DetectorEditDialog'
import DetectorTable from '../components/detector/DetectorTable'
import type { Detection, UpdateDetectionRequest } from '../types/detection.types'

type StatusFilter  = 'all' | 'active' | 'inactive'
type VerdictFilter = 'all' | 'HUMAN' | 'AI' | 'MIXED'

export default function DetectorPage() {
  const [showForm, setShowForm]           = useState(false)
  const [editDetection, setEditDetection] = useState<Detection | null>(null)
  const [searchText, setSearchText]       = useState('')
  const [statusFilter, setStatusFilter]   = useState<StatusFilter>('all')
  const [verdictFilter, setVerdictFilter] = useState<VerdictFilter>('all')

  const { detections, loading, loadDetections, detectText, updateDetection, deactivateDetection, restoreDetection } = useDetector()

  useEffect(() => { loadDetections() }, [loadDetections])

  const filtered = detections.filter(d => {
    const matchSearch  = d.inputText.toLowerCase().includes(searchText.toLowerCase())
    const matchStatus  = statusFilter  === 'all' ? true : statusFilter  === 'active' ? d.active : !d.active
    const matchVerdict = verdictFilter === 'all' ? true : d.verdict === verdictFilter
    return matchSearch && matchStatus && matchVerdict
  })

  const totalCount    = detections.length
  const activeCount   = detections.filter(d => d.active).length
  const inactiveCount = detections.filter(d => !d.active).length
  const humanCount    = detections.filter(d => d.verdict === 'HUMAN').length
  const aiCount       = detections.filter(d => d.verdict === 'AI').length
  const mixedCount    = detections.filter(d => d.verdict === 'MIXED').length
  const hasFilters    = searchText !== '' || statusFilter !== 'all' || verdictFilter !== 'all'

  const clearFilters = () => { setSearchText(''); setStatusFilter('all'); setVerdictFilter('all') }

  const handleDetect = async (text: string) => {
    await sileo.promise(detectText(text), {
      loading: { title: 'Analizando texto...',    description: 'Consultando API de detección' },
      success: { title: '¡Análisis completado!',  description: 'El resultado fue guardado correctamente' },
      error:   { title: 'Error al analizar',      description: 'No se pudo procesar el texto' },
    })
  }

  const handleUpdate = async (id: string, data: UpdateDetectionRequest) => {
    await sileo.promise(updateDetection(id, data), {
      loading: { title: 'Actualizando...' },
      success: { title: 'Detección actualizada', description: 'Los cambios fueron guardados' },
      error:   { title: 'Error al actualizar',   description: 'No se pudo actualizar la detección' },
    })
  }

  const handleDeactivate = async (id: string) => {
    await sileo.promise(deactivateDetection(id), {
      loading: { title: 'Desactivando...' },
      success: { title: 'Detección desactivada', description: 'Desactivada correctamente' },
      error:   { title: 'Error al desactivar',   description: 'No se pudo desactivar' },
    })
  }

  const handleRestore = async (id: string) => {
    await sileo.promise(restoreDetection(id), {
      loading: { title: 'Restaurando...' },
      success: { title: 'Detección restaurada', description: 'Restaurada correctamente' },
      error:   { title: 'Error al restaurar',   description: 'No se pudo restaurar' },
    })
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-title">
          <h2><i className="pi pi-search mr-2" />Detector de IA</h2>
          <p>Analiza textos para detectar si fueron escritos por humanos o IA</p>
        </div>
        <button onClick={() => setShowForm(true)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.65rem 1.6rem', borderRadius: '10px', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 60%, #6366f1 100%)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 4px 14px rgba(67,56,202,0.4)', transition: 'transform 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
          <i className="pi pi-plus" style={{ fontSize: '0.9rem' }} /> Nueva Detección
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card total" onClick={() => { setStatusFilter('all'); setVerdictFilter('all'); setSearchText('') }} style={{ cursor: 'pointer' }}>
          <i className="pi pi-list stat-icon purple" />
          <div className="stat-info"><span className="stat-value">{totalCount}</span><span className="stat-label">Total detecciones</span></div>
        </div>
        <div className="stat-card active" onClick={() => setVerdictFilter('HUMAN')} style={{ cursor: 'pointer' }}>
          <i className="pi pi-user stat-icon green" />
          <div className="stat-info"><span className="stat-value">{humanCount}</span><span className="stat-label">Humano</span></div>
        </div>
        <div className="stat-card inactive" onClick={() => setVerdictFilter('AI')} style={{ cursor: 'pointer' }}>
          <i className="pi pi-android stat-icon red" />
          <div className="stat-info"><span className="stat-value">{aiCount}</span><span className="stat-label">IA detectada</span></div>
        </div>
      </div>

      <Card>
        <div className="filter-bar">
          <div className="filter-search">
            <i className="pi pi-search" style={{ color: '#94a3b8', fontSize: '0.9rem', flexShrink: 0 }} />
            <input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Buscar por texto analizado..." />
            {searchText && <button onClick={() => setSearchText('')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}><i className="pi pi-times-circle" style={{ color: '#94a3b8', fontSize: '0.85rem' }} /></button>}
          </div>
          <div className="filter-pills">
            <button className={`filter-pill pill-all ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>Todos <span className="pill-badge">{totalCount}</span></button>
            <button className={`filter-pill pill-active ${statusFilter === 'active' ? 'active' : ''}`} onClick={() => setStatusFilter('active')}>Activos <span className="pill-badge">{activeCount}</span></button>
            <button className={`filter-pill pill-inactive ${statusFilter === 'inactive' ? 'active' : ''}`} onClick={() => setStatusFilter('inactive')}>Inactivos <span className="pill-badge">{inactiveCount}</span></button>
          </div>
          {hasFilters && <button className="filter-clear" onClick={clearFilters}><i className="pi pi-filter-slash" style={{ fontSize: '0.78rem' }} /> Limpiar filtros</button>}
        </div>

        <div className="filter-bar-secondary">
          <span>Veredicto:</span>
          <button className={`filter-pill-sm ${verdictFilter === 'all' ? 'active-all' : ''}`} onClick={() => setVerdictFilter('all')}>Todos</button>
          <button className={`filter-pill-sm ${verdictFilter === 'HUMAN' ? 'active-human' : ''}`} onClick={() => setVerdictFilter('HUMAN')}><i className="pi pi-user" style={{ fontSize: '0.72rem', marginRight: '4px' }} />Humano ({humanCount})</button>
          <button className={`filter-pill-sm ${verdictFilter === 'AI' ? 'active-ai' : ''}`} onClick={() => setVerdictFilter('AI')}><i className="pi pi-android" style={{ fontSize: '0.72rem', marginRight: '4px' }} />IA ({aiCount})</button>
          <button className={`filter-pill-sm ${verdictFilter === 'MIXED' ? 'active-mixed' : ''}`} onClick={() => setVerdictFilter('MIXED')}><i className="pi pi-chart-pie" style={{ fontSize: '0.72rem', marginRight: '4px' }} />Mixto ({mixedCount})</button>
        </div>

        <div className="table-toolbar">
          <span className="table-toolbar-title"><i className="pi pi-list" style={{ color: '#6366f1' }} /> Lista de detecciones</span>
          <span className="table-toolbar-count">{hasFilters ? `${filtered.length} de ${totalCount} elementos` : `${totalCount} elemento${totalCount !== 1 ? 's' : ''}`}</span>
        </div>

        <DetectorTable detections={filtered} loading={loading} onEdit={setEditDetection} onDeactivate={handleDeactivate} onRestore={handleRestore} />
      </Card>

      <DetectorForm visible={showForm} onHide={() => setShowForm(false)} onSubmit={handleDetect} loading={loading} />
      <DetectorEditDialog detection={editDetection} visible={!!editDetection} onHide={() => setEditDetection(null)} onUpdate={handleUpdate} loading={loading} />
    </>
  )
}
