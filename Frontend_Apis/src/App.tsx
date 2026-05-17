import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import DetectorPage  from './pages/DetectorPage'
import ProfilesPage  from './pages/ProfilesPage'
import MediaPage     from './pages/MediaPage'
import ExplorePage   from './pages/ExplorePage'
import './App.css'

const pageTitles: Record<string, string> = {
  '/detector':  'Detector IA',
  '/profiles':  'Perfiles de Instagram',
  '/media':     'Media',
  '/explore':   'Explorar',
}

export default function App() {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? 'Panel Unificado'

  return (
    <div className="app-wrapper">
      <Sidebar />

      <div className="app-layout">
        <header className="app-nav">
          <span className="app-nav-title">{title}</span>
          <div className="app-nav-badge">
            <span className="app-nav-dot" />
            Conectado
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/"         element={<Navigate to="/detector" replace />} />
            <Route path="/detector" element={<DetectorPage />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/media"    element={<MediaPage />} />
            <Route path="/explore"  element={<ExplorePage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
