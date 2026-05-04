import { Routes, Route, NavLink } from 'react-router-dom'
import ProfilesPage from './pages/ProfilesPage'
import MediaPage from './pages/MediaPage'
import './App.css'

export default function App() {
  return (
    <div className="app-container">
      <nav className="app-nav">
        <span className="app-brand">Instagram Viewer</span>
        <div className="nav-links">
          <NavLink to="/profiles" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="pi pi-users" /> Perfiles
          </NavLink>
          <NavLink to="/media" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="pi pi-images" /> Media
          </NavLink>
        </div>
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<ProfilesPage />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/media" element={<MediaPage />} />
        </Routes>
      </main>
    </div>
  )
}
